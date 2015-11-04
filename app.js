var dataArtist;
// var dataRelated;
var baseUrl = 'https://api.spotify.com/v1/search?type=artist&query='
var myApp = angular.module('myApp', ['ui.bootstrap']);

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  
  $scope.getArtistID = function() {
    $http.get(baseUrl + $scope.artist).success(function(response){
      dataArtist = $scope.artists = response.artists.items
      console.log($scope.artist + ' Spotify ID: ' + dataArtist[0].id);
      getRelated();
      getSongs();
    })
  }
  var getRelated =function(){
    $http.get('https://api.spotify.com/v1/artists/'+dataArtist[0].id+'/related-artists').success(function(response){
      $scope.related = response.artists
      $scope.isCollapsed = true;
    })
  }
  var getSongs = function (){
    $http.get('https://api.spotify.com/v1/artists/'+dataArtist[0].id+'/top-tracks?country=US').success(function(response){
      $scope.toptracks = response.tracks
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



/* Create an Artist Suggestion list. When the search returns there should
be a list (3 cols wide) that shows the albumn art work of the related artist. In addition.
the searched artists top 5 songs will be listed with play and pause buttons next to each.
Underneath the albumn art work will be the name of the band in a button. the 
button will work as  a Bootsrapt collapsee; and when clicked there will be 
more information about the band. Hopefully, there will be a link that re-initalizes
the search with that band. 
*/
