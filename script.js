const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

// Show Loading
function loading() {
  loader.hidden = false
  quoteContainer.hidden = true
}

// Hide Loading
function complete() {
  loader.hidden = true
  quoteContainer.hidden = false
}

//show New Quote 
function newQuote() {
  loading()
  // Pick a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  
  // check if author field is blank and replace it with Unknown
  if(!quote.author) {
   authorText.textContent = 'Unknown'
  } else {
   authorText.textContent = quote.author
 }

 //check Quote length to determine styling
 if(quote.text.length > 120) {
   quoteText.classList.add('long-quote')
  } else {
   quoteText.classList.remove('long-quote')
 }
 // Set quote. Hde loader
 complete()
  quoteText.textContent = quote.text
}

// Get Quotes from API
async function getQuotes() {
  loading()
  const apiUrl = 'https://type.fit/api/quotes'
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {
    // handle error
  }
}

// Tweet Quote 
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

// Event Listeners

newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

// on load
getQuotes()