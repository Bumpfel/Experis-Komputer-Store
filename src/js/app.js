import { laptops } from './laptops.js'

// Vars and constans
let bankBalance = 0, payBalance = 0, hasLoan = false, selectedLaptop

const alertTypes = { info: 'alert-info', success: 'alert-success', error: 'alert-danger' }

const alertContainer = document.querySelector('#alertContainer')

const bankBalanceContainer = document.querySelector('#bankBalance')
const payBalanceContainer = document.querySelector('#payBalance')
const loanIcon = document.querySelector('#loanIcon')
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
  if(hasLoan) {
    pageAlert('You already have an outstanding loan', alertTypes.info)
  } else {
    $('#loanAmountDialogue').modal('show')
  }
})

document.querySelector('#workButton').addEventListener('click', () => {
  payBalance += 100
  payBalanceContainer.innerText = payBalance + ' kr'
})

document.querySelector('#bankButton').addEventListener('click', () => {
  changeBankBalance(payBalance)
  payBalance = 0
  payBalanceContainer.innerText = payBalance + ' kr'
})

document.querySelector('#loanForm').addEventListener('submit', e => {
  e.preventDefault()
  // action for take loan form

  let amount = loanForm.querySelector('#loanAmount').value
  amount = parseInt(amount)

  if (hasLoan) {
    pageAlert('You already have an outstanding loan', alertTypes.info)
    hideLoanDialogue()
  } else if (isNaN(amount) || amount <= 0) {
    dialogueAlert('Amount must be over 0', alertTypes.error)
  } else if (amount > bankBalance * 2) {
    dialogueAlert('You do not have sufficient funds to get this loan', alertTypes.error)
  } else {
    changeBankBalance(amount)
    pageAlert('Loan of ' + amount + ' kr granted', alertTypes.success)
    hideLoanDialogue()
    setLoanActive(true)
  }
})

document.querySelector('#purchaseButton').addEventListener('click', () => {
  const selectedLaptop = getSelectedLaptop()

  if (selectedLaptop.price > bankBalance) {
    pageAlert('You have unsufficient funds to purchase this laptop', alertTypes.error)
  } else {
    changeBankBalance(-selectedLaptop.price)
    setLoanActive(false)
    pageAlert(selectedLaptop.name + ' purchased. Also there were a clerical error at the bank, which means details about your loan has vanished!', alertTypes.success)
  }
})

$('#loanAmountDialogue').on('show.bs.modal', () => {
  // Loan dialogue
  const inputField = loanAmountDialogue.querySelector('input')
  //reset dialogue
  dialogueAlert('')
  inputField.value = ''
  
  if(hasLoan) {
    inputField.setAttribute('disabled', '')
    dialogueInfoMessage.innerText = 'You cannot take a new loan at this moment'
  } else {
    inputField.removeAttribute('disabled')
    const max = 2 * bankBalance
    
    inputField.setAttribute('max', max)
    dialogueInfoMessage.innerHTML = `The maximum amount you can borrow is <a href="#">${max}</a> kr`
    dialogueInfoMessage.querySelector('a').addEventListener('click', () => inputField.value = max)
  }
})


// Functions
const getSelectedLaptop = () => {
  return laptops.find(item => item.name === laptopsDropdown.value)
}

const changeBankBalance = amount => {
  bankBalance += amount
  bankBalanceContainer.innerText = bankBalance + ' kr'
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

const dialogueAlert = msg => {
  dialogueErrMessage.innerText = msg
}

const hideLoanDialogue = () => {
  $('#loanAmountDialogue').modal('hide')
}

const setLoanActive = status => {
  hasLoan = status

  if(status) {
    loanIcon.classList.remove('d-none')
  } else {
    loanIcon.classList.add('d-none')
  }
}