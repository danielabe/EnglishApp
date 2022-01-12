window.addEventListener('load', () => {
    const logOut = document.getElementById('logOut')

    logOut.addEventListener('click', () => logOutFunction())



    function logOutFunction() {
        Swal.fire({
            title: 'Do you want to log out?',
            text: "Then, to re-enter you must enter your credentials.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Log out',
            cancelButtonText: `Cancel`,
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('jwt')
                window.location = '../index.html'
            }
        })
    }
})