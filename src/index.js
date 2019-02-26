document.addEventListener('DOMContentLoaded', () => {
fetchDogs()
})

function fetchDogs() {
fetch('http://localhost:3000/dogs')
.then(response => response.json())
.then(jsonData => jsonData.forEach(dog => render(dog))
)
}

function render(dog) {
  debugger
  let dogRow = document.createElement('tr')
  dogRow.innerHTML += `<td>${dog.name}</td>
  <td>${dog.breed}</td>
  <td>${dog.sex}</td>`
  let dogButton = document.createElement(`button`)
  const t = document.createTextNode('Edit')
  dogButton.appendChild(t)
  dogButton.id = dog.id
  document.querySelector('#table-body').appendChild(dogRow).appendChild(dogButton)
  document.querySelector('#table-body').addEventListener('click', handleEdit)
}


function handleEdit(e){
  // e.target.id
fetch(`http://localhost:3000/dogs/${e.target.id}`)
.then(response => response.json())
.then(dog => editDog(dog))
}

function editDog(dog){
  let dogData = {
id: dog.id,
name: document.querySelector('#input-name').value = dog.name,
breed: document.querySelector('#input-breed').value = dog.breed,
sex: document.querySelector('#input-sex').value = dog.sex
}
document.querySelector('#dog-form').addEventListener('submit', function(){
  event.preventDefault()
  editProccess(dogData)
})
}


function editProccess(dog){
  debugger
  let dogData = {
name: document.querySelector('#input-name').value,
breed: document.querySelector('#input-breed').value,
sex: document.querySelector('#input-sex').value
}
  fetch(`http://localhost:3000/dogs/${dog.id}`,{
    method: 'PATCH',
    body: JSON.stringify(dogData),
    headers: {
      "Content-Type": 'application/json'
    }
  })
  // .then(response => response.json())
  // .then(jsonData => render(jsonData))
}
