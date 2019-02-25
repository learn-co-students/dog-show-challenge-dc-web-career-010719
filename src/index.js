let currentId = 0;

document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
  document.querySelector('#submit-button').addEventListener('click',handleSubmitForm)
})

function getBody() {
  return document.querySelector('#table-body')
}

function fetchDogs() {
  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(dogArray=>
    dogArray.forEach(dog=>renderDogs(dog)))
  }

function renderDogs(dog) {
  let row = document.createElement('tr')
  row.id = "dog-" + dog.id
  getBody().appendChild(row)

  let name = document.createElement('td')
  name.innerText = dog.name
  name.id = "name"
  row.appendChild(name)

  let breed = document.createElement('td')
  breed.innerText = dog.breed
  breed.id = "breed"
  row.appendChild(breed)

  let sex = document.createElement('td')
  sex.innerText = dog.sex
  sex.id = "sex"
  row.appendChild(sex)

  let edit = document.createElement('td')
  let editButton = document.createElement('button')
  editButton.innerText = "Edit Dog"
  editButton.addEventListener('click',editDog)
  editButton.id = dog.id
  edit.append(editButton)
  row.appendChild(edit)
}

function handleSubmitForm(e){
  e.preventDefault()
  postDog()
}

function postDog() {
  let data = {
    name: document.querySelector("#name-input").value,
    breed: document.querySelector("#breed-input").value,
    sex: document.querySelector("#sex-input").value
  }
  fetch(`http://localhost:3000/dogs/`, {
    method: 'POST',
    headers: {
      "Content-Type":"application/json",
      "Accept": "application/json"},
      body: JSON.stringify(data)})
      .then(res=>res.json())
      .then(dog=>renderDogs(dog))
    }

  function editDog(e){
    e.preventDefault();

    currentId = e.target.id
    document.querySelector('#submit-button').removeEventListener('click', handleSubmitForm)
    let tr = document.querySelector(`#dog-${currentId}`)

    document.querySelector("#name-input").value = tr.querySelector('#name').innerText
    document.querySelector("#breed-input").value = tr.querySelector('#breed').innerText
    document.querySelector("#sex-input").value = tr.querySelector('#sex').innerText

    document.querySelector('#submit-button').addEventListener('click',patchDog)
  }

  function patchDog(e){
    e.preventDefault();
    let data = {
      name: document.querySelector("#name-input").value,
      breed: document.querySelector("#breed-input").value,
      sex: document.querySelector("#sex-input").value
    }
    return fetch(`http://localhost:3000/dogs/${currentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(dog=>{renderEdit(dog)})

  }

  function renderEdit(dog) {
    let tr = document.querySelector(`#dog-${dog.id}`)
    tr.querySelector('#name').innerText = dog.name
    tr.querySelector('#breed').innerText = dog.breed
    tr.querySelector('#sex').innerText = dog.sex

    document.querySelector("#name-input").value = ""
    document.querySelector("#breed-input").value = ""
    document.querySelector("#sex-input").value = ""

    document.querySelector('#submit-button').removeEventListener('click', patchDog)
    document.querySelector('#submit-button').addEventListener('click',handleSubmitForm)
  }
