const length = document.querySelector('.length')
const lengthText = document.querySelector('.length-text')
const copyButton = document.querySelector('.copy')
const passwordOutput = document.querySelector('.output')
const generateButton = document.querySelector('.generate')
const toaster = document.querySelector('.toaster')

const optionsEl = {
  uppercase: document.getElementById('uppercase'),
  lowercase: document.getElementById('lowercase'),
  symbols: document.getElementById('symbols'),
  numbers: document.getElementById('numbers')
}

const lowercase = `abcdefghijklmnopqrstuvwxyz`
const uppercase = lowercase.toUpperCase()
const symbols = `&é\"'(-è_çà)=*#{[|^@]}ù!:;,?.§$`
const numbers = `0123456789`

const generatePassword = () => {
  let data = []
  let password = ''
  if (optionsEl.lowercase.checked) {
    data.push(...lowercase)
  }
  if (optionsEl.uppercase.checked) {
    data.push(...uppercase)
  }
  if (optionsEl.symbols.checked) {
    data.push(...symbols)
  }
  if (optionsEl.numbers.checked) {
    data.push(...numbers)
  }

  if (data.length === 0) {
    showToaster('error')
    return
  }

  for (let i = 0; i < length.value; i++) {
    password += data[Math.floor(Math.random() * data.length)]
  }

  passwordOutput.value = password

  copyButton.onclick = function() {
    if (password.length > 0) {
      passwordOutput.select()
      document.execCommand('copy')
      this.classList.replace('fa-clipboard', 'fa-clipboard-check')
      showToaster('success')
    }
  }
}

generateButton.addEventListener('click', generatePassword)

length.oninput = function() {
  lengthText.innerText = this.value
}

const showToaster = (type) => {
  toaster.classList.add('active')
  if (type === 'success') {
    toaster.style.backgroundColor = 'green'
    toaster.innerText = 'Your password has been copied to clipboard.'
    setTimeout(() => {
      copyButton.classList.replace('fa-clipboard-check', 'fa-clipboard')
      toaster.classList.remove('active')
    }, 2000);
  } else {
    toaster.style.backgroundColor = 'red'
    toaster.innerText = 'Please select options for the password.'
    setTimeout(() => {
      toaster.classList.remove('active')
    }, 2000)
  }
}