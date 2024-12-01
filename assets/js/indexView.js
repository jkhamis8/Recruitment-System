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
      const applied = data.appliedToVacancy
      const candidateCount = data.candidateCount
      data = data.vacancy

      document.getElementById('modal_title').innerHTML = data.title
      document.getElementById('modalVacancyDescription').innerHTML = data.description
      document.getElementById('modalVacancyLocation').innerHTML = data.location
      document.getElementById('applicantCount').innerHTML = `${candidateCount} Applicant Applied`

      if (applied) {
        document.getElementById('apply').innerHTML = "Applied"
        document.getElementById('apply').setAttribute("disabled", true)
      } else {
        document.getElementById('apply').innerHTML = "Apply"
        document.getElementById('apply').removeAttribute("disabled");
        document.getElementById('apply').setAttribute("data-id", vID)
      }

    }
  });

}))

const applyToVacancy = document.getElementById('apply');
applyToVacancy.addEventListener('click', event => {
  vID = event.target.getAttribute("data-id")
  $.ajax({
    url: "/applyToVacancy",
    method: 'post',
    data: {
      vacancyID: vID
    },
    success: function (data) {
      $('#jobModal').modal('hide');
    }
  });

})