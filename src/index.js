document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
  let form = document.getElementById('dog-form')
  form.addEventListener('submit', patchDog)
})

function fetchDogs () {
  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(dogs => {
    dogs.forEach(showDog)
  })
}
function showDog (dog) {
  let row = document.createElement('tr')
  row.setAttribute('id', `dog-${dog.id}`)
  let name = document.createElement('td')
  name.innerText = `${dog.name}`
  let breed = document.createElement('td')
  breed.innerText = `${dog.breed}`
  let sex = document.createElement('td')
  sex.innerText = `${dog.sex}`
  let editCol = document.createElement('td')
  let editBtn = document.createElement('button')
  editBtn.setAttribute('id', `edit-dog-${dog.id}`)
  editBtn.innerText = 'Edit'

  document.getElementById('table-body').appendChild(row)
  row.appendChild(name)
  row.appendChild(breed)
  row.appendChild(sex)
  row.appendChild(editCol)
  editCol.appendChild(editBtn)

  editBtn.addEventListener('click', editDog)
}

function editDog (e) {
  let id = e.currentTarget.id.split('-')[2]
  let row = document.getElementById(`dog-${id}`)
  let hiddenInput = document.getElementsByName('id')[0]
  let nameInput = document.getElementsByName('name')[0]
  let breedInput = document.getElementsByName('breed')[0]
  let sexInput = document.getElementsByName('sex')[0]
  hiddenInput.value = id
  nameInput.value = row.children[0].innerText
  breedInput.value = row.children[1].innerText
  sexInput.value = row.children[2].innerText
}
function patchDog (e) {
  e.preventDefault()
  let id = document.getElementsByName('id')[0].value
  let data = {
    "name": document.getElementsByName('name')[0].value,
    "breed": document.getElementsByName('breed')[0].value,
    "sex": document.getElementsByName('sex')[0].value
  }
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
  .then(res => res.json())
  .then(dog => {
    let form = document.getElementById('dog-form')
    form.reset
    let tableBody = document.getElementById('table-body')
    tableBody.innerHTML = ''
    fetchDogs()
  })
}
