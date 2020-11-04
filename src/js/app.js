import { laptops } from './laptops.js'

let bankBalance = 0, payBalance = 0, hasLoan = false, selectedLaptop

const alertTypes = { info: 'alert-info', success: 'alert-sucess', error: 'alert-danger'}

const messageContainer = document.querySelector('#messages')

const bankBalanceContainer = document.querySelector('#bankBalance')
const payBalanceContainer = document.querySelector('#payBalance')

const selectedProduct = document.querySelector('#selectedProduct')
const selectedProductFeatures = document.querySelector('#features')
const selectedProductImg = selectedProduct.querySelector('img')
const selectedProductTitle = selectedProduct.querySelector('#title')
const selectedProductDescription = selectedProduct.querySelector('#description')
const selectedProductPrice = selectedProduct.querySelector('#price')

const laptopsDropdown = document.querySelector('#laptopsDropdown')
for(const laptop of laptops) {
  const option = document.createElement('option')
  option.text = laptop.name
  laptopsDropdown.appendChild(option)
}

// Event Listeners
laptopsDropdown.addEventListener('change', e => {
  setSelectedLaptop(laptopsDropdown.value)
})

document.querySelector('#workButton').addEventListener('click', () => {
  work()
})

document.querySelector('#bankButton').addEventListener('click', () => {
  transferFunds()
})

document.querySelector('#loanForm').addEventListener('submit', () => {
  const amount = loanForm.querySelector('#loanAmount').value
  getLoan(amount)
})


// Functions
const setSelectedLaptop = (laptop) => {
  selectedLaptop = laptops.find(laptop => laptop.name == laptopsDropdown.value)
  
  selectedProductFeatures.innerText = selectedLaptop.features
  selectedProductImg.src = 'assets/' + selectedLaptop.img
  selectedProductTitle.innerText = selectedLaptop.name
  selectedProductDescription.innerText = selectedLaptop.description
  selectedProductPrice.innerText = selectedLaptop.price + ' SEK'
}

const work = () => {
  payBalance += 100
  payBalanceContainer.innerText = payBalance + ' kr'
}

const transferFunds = () => {
  bankBalance += payBalance
  payBalance = 0
  payBalanceContainer.innerText = payBalance + ' kr'
  bankBalanceContainer.innerText = bankBalance + ' kr'
}

const alert = (msg, alertType) => {
  messageContainer.innerText
}

const getLoan = (amount) => {
  if(amount * 2 > bankBalance) {
    alert('You do not have sufficient funds to get this loan (basically we don\'t trust poor ppl', alertTypes.info)
  } else if(amount <= 0) {
    alert('Amount must be over 0', alertTypes.error)
  } else {
    bankBalance += amount
    alert('Loan granted', alertTypes.success)
    hasLoan = true
  }
}


// Set default value
setSelectedLaptop(laptops[0])