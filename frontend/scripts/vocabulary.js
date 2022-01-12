window.addEventListener('load', async () => {
    const wordsList = document.getElementById('wordsList')
    const practiceBtn = document.querySelector('.practice-btn')
    const header = document.querySelector('header')
    const tableSection = document.getElementById('table')
    const cardsSection = document.getElementById('cards')
    const cardsContainer = document.getElementById('cardsContainer')
    const closeCards = document.getElementById('closeCards')

    let orderedWords = false

    const id = JSON.parse(localStorage.getItem('id'))
    const token = JSON.parse(localStorage.getItem('jwt'))

    let cards = await fetchGetPhrases(`http://localhost:3000/api/1.0/users/${id}/cards`, `Bearer ${token}`)


    practiceBtn.addEventListener('click', () => {
        tableSection.classList.add('none')
        header.classList.add('none')
        cardsSection.classList = 'cards'

        let i = 0

        renderCard(cards[i], i)

        let card = document.querySelector('.card');
        let audio = document.querySelector('.card a')
        let coverFront = document.querySelector('.cover-front')
        let coverBack = document.querySelector('.cover-back')
        let next = document.querySelector('.fa-arrow-right')

        coverFront.addEventListener('click', function () {
            card.classList.toggle('is-flipped');
            audio.classList.add('disabled')
        });
        coverBack.addEventListener('click', function () {
            card.classList.toggle('is-flipped');
            audio.classList.remove('disabled')
        });

        goToNextCard(next, i)
        closeCards.addEventListener('click', () => closeCardsFunction())
    })

    function checkNextCard(i) {
        if (cards[i]) {
            renderCard(cards[i], i)

            let card = document.querySelector('.card');
            let audio = document.querySelector('.card a')
            let coverFront = document.querySelector('.cover-front')
            let coverBack = document.querySelector('.cover-back')
            let next = document.querySelector('.fa-arrow-right')

            coverFront.addEventListener('click', function () {
                card.classList.toggle('is-flipped');
                audio.classList.add('disabled')
            });
            coverBack.addEventListener('click', function () {
                card.classList.toggle('is-flipped');
                audio.classList.remove('disabled')
            });

            goToNextCard(next, i)
        } else {
            closeCardsFunction()
        }
    }

    function goToNextCard(next, i) {
        next.addEventListener('click', () => {
            i++
            checkNextCard(i)
        })
    }

    function closeCardsFunction() {
        tableSection.classList.remove('none')
        header.classList.remove('none')
        cardsSection.classList = 'none'
    }

    function renderCard(card, i) {
        cardsContainer.innerHTML = ''
        cardsContainer.innerHTML += `
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

    async function fetchGetPhrases(url, token) {
        const settings = {
            method: 'GET',
            headers: {
                authorization: token,
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

    function renderTable(table) {
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
        table.forEach((row, i) => {
            const liRow = document.createElement('li')
            const ulRow = document.createElement('ul')
            const word = document.createElement('li')
            const definition = document.createElement('li')
            const example = document.createElement('li')
            const level = document.createElement('li')
            const edit = document.createElement('li')
            const audio = document.createElement('audio')
            const linkAudioContainer = document.createElement('div')
            const linkAudio = document.createElement('a')
            const audioIcon = document.createElement('i')
            const form = document.createElement('form')
            const meter = document.createElement('meter')
            const editIcon = document.createElement('i')
            const deleteIcon = document.createElement('i')

            ulRow.classList = 'row'
            word.classList = 't-element t-word'
            definition.classList = 't-element t-def'
            example.classList = 't-element t-example'
            level.classList = 't-element t-level'
            edit.classList = 't-element t-edit'
            audioIcon.classList = 'far fa-play-circle'
            editIcon.classList = 'far fa-edit'
            deleteIcon.classList = 'far fa-trash-alt'

            audio.id = `player-${i}`
            audio.src = row.audio

            form.name = 'formulario' //cambiar a ingles, chequear si esta en otro lado
            form.method = 'post'
            form.action = '/send.php'
            meter.min = '0'
            meter.max = '100'
            meter.low = '25'
            meter.high = '75'
            meter.optimum = '100'
            meter.value = '50'

            word.innerText = row.word
            definition.innerText = row.definition
            example.innerText = row.example

            edit.appendChild(editIcon)
            edit.appendChild(deleteIcon)
            form.appendChild(meter)
            level.appendChild(form)
            linkAudio.appendChild(audioIcon)
            linkAudioContainer.appendChild(linkAudio)
            word.appendChild(audio)
            word.appendChild(linkAudioContainer)
            ulRow.appendChild(word)
            ulRow.appendChild(definition)
            ulRow.appendChild(example)
            ulRow.appendChild(level)
            ulRow.appendChild(edit)
            liRow.appendChild(ulRow)
            wordsList.appendChild(liRow)

            linkAudio.addEventListener('click', () => audio.play())
            editIcon.addEventListener('click', () => edition(row))
            deleteIcon.addEventListener('click', () => fetchDeleteCard(`http://localhost:3000/api/1.0/cards/${row.id}`, `Bearer ${token}`))
        })
        const sortBtn = document.querySelector('.t-word .fa-sort')
        sortBtn.addEventListener('click', () => orderWords(table))

    }

    async function edition(row) {
        await Swal.fire({
            title: 'Edit phrase',
            html:
                `<h3>${row.word}</h3>` +
                '<label for="swal-input1">Definition</label>' +
                `<input id="swal-input1" class="swal2-input" value="${row.definition}">` +
                '<label for="swal-input1">Example</label>' +
                `<input id="swal-input2" class="swal2-input" value="${row.example}">`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        }).then(result => {
            console.log(result.value)
            if (result.isConfirmed) {
                const payload = { definition: result.value[0], example: result.value[1] }
                fetchUpdateCard(`http://localhost:3000/api/1.0/cards/${row.id}`, `Bearer ${token}`, payload)
            }
        })
    }

    function fetchUpdateCard(url, token, payload) {
        console.log()
        const settings = {
            method: 'PUT',
            headers: {
                authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }
        fetch(url, settings)
            .then(async response => {
                cards = await fetchGetPhrases(`http://localhost:3000/api/1.0/users/${id}/cards`, token)
                return response.json()
            })
            .catch(e => console.log(e))
    }

    function fetchDeleteCard(url, token) {
        const settings = {
            method: 'DELETE',
            headers: {
                authorization: token,
            },
        }

        Swal.fire({
            title: 'Do you want to delete this phrase permanently?',
            text: "This action cannot be reversed.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(url, settings)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                    })
                    .catch(error => console.log(error))

                Swal.fire(
                    'Phrase deleted!',
                    'The phrase has been permanently removed.',
                    'success'
                ).then(async result => {
                    if (result.isConfirmed) {
                        cards = await fetchGetPhrases(`http://localhost:3000/api/1.0/users/${id}/cards`, token)
                    }
                })
            }
        })
    }

    function orderWords(words) {
        console.log(orderedWords)
        let sortedPhrases
        if (!orderedWords) {
            sortedPhrases = orderWordsAZ(words)
            orderedWords = true
        } else {
            sortedPhrases = orderWordsZA(words)
            orderedWords = false
        }

        console.log(sortedPhrases)
        renderTable(sortedPhrases)
    }

    function orderWordsAZ(words) {
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

    function orderWordsZA(words) {
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