window.addEventListener('load', () => {
    const email = document.getElementById('email')
    const pass = document.getElementById('pass')
    const loginBtn = document.querySelector('input[type="submit"]')
    const h1 = document.querySelector('h1')
    const form = document.querySelector('.login-form')
    const menu = document.querySelector('.menu')
    const welcomeP = document.querySelectorAll('.welcome-p')
    const mainImg = document.querySelector('.main-img')

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const user = {
            email: email.value,
            password: pass.value
        }
        
        fetchLogin('http://localhost:3000/api/1.0/users/login', user)
    })



    async function fetchLogin(url, payload) {
        const settings = {
            method: 'POST',
            headers: {
                /* authorization: token, */
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }
        try {
            const response = await fetch(url, settings)
            const user = await response.json()
            console.log(user)

            hideLogin()

            localStorage.setItem('jwt', JSON.stringify(user.token))
        } catch (e) {
            console.log(e)
        }
    }

    function hideLogin(){
        form.classList.add('none')
        menu.classList.remove('none')
        mainImg.classList.remove('none')
        welcomeP.forEach(el => el.classList.remove('none'))
        h1.innerText = `Hello, ${user.firstname}`
    }
})