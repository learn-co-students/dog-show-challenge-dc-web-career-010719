document.addEventListener('DOMContentLoaded', () => {

}, init())

function init(){
  getDogs()
  document.querySelector("#dog-form").children[3].addEventListener("click", submitForm)

}

function getDogs() {
  //gets all dogs
  document.querySelector("#table-body").innerHTML = ''
  
  fetch('http://localhost:3000/dogs')
	.then(res => res.json())
	.then(json => renderAllDogs(json))
}

function renderAllDogs(json) {
  //renders all dogs upon batch get fetch
  json.forEach((el) => {
    renderDog(el)
  })
}

function renderDog(dogJson) { //renders an individual dog to the Registerd Dogs table
  //creates elements on the DOM
  let tr = document.createElement("tr")
  let tdName = document.createElement("td")
  let tdBreed = document.createElement("td")
  let tdSex = document.createElement("td")
  let tdEdit = document.createElement("button")
    
  //assigns element values and any callbacks
  tdName.innerText = dogJson.name
  tdBreed.innerText = dogJson.breed
  tdSex.innerText = dogJson.sex 
  tdEdit.innerText = "Edit Dog"
  tdEdit.dataset.dogId = dogJson.id
  tdEdit.addEventListener("click", editDog)
    
  //appends cells to table row
  tr.appendChild(tdName)
  tr.appendChild(tdBreed)
  tr.appendChild(tdSex)
  tr.appendChild(tdEdit)
  
  //appends table row to table body
  document.querySelector("#table-body").appendChild(tr)
}

function editDog(e) {
  e.preventDefault()
  //grabbing form elements
  let nameField = document.querySelector("#dog-form").children[0]
  let breedField = document.querySelector("#dog-form").children[1]
  let sexField = document.querySelector("#dog-form").children[2]
  let submitBtn = document.querySelector("#dog-form").children[3]
    
  //assigning form values to current event target's values
  nameField.value = e.path[1].children[0].innerText
  breedField.value = e.path[1].children[1].innerText
  sexField.value = e.path[1].children[2].innerText
  submitBtn.dataset.dogId = e.path[1].children[3].dataset.dogId
  
}

function patchValues(){
  
  //grabs the values from the form upon edit
  let nameField = document.querySelector("#dog-form").children[0]
  let breedField = document.querySelector("#dog-form").children[1]
  let sexField = document.querySelector("#dog-form").children[2]
  
  //returns the body for the patch
  return {name: nameField.value, breed:breedField.value, sex: sexField.value}  
}

function submitForm(e) {
  //prevents page refresh on submit
  e.preventDefault()
  
  let id = document.querySelector("#dog-form").children[3].dataset.dogId
  
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: "PATCH",
    headers: 
    {
    "Content-Type": "application/json",
    Accept: "application/json"
    },
    body: JSON.stringify(patchValues())
    })
  .then(res => res.json())
  .then(json => {
    getDogs()
    console.log(json)
    document.querySelector("#dog-form").reset()
  })

}

