
document.addEventListener('DOMContentLoaded', init)

    function init() {
        let form = document.querySelector('#dog-form')
        form.addEventListener('submit', patchDog)
        getDogs()
}

function dogForm(e) {
    
    let id = e.currentTarget.dataset.id.split('-')[1]
    let hiddenInput = document.getElementsByName('id')[0]
    let row = document.querySelectorAll(`[data-id='dog-${id}']`)[0]
    let rowBreed = row.children[1]
    let rowName = row.children[0]
    let rowSex = row.children[2]
    
    let breedInput = document.getElementsByName('breed')[0]
    let nameInput = document.getElementsByName('name')[0]
    let sexInput = document.getElementsByName('sex')[0]

    hiddenInput.value = id
    breedInput.value = rowBreed.innerText
    nameInput.value = rowName.innerText
    sexInput.value = rowSex.innerText
    
}

function getDogs() {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(json => json.forEach(renderDog))
}

function renderDog(dog) {
    let tr = document.createElement('tr')
    tr.dataset.id = `dog-${dog.id}`
    document.querySelector('#table-body').appendChild(tr)

    let tdName = document.createElement('td')
    tdName.innerText = `${dog.name}`
    tr.appendChild(tdName)

    let tdBreed = document.createElement('td')
    tdBreed.innerText = `${dog.breed}`
    tr.appendChild(tdBreed)

    let tdSex = document.createElement('td')
    tdSex.innerText = `${dog.sex}`
    tr.appendChild(tdSex)

    let tdButton = document.createElement('td')
    tr.appendChild(tdButton)

    let editBtn = document.createElement('button')
    editBtn.innerText = 'Edit'
    editBtn.dataset.id = `edit-${dog.id}`
    tdButton.appendChild(editBtn)
    
    editBtn.addEventListener('click', dogForm)
}

function patchDog(e) {
    e.preventDefault
    id = document.querySelectorAll('input')[0].value
   
    let data = {
        dogName: document.querySelectorAll('input')[1].value, 
        dogBreed: document.querySelectorAll('input')[2].value,
        dogSex: document.querySelectorAll('input')[3].value
    }
    
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
}  







