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
  console.log(this.numberOfPlayers);
};

// Create Players function - used to create all the players in each game

OnTheMap.prototype.createPlayers = function() {
  var i = 1;
  namePlayer = function () {
    $("#questionaire").empty();
    $("#questionaire").empty().hide();
    $("#questionaire").append("Choose a name for Player " + i);
    $("#questionaire").slideDown(500);
    $("#msg").keydown((e) => {
      if (e.which == 13) {
        var player = new Player($("#msg").val());
        this.players.push(player);
        $("#player-" + i).append(this.players[i-1].name);
        $("#player-" + i + "-stops").append(this.players[i-1].stopsLeft);
        i++;
      }
    });
  };
  if (i <= this.numberOfPlayers) {
    namePlayer(i);
  } else {
    this.t = Math.floor(Math.random() * (this.numberOfPlayers)); //randomly assign turn
    this.last = this.t;
    $("#speaker").empty();
    $("#speaker").append(this.players[this.t].name + " starts the game");
    $("#speaker").slideDown(1000);
    $("#speaker").delay(500).fadeOut(500);
  };
};

// Play function - used to play in each turn

OnTheMap.prototype.play = function() {
  var r = Math.floor(Math.random() * this.cards.length);
  $("#questionaire").empty().hide();
  $("#questionaire").append("<p>" + this.cards[r].question + "</p>").slideDown(500);
  $("#msg").keydown((e) => {
    if (e.which == 13) {
      this._checkAnswer(r);
      }
    });
};

// Used by the Play function to check the answers of the players and continue playing

OnTheMap.prototype._checkAnswer = function(r) {
  playerAnswer = $("#msg").val().toUpperCase();
  if (playerAnswer == this.cards[r].answer.toUpperCase()) {
    alert("You got it right! Try with the next.");
    this.players[this.t].stopsLeft--;
    this.cards.splice(r,1);
    $("#player-" + this.t + "-stops").empty();
    $("#player-" + this.t + "-stops").append(this.players[this.t].stopsLeft);
    $("#msg").val("");
    $("#questionaire").empty();
    this.play();
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
    $("#speaker").delay(500).fadeOut(500);
  };
  $("#msg").empty();
  $("#questionaire").empty();
  this.play();
};
