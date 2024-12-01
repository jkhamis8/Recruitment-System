const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

const vacancies = document.querySelectorAll('.Vacancy');

vacancies.forEach(el => el.addEventListener('click', event => {
  vID = event.target.getAttribute("data-id")


  console.log(vID)
  $.ajax({
    url: "/viewVacancy",
    method: 'post',
    data: {
      vacancyID: vID
    },
    success: function (data) {
      data = data.vacancy
      document.getElementById('modal_title').innerHTML = data.title
      document.getElementById('modalVacancyDescription').innerHTML = data.description
      document.getElementById('modalVacancyLocation').innerHTML = data.location
      document.getElementById('modalVacancyClient').innerHTML = data.client
      document.getElementById('apply').setAttributeAttribute("data-id", vID)
    }
  });

}))

const applyToVacancy = document.getElementById('apply');
applyToVacancy.addEventListener('click', event => {
  vID = event.target.getAttribute("data-id")

  console.log(vID)
  $.ajax({
    url: "/applyToVacancy",
    method: 'post',
    data: {
      vacancyID: vID
    },
    success: function (data) {
    }
  });

})