document.addEventListener("DOMContentLoaded", init)

function init() {
  getAllDogs()
}

function getAllDogs() {
  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(allDogObjs => {
    allDogObjs.forEach(renderDog)
  })
}

function getTableBody() {
  return document.querySelector("#table-body")
}

function getEditForm() {
  return document.querySelector("#dog-form")
}

function renderDog(dogObj) {
  let tableBody = getTableBody()

  let row = document.createElement('tr')
  tableBody.appendChild(row)

  let cell1 = document.createElement('td')
  row.appendChild(cell1)
  cell1.id = 'dog-name-' + dogObj.id
  cell1.innerText = dogObj.name

  let cell2 = document.createElement('td')
  row.appendChild(cell2)
  cell2.id = 'dog-breed-' + dogObj.id
  cell2.innerText = dogObj.breed

  let cell3 = document.createElement('td')
  row.appendChild(cell3)
  cell3.id = 'dog-sex-' + dogObj.id
  cell3.innerText = dogObj.sex

  let cell4 = document.createElement('td')
  row.appendChild(cell4)

  let editButton = document.createElement('button')
  cell4.appendChild(editButton)
  editButton.dataset.id = dogObj.id
  editButton.innerText = "Edit"
  editButton.addEventListener('click', handleClickOfEditButton)
}

function handleClickOfEditButton(event) {
  let dogId = event.currentTarget.dataset.id
  populateEditForm(dogId)
}

function populateEditForm(dogId) {
  document.querySelectorAll('input')[0].value = document.querySelector(`#dog-name-${dogId}`).innerText
  document.querySelectorAll('input')[1].value = document.querySelector(`#dog-breed-${dogId}`).innerText
  document.querySelectorAll('input')[2].value = document.querySelector(`#dog-sex-${dogId}`).innerText

  let editForm = getEditForm()
  editForm.dataset.id = dogId
  editForm.addEventListener('submit', handleSubmitOfForm)
}

function handleSubmitOfForm(event) {
  event.preventDefault()
  let dogId = event.currentTarget.dataset.id
  patchDog(dogId)
}

function patchDog(dogId) {
  let patchData = {
    name: document.querySelectorAll('input')[0].value,
    breed: document.querySelectorAll('input')[1].value,
    sex: document.querySelectorAll('input')[2].value
  }

  document.querySelectorAll('input')[0].value = ''
  document.querySelectorAll('input')[1].value = ''
  document.querySelectorAll('input')[2].value = ''

  fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: "PATCH",
    body: JSON.stringify(patchData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  }).then(res => res.json())
    .then(patchedDogObj => {
      document.querySelector(`#dog-name-${dogId}`).innerText = patchedDogObj.name
      document.querySelector(`#dog-breed-${dogId}`).innerText = patchedDogObj.breed
      document.querySelector(`#dog-sex-${dogId}`).innerText = patchedDogObj.sex
    })
}
