//Dyname Welcome <user>
function welcomeUser() {
	const welcomeMessage = document.getElementById('welcomeUser');
	welcomeMessage.textContent = `Welcome, ${localStorage.getItem('username')}`; //TO BE TESTED ONCE DB IS CONNECTED
}



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



//log out button
const logOutBtn = document.getElementById('logout');

logOutBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.pathname = '/';
    //window.location.assign("<deploy homepage URL>") //MAIN CODE WHEN DB CONNECTS
})

