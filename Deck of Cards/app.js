const baseURL = "https://deckofcardsapi.com/api/deck/";

let deckID;

//request a card from a shuffled deck

//shuffle the deck
let deckPromise = axios.get(`${baseURL}new/shuffle/?deck_count=1`);

deckPromise.then(res => {
    console.log(res.data);
    deckID = res.data.deck_id;
    console.log(deckID);
    return axios.get(`${baseURL}${deckID}/draw/?count=1`)
}).then(res => {
    console.log(res.data.cards[0].value);
    console.log(res.data.cards[0].suit);
    return axios.get(`${baseURL}${deckID}/draw/?count=1`)
}).then(res => {
    // console.log(res.data)
    console.log(res.data.cards[0].value);
    console.log(res.data.cards[0].suit);
}).catch(err => console.log("REJECTED!", err));

//when the dom is loaded, show a button that will let you draw a card
//on button click, display a new card until the deck is all drawn
const $btn = $('button');
const $cardSection = $('section');

$(document).ready(function() {
    axios.get(`${baseURL}new/shuffle/?deck_count=1`).then(data => {
        deckID= data.data.deck_id;
        $btn.show();
        console.log(deckID)
    })
});

$btn.on('click', function() {
    
    axios.get(`${baseURL}${deckID}/draw/?count=1`).then(data => {
        console.log(data)
        let $cardImg = data.data.cards[0].image;
        $cardSection.append($('<img>', {
            src: $cardImg,
        }));
        if (data.data.remaining === 0) {
            $btn.hide();
        }
    });
});