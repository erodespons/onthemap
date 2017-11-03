//*******************************************
// Game Logic - OnTheMap - Digital Board Game
//********************************************

// OnTheMap Colors:
//
// #f1000e
// #00e8c5
// #f5fe00
// #1784E5
// #eceae4
// #580800
// #ff598e

// OnTheMap Development Plan - Next Steps

//TODO Create more cards with country_name and associate them to each "airport"
//TODO Paint routes with start and finish markers + marker with the position.
//TODO What happens when someone wins?

// OnTheMap constructor function. We use it to start a new game.

var colors = ["#f1000e", "#00e8c5", "#f5fe00", "#1784E5"];
var routes = [];
var playerAnswer = "FirstValue";

// OnTheMap constructor function - used to start a game

var OnTheMap = function(numberOfPlayers) {
  // alert("The game is about to start! Before starting your journey please choose a name");
  this.numberOfPlayers = numberOfPlayers;

  this.players = [];
  this.cards = onTheMapCards;
  this.t = ""; //turn
  this.last = 0; //last player who played
  this.r = 0;
};

// Create Players function - used to create all the players in each game

 OnTheMap.prototype.createPlayers = function() {

   for (var i = 1; i <= this.numberOfPlayers; i++) {
     var player = new Player(prompt("Choose a name for Player " + i));
     this.players.push(player);
     $("#player-" + i).append(this.players[i-1].name);
     $("#player-" + i + "-stops").append(this.players[i-1].stopsLeft);

   };
   this.t = Math.floor(Math.random() * (this.numberOfPlayers)); //randomly assign turn
   this.last = this.t;
   //alert(this.players[t].name + " starts the game");
   $("#speaker").empty();
   $("#speaker").append(this.players[this.t].name + " starts the game");
   $("#speaker").slideDown(1000);
   $("#speaker").delay(500).fadeOut(500);
 };

 // Create Players function - used to create all the players in each game

// OnTheMap.prototype.createPlayers = function() {
//   var i = 1;
//   var namePlayer = function () {
//     $("#questionaire").empty();
//     $("#questionaire").empty().hide();
//     $("#questionaire").append("Choose a name for Player " + i);
//     $("#questionaire").slideDown(500);
//     $("#msg").keydown((e) => {
//       if (e.which == 13) {
//         var player = new Player($("#msg").val());
//         console.log(player);
//         this.players.push(player);
//         $("#player-" + i).append(this.players[i-1].name);
//         $("#player-" + i + "-stops").append(this.players[i-1].stopsLeft);
//         i++;
//       }
//     });
//   };
//   if (i <= this.numberOfPlayers) {
//     namePlayer(i);
//   } else {
//     this.t = Math.floor(Math.random() * (this.numberOfPlayers)); //randomly assign turn
//     this.last = this.t;
//     $("#speaker").empty();
//     $("#speaker").append(this.players[this.t].name + " starts the game");
//     $("#speaker").slideDown(1000);
//     $("#speaker").delay(500).fadeOut(500);
//   };
//   if(i == (this.numberOfPlayers-1)) {
//     playersExist = true;
//   };
// };

// Play function - used to play in each turn

OnTheMap.prototype.play = function() {
  r = Math.floor(Math.random() * this.cards.length);
  $("#questionaire").empty().hide();
  $("#questionaire").append("<p>" + this.cards[r].question + "</p>").slideDown(500);
  $("#msg").unbind().keydown((e) => {
    if (e.which == 13) {
      this._checkAnswer();
    }
  });
};

// Used by the Play function to check the answers of the players and continue playing

OnTheMap.prototype._checkAnswer = function() {
  playerAnswer = $("#msg").val().toUpperCase();
  if (playerAnswer == this.cards[r].answer.toUpperCase()) {
      $("#speaker").empty();
      $("#speaker").append("You got it right! Try with the next.");
      $("#speaker").slideDown(1000);
      $("#speaker").delay(500).fadeOut(500);
      this.players[this.t].stopsLeft--;
      this.players[this.t].score = this.players[this.t].score + 5;
      this.cards.splice(r,1);
      $("#player-" + this.t + "-stops").hide().empty();
      $("#player-" + this.t + "-stops").append(this.players[this.t].stopsLeft);
      $("#player-" + this.t + "-stops").slideDown(500);
      $("#player-" + this.t + "-score").hide().empty();
      $("#player-" + this.t + "-score").append(this.players[this.t].score);
      $("#player-" + this.t + "-score").slideDown(500);
  } else {
    this.last = this.t;
    if (this.t < (this.numberOfPlayers-1)) {
      this.t++;
    } else {
      this.t = 0;
    };
    $("#speaker").empty();
    $("#speaker").append("Fail! It is turn for " + this.players[this.t].name + " to play");
    $("#speaker").slideDown(1000);
    $("#speaker").delay(1000).fadeOut(500);
  };
  $("#msg").empty();
  $("#questionaire").empty();
  this.play();
};
