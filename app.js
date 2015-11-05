var dataArtist;
var artistAlubm;
var baseUrl = 'https://api.spotify.com/v1/search?type=artist&query='
var getURL = 'https://api.spotify.com/v1/artists/'
var myApp = angular.module('myApp', ['ui.bootstrap']);

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  
  $scope.getArtistID = function(queryArtist) {
    
  if(queryArtist!=null){
    $scope.artist=queryArtist
  }
    $http.get(baseUrl + $scope.artist).success(function(response){
      dataArtist = $scope.artists = response.artists.items
      console.log("baseUrl:  " + baseUrl);
      console.log ("artist ID: " + dataArtist[0].id)
      getRelated();
      getSongs();
      getAlbums();
    })
  }
  var getRelated =function(){
    $http.get(getURL+ dataArtist[0].id +'/related-artists').success(function(response){
      $scope.related = response.artists
      $scope.isCollapsed = true;
    })
  }
  var getSongs = function (){
    $http.get(getURL+dataArtist[0].id+ '/top-tracks?country=US').success(function(response){
      $scope.toptracks = response.tracks
      console.log("Top Tracks: " + $scope.toptracks)

    })
  }

  var getAlbums = function (){
    $http.get(getURL+dataArtist[0].id+'/albums?market=US&album_type=album').success(function(response){
       $scope.artistAlubm = response['items'];
      console.log("Artist Album: "+ $scope.artistAlubm);
    })
  }
  // $scope.play = function(song) {
  //   if($scope.currentSong == song) {
  //     $scope.audioObject.pause()
  //     $scope.currentSong = false
  //     return
  //   }
  //   else {
  //     if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
  //       $scope.audioObject = new Audio(song);
  //     $scope.audioObject.play()  
  //     $scope.currentSong = song
  //   }
  // }
})

// Add tool tips to anything with a title property
$('body').tooltip({
  selector: '[title]'
});
