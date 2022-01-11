window.addEventListener('load', () => {
    const h1 = document.querySelector('h1')
    const token = JSON.parse(localStorage.getItem('jwt'))
    const id = JSON.parse(localStorage.getItem('id'))

    fetchGetInfo(`http://localhost:3000/api/1.0/users/${id}`, `Bearer ${token}`)

    function fetchGetInfo(url, token) {
        const settings = {
            method: 'GET',
            headers: {
                authorization: token
            }
        }

        fetch(url, settings)
            .then(response => response.json())
            .then(data => h1.innerText = `Hello, ${data.firstname}`)
            .catch(error => console.log(error))
    }
})