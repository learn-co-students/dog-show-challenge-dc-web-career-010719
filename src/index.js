let dogContainer
let form

document.addEventListener('DOMContentLoaded', init)

function init() {
  dogContainer = document.querySelector('#table-body')
  getAllDogs()
}

function getAllDogs() {
  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(allDogsData => {
    allDogsData.forEach(renderDog)
  })
}

function renderDog(dogObj) {
  let tr = document.createElement('tr')
  dogContainer.appendChild(tr)

  let tdName = document.createElement('td')
  tr.appendChild(tdName)
  tdName.innerText = dogObj.name

  let tdBreed = document.createElement('td')
  tr.appendChild(tdBreed)
  tdBreed.innerText = dogObj.breed

  let tdSex = document.createElement('td')
  tr.appendChild(tdSex)
  tdSex.innerText = dogObj.sex

  let tdEdit = document.createElement('td')
  tr.appendChild(tdEdit)
  let editButton = document.createElement('button')
  tdEdit.appendChild(editButton)
  editButton.innerText = 'Edit'
  editButton.dataset.id = dogObj.id
  editButton.addEventListener('click', handleClickOfEditButton)
}

function handleClickOfEditButton(event) {
  fetch(`http://localhost:3000/dogs/${event.currentTarget.dataset.id}`)
  .then(res => res.json())
  .then(dogObj => populateEditForm(dogObj))
}

function populateEditForm(dogObj) {
  document.querySelectorAll('input')[0].value = dogObj.name
  document.querySelectorAll('input')[1].value = dogObj.breed
  document.querySelectorAll('input')[2].value = dogObj.sex
  form = document.querySelector('#dog-form')
  form.dataset.id = dogObj.id
  form.addEventListener('submit', handleSubmitOfForm)
}

function handleSubmitOfForm(event) {
  event.preventDefault()
  patchData = {
    name: document.querySelectorAll('input')[0].value,
    breed: document.querySelectorAll('input')[1].value,
    sex: document.querySelectorAll('input')[2].value
  }
  fetch(`http://localhost:3000/dogs/${event.currentTarget.dataset.id}`, {
    method: "PATCH",
    body: JSON.stringify(patchData),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(editDog)
}

function editDog() {
  dogContainer.innerHTML = ''
  getAllDogs()
}
