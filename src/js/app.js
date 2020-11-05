import { laptops } from './laptops.js'

// Vars and constans
let bankBalance = 0, currentDebt = 0, payBalance = 0, selectedLaptop, hasLoan = () => currentDebt > 0
const bankInterest = .08

const alertTypes = { info: 'alert-info', success: 'alert-success', error: 'alert-danger' }

const alertContainer = document.querySelector('#alertContainer')

const currentDebtContainer = document.querySelector('#currentDebt')
const payDebtButton = document.querySelector('#payDebtButton')
const bankBalanceContainer = document.querySelector('#bankBalance')
const payBalanceContainer = document.querySelector('#payBalance')
const selectedProductCard = document.querySelector('#selectedProduct')
const loanAmountDialogue = document.querySelector('#loanAmountDialogue')
const dialogueInfoMessage = loanAmountDialogue.querySelector('#infoMessage')
const dialogueErrMessage = loanAmountDialogue.querySelector('#errMessage')

const laptopsDropdown = document.querySelector('#laptopsDropdown')
for (const laptop of laptops) {
  const option = document.createElement('option')
  option.text = laptop.name
  laptopsDropdown.appendChild(option)
}

// Event Listeners

// alter content when changing laptop from the dropdown
laptopsDropdown.addEventListener('change', () => {
  selectedLaptop = getSelectedLaptop()

  selectedProductCard.classList.remove('d-none')
  document.querySelector('#features').innerText = selectedLaptop.features
  selectedProductCard.querySelector('img').src = 'assets/' + selectedLaptop.img
  selectedProductCard.querySelector('#title').innerText = selectedLaptop.name
  selectedProductCard.querySelector('#description').innerText = selectedLaptop.description
  selectedProductCard.querySelector('#price').innerText = selectedLaptop.price + ' SEK'
})

document.querySelector('#getLoanButton').addEventListener('click', () => {
  if(hasLoan()) {
    pageAlert('You already have an outstanding loan', alertTypes.info)
  } else {
    $('#loanAmountDialogue').modal('show')
  }
})


// pay debt
payDebtButton.addEventListener('click', () => {
  const prevBankBalance = bankBalance  
  setBankBalance(Math.max(bankBalance - currentDebt, 0))
  setDebt(Math.max(currentDebt - prevBankBalance, 0))
})

// "work"
document.querySelector('#workButton').addEventListener('click', () => {
  payBalance += 100
  payBalanceContainer.innerText = payBalance + ' kr'
})

// deposit
document.querySelector('#bankButton').addEventListener('click', () => {
  setBankBalance(bankBalance + payBalance , 0)
  payBalance = 0
  payBalanceContainer.innerText = payBalance + ' kr'
})

// get a loan
document.querySelector('#loanForm').addEventListener('submit', e => {
  e.preventDefault()

  let amount = loanForm.querySelector('#loanAmount').value
  amount = parseInt(amount)

  if (hasLoan()) {
    pageAlert('You already have an outstanding loan', alertTypes.info)
    hideLoanDialogue()
  } else if (isNaN(amount) || amount <= 0) {
    dialogueAlert('Amount must be over 0', alertTypes.error)
  } else if (amount > bankBalance * 2) {
    dialogueAlert('You do not have sufficient funds to get this loan', alertTypes.error)
  } else {
    setDebt(currentDebt + amount * (1 + bankInterest))
    setBankBalance(bankBalance + amount)
    hideLoanDialogue()
    pageAlert('Loan of ' + amount + ' kr granted', alertTypes.success)
  }
})

// buy now
document.querySelector('#purchaseButton').addEventListener('click', () => {
  const selectedLaptop = getSelectedLaptop()

  if (selectedLaptop.price > bankBalance) {
    pageAlert('You have unsufficient funds to purchase this laptop', alertTypes.error)
  } else {
    setBankBalance(bankBalance - selectedLaptop.price)
    pageAlert(selectedLaptop.name + ' purchased', alertTypes.success)
  }
})

// Loan dialogue triggered
$('#loanAmountDialogue').on('show.bs.modal', () => {
  const inputField = loanAmountDialogue.querySelector('input')
  //reset dialogue
  dialogueAlert('')
  inputField.value = ''
  
  if(hasLoan()) {
    inputField.setAttribute('disabled', '')
    dialogueInfoMessage.innerText = 'You cannot take a new loan at this moment'
  } else {
    inputField.removeAttribute('disabled')
    const max = 2 * bankBalance
    
    inputField.setAttribute('max', max)
    dialogueInfoMessage.innerHTML = `The maximum amount you can borrow is <a href="#">${max}</a> kr (to an interest of ${Math.round(bankInterest * 100)}%)`
    dialogueInfoMessage.querySelector('a').addEventListener('click', () => inputField.value = max)
  }
})


// Functions

const getSelectedLaptop = () => {
  return laptops.find(item => item.name === laptopsDropdown.value)
}

const pageAlert = (msg, alertType) => {
  const alert = `
  <div class="alert ${alertType} alert-dismissible fade show">
    ${msg}
    <button type="button" class="close" data-dismiss="alert">
    <span>&times;</span>
    </button>
  </div>
  `
  alertContainer.innerHTML = alert
}

// message within the dialogue
const dialogueAlert = msg => {
  dialogueErrMessage.innerText = msg
}

const hideLoanDialogue = () => {
  $('#loanAmountDialogue').modal('hide')
}

const setBankBalance = amount => {
  bankBalance = Math.round(amount)
  bankBalanceContainer.innerText = bankBalance + ' kr'
}

const setDebt = amount => {
  currentDebt = Math.round(amount)
  if(currentDebt === 0) {
    payDebtButton.classList.add('d-none')
  } else {
    payDebtButton.classList.remove('d-none')
  }
  currentDebtContainer.innerText = currentDebt + ' kr' 
}