window.addEventListener('load', () => {
    const wordList = document.getElementById('wordList')
    
    JSON.parse(localStorage.getItem('words')).forEach(word => {
        wordList.innerHTML += `<li>${word}</li>`
    })
})