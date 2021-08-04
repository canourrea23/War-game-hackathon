// have 52 cards with all the nums and pairs 
// dived deck into two player 1 and player2
// campare draw of first [0] index in both array and return to higher deck


//win or lose based on card value 

//keep score let player = score

//no cards left display winner

//shuffle function and pop


// const deck = {
//     2: {
//         value: 2
//     },
//     3: {
//         value: 3
//     },
//     4: {
//         value: 4
//     },
//     5: {
//         value: 5
//     },
//     6: {
//         value: 6
//     },
//     7: {
//         value: 7
//     },
//     8: {
//         value: 8
//     },
//     9: {
//         value: 9
//     },
//     10: {
//         value: 10
//     },
//     J: {
//         value: 11
//     },
//     Q: {
//         value: 12
//     },
//     K: {
//         value: 13
//     },
//     A: {
//         value: 14
//     }
// }

// const cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
// const suits = ["diamonds", "hearts", "spades", "clubs"];

// const deck = new Array();

// function getDeck() {
// 	var deck = new Array();

// 	for(var i = 0; i < suits.length; i++)
// 	{
// 		for(var x = 0; x < cards.length; x++)
// 		{
// 			var card = {Value: cards[x], Suit: suits[i]};
// 			deck.push(card);
// 		}
//     console.log(deck)
// 	}

// 	return deck;
// }
// console.log(deck)

console.clear();

// starting function

var Card = (function() {
    var suitNames = ['spades', 'diamonds', 'clubs', 'hearts'],
    suitCodes = ['\u2660', '\u2666', '\u2663', '\u2665'],
        Card = function(index) {
            this.index = index; // cards hierarchy
            this.value = (index % 13) + 1; // position in the array
            this.suit = suitNames[Math.floor(index / 13)]; // declaring the suit
        };
        // For the card that have no value
        Card.prototype = {
            get number() {
                switch(this.value) {
                    case 11:
                        return 'J';
                    case 12: 
                        return 'Q';
                    case 13:
                        return 'K';
                    case 1:
                        return 'A';
                    default:
                        return this.value;
                }
                return this.value;
            },
            get name() {
                var numberName = (function(n) {
                    switch(n) {
                        case 'A': return 'Ace';
                        case 'K': return 'King';
                        case 'Q': return 'Queen';
                        case 'J': return 'Jack';
                        default: return n;
                    }
                })(this.number);
                return numberName + ' of ' + this.suit;
            },
            get suitUnicodeArray() { 
                return suitCodes; 
            },
            get suitNameArray() { 
                return suitNames; 
            }
        }
        return Card;
})();
console.log(new Card(10));

//starting index 0 value of 1, map 52 times 
var deck = Array.apply(null, Array(52)).map(function(_, i) {
    return new Card(i);
});
// console.log(deck)

// creating player and Pc decks
var playerDeck = [], pcDeck = [], drawIndex;

    while(deck.length > 0) {
        //creating deck for player
        drawIndex = Math.random() * deck.length;
        playerDeck.push( deck.splice(drawIndex, 1)[0] );
        // drawIndex = Math.random() * deck.length;
        // playerDeck.push(deck.splice(drawIndex, 1)[0] );

        console.log('player', playerDeck);

        // creating PC deck
        drawIndex = Math.random() * deck.length;
        pcDeck.push( deck.splice(drawIndex.pc, 1)[0] );
        // drawIndex = Math.random() * deck.length; // random asort to array
        // pcDeck.push(deck.splice(drawIndex, 1)[0] ); //draws first array of deck
        // console.log(drawIndex, 'drawIndex')
        // console.log(pcDeck, 'pcdeck')
    }

    var drawAndPlay = function(rewards){
    if( rewards ){ console.log('rewards = ', rewards); }
    
    // if either deck is empty, game over
    if( playerDeck.length === 0 || pcDeck.length === 0 ){
        // game over
        if( playerDeck.length > 0 ){
        console.log('Player Won');
        } else {
        console.log('PC Won');
        }
        return false;
    }
    // draw card from each deck
    var playerCard = playerDeck.shift(),
        pcCard = pcDeck.shift(),
        rewards = rewards ? rewards : [];
    
    const playerSection = document.querySelector('section.player'),
        pcSection = document.querySelector('section.pc'),
        playerCardDiv = playerSection.querySelector('div.card'),
        pcCardDiv = pcSection.querySelector('div.card'),
        playerPoints = playerSection.querySelector('[data-points]'),
        pcPoints = pcSection.querySelector('[data-points]');
    
    Card.prototype.suitNameArray.forEach(function(v,i,a){
        playerCardDiv.classList.remove(v);
        pcCardDiv.classList.remove(v);
        return true;
    });
    
    playerCardDiv.querySelector('span.name').innerHTML = playerCard.number;
    playerCardDiv.classList.add( playerCard.suit );
    playerSection.querySelector('div[data-cards-left]').setAttribute('data-cards-left', playerDeck.length);
    
    pcCardDiv.querySelector('span.name').innerHTML = pcCard.number;
    pcCardDiv.classList.add( pcCard.suit );
    pcSection.querySelector('div[data-cards-left]').setAttribute('data-cards-left', pcDeck.length);
    
    // compare cards
    if( playerCard.value === pcCard.value ){
        console.log('tie', playerCard, pcCard);
        
        rewards.push(playerCard);
        rewards.push(pcCard);
        return drawAndPlay(rewards);
    } else if( playerCard.value > pcCard.value ){
        // Player wins
        console.log('Player wins round', playerCard, pcCard);

        playerPoints.setAttribute('data-points', parseInt(playerPoints.getAttribute('data-points')) + 1)
        
        // Reward Cards
        playerDeck.splice(playerDeck.length, 0, playerCard, pcCard);
        if( rewards.length > 0 ){
        playerDeck = playerDeck.concat(rewards);
        }
        
    } else {
    console.log('Computer wins round', playerCard, pcCard);
    pcPoints.setAttribute('data-points', parseInt(pcPoints.getAttribute('data-points')) + 1)
    
    // Reward Cards
    pcDeck.splice(pcDeck.length, 0, pcCard, playerCard);
    if( rewards.length > 0 ){
        pcDeck = pcDeck.concat(rewards);
        }
        
    }

    console.log('Player Cards left = '+playerDeck.length, 'PC Cards left = '+pcDeck.length);
    return true;
};
// trying to push changes

window.onload = function draw(){
    var btn = document.querySelector('button.draw');
    btn.addEventListener('click', function(event){
        document.getElementById("rules").classList.add("hidden");
        const keepGoing = drawAndPlay();
        if( !keepGoing ){
        alert('Game Over');
        clearInterval(window.intervalID);
        }
    });
};