const baseURL = "http://numbersapi.com";

//getting a fact about my favorite number
let url = "http://numbersapi.com/13/year?json"
let favoriteNumberPromise = axios.get(url);
favoriteNumberPromise.then(res => console.log(res.data))
favoriteNumberPromise.catch(err => console.log("REJECTED!", err))

//get facts about multiple random numbers in a single request
//then put the facts on the page

let randNumEndpoints = [];

for (let i = 0; i <= 5; i++) {
    let random = Math.floor(Math.random() * 100) + 1;
    randNumEndpoints.push(`${baseURL}/${random}?json`);
}

Promise.all(randNumEndpoints.map((endpoint) => axios.get(endpoint))).then(res => {

    res.forEach(fact => {
        console.log(fact.data);
        $('ul').append(`<li>${fact.data.text}</li>`)
    })
});


//get four facts about my favorite number and put them on the page
Promise.all(
    Array.from({ length: 4 }, () => {
        return axios.get(url)
    })
).then(res => {
    res.forEach(fact => {
        $('ol').append(`<li>${fact.data.text}</li>`)
    })
})

