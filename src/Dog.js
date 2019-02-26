function createDog() {
  let allDogs = []

  return class {
    constructor(dogObject) {
      this.name = dogObject.name
      this.breed = dogObject.breed
      this.sex = dogObject.sex
      this.id = dogObject.id
      allDogs.push(this)
    }

    // Create 1 row per dog
    addToTable() {
      let tr = document.createElement('tr')
      tr.classList.add('padding')

      tr.innerHTML =
      this.createCell("name") +
      this.createCell("breed") +
      this.createCell("sex") +
      this.editButtonWithID()

      tableBody().appendChild(tr)
    }

    // Alter trait in object/DOM
    edit() {
      this.setNewTrait("name")
      this.setNewTrait("breed")
      this.setNewTrait("sex")

      return this
    }

    // Helper methods
    createCell(trait) {
      return `<th id='${trait}${this.id}' class='padding center'>${this[trait]}</th>`
    }

    editButtonWithID() {
      return `<th class='padding center'><button id='edit${this.id}'>Edit</button></th>`
    }

    setNewTrait(trait) {
      this[trait] = document.querySelector(`#${trait}`).value
      document.querySelector(`#${trait}${this.id}`).innerText = this[trait]
    }

    // Class methods
    static all() {
      return allDogs
    }

    static displayAll() {
      this.all().forEach(function(dog) {
        dog.addToTable()
      })
    }
  }
}

const Dog = createDog()
