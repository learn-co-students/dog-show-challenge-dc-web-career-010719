// let allDogs = {}

document.addEventListener('DOMContentLoaded', init)

function init() {
  getAllDogs()
  addEventSubmit()
}

// Create listener for submit form
function addEventSubmit() {
  let submitForm = document.getElementById('dog-form')
  submitForm.addEventListener('submit', handleSubmit)
}

// Handles a submitted form
function handleSubmit(e) {
  e.preventDefault()
  let childArr = e.target.children
  let nameText = childArr[0].value
  let breedText = childArr[1].value
  let sexText = childArr[2].value
  let dogId = childArr[3].dataset.submitId
  
  fetch(dogUrl() + dogId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: nameText,
      breed: breedText,
      sex: sexText
    })
  })
  .then(res => res.json())
  .then(() => {
    let updateRow = document.querySelector(`[data-row-id="${dogId}"]`)
    updateRow.children[0].innerText = nameText
    updateRow.children[1].innerText = breedText
    updateRow.children[2].innerText = sexText
  })
  console.log('submitted edit')
}

// Access dog database url
function dogUrl() {
  return 'http://localhost:3000/dogs/'
}

// Fetch dogs as json
function getAllDogs() {
  fetch(dogUrl())
  .then(res => res.json())
  .then(dogs => {
    dogs.forEach(dog => renderDog(dog))
  })
}

// Render each dog
function renderDog(dog) {
  // Create elements
  let row = document.createElement('tr')
  row.dataset.rowId = dog.id
  let name = document.createElement('td')
  name.innerText = `${dog.name}`
  row.appendChild(name)
  let breed = document.createElement('td')
  breed.innerText = `${dog.breed}`
  row.appendChild(breed)
  let sex = document.createElement('td')
  sex.innerText = `${dog.sex}`
  row.appendChild(sex)
  let td = document.createElement('td')
  
  // Create edit button
  let btn = document.createElement('button')
  btn.innerText = 'Edit Dog'
  btn.dataset.id = dog.id
  btn.addEventListener('click', existingDog)
  td.appendChild(btn)
  row.appendChild(btn)
  
  // Connect row to table
  let dogTable = document.getElementById('table-body')
  dogTable.appendChild(row)
}

// Finds dog after edit click
function existingDog(e) {
  e.preventDefault()
  dogId = parseInt(e.target.dataset.id)
  fetch(dogUrl() + `${dogId}`)
  .then(res => res.json())
  .then(dog => updateForm(dog))
}

// Replaces values in form
function updateForm(dog) {
  let form = document.getElementById('dog-form')
  form.children[0].value = dog.name
  form.children[1].value = dog.breed
  form.children[2].value = dog.sex
  form.children[3].dataset.submitId = dog.id
}
