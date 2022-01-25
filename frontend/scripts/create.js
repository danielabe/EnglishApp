window.addEventListener('load', () => {
    const createBtn = document.querySelector('[type="submit"]')
    const word = document.getElementById('word')
    const phonetic = document.getElementById('phonetic')
    const definition = document.getElementById('definition')
    const example = document.getElementById('example')
    const audio = document.getElementById('audio')
    
    createBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const card = {
            word: word.value,
            phonetic: phonetic.value,
            definition: definition.value,
            example: example.value,
            audio: audio.value,
        }
        console.log(card)
        const token = JSON.parse(localStorage.getItem('jwt'))
        fetchAddWord('http://localhost:3000/api/1.0/cards', card, `Bearer ${token}`)
    })

        

})

/* async function fetchAddWord(url, payload, token) { //está repetido en dictionary
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
} */