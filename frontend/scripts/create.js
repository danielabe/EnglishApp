window.addEventListener('load', () => {
    const createBtn = document.querySelector('[type="submit"]')
    const word = document.getElementById('word')
    const phonetic = document.getElementById('phonetic')
    const definition = document.getElementById('definition')
    const example = document.getElementById('example')
    const audio = document.getElementById('audio')

    createBtn.addEventListener('click', async (e) => {
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
        const createdCard = await fetchAddWord('http://localhost:3000/api/1.0/cards', card, `Bearer ${token}`)
        console.log(createdCard)
        if (createdCard.word) {
            Swal.fire({
                icon: 'success',
                title: 'Your phrase has been saved'
            })
        } else if (createdCard.Error === 'That phrase already exists'){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'That phrase already exists!'
              })
        }
    })
})