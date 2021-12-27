window.addEventListener('load', () => {
    const input = document.getElementById('search')
    const sendBtn = document.querySelector('.search-btn')
    const list = document.getElementById('words')
    
    const urlBase = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
    
    sendBtn.addEventListener('click', (e) => {
        e.preventDefault()
        getWord(urlBase, input.value)
    })
    
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
        
        if(typeof info.length != 'number'){
            document.getElementById('words').style = "display: none"
            document.querySelector('main').innerHTML += `<div class="not-found">
                                                            <h3>${info.title}</h3>
                                                            <p>${info.message}</p>
                                                        </div>`
        } else info.forEach((element,i) => {
            document.getElementById('words').style = "display: flex"
                list.innerHTML +=   `<li class="element element-${i}">
                                        <h3 class="word w-${i}"><p>${element.word} </p><span>/${element.phonetic}/</span><button>Add</button></h3> 
                                        <audio controls>
                                            <source src=${element.phonetics[0].audio} type="audio/mp3">
                                                Tu navegador no soporta audio HTML5.
                                        </audio>
                                        <ul class="meaning-${i}"></ul>
                                    </li>`
                                    
                if(!element.phonetic){
                    document.querySelector(`.element-${i} h3 span`).classList.add('none')
                }
                if(!element.phonetics[0].audio){
                    document.querySelector(`.element-${i} audio`).classList.add('none')
                }
    
                document.querySelectorAll('.element button').forEach(algo => {
                    algo.addEventListener('click', (e) => {
                        const wordToStore = document.querySelector(`.${e.path[1].classList[1]} p`).innerText
                        let storedWords = []
                        if(localStorage.getItem('words') !== null){
                            storedWords = JSON.parse(localStorage.getItem('words'))
                        }
                        storedWords.push(wordToStore)
                        localStorage.setItem('words', JSON.stringify(storedWords))
                    })
                    
                })

                element.meanings.forEach((meaning,j) => {
                    document.querySelector(`.meaning-${i}`).innerHTML +=    `<li>
                                                                                <p class="pos-${i}${j} part-of-speech">${meaning.partOfSpeech}</p>
                                                                                <ul class="definition-list definition-${i}${j}"></ul>
                                                                            </li>`
                    /* console.log(meaning.partOfSpeech)
                    console.log(document.querySelector(`.pos-${i}${j}`)) */
                    if(!meaning.partOfSpeech){
                        document.querySelector(`.pos-${i}${j}`).classList.add('none')
                    }
    
                    meaning.definitions.forEach((def,k) => {
                        document.querySelector(`.definition-${i}${j}`).innerHTML +=     `<li>
                                                                                            <p class="definition">${def.definition}</p>
                                                                                            <p class="example example-${i}${j}${k}">${def.example}</p>
                                                                                            <p class="synonyms"><span>Synonyms</span>: ${def.synonyms.length != 0 ? def.synonyms.join(', ') : '-'}</p>
                                                                                            <p class="synonyms"><span>Antonyms</span>: ${def.antonyms.length != 0 ? def.antonyms.join(', ') : '-'}</p>
                                                                                        </li>`
                    
                        if(!def.example){
                            document.querySelector(`.definition-${i}${j} .example-${i}${j}${k}`).classList.add('none')
                        }
                    })
                })
                
            })
    }

    
    
})