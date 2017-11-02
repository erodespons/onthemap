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
//TODO Create start game page
//TODO Create lateral div with questions and answers

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
  console.log(this.numberOfPlayers);
};

// Create Players function - used to create all the players in each game

OnTheMap.prototype.createPlayers = function() {

  for (var i = 1; i <= this.numberOfPlayers; i++) {
    var player = new Player(prompt("Choose a name for Player " + i));
    this.players.push(player);
  };
  this.t = Math.floor(Math.random() * (this.numberOfPlayers)); //randomly assign turn
  this.last = this.t;
  //alert(this.players[t].name + " starts the game");
};

OnTheMap.prototype._checkAnswer = function(r) {
  playerAnswer = $("#answers-form").val().toUpperCase();
  console.log(playerAnswer + this.cards[r].answer);
  if (playerAnswer == this.cards[r].answer.toUpperCase()) {
    alert("You got it right! Try with the next.");
    this.players[this.t].stopsLeft--;
    this.cards.splice(r,1);
    for (var i = 0; i < this.numberOfPlayers; i++) {
      console.log(this.players[i].name + " has " + this.players[i].stopsLeft + " stops left.");
    $("#answers-form").val("");
    $("#questionaire").empty();
    this.play();
    };
    this.players[this.t].stopsLeft--;
  } else {
    console.log("Fail! It is turn for " + this.players[this.t].name + " to play");
    this.last = this.t;
    if (this.t < this.numberOfPlayers) {
      this.t++;
    } else {
      this.t = 0;
    };
    $("#answers-form").empty();
    $("#questionaire").empty();
    this.play();
  }
};

// Play function - used to play in each turn

OnTheMap.prototype.play = function() {
  var r = Math.floor(Math.random() * this.cards.length);
  $("#questionaire").append("<p>" + this.cards[r].question + "<p>");
  $("#answers-form").keydown((e) => {
    if (e.which == 13) {
      this._checkAnswer(r);
      }
    });
};
