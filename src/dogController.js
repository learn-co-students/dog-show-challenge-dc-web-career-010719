// Make objects from data and render
function createDogs(data) {
  for (const key in data) {
    new Dog(data[key])
  }
  Dog.displayAll()
}

// Callbacks for event listeners
function handleEditButton(e) {
  if (e.target && e.target.nodeName === 'BUTTON') {
    let dog = Dog.all().find(dog => dog.id == e.target.id.slice(4))

    setFormValue("name", dog.name)
    setFormValue("breed", dog.breed)
    setFormValue("sex", dog.sex)

    document.querySelector('.submit').id = `submit${dog.id}`
  }
}

function handleFormSubmission(e) {
  e.preventDefault()
  let dogID = document.querySelector('.submit').id.slice(6)
  updateDog(Dog.all().find(dog => dog.id == dogID).edit())
  dogForm().reset()
}

// Helper
function setFormValue(trait, dogTrait) {
  document.querySelector(`#${trait}`).value = `${dogTrait}`
}

// Page elements/resources
function baseURL() {
  return 'http://localhost:3000/dogs'
}

function tableBody() {
  return document.querySelector('#table-body')
}

function dogForm() {
  return document.querySelector('#dog-form')
}
