const cards = document.querySelectorAll(".card"),
    flipsTag = document.querySelector(".flips b"),
    timeTag = document.querySelector(".time b"),
    gameoverImg = document.getElementById('gameover-img'),
    refreshButton = document.getElementById('refresh-button');

let maxTime = 0;
let timeLeft = maxTime;
let flips = 0;
let matchedCard = 0;
let cardOne, cardTwo;
let disableDeck = false;
let isPlaying = false;

function initTimer() {
    if (matchedCard === 15) {// stop the timer if all cards are matched
        return;
    }
    timeLeft++;
    timeTag.innerText = timeLeft;
}

function flipCard({ target: clickedCard }) {
    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);//timer function called, incs in 1 sugundo increments
    }
    if (clickedCard !== cardOne && !disableDeck) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector("img").src,
            cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;//increment matched by 1
        if (matchedCard == 15) {
            gameoverImg.style.display = 'block';//displays game over when all cards are matched
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    //if cards dont match shake class added after 400milisegundos
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);
    //removes both shake and flip from both unmatched cards after 1.2secs
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);

}

function shuffleCard() {
    flips = matchedCard = 0;
    cardOne = cardTwo = "";//reset to default
    flipsTag.innerText = flips;
    disableDeck = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];//holy cannoli
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);//sorts randomly

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        setTimeout(() => {
            imgTag.src = `images/img-${arr[index]}.png`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();

refreshButton.addEventListener('click', function () {//restart button to reset page
    location.reload();
});

cards.forEach(card => {//click event to all cards
    card.addEventListener("click", flipCard);
});
