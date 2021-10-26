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
// function renderHabits(){
//   const hName = document.querySelector('#hName').value;
//   const inputName = document.getElementById('habitsContainer');

//   inputName.textContent = `My new habit is to ${hName}`;

//   const closeModal = document.querySelector('.habit-modal')
//   closeModal.classList.add('hidden')

// }

function  renderHabits() {
  const habitsContainer = document.getElementById('habitsContainer');

  //create div for each habit
  const habitDiv = document.createElement("div");
  habitDiv.setAttribute("id", "habitDiv");

  //add habit name
  const hNameElement = document.createElement("h2");
  hNameElement.setAttribute("id", "hNameElement");

  const hName = document.querySelector('#hName').value;
  hNameElement.textContent = `${hName}`;

  //add habit frequency
  const hFrequencyElement = document.createElement("h3");
  hFrequencyElement.setAttribute("id", "hFrequencyElement");

  const hFrequency = document.querySelector('#hFrequency').value;
  hFrequencyElement.textContent = `${hFrequency}`;

  //add frequency target
  const freqTargetElement = document.createElement("p");
  freqTargetElement.setAttribute("id", "freqTargetElement");

  const freqTarget = document.querySelector('#freqTarget').value;
  freqTargetElement.textContent = `${freqTarget}`;

  //add delete button
  const deleteBtnElement = document.createElement('button');
  deleteBtnElement.textContent = 'Remove';
  deleteBtnElement.setAttribute('id', 'deleteBtn');

  
  //insert into DOM
  habitDiv.appendChild(hNameElement);
  habitDiv.appendChild(hFrequencyElement);
  habitDiv.appendChild(freqTargetElement);
  habitDiv.appendChild(deleteBtnElement);

  habitsContainer.appendChild(habitDiv)

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
