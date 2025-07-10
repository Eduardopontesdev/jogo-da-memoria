const input = document.querySelector('.login__input')
const button = document.querySelector('.login__button')
const form = document.querySelector('.login-form')

const validaInput = ({target}) => {
    if (target.value.length > 2) {
        button.removeAttribute('disabled')
        return
    }

    button.setAttribute('disabled', '')
}

const gravaNome = (event) => {
    event.preventDefault()
    localStorage.setItem('player', input.value)
    window.location = 'pages/game.html'

}

input.addEventListener('input', validaInput)
form.addEventListener('submit', gravaNome)