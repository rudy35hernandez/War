let deckId
let computerScore = 0
let userScore = 0
const cardsContainer = document.getElementById("cards")
const drawCards = document.getElementById("draw-cards")
const newDeckBtn = document.getElementById("new-deck")
const result = document.getElementById("result")
const cardsRemaining = document.getElementById("cards-remaining")
const wholeDeck = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
const computerScoreEl = document.getElementById("computer-score")
const userScoreEl = document.getElementById("user-score")

newDeckBtn.addEventListener("click", handleClick)
drawCards.addEventListener("click", draw)

drawCards.disabled = true;

function handleClick() {
    reset()
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
            
            cardsRemaining.innerHTML = `Cards remaining: ${data.remaining}`
            drawCards.removeAttribute("disabled")

        })
}

function draw(){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.cards)
            cardsRemaining.innerHTML = `Cards remaining: ${data.remaining}`
            
            cardsContainer.children[0].innerHTML = `<img src=${data.cards[0].image} class="card">`
            cardsContainer.children[1].innerHTML = `<img src=${data.cards[1].image} class="card">`

            const winner = declareWinner(data.cards[0], data.cards[1])
            result.innerHTML = winner
            if(data.remaining <= 0){
                drawCards.disabled = true
            }

        })
}

function declareWinner(cardOne, cardTwo){
    let totalOne = wholeDeck.indexOf(cardOne.value)
    let totalTwo = wholeDeck.indexOf(cardTwo.value)
    
    if(totalOne > totalTwo){
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Player One Wins"
    } else if(totalTwo > totalOne){
        userScore++
        userScoreEl.textContent = `Your score: ${userScore}`
        return "Player Two Wins"
    } else {
       return "Draw"
    }
}

function reset(){
    computerScoreEl.textContent = `Computer score: 0`
    userScoreEl.textContent = `Your score: 0`
    cardsContainer.children[0].innerHTML = ""
    cardsContainer.children[1].innerHTML = ""
    result.innerHTML = "Game of War"
}
