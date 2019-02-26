document.addEventListener('DOMContentLoaded', () => {
fetchDogs()

function fetchDogs(){
  fetch('http://localhost:3000/dogs')
  .then(res => res.json())
  .then(json => json.forEach(function(dog){renderDog(dog)}))
}

function renderDog(dog){
addRow()
nameCell.innerHTML = dog.name
breedCell.innerHTML = dog.breed
sexCell.innerHTML = dog.sex
editDogButton.id = dog.id
editDogButton.addEventListener("click", fillEditForm)
}

let tableBody
let tableRow
let nameCell
let breedCell
let sexCell
let editDogCell
let editDogButton

function addRow(){
tableBody = document.querySelector("#table-body")
tableRow = document.createElement("tr")
tableBody.appendChild(tableRow)

nameCell = document.createElement("td")
breedCell = document.createElement("td")
sexCell = document.createElement("td")
editDogCell = document.createElement("td")
editDogButton = document.createElement("button")
editDogButton.innerHTML = "Edit Dog"
editDogCell.appendChild( editDogButton )

tableRow.appendChild(nameCell)
tableRow.appendChild(breedCell)
tableRow.appendChild(sexCell)
tableRow.appendChild(editDogCell)
}

let dogForm = document.querySelector('#dog-form')

function fillEditForm(e){

let myDogName = e.target.parentElement.parentElement.children[0].innerHTML
let myDogBreed = e.target.parentElement.parentElement.children[1].innerHTML
let myDogSex = e.target.parentElement.parentElement.children[2].innerHTML


dogForm.name.value = myDogName
dogForm.breed.value = myDogBreed
dogForm.sex.value = myDogSex
dogForm.dataset.id = e.target.id
}

dogForm.addEventListener("submit", editDog)

function editDog(e){

let data = {name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value}

fetch(`http://localhost:3000/dogs/${e.target.dataset.id}`,{
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify(data)
    })
    .then(fetchDogs)


}






})
