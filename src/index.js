let dogs = []
let api = 'http://localhost:3000/dogs'
let table, form, nameInput, breedInput, sexInput, idInput

document.addEventListener('DOMContentLoaded', () => {
  form = document.querySelector('#dog-form')
  form.addEventListener('submit', handleSubmit)
  
  table = document.querySelector('#table-body')
  nameInput = form.querySelector('input[name="name"]')
  breedInput = form.querySelector('input[name="breed"]')
  sexInput = form.querySelector('input[name="sex"]')
  idInput = form.querySelector('input[name="id"]')

  loadDogs()
})

function findDog(id) {
  return dogs.find(dog => dog.id === id)
}

function loadDogs() {
  fetch(api)
    .then(res => res.json())
    .then(json => {
      dogs = json
      renderDogs()
    })
}

function updateDog(dog) {
  fetch(`${api}/${dog.id}`, {
    method: 'PATCH',
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(dog)
  }).then(renderDogs)
}

function renderDogs() {
  table.innerHTML = ''
  dogs.forEach(renderDog)
}

function renderDog(dog) {
  const tr = document.createElement('tr')
  tr.innerHTML += `<td>${dog.name}</td>`
  tr.innerHTML += `<td>${dog.breed}</td>`
  tr.innerHTML += `<td>${dog.sex}</td>`

  const editBtn = document.createElement('button')
  editBtn.dataset.id = dog.id
  editBtn.innerText = 'Edit'
  editBtn.addEventListener('click', handleEdit)

  const editCell = document.createElement('td')
  editCell.appendChild(editBtn)
  tr.appendChild(editCell)

  table.appendChild(tr)
}

function handleEdit(e) {
  const dogId = parseInt(e.currentTarget.dataset.id)
  populateForm(findDog(dogId))
}

function populateForm(dog) {
  nameInput.value = dog.name
  breedInput.value = dog.breed
  sexInput.value = dog.sex
  idInput.value = dog.id
}

function handleSubmit(e) {
  e.preventDefault()

  const id = parseInt(idInput.value)
  const dog = findDog(id)

  if (typeof dog === 'undefined')
    throw 'no dog found'

  dog.name = nameInput.value
  dog.breed = breedInput.value
  dog.sex = sexInput.value

  updateDog(dog)
}
