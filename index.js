let deckId
const cardsContainer = document.getElementById("cards")
document.getElementById("draw-cards").addEventListener("click", drawCards)
document.getElementById("new-deck").addEventListener("click", handleClick)
const result = document.getElementById("result")
const cardsRemaining = document.getElementById("cards-remaining")
const wholeDeck = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            
            cardsRemaining.innerHTML = `Cards remaining: ${data.remaining}`
        })
}

function drawCards(){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.cards)
            cardsRemaining.innerHTML = `Cards remaining: ${data.remaining}`
            for(let i = 0; i < cardsContainer.children.length; i++){
                cardsContainer.children[i].innerHTML = `<img src=${data.cards[i].image} class="card">`
            }
            const winner = declareWinner(data.cards[0], data.cards[1])
            result.innerHTML = winner
        })
}

function declareWinner(cardOne, cardTwo){
    let totalOne = wholeDeck.indexOf(cardOne.value)
    let totalTwo = wholeDeck.indexOf(cardTwo.value)
    
    if(totalOne > totalTwo){
        return "Player One Wins"
    } else if(totalTwo > totalOne){
        return "Player Two Wins"
    } else {
       return "Draw"
    }
}