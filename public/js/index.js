const userCardTemplate = document.querySelector('[data-user-template]')
const userCardContainer = document.querySelector('[data-user-cards-container]')
const searchInput = document.querySelector('[data-search]')
const message = document.querySelector('.message')
const card = document.querySelector('.card')
const header = document.querySelector('[data-header]')

let countries = [] 


searchInput.addEventListener('input', (e) => {
  if(searchInput.value === "") {
    userCardContainer.style.display = "none"
  } else {
 userCardContainer.style.display = "flex"
 userCardContainer.addEventListener('click', () => {
})
}

const value = e.target.value.toLowerCase()       
countries.forEach(city => {

      const isVisible = city.name.toLowerCase().includes(value)
      city.element.classList.toggle('hide', !isVisible)
      })
})


  countries = data.map(country => {
  
   
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector('[data-header]')
      const body = card.querySelector('[data-body]')
    
      header.textContent = country.name
      userCardContainer.append(card)
      return {name: country.name, country: country.country, element: card}

  
   
  })
  



