window.addEventListener('load', () => {
    const logOut = document.getElementById('logOut')

    logOut.addEventListener('click', () => localStorage.removeItem('jwt'))
})