

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

const viewCandidates = document.querySelectorAll('.viewCandidates');
const candidateList = document.getElementById('candidate_list');
viewCandidates.forEach(el => el.addEventListener('click', event => {
  vID = event.target.getAttribute("data-id")
  candidateList.innerHTML = ""
  $.ajax({
    url: "/viewCandidates",
    method: 'post',
    data: {
      vacancyID: vID
    },
    success: function (data) {
      console.log(data);
      
      const candidatesVacancies=data.candidatesVacancies
      const candidateCount=data.candidateCount
      vacancy = data.vacancyObj

      document.getElementById('modal_title').innerHTML = vacancy.title

      candidatesVacancies.forEach((candidate)=> {
        let li = document.createElement("li"); 
        li.className='list-group-item'
        li.textContent = `${candidate.name} - ${candidate.email} - ${candidate.major} `;
        candidateList.appendChild(li)
      })
      document.getElementById('applicantCount').innerHTML = `${candidateCount} Applicant Applied`
      
    }
  });

}))