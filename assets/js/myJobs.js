const vacancies = document.querySelectorAll('.Vacancy');

vacancies.forEach(el => el.addEventListener('click', event => {
  vID = event.target.getAttribute("data-id")
  $.ajax({
    url: "/viewVacancy",
    method: 'post',
    data: {
      vacancyID: vID
    },
    success: function (data) {
      const candidateCount=data.candidateCount
      data = data.vacancy
      
      document.getElementById('modal_title').innerHTML = data.title
      document.getElementById('modalVacancyDescription').innerHTML = data.description
      document.getElementById('modalVacancyLocation').innerHTML = data.location
      document.getElementById('modalVacancyClient').innerHTML = data.client
      document.getElementById('applicantCount').innerHTML = `${candidateCount} Applicant Applied`
      document.getElementById('withdraw_btn').setAttribute("data-id", vID)
      
    }
  });

}))

const withdrawApplication = document.getElementById('withdraw_btn');
withdrawApplication.addEventListener('click', event => {
  vID = event.target.getAttribute("data-id")
  $.ajax({
    url: "/withdrawApplication",
    method: 'post',
    data: {
      vacancyID: vID
    },
    success: function (data) {
      $('#jobModal').modal('hide');
      location.reload()
    }
  });

})