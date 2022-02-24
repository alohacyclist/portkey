const userCardTemplate = document.querySelector('[data-user-template]')
const userCardContainer = document.querySelector('[data-user-cards-container]')
const searchInput = document.querySelector('[data-search]')
const message = document.querySelector('.message')
const card = document.querySelector('.card')
const header = document.querySelector('[data-header]')

let countries = [] 


searchInput.addEventListener('input', (e) => {
  message.style.display = "none"
 
  if(searchInput.value === "") {
    userCardContainer.style.display = "none"
  } else {
    userCardContainer.style.display = "flex"
  }
  
  const value = e.target.value.toLowerCase()       
    // console.log(value)
    // console.log(data[0].data[0].country)
    countries.forEach(country => {
      const isVisible = country.name.toLowerCase().includes(value)
      country.element.classList.toggle('hide', !isVisible)
       // console.log(isVisible)
       // country.element.classList.toggle('hide', !isVisible)
       // console.log(country.country)
      })
})

countries = data[0].data.map(country => {
  const card = userCardTemplate.content.cloneNode(true).children[0]
  const header = card.querySelector('[data-header]')
  const body = card.querySelector('[data-body]')
  header.textContent = country.country
  userCardContainer.append(card)
  return {name: country.country, element: card}
})

//https://raw.githubusercontent.com/Makariuz/travel-app/main/db.json
