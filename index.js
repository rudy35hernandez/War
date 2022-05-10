let deckId
const cardsContainer = document.getElementById("cards")
document.getElementById("draw-cards").addEventListener("click", drawCards)
document.getElementById("new-deck").addEventListener("click", handleClick)

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckId = data.deck_id
        })
}

function drawCards(){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.cards)
            for(let i = 0; i < cardsContainer.children.length; i++){
                cardsContainer.children[i].innerHTML = `<img src=${data.cards[i].image} class="card">`
            }
            
        })
}
