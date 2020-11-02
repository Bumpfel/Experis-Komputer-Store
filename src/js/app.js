import { laptops } from './laptops.js'

let bankBalance = 0, payBalance = 0, hasLoan = false

const dropdown = document.querySelector('#laptopsDropdown')
for(const laptop of laptops) {
  const option = document.createElement('option')
  option.text = laptop.name
  dropdown.appendChild(option)
}
dropdown.addEventListener('change', e => {
  const found = laptops.find(laptop => laptop.name == dropdown.value)
  console.log(found)
  
})

const work = () => {
  payBalance += 100
}

const transferFunds = () => {
  bankBalance += payBalance
  payBalance = 0
}

const getLoan = (amount) => {
  if(amount * 2 > bankBalance) {

  } else {
    bankBalance += amount
    hasLoan = true
  }
}
