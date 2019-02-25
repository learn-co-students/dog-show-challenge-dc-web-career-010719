const baseURL =  "http://localhost:3000/dogs"
document.addEventListener('DOMContentLoaded', () => {
  getFormDiv().hidden = true
  loadAllDogs()
  
  //event listener for editing
  document.getElementById('dog-form').addEventListener('submit', editDogJSON)
})

function loadAllDogs(){
  fetch(baseURL)
    .then(res => res.json())
    .then(json => json.forEach(renderDog))
    //render each dog to the screen
}

function renderDog(dogData){
  let allDogsTableBody = document.getElementById('table-body')

  let dogRow = createDogRow(dogData)

  //grab table varable and append to it
  allDogsTableBody.appendChild(dogRow)

}


function createDogRow(dog){

  // <tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>

  let nameTD = document.createElement('td')
  let breedTD = document.createElement('td')
  let sexTD = document.createElement('td')
  let editBtn = document.createElement('button')
  let row = document.createElement('tr')

  nameTD.innerText = dog.name
  nameTD.id = `dog-${dog.id}-name`

  breedTD.innerText = dog.breed
  breedTD.id = `dog-${dog.id}-breed`

  sexTD.innerText = dog.sex
  sexTD.id = `dog-${dog.id}-sex`


  editBtn.innerText = "edit"
  editBtn.addEventListener('click', function () { editDogListen(dog.id)})

  row.appendChild(nameTD)
  row.appendChild(breedTD)
  row.appendChild(sexTD)
  row.appendChild(editBtn)
  row.id = `dog-${dog.id}-row`

  return row
}



function editDogListen(dogId){
  //make submit to come back
  getFormDiv().hidden = false

  //set form to correct info
  setForm(dogId)

}

function setForm(id){
  //get row and dog info
  let name = document.getElementById(`dog-${id}-name`).innerText
  let breed = document.getElementById(`dog-${id}-breed`).innerText
  let sex = document.getElementById(`dog-${id}-sex`).innerText

  //set form
  document.getElementById('input-id-edit').value = id
  document.getElementById('input-name-edit').value  = name
  document.getElementById('input-breed-edit').value = breed
  document.getElementById('input-sex-edit').value = sex

}

function editDogJSON(e){
  e.preventDefault()

  //create new dogOBJ
  let dogOJB = createDogOBJ(e.currentTarget)

  //patch to json
  patchDog(dogOJB)

  getFormDiv().hidden = true
}

function createDogOBJ(target){
  let collec = target.children

  let id = target.children[0].value
  let name = target.children[1].value
  let breed = target.children[2].value
  let sex = target.children[3].value

  let rtn = {}

  rtn.id = id
  rtn.name = name
  rtn.breed = breed
  rtn.sex = sex

  return rtn
}

function patchDog(obj) {
  fetch(`${baseURL}/${obj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type":"application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(obj)
    })
    .then(resp => resp.json())
    .then(json => updateDomDog(json))

}

function updateDomDog(data){
  document.getElementById(`dog-${data.id}-name`).innerText = data.name
  document.getElementById(`dog-${data.id}-breed`).innerText = data.breed
  document.getElementById(`dog-${data.id}-sex`).innerText = data.sex
}

function getFormDiv(){
  return document.getElementById('form-div')
}
