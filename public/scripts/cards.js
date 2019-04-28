var newGameBtn = document.querySelector("#newGameBtn"),
    compareBtn = document.querySelector("#compareBtn"),
    dealerHand = document.querySelector("#dealerHand"),
    playerHand = document.querySelector("#playerHand"),
    // serverStuff = document.querySelector("#serverStuff"),
    // testDiv = document.querySelector("#test"),
    deck = [],
    sortedHands = [],
    counter,
    actionDisplay = document.querySelector("#action");
    
var startingAction;
var action = [];
    for (var i=0; i<7;i++){
    action[i] = {hand: []};
}

newGameBtn.addEventListener("click", function(){
    counter = 1;
    reset(), deckinit(), deal(), seatHand(), compHands(), sort(), display(dealerHand, counter, action), console.log(action);
//    deckinit();
//    deal();
//    seatHand();
//    sort();
//    display(dealerHand, counter, action);
    playerHand.innerHTML = "";
    //document.body.classList.toggle("purple");
});

compareBtn.addEventListener("click", function(){
    if(counter <= 6){
    counter++;
    display(playerHand, counter, action);
    }
});

dealerHand.addEventListener("click", function(){
    display(dealerHand, 1, sortedHands);
});

playerHand.addEventListener("click", function(){
    display(playerHand, counter, sortedHands);
});

// deckinit();
// deal();
// display();

//create the deck
function deckinit(){
    var suits = ['clubs','diamonds','hearts','spades'],
        ranks = [2,3,4,5,6,7,8,9,10,11,12,13,14];
    deck = [{'rank': 15, 'suit': 'wild' }];
    for (var i=0;i<suits.length;i++) {
        for (var j=0;j<ranks.length;j++) {
            var card = {'rank': ranks[j], 'suit':suits[i]};
            deck.push(card);
        }
    }
    //Shuffle the deck.
    deck.sort(function() {return 0.5 - Math.random()});
}


//Deal 7 cards to each player
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

//
function display(dHand, dSeat, data){
    dHand.innerHTML = "";
			for(var i=0; i<7;i++){
			    if(data[i].seat === dSeat){
			    	for(var j=0; j<7;j++){
			    	   dHand.innerHTML += '<img class="card" src="/images/' + data[i].hand[j].suit + data[i].hand[j].rank + '.png">'; 
				        
			    	}
				}
			}
	   //playerHand.innerHTML += "<br>";
// -- write code to display randomSeat selection --
    //action = Math.floor(Math.random()*7);
    actionDisplay.innerHTML = (startingAction+1);
}


function reset(){
    if(action[0].hand.length !== 0){
        for(var i=0;i<action.length;i++){
            for(var key in action[i]) {
                if(key === "hand"){
                    action[i].hand.splice(0, 7);
                } else {
                    delete action[i][key];
                }
            }
        }
    }
}


function seatHand(){
    var counter = 0;
    startingAction = Math.floor(Math.random()*7);
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

function sort(){
    sortedHands = JSON.parse(JSON.stringify(action));
    for(var i=0;i<sortedHands.length;i++){
			sortedHands[i].hand.sort(function(a,b) {
			    if(sortedHands[i].pairs && sortedHands[i].pairs.length === 2) {
			    if(sortedHands[i].histogram[a.rank] === 2 && sortedHands[i].histogram[b.rank] === 2) {
			    return a.rank - b.rank || sortedHands[i].histogram[b.rank] - sortedHands[i].histogram[a.rank];
			    }
			    }
			 return sortedHands[i].histogram[b.rank] - sortedHands[i].histogram[a.rank] || b.rank - a.rank;
        });
    }
}

function compHands(){
	var suits = {hearts: null, diamonds: null, clubs: null, spades: null, wild: null};
	var histogram = [];
        function history(){
            for (var i=0; i<16;i++){
                histogram[i] = null;
    	}
    }
    
    history();
    
	function resetSuits(){
    	for(var key in suits){
	        suits[key] = null;
            }
        }
    function flushie(){
	    for(var key in suits){
		    if (suits[key] >= 5 || suits[key] === 4 && suits.wild){
			    action[i].bonus = ["flush", key];
    		}
	    }
    }
    
    function sequentialCards(){
        var strCounter = 1;
        for(var hist=0; hist < action[i].histogram.length; hist++){
            if(action[i].histogram[hist] && action[i].histogram[hist+1]){
                strCounter++;
            } if (action[i].histogram[hist] && !action[i].histogram[hist+1]){
                strCounter = 1;
            } if(strCounter === 5){
                if(!action[i].bonus){
                action[i].bonus = [];
                }
                action[i].bonus.push("straight");
            }
        
            if(action[i].histogram[hist] === 2){
                if(!action[i].pairs){
                 action[i].pairs = [];
                }
                action[i].pairs.push(hist);
            } else if(action[i].histogram[hist] === 3) {
                if(!action[i].trips){
                 action[i].trips = [];   
                }
                action[i].trips.push(hist);
            } else if(action[i].histogram[hist] === 4) {
                action[i].quads = hist;
                action[i].bonus = "quads";
            }
        }
    }
    
	for (var i=0; i<action.length;i++){
	    action[i].histogram = [];
			for(var j=0; j<action[i].hand.length; j++){
				suits[action[i].hand[j].suit]++;
				if (!action[i].histogram[action[i].hand[j].rank]){
				    action[i].histogram[action[i].hand[j].rank] = 1;
				} else {
				action[i].histogram[action[i].hand[j].rank]++;
			}
    	}
			flushie(), sequentialCards(), resetSuits();
	}
}