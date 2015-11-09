var dataArtist;
var artistList = [];
var baseUrl = 'https://api.spotify.com/v1/search?type=artist&query='
var getUrl = 'https://api.spotify.com/v1/artists/'
var echoUrl = 'http://developer.echonest.com/api/v4/artist/profile?api_key=ADKYSLYABB1EDPIEE&id=spotify:artist:'



var myApp = angular.module('myApp', ['ui.bootstrap']);
var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  
  $scope.getArtistID = function(queryArtist) {
    
  if(queryArtist!=null){
    $scope.artist=queryArtist
  }
    $http.get(baseUrl + $scope.artist).success(function(response){
      dataArtist = $scope.artists = response.artists.items
      //Update Breadcrumb footer based on searches
      artistList.push($scope.artist);
      $scope.list=artistList;
      
      /*User needs to visual see that the page has updated after selecting
       an artist from within the suggestions */
      getSongs();
      getRelated();
      getAlbums();
    })
  }
  var getRelated =function(){
    $http.get(getUrl+ dataArtist[0].id +'/related-artists').success(function(response){
      $scope.related = response.artists
      $scope.isCollapsed = true;
    })
  }
   var getSongs = function (){
    $http.get(getUrl+dataArtist[0].id+ '/top-tracks?country=US').success(function(response){
      $scope.toptracks = response.tracks

    })
  }
  var getAlbums = function (){
    $http.get(getUrl+dataArtist[0].id+'/albums?market=US&album_type=album').success(function(response){
       $scope.artistAlubm = response['items'];
    })
  }
  $scope.getAlbumTracks = function(albumId){
    $http.get('https://api.spotify.com/v1/albums/'+ albumId +'/tracks').success(function(response){
      $scope.albtracks = response.items;
      $scope.isCollapsed = true;
    })
  }
 $scope.getEcho = function (id){
    $http.get(echoUrl+id+'&bucket=genre&format=json').success(function(response){
      $scope.genrelists= response.response.artist.genres[0]; //show only primary genre
    })
  }
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
        $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }
})

// Add tool tips to anything with a title property
$('body').tooltip({
  selector: '[title]'
});
