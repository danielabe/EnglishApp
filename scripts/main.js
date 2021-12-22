const input = document.getElementById('search')
const sendBtn = document.querySelector('input[type="submit"]')
const list = document.querySelector('ul')

const urlBase = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

sendBtn.addEventListener('click', () => getWord(urlBase, input.value))

function getWord(url, word){
    list.innerHTML = ''
    fetch(`${url}${word}`)
        .then(response => response.json())
        .then(data => {
            render(data)})
        .catch(error => console.log(error))
}

function render(info){
    console.log(info)
    info.forEach((element,i) => {
        list.innerHTML +=   `<li>
                                ${element.word} ${element.phonetic} 
                                <audio controls>
                                    <source src=${element.phonetics[0].audio} type="audio/mp3">
                                        Tu navegador no soporta audio HTML5.
                                </audio>
                                <ul class="meaning-${i}"></ul>
                            </li>`

        element.meanings.forEach((meaning,j) => {
            document.querySelector(`.meaning-${i}`).innerHTML +=    `<li>
                                                                        ${meaning.partOfSpeech}
                                                                        <ul class="definition-${i}${j}"></ul>
                                                                    </li>`

            meaning.definitions.forEach(def => document.querySelector(`.definition-${i}${j}`).innerHTML +=   `<li>
                                                                                                                    <p>${def.definition}</p>
                                                                                                                    <p>Example: ${def.example}</p>
                                                                                                                    <p>Synonyms: ${def.synonyms.join(', ')}</p>
                                                                                                                    <p>Antonyms: ${def.antonyms}</p>
                                                                                                                </li>`)
            })
        
    })
}