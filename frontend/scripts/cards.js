const practiceBtn = document.querySelector('.practice-btn')
const header = document.querySelector('header')
const tableSection = document.getElementById('table')
const cardsSection = document.getElementById('cards')
const cardsContainer = document.getElementById('cardsContainer')
const closeCards = document.getElementById('closeCards')
const footer = document.querySelector('footer')

let isQualified

practiceBtn.addEventListener('click', async () => {
    let cards = await fetchGetPhrases(`http://localhost:3000/api/1.0/users/${id}/cards`, `Bearer ${token}`)

    tableSection.classList.add('none')
    header.classList.add('none')
    footer.classList.add('none')
    cardsSection.classList = 'cards'

    let i = 0

    renderCard(cards[i], i)

    let card = document.querySelector('.card')
    let audio = document.querySelector('.card a')
    let coverFront = document.querySelector('.cover-front')
    let coverBack = document.querySelector('.cover-back')
    let next = document.querySelector('.fa-arrow-right')

    coverFront.addEventListener('click', function () {
        card.classList.toggle('is-flipped')
        audio.classList.add('disabled')
    })
    coverBack.addEventListener('click', function () {
        card.classList.toggle('is-flipped')
        audio.classList.remove('disabled')
    })

    goToNextCard(next, i, cards)
    closeCards.addEventListener('click', () => closeCardsFunction())
})


function renderCard(info, i) {
    isQualified = false
    cardsContainer.innerHTML = ''

    const scene = document.createElement('div')
    const card = document.createElement('div')
    const faceFront = document.createElement('div')
    const coverFront = document.createElement('div')
    const frontContainer = document.createElement('div')
    const word = document.createElement('h4')
    const audioContainer = document.createElement('div')
    const audio = document.createElement('audio')
    const audioLinkContainer = document.createElement('div')
    const audioLink = document.createElement('a')
    const audioIcon = document.createElement('i')
    const faceBack = document.createElement('div')
    const coverBack = document.createElement('div')
    const backContainer = document.createElement('div')
    const definition = document.createElement('p')
    const example = document.createElement('p')
    const btnsContainer = document.createElement('div')
    const emoticonsContainer = document.createElement('div')
    const high = document.createElement('i')
    const medium = document.createElement('i')
    const low = document.createElement('i')
    const arrow = document.createElement('i')

    scene.classList = 'scene'
    card.classList = 'card'
    faceFront.classList = 'card__face card__face--front'
    faceBack.classList = 'card__face card__face--back'
    coverFront.classList = 'cover-front'
    frontContainer.classList = 'card-front-container'
    audioContainer.classList = 'audio-container'
    audioIcon.classList = 'far fa-play-circle'
    coverBack.classList = 'cover-back'
    backContainer.classList = 'card-back-container'
    definition.classList = 'c-definition'
    example.classList = 'c-example'
    btnsContainer.classList = 'btns-container'
    arrow.classList = 'fas fa-arrow-right'
    low.classList = 'far fa-frown'
    medium.classList = 'far fa-meh'
    high.classList = 'far fa-smile'

    word.innerText = info.word
    audio.src = info.audio
    definition.innerText = info.definition
    example.innerText = info.example

    if(info.audio) audioLink.appendChild(audioIcon)
    audioLinkContainer.appendChild(audioLink)
    audioContainer.appendChild(audio)
    audioContainer.appendChild(audioLinkContainer)
    frontContainer.appendChild(word)
    frontContainer.appendChild(audioContainer)
    faceFront.appendChild(coverFront)
    faceFront.appendChild(frontContainer)

    emoticonsContainer.appendChild(low)
    emoticonsContainer.appendChild(medium)
    emoticonsContainer.appendChild(high)
    btnsContainer.appendChild(emoticonsContainer)
    btnsContainer.appendChild(arrow)
    backContainer.appendChild(definition)
    backContainer.appendChild(example)
    backContainer.appendChild(btnsContainer)
    faceBack.appendChild(coverBack)
    faceBack.appendChild(backContainer)
    card.appendChild(faceFront)
    card.appendChild(faceBack)
    scene.appendChild(card)
    cardsContainer.appendChild(scene)

    audioLink.addEventListener('click', () => audio.play())

    let qualification
    high.addEventListener('click', () => {
        high.style.color = '#37D2E6'
        medium.style.color = 'black'
        low.style.color = 'black'
        qualification = 100
        isQualified = true
        qualifyPhrase(qualification, info)
    })
    medium.addEventListener('click', () => {
        medium.style.color = '#E6D875'
        high.style.color = 'black'
        low.style.color = 'black'
        qualification = 50
        isQualified = true
        qualifyPhrase(qualification, info)
    })
    low.addEventListener('click', () => {
        low.style.color = '#F0A061'
        medium.style.color = 'black'
        high.style.color = 'black'
        qualification = 20
        isQualified = true
        qualifyPhrase(qualification, info)
    })
}

function goToNextCard(next, i, cards) {
    next.addEventListener('click', () => {
        if(isQualified){
            i++
            checkNextCard(i, cards)
        }
    })
}

function checkNextCard(i, cards) {
    console.log(cards[i])
        if (cards[i]) {
            renderCard(cards[i], i)
    
            let card = document.querySelector('.card')
            let audio = document.querySelector('.card a')
            let coverFront = document.querySelector('.cover-front')
            let coverBack = document.querySelector('.cover-back')
            let next = document.querySelector('.fa-arrow-right')
    
            coverFront.addEventListener('click', function () {
                card.classList.toggle('is-flipped')
                audio.classList.add('disabled')
            })
            coverBack.addEventListener('click', function () {
                card.classList.toggle('is-flipped')
                audio.classList.remove('disabled')
            })
    
            goToNextCard(next, i, cards)
        } else {
            closeCardsFunction()
        }
}

function qualifyPhrase(qualification, card) {
    const payload = { qualification }
    fetchUpdateCard(`http://localhost:3000/api/1.0/cards/${card.id}`, `Bearer ${token}`, payload)
}

function closeCardsFunction() {
    tableSection.classList.remove('none')
    header.classList.remove('none')
    footer.classList.remove('none')
    cardsSection.classList = 'none'
}