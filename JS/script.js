const quote = document.getElementById("quote");
quote.innerHTML = "Please Wait, Loading ..."

const input = document.getElementById("input");
const timeDisplay = document.getElementById("time");
const speedDisplay = document.getElementById("speed");
const accuracyDisplay = document.getElementById("accuracy");

let timer;
let startTime;
let currentPosition = 0;
const timeLimit = 20;


// Quotes 
// const quotes = [
//     "The only way to do great work is to love what you do.",
//     "In three words I can sum up everything I've learned about life: it goes on.",
//     "Don't watch the clock; do what it does. Keep going.",
//     "The journey of a thousand miles begins with one step.",
//     "Success is not final, failure is not fatal: It is the courage to continue that counts.",
//     "Life is what happens when you're busy making other plans.",
//     "It does not matter how slowly you go as long as you do not stop.",
//     "The future belongs to those who believe in the beauty of their dreams.",
//     "You miss 100% of the shots you don't take.",
//     "The only limit to our realization of tomorrow will be our doubts of today.",
//     "The best time to plant a tree was 20 years ago. The second best time is now.",
//     "If you want to fly, you have to give up the things that weigh you down.",
// ];

// Quote API
var myHeaders = new Headers();
myHeaders.append("x-api-key", "Q1IRiPj5wYNcFg+s0vbxAw==xlq1N2UTBNeyYhSx");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

const initializeQuote = (currQuote) => {
    //const randomQuote = getRandomQuote();
    quote.innerHTML = currQuote.split('').map(char => `<span>${char}</span>`).join('');
};

fetch("https://api.api-ninjas.com/v1/quotes?category=happiness", requestOptions)
  .then(response => response.json()) // Use response.json() to parse the JSON response
  .then(data => {
    // Extract the quote from the data
    quote.textContent = data[0].quote;
    console.log(quote.textContent);
    initializeQuote(quote.textContent);
  })
  .catch(error => console.log('error', error));


// To select a a random quotes
//const getRandomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];



// Starting the timer
const startTimer = () => {
    if (!timer) {
        timer = setInterval(updateTimer, 1000);
        startTime = Date.now();
    }
};

const updateTimer = () => {
    const elapsedTime = (Date.now() - startTime) / 1000;
    const typedText = input.value;
    const speed = calculateSpeed(typedText, elapsedTime);
    const accuracy = calculateAccuracy(quote.textContent, typedText);

    timeDisplay.textContent = `${elapsedTime.toFixed(1)}s`;
    speedDisplay.textContent = `${speed} WPM`;
    accuracyDisplay.textContent = `${accuracy}%`;
    highlightCurrentCharacter(typedText);
    // By quote
    if (typedText === quote.textContent) {
        clearInterval(timer);
        timer = null;
        input.setAttribute("disabled", "disabled");
    }
    // To stop the timer when typedText.;ength e
    if (typedText.length === quote.textContent.length) {
        clearInterval(timer);
        timer = null;
        input.setAttribute("disabled", "disabled"); // Disable the input
    }
    input.addEventListener("input", updateTimer);
    // By specific time
    // if (elapsedTime >= timeLimit) {
    //     clearInterval(timer);
    //     timer = null;
    //     input.setAttribute("disabled", "disabled");
    // }
};
// Calculate the typing speed
const calculateSpeed = (typedText, elapsedTime) => {
    const words = typedText.trim().split(/\s+/).length;
    return Math.round((words / elapsedTime) * 60);
};
// Calculate the accuracy
const calculateAccuracy = (original, typed) => {
    const minLength = Math.min(original.length, typed.length);
    let correct = 0;
    for (let i = 0; i < minLength; i++) {
        if (original[i] === typed[i]) {
            correct++;
        }
    }
    return ((correct / original.length) * 100).toFixed(2);
};

// highlight the character
const highlightCurrentCharacter = (typedText) => {
    const quoteChars = quote.querySelectorAll('span');

    quoteChars.forEach((char, index) => {
        if (index < typedText.length) {
            if (typedText[index] === char.textContent) {
                char.classList.add('correct');
                char.classList.remove('error');
            } else {
                char.classList.add('error');
                char.classList.remove('correct');
            }
        } else {
            char.classList.remove('correct', 'error');
        }
    });

    currentPosition = typedText.length;
};

input.addEventListener("input", startTimer);

// initializeQuote();
