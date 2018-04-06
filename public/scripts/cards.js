var p = document.querySelector("#hands"),
    newGame = document.querySelector("button"),
    deck = [],
    actionDisplay = document.querySelector("#action");
    
var startingAction;
var action = [];
    for (var i=0; i<7;i++){
    action[i] = {name: 'action'+ (i+1), hand: []};
}

newGame.addEventListener("click", function(){
    reset();
    deckinit();
    deal();
    seatHand();
    display();
    //document.body.classList.toggle("purple");
});
//here's our players array from exercise 1

// deckinit();
// deal();
// display();

//create the deck
function deckinit(){
    var suits = ['clubs','diamonds','hearts','spades'],
        ranks = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
    deck = [{'rank': 'Joker'}];
    for (var i=0;i<suits.length;i++) {
        for (var j=0;j<ranks.length;j++) {
            var card = {'rank': ranks[j], 'suit':suits[i]};
            deck.push(card);
        }
    }
    //Shuffle the deck.
    deck.sort(function() {return 0.5 - Math.random()});
}


//Deal 7 cards to each player,
//one player at a time
function deal(){
    var k = 0;
        for(var i=0; i<7; i++){
        for(var j=0; j<action.length; j++){
            var card = deck[k];
            action[j].hand.push(card);
            k++;
        }
    }
}
//console.log(players);

function display(){
    p.innerHTML = "";
        for(var i=0; i<7;i++){
            for(var j=0; j<7;j++){
	       p.innerHTML += '<img class="card" src="/images/' + action[i].hand[j].suit + action[i].hand[j].rank + '.png">';
	   }
	   	       p.innerHTML += "<br>";
    }
// -- write code to display randomSeat selection --
    //action = Math.floor(Math.random()*7);
    actionDisplay.innerHTML = (startingAction+1);
}


function reset(){
    if(action[0].hand.length !== 0){
    for(var i=0;i<action.length;i++){
        action[i].hand.splice(0, 7);
        }
    }
}

function seatHand(){
    var counter = 0;
    startingAction = Math.ceil(Math.random()*7);
    for(var i=startingAction;i<action.length;i++){
        action[counter].seat = (i+1);
        counter++;
    }
    counter = 6;
    for(i=(startingAction-1);i>=0;i--){
        action[counter].seat = (i+1);
        counter--;
    }
}
