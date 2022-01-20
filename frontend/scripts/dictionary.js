window.addEventListener('load', () => {
    const input = document.getElementById('search')
    const sendBtn = document.querySelector('.search-btn')
    const list = document.getElementById('words')

    const urlBase = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

    sendBtn.addEventListener('click', (e) => {
        console.log('anda')
        e.preventDefault()
        getWord(urlBase, input.value)
    })

    input.addEventListener('keyup', (e) => {
        e.preventDefault()
        if(e.key === 'Enter') {
            getWord(urlBase, input.value)
        }
    })

    async function getWord(url, word) {
        list.innerHTML = ''
        showSpinner()
        try{
            const response = await fetch(`${url}${word}`)
            const data = await response.json()
            hideSpinner()
            renderDefinitions(data)
        } catch (e) {
            console.log(e)
        }
    }

    function renderDefinitions(info) {
        console.log(info)
        list.innerHTML = ''
        if (typeof info.length != 'number') {
            document.getElementById('words').style = "display: none"
            document.querySelector('main').innerHTML += `<div class="not-found">
                                                            <h3>${info.title}</h3>
                                                            <p>${info.message}</p>
                                                        </div>`
        } else info.forEach(element => {
            document.getElementById('words').style = "display: flex" //pasar a css

            const elementContainer = document.createElement('li')
            const word = document.createElement('h3')
            const wordP = document.createElement('p')
            const phonetic = document.createElement('span')
            const addBtn = document.createElement('button')
            const audioTag = document.createElement('audio')
            const source = document.createElement('source')
            const meaning = document.createElement('ul')

            elementContainer.classList = 'element'
            word.classList = 'word'

            wordP.innerText = element.word
            phonetic.innerText = element.phonetic
            addBtn.innerText = 'Add'
            source.innerText = 'Your browser does not support HTML5 audio.'

            audioTag.setAttribute('controls', '')
            source.src = element.phonetics[0].audio ? element.phonetics[0].audio : ' '
            source.type = 'audio/mp3'

            word.appendChild(wordP)
            word.appendChild(phonetic)
            word.appendChild(addBtn)
            audioTag.appendChild(source)
            elementContainer.appendChild(word)
            elementContainer.appendChild(audioTag)
            elementContainer.appendChild(meaning)
            list.appendChild(elementContainer)

            if (!element.phonetic) phonetic.classList.add('none')
            if (!element.phonetics[0].audio) audioTag.classList.add('none')

            element.meanings.forEach(mean => {
                const meanContainer = document.createElement('li')
                const typeOfWord = document.createElement('p')
                const definitionList = document.createElement('ul')

                typeOfWord.classList = 'part-of-speech'
                definitionList.classList = 'definition-list'

                typeOfWord.innerText = mean.partOfSpeech

                meanContainer.appendChild(typeOfWord)
                meanContainer.appendChild(definitionList)
                meaning.appendChild(meanContainer)

                if (!mean.partOfSpeech) typeOfWord.classList.add('none')

                mean.definitions.forEach(def => {
                    const definitionContainer = document.createElement('li')
                    const definition = document.createElement('p')
                    const example = document.createElement('p')
                    const synonyms = document.createElement('p')
                    const synonymsTitle = document.createElement('span')
                    const synonymsList = document.createElement('span')
                    const antonyms = document.createElement('p')
                    const antonymsTitle = document.createElement('span')
                    const antonymsList = document.createElement('span')

                    definition.classList = 'definition'
                    example.classList = 'example'
                    synonyms.classList = 'synonyms'
                    synonymsTitle.classList = 'synonyms-title'
                    antonyms.classList = 'synonyms'
                    antonymsTitle.classList = 'synonyms-title'

                    definition.innerText = def.definition
                    example.innerText = def.example
                    synonymsTitle.innerText = 'Synonyms'
                    synonymsList.innerText = def.synonyms.length != 0 ? ': ' + def.synonyms.join(', ') : ': -'
                    antonymsTitle.innerText = 'Antonyms'
                    antonymsList.innerText = def.antonyms.length != 0 ? ': ' + def.antonyms.join(', ') : ': -'

                    synonyms.appendChild(synonymsTitle)
                    synonyms.appendChild(synonymsList)
                    antonyms.appendChild(antonymsTitle)
                    antonyms.appendChild(antonymsList)
                    definitionContainer.appendChild(definition)
                    definitionContainer.appendChild(example)
                    definitionContainer.appendChild(synonyms)
                    definitionContainer.appendChild(antonyms)
                    definitionList.appendChild(definitionContainer)

                    if (!def.example) example.classList.add('none')
                })

            })
            addBtn.addEventListener('click', () => {
                let audioUrl =  element.phonetics[0].audio
                if(element.phonetics[0].audio == 'undefined') audioUrl = ''
    
                const card = {
                    word: wordP.innerText,
                    definition: element.meanings[0].definitions[0].definition,
                    example: element.meanings[0].definitions[0].example,
                    audio: audioUrl,
                }
                const token = JSON.parse(localStorage.getItem('jwt'))
                console.log(card)
                fetchAddWord('http://localhost:3000/api/1.0/cards', card, `Bearer ${token}`)
            })
        })
    }

    async function fetchAddWord(url, payload, token) {
        const settings = {
            method: 'POST',
            headers: {
                authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }
        try {
            const response = await fetch(url, settings)
            const card = await response.json()
            console.log(card)
        } catch (e) {
            console.log(e)
        }
    }

    document.querySelector('.clear-search').addEventListener('click', () => input.value = '')
})

function showSpinner() {
    const imgSpinner = document.getElementById('spinner')
    imgSpinner.style.display = 'block'
}

function hideSpinner() {
    const imgSpinner = document.getElementById('spinner')
    imgSpinner.style.display = 'none'
}