function parseJWT(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (error) {
    return undefined
  }
}

//Dyname Welcome <user>
function welcomeUser(e) {
  //e.preventDefault();
	const welcomeMessage = document.getElementById('welcomeUser');
	welcomeMessage.textContent = `Welcome, ${parseJWT(localStorage.getItem('token')).username}`; //TO BE TESTED ONCE DB IS CONNECTED
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

    welcomeUser();
    //localStorage.clear();
    
  
    //window.location.pathname = '/';
    //window.location.assign("<deploy homepage URL>") //MAIN CODE WHEN DB CONNECTS
})

async function renderHabits() {
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

  //add freqTargetDecrement
  const fTargetDownElement = document.createElement('button');
  fTargetDownElement.textContent = '-';
  fTargetDownElement.setAttribute('id', "fTargetDownElement")

  //add freqTargetIncrement
  const fTargetUpElement = document.createElement('button');
  fTargetUpElement.textContent = '+';
  fTargetUpElement.setAttribute('id', "fTargetUpElement");

  
  //add delete button
  const deleteBtnElement = document.createElement('button');
  deleteBtnElement.textContent = 'Remove';
  deleteBtnElement.setAttribute('id', 'deleteBtn');

  
  //insert into DOM
  habitDiv.appendChild(hNameElement);
  habitDiv.appendChild(hFrequencyElement);
  habitDiv.appendChild(freqTargetElement);
  habitDiv.appendChild(fTargetDownElement);
  habitDiv.appendChild(fTargetUpElement);
  habitDiv.appendChild(deleteBtnElement);

  let postData = {
    habit_name: hName,
    habit_info: "Going Gym",
    frequency: hFrequency,
    frequency_target: freqTarget
  }

  console.log(`token is in profile ${localStorage.getItem('token')}`)
  let response = await axios.post(`http://localhost:3000/main/habits`, postData, {
    headers: {
      'authorization': localStorage.getItem('token')
    }
  })
  console.log(response)

  habitsContainer.appendChild(habitDiv)

  const closeModal = document.querySelector('.habit-modal')
  closeModal.classList.add('hidden')
}
