window.addEventListener('load', async () => {
    const wordsList = document.getElementById('wordsList')
    const practiceBtn = document.querySelector('.practice-btn')
    const header = document.querySelector('header')
    const tableSection = document.getElementById('table')
    const cardsSection = document.getElementById('cards')
    const cardsContainer = document.getElementById('cardsContainer')
    const closeCards = document.getElementById('closeCards')
    let orderedWords = false
    
    const cards = await fetchGetPhrases('http://localhost:3000/api/1.0/cards')

    
    practiceBtn.addEventListener('click', () => {
        tableSection.classList.add('none')
        header.classList.add('none')
        cardsSection.classList = 'cards'
        
        let i = 0
        renderCard(cards[i], i)

        const card = document.querySelector('.card');
        const audio = document.querySelector('.card a')
        const coverFront = document.querySelector('.cover-front')
        const coverBack = document.querySelector('.cover-back')
        const next = document.querySelector('.fa-arrow-right')
        coverFront.addEventListener('click', function () {
            card.classList.toggle('is-flipped');
            audio.classList.add('disabled')
        });
        coverBack.addEventListener('click', function () {
            card.classList.toggle('is-flipped');
            audio.classList.remove('disabled')
        });

        next.addEventListener('click', () => {
            i++
            renderCard(cards[i], i)
        })
        /* cardsSection.addEventListener('click', () => {
            i++
            renderCard(cards[i], i)
        }) */
        closeCards.addEventListener('click', () => closeCardsFunction())
    })

    function closeCardsFunction(){
        tableSection.classList.remove('none')
        header.classList.remove('none')
        cardsSection.classList = 'none'
    }

    function renderCard(card, i){
        cardsContainer.innerHTML = ''
        cardsContainer.innerHTML +=   `
                                    <div class="scene">
                                        <div class="card">
                                            <div class="card__face card__face--front">
                                                <div class="cover-front"></div>
                                                <div class="card-front-container">
                                                    <h4>${card.word}<h4/>
                                                    <div class="audio-container">
                                                        <audio id="playerCard-${i}" src="${card.audio}"></audio>
                                                        <div>
                                                            <a onclick="document.getElementById('playerCard-${i}').play()"><i class="far fa-play-circle"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="card__face card__face--back">
                                                <div class="cover-back"></div>
                                                <div class="card-back-container">
                                                    <p class="c-definition">${card.definition}</p>
                                                    <p class="c-example">${card.example}</p>
                                                    <div class="btns-container">
                                                        <div>
                                                            <i class="far fa-smile"></i>
                                                            <i class="far fa-meh"></i>
                                                            <i class="far fa-frown"></i>
                                                        </div>
                                                        <i class="fas fa-arrow-right"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`
    }

    async function fetchGetPhrases(url) {
        const settings = {
            method: 'GET',
            headers: {
                /* authorization: token, */
            },
        }
        try {
            const response = await fetch(url, settings)
            const cards = await response.json()
            renderTable(cards)
            return cards
        } catch (e) {
            console.log(e)
        }
    }

    function renderTable(table){
        wordsList.innerHTML = ''
        wordsList.innerHTML += `<li>
                                                                <ul class="row table-header">
                                                                    <li class="t-element t-word t-header">Word/Phrase <i class="fas fa-sort"></i></li>
                                                                    <li class="t-element t-def t-header">Definition</li>
                                                                    <li class="t-element t-example t-header">Example</li>
                                                                    <li class="t-element t-audio"></li>
                                                                    <li class="t-element t-level t-header">Level <i class="fas fa-sort"></i></li>
                                                                    <li class="t-element t-edit t-header">Options</li>
                                                                </ul>
                                                            </li>`
        table.forEach((row,i) => {
          wordsList.innerHTML += `<li>
                                                                <ul class="row">
                                                                    <li class="t-element t-word">${row.word}
                                                                        <audio id="player-${i}" src="${row.audio}"></audio>
                                                                        <div>
                                                                            <a onclick="document.getElementById('player-${i}').play()"><i class="far fa-play-circle"></i></a>
                                                                        </div>
                                                                    </li>
                                                                    <li class="t-element t-def">${row.definition}</li>
                                                                    <li class="t-element t-example">${row.example}</li>
                                                                    <li class="t-element t-audio">${row.audio}</li>
                                                                    <li class="t-element t-level">
                                                                        <form name="formulario" method="post" action="/send.php">
                                                                        <meter min="0" max="100"
                                                                            low="25" high="75"
                                                                            optimum="100" value=${"50"}>
                                                                        </form>
                                                                    </li>
                                                                    <li class="t-element t-edit"><i class="far fa-edit"></i><i class="far fa-trash-alt"></i></li>
                                                                </ul>
                                                            </li>`
        })
        const sortBtn = document.querySelector('.t-word .fa-sort')
        sortBtn.addEventListener('click', () => orderWords(table))

    }

    function orderWords(words){
        console.log(orderedWords)
        let sortedPhrases
        if(!orderedWords){
            sortedPhrases = orderWordsAZ(words)
            orderedWords = true
        } else {
            sortedPhrases = orderWordsZA(words)
            orderedWords = false
        }
        
        console.log(sortedPhrases)
        renderTable(sortedPhrases)
    }

    function orderWordsAZ(words){
        words.sort((a, b) => {
            if (a.word.toUpperCase() > b.word.toUpperCase()) { 
                return 1
            }
            if (a.word.toUpperCase() < b.word.toUpperCase()) {
              return -1
            }
            return 0
        })
        return words
    }

    function orderWordsZA(words){
        words.sort((a, b) => {
            if (a.word.toUpperCase() < b.word.toUpperCase()) { 
                return 1
            }
            if (a.word.toUpperCase() > b.word.toUpperCase()) {
              return -1
            }
            return 0
        })
        return words
    }
})