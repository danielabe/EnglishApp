function showSpinner() {
    const imgSpinner = document.getElementById('spinner')
    imgSpinner.style.display = 'block'
}

function hideSpinner() {
    const imgSpinner = document.getElementById('spinner')
    imgSpinner.style.display = 'none'
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