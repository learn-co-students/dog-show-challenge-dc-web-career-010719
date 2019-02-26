// Get all dogs
function getDogs() {
  fetch(`${baseURL()}`)
  .then(res => res.json())
  .then(json => createDogs(json))
}

// Update one dog
function updateDog(dog) {
  fetch(`${baseURL()}/${dog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(dog)
  })
  .then(res => res.json())
}
