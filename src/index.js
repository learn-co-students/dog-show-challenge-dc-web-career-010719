document.addEventListener('DOMContentLoaded', () => {
  dogForm().addEventListener('submit', handleFormSubmission)
  getDogs()
  tableBody().addEventListener('click', handleEditButton)
})
