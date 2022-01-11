window.addEventListener('load', () => {
    const h1 = document.querySelector('h1')
    
    h1.innerText = `Hello, ${JSON.parse(localStorage.getItem('name'))}`

    
})