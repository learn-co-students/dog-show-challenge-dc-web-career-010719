document.addEventListener('DOMContentLoaded', () => {

fetchDogs()


function fetchDogs(){
  
  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(json => json.forEach(function(dog){renderDog(dog)}))
}

let dogForm = document.querySelector('#dog-form')
dogForm.addEventListener("submit", patchDog)



function renderDog(dog){

  dogRow = document.createElement("tr")
  dogNameCell = document.createElement('td')
  dogBreedCell = document.createElement('td')
  dogSexCell = document.createElement('td')
  dogEditCell= document.createElement('td')
  dogEditButton = document.createElement('button')
  dogEditButton.innerHTML = "Edit Dog"
  dogEditButton.dataset.id = dog.id
  dogEditButton.addEventListener("click", handleEditDog)
  dogEditCell.appendChild(dogEditButton)
  dogNameCell.innerHTML = dog.name
  dogBreedCell.innerHTML = dog.breed
  dogSexCell.innerHTML = dog.sex

  dogRow.appendChild(dogNameCell)
  dogRow.appendChild(dogBreedCell)
  dogRow.appendChild(dogSexCell)
  dogRow.appendChild(dogEditCell)
  tableBody = document.querySelector("#table-body")
  tableBody.appendChild(dogRow)
}


function handleEditDog(e){
  fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`)
  .then(res => res.json())
  .then(jsonDog => fillForm(jsonDog))
}

function fillForm(jsonDog){
  dogform = document.querySelector('#dog-form')

dogForm.name.value = jsonDog.name
dogForm.breed.value = jsonDog.breed
dogForm.sex.value = jsonDog.sex
dogForm.dataset.id = jsonDog.id
}

function patchDog(e){
  e.preventDefault
  data = {
    name : e.target.children[0].value,
    breed : e.target.children[1].value,
    sex: e.target.children[2].value
    }

  fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`,
  {
    method : "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then(fetchDogs)



}








})
