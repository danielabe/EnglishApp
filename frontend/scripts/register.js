window.addEventListener('load', () => {
    const signUpBtn = document.querySelector('input[type="submit"]')
    const firstName = document.getElementById('firstName')
    const lastName = document.getElementById('lastName')
    const email = document.getElementById('email')
    const pass = document.getElementById('pass')

    signUpBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const user = {
            firstname: firstName.value,
            lastname: lastName.value,
            email: email.value,
            password: pass.value
        }
        
        fetchRegister('http://localhost:3000/api/1.0/users/register', user)
    })

    async function fetchRegister(url, payload) {
        const settings = {
            method: 'POST',
            headers: {
                /* authorization: token, */
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }
        /* document.getElementById('spinner').scrollTop = document.getElementById('spinner').scrollHeight; */
        showSpinner()
        window.scrollTo(0,document.body.scrollHeight)
        try {
            const response = await fetch(url, settings)
            const user = await response.json()
            hideSpinner()
            console.log(user)
            if(response.status === 201) {
                location.href = 'welcome.html'
                localStorage.setItem('jwt', JSON.stringify(user.token))
                localStorage.setItem('id', JSON.stringify(user.id))
            }
        } catch (e) {
            console.log(e)
        }
    }
})