//add habit button opens pop-up form

const addHabit = document.getElementById('addhabit');

addHabit.addEventListener('click', showAddHabitForm);

function showAddHabitForm() {
  const habitModal = document.querySelector('.habit-modal');
	habitModal.classList.remove('hidden');
}

//close button in form closes form
const closeHabit = document.getElementById('closeHabit');
const closeModal = document.querySelector('.habit-modal');

closeHabit.addEventListener('click', closeHabitForm);

function closeHabitForm() {
  closeModal.classList.add('hidden')
}

//code for frequency_track
function incrementButton() {
  var element = document.getElementById('incrementText');
  var value = element.innerHTML;

  ++value
  
  console.log(value)
  document.getElementById('incrementText').innerHTML = value;
}

function decrementButton() {
  var element = document.getElementById('incrementText');
  var value = element.innerHTML;

  ++value
  
  console.log(value)
  document.getElementById('incrementText').innerHTML = value;
}

//render habits to profile page
   newHabit.addEventListener('submit', async (e)=> {
      e.preventDefault();
      console.log(e);

      // submitterID = e.submitter.id;
      // if (submitterID === "newJournal"){
          let habit = e.target.hName.value;
          let freq = e.target.hFrequency.value;
          let target = e.target.freqTarget.value;
          let data = { "habit": habit, "freq": freq, "target": target};
          console.log(data);
          try {
              response = await fetch("127.0.0.1:5500/habit-tracker/client/profile.html?hName=knk%3B%5Cznc%3B&hFrequency=freqDaily&freqTarget=3", {method: "POST", 
              body: JSON.stringify({data}),
              headers : {"Content-Type" : "application/json" }
              })
          } catch(error) { console.warn(error) }
          refresh();
          document.querySelector('#hName').value = "";
          document.querySelector('#hFrequency').value = "";
          document.querySelector('#freqTarget').value = "";  
          document.querySelector('#newHabit').style.display = 'none';
         
      })   


      function renderHabits(habit, freq, target) {
        let parentDiv = document.createElement('div');
        let blogTitle = document.createElement('h2');
        let blogContent = document.createElement('p');
        let buttonParent = document.createElement('div');
        let commentButton = document.createElement('button');
        let showComments = document.createElement('button');
        let commentDiv = document.createElement('div');
        let reactForm = document.createElement('form');
        let thumbButtonUp = document.createElement('button');
        let thumbButtonDown = document.createElement('button');
        let eyesButton = document.createElement('button');
        let commentForm = document.createElement('form');
        let commentBody = document.createElement('input');
        let articleID = document.createElement('input');
        let articleID2 = document.createElement('input');
        let submitComment = document.createElement('input');
        let gifContainer = document.createElement('img');
        let divider = document.createElement('hr');

      }

    parentDiv.setAttribute("class", "parentDiv");
    blogContent.setAttribute("class", "blogContent");
    blogTitle.setAttribute("class", "blogTitle");
    buttonParent.setAttribute("class", "buttonParent");
    commentButton.setAttribute("class", "commentButton");
    reactForm.setAttribute("class", "reactForm");
    commentForm.setAttribute("class", "commentForm");
    commentBody.setAttribute("class", "commentBody");
    articleID.setAttribute("class", "articleID");
    articleID2.setAttribute("class", "articleID");
    submitComment.setAttribute("class", "submitComment");
    gifContainer.setAttribute("class", "gifContainer");
    commentDiv.setAttribute("class","commentDiv");
   
        initialise();
