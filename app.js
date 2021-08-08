console.clear();

// Define the Card Class
const Card = (function(){
    let suitNames = ['spades', 'diamonds', 'clubs', 'hearts'],
        suitCodes = ['\u2660', '\u2666', '\u2663', '\u2665'],
        Card = function(index){
            this.index = index;
            this.value = (index % 13)+1;
            this.suit = suitNames[Math.floor(index/13)];
        };
    
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
        },
        get name() {
            var numberName = (function(n){
                switch(n){
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
    };
    
    return Card;
})();

console.log(new Card(13));

/*** START GAME SETUP ***/

// Create Deck of cards
let deck = Array.apply(0, Array(52)).map(function(_, i){
    return new Card(i); 
});

//for( var i = 0 ; i < 13 ; i++ ){
  //console.log( deck[i] );
//}

// Create player decks
let playerDeck = [];
let pcDeck = [];
let drawIndex;

// Deal cards to players (2)
    while( deck.length > 0 ){
    
    // Draw Card for Player
    drawIndex = Math.random() * deck.length;
    playerDeck.push( deck.splice(drawIndex, 1)[0] );
    
    // Draw Card for CPU
    drawIndex = Math.random() * deck.length;
    pcDeck.push( deck.splice(drawIndex.pc, 1)[0] );
    
    }

    /*** END GAME SETUP ***/

    // Gameplay
    // push button to draw and play card
    // winner takes cards, added to bottom of their deck
    // tie, play another card
    // game ends when one player is out of cards

    // Single Round
    function drawAndPlay(rewards){
    if (rewards){ 
        console.log('rewards = ', rewards); 
    }
    
    // if either deck is empty, game over
    if( playerDeck.length === 0 || pcDeck.length === 0 ){
        // game over
        if( playerDeck.length > 0 ){
        console.log('Player Won');
        } else {
        console.log('Computer Won');
        }
        return false;
    }
    // draw card from each deck
    var playerCard = playerDeck.shift(),
        pcCard = pcDeck.shift(),
        // adds rewards/points when computer wins draw
        rewards = rewards ? rewards : [];
    
    const playerSection = document.querySelector('div.player');
    const pcSection = document.querySelector('div.pc'),
        playerCardDiv = playerSection.querySelector('div.card'),
        pcCardDiv = pcSection.querySelector('div.card'),
        playerPoints = playerSection.querySelector('[data-points]'),
        pcPoints = pcSection.querySelector('[data-points]');
    
    Card.prototype.suitNameArray.forEach(function(v){
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
        // tie
        // play another card
        rewards.push(playerCard);
        rewards.push(pcCard);
        return drawAndPlay(rewards);
    } else if( playerCard.value > pcCard.value ){
        // Player wins
        console.log('Player wins round', playerCard, pcCard);
        // Add point to player score TODO
        playerPoints.setAttribute('data-points', parseInt(playerPoints.getAttribute('data-points'))+1)
        
        // Reward Cards
        playerDeck.splice(playerDeck.length, 0, playerCard, pcCard);
        if( rewards.length > 0 ){
        playerDeck = playerDeck.concat(rewards);
        }
        
    } else {
    // CPU Wins
    console.log('Computer wins round', playerCard, pcCard);
    // Add point to CPU score TODO
    pcPoints.setAttribute('data-points', parseInt(pcPoints.getAttribute('data-points'))+1)
    
    // Reward Cards
    pcDeck.splice(pcDeck.length, 0, pcCard, playerCard);
    if( rewards.length > 0 ){
        pcDeck = pcDeck.concat(rewards);
        }
        
    }
    
    console.log('Player Cards left = '+playerDeck.length, 'Computer Cards left = '+pcDeck.length);
    return true;
};

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
}

