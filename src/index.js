document.addEventListener('DOMContentLoaded', () => {
    getDogs()
})

function getDogs() {
    fetch('http://localhost:3000/dogs')
    .then(resp => resp.json())
    .then(dogArr => {
        dogArr.forEach(dog => { 
            addDogToRow(dog)
            activateEditButton(dog)
        })
    })
}

function addDogToRow(dog) {
    let tableBody = document.querySelector('#table-body')
    let dogrow = document.createElement('tr')
    dogrow.id = `dog-${dog.id}`
    dogrow.innerHTML = `<td>${dog.name}</td>
                        <td>${dog.breed}</td>
                        <td>${dog.sex}</td>
                        <td><button>Edit Dog</button></td>`
    tableBody.appendChild(dogrow)
}

function updateDogRow(id, name, breed, sex) {
    let dogRow = document.getElementById(`dog-${id}`)
    dogRow.innerHTML = `<td>${name}</td>
                        <td>${breed}</td>
                        <td>${sex}</td>
                        <td><button>Edit Dog</button></td>`
}

function activateEditButton(dog) {
    let editButton = document.querySelector(`#dog-${dog.id} button`)
    let form = document.querySelector(`form`)
    editButton.addEventListener('click', () => {
        populateDogForm(dog.name, dog.breed, dog.sex)
        form.addEventListener('submit', (e) => {
            e.preventDefault()
            let name = document.querySelector('#name').value
            let breed = document.querySelector('#breed').value
            let sex = document.querySelector('#sex').value
            updateDb(dog.id, name, breed, sex)
            updateDogRow(dog.id, name, breed, sex)
            form.reset()
        }, {once: true})
    })
}

function populateDogForm(name, breed, sex) {
    document.querySelector('#name').value = name
    document.querySelector('#breed').value = breed
    document.querySelector('#sex').value = sex
}

function updateDb(id, name, breed, sex) {
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({ 
            'name': name,
            'breed': breed,
            'sex': sex
         })
    }).then(resp => resp.json()).then(dogData => console.log(dogData))
}


