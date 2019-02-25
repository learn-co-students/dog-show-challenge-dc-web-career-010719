activeId = 0

document.addEventListener('DOMContentLoaded', init)

function init() {
  displayDogs()
}

function displayDogs() {
  document.getElementById('table-body').innerHTML = ''
  fetch('http://localhost:3000/dogs')
  .then(resp => resp.json())
  .then(json => json.forEach(renderDog))
}

function renderDog(dog) {
  // <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>
  data = {
    name: dog.name,
    breed: dog.breed,
    sex: dog.sex
  }
  let table = document.getElementById('table-body')
  let newRow = document.createElement('tr')
  newRow.id = dog.id
  table.appendChild(newRow)
  for (const i in data) {
    let td = document.createElement('td')
    td.innerText = data[i]
    newRow.appendChild(td)
  }
  btnTd = document.createElement('td')
  newRow.appendChild(btnTd)
  btn = document.createElement('button')
  btnTd.appendChild(btn)
  btn.innerText = 'Edit Dog'
  btn.addEventListener('click', editDog)

  // debugger
}

function editDog(e) {
  // this.parentElement.parentElement.id
  // debugger
  activeId = e.target.parentElement.parentElement.id
  let dogRow = document.getElementById(`${activeId}`)
  let form = document.getElementById('dog-form')
  submitBtn = form.children[3]

  let dogName = dogRow.children[0].innerText
  let dogBreed = dogRow.children[1].innerText
  let dogSex = dogRow.children[2].innerText
  form.children[0].value=dogName
  form.children[1].value=dogBreed
  form.children[2].value=dogSex

  submitBtn.addEventListener('click', submitChange)
}

function submitChange (e) {
  e.preventDefault()
  data = {
    name: document.getElementById('dog-form').children[0].value,
    breed: document.getElementById('dog-form').children[1].value,
    sex: document.getElementById('dog-form').children[2].value
  }
  // debugger
  fetch(`http://localhost:3000/dogs/${activeId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(data)
  })
  displayDogs()
}













//
