document.addEventListener('DOMContentLoaded', () => {
  init();
});

//Initialize all dogs
function init() {
  getAllDogs();
}

//fetch request
function getAllDogs() {
  fetch(`http://localhost:3000/dogs`)
    .then(res => res.json())
    .then(data => data.forEach(dog => renderDogs(dog)));
}

// Render dogs from JSON
function renderDogs(dog) {
  //Create row and table data
  let dogTableRow = document.createElement('tr');
  let nameTd = document.createElement('td');
  let breedTd = document.createElement('td');
  let sexTd = document.createElement('td');
  let editDog = document.createElement('button');

  //row id
  nameTd.dataset.nameId = dog.id;
  breedTd.dataset.breedId = dog.id;
  sexTd.dataset.sexId = dog.id;
  editDog.dataset.editId = dog.id;

  //Add in data for each element
  nameTd.innerText = dog.name;
  breedTd.innerText = dog.breed;
  sexTd.innerText = dog.sex;
  editDog.innerText = 'Edit Dog';

  //append eventListener
  editDog.addEventListener('click', e => captureDogInputs(e));

  //Append table data to table row
  dogTableRow.appendChild(nameTd);
  dogTableRow.appendChild(breedTd);
  dogTableRow.appendChild(sexTd);
  dogTableRow.appendChild(editDog);

  // debugger;

  let dogTable = document.querySelector('#table-body');
  dogTable.appendChild(dogTableRow);
}

//capture dog information to edit
function captureDogInputs(e) {
  let dogId = parseInt(e.currentTarget.dataset.editId);
  let name = document.querySelector(`[data-name-id="${dogId}"]`).innerText;
  let breed = document.querySelector(`[data-breed-id="${dogId}"]`).innerText;
  let sex = document.querySelector(`[data-sex-id="${dogId}"]`).innerText;

  let nameInput = document.querySelector('#dogname');
  let breedInput = document.querySelector('#dogbreed');
  let sexInput = document.querySelector('#dogsex');

  nameInput.value = name;
  breedInput.value = breed;
  sexInput.value = sex;

  addSubmitEventListener(dogId);
}

//add event
function addSubmitEventListener(dogId) {
  let dogSubmitBtn = document.querySelector('#dogsubmit');
  dogSubmitBtn.addEventListener('click', e => {
    e.preventDefault();
    editDog(dogId);
  });
}

//fetch post edited dog
//
function editDog(dogId) {
  let nameInput = document.querySelector('#dogname');
  let breedInput = document.querySelector('#dogbreed');
  let sexInput = document.querySelector('#dogsex');

  let name = nameInput.value;
  let breed = breedInput.value;
  let sex = sexInput.value;
  data = { name: name, breed: breed, sex: sex };

  fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(() => renderUpdatedDogs());
}

//re-render all the dogs with the updated list
function renderUpdatedDogs() {
  let dogTable = document.querySelector('#table-body');
  dogTable.innerHTML = '';
  getAllDogs();
}

// data = { name: name, breed: breed, sex: sex };
