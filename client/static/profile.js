//Dyname Welcome <user>
function welcomeUser(e) {
  e.preventDefault();
	const welcomeMessage = document.getElementById('welcomeUser');
	welcomeMessage.textContent = `Welcome, ${localStorage.getItem('username')}`; //TO BE TESTED ONCE DB IS CONNECTED
}



//add habit button opens pop-up form
const addHabit = document.getElementById('addhabit');

addHabit.addEventListener('click', showAddHabitForm);

function showAddHabitForm(e) {
  e.preventDefault();
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



//log out button
const logOutBtn = document.getElementById('logout');

logOutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.pathname = '/';
    //window.location.assign("<deploy homepage URL>") //MAIN CODE WHEN DB CONNECTS
})


//////HABITS CONTAINER
function myFunction(){
  const hName = document.querySelector('#hName').value;
  const inputName = document.getElementById('habitsContainer');

  inputName.textContent = `My new habit is to ${hName}`;

  const closeModal = document.querySelector('.habit-modal')
  closeModal.classList.add('hidden')

}



/////////////////////check with the DB
// const addHabitBtn = document.getElementById('submitHabit');

// addHabitBtn.addEventListener('click', renderHabits);

// function renderHabits(habits) {
//   const habitsContainer = document.getElementById('habitsContainer');

//   Object.keys(habits).forEach(habit => {
//     //create container for each habit
//     const habitDiv = document.createElement("div");
//     habitDiv.setAttribute("id", "habitDiv");

//     //add habit name
//     const hName = document.createElement("h2");
//     hName.setAttribute("id", "hName");

//     //add frequency
//     const hFrequency = document.createElement("p");
//     hFrequency.setAttribute("id", "hFrequency");

//     //add frequency target
//     const freqTarget = document.createElement("p");
//     freqTarget.setAttribute("id", "freqTarget");

//     //delete button
//     const deleteBtn = document.createElement('button');
// 	  deleteBtn.textContent = 'Remove';
// 	  deleteBtn.setAttribute('id', 'deleteBtn');


//     //insert data into elements
//     hName.textContent = habit.habit_name;
//     hFrequency = habit.frequency
//     freqTarget = habit.frequency_target;


//     //insert elements to the DOM
//     habitDiv.appendChild(hName);
//     habitDiv.appendChild(hFrequency);
//     habitDiv.appendChild(freqTarget);
//     habitDiv.appendChild(deleteBtn);

//     habitsContainer.appendChild(habitDiv)


//   })
//   return habitsContainer;
// }
