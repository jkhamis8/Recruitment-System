const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

const vacancies = document.querySelectorAll('.VDelete');

vacancies.forEach(el => el.addEventListener('click', event => {
  vID = event.target.getAttribute("data-id")
  $.ajax({
    url: "/deleteVacancy",
    method: 'POST',
    data: {
      vacancyID: vID
    },
    success: function (data) {
location.reload()
    }
  });

}))