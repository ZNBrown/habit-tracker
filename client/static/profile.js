//Dyname Welcome <user>
function welcomeUser() {
  const username = localStorage.getItem("username");
	const welcomeMessage = document.querySelector('#welcomeUser');
  document.title = `${username}'s TrackIt`;
	welcomeMessage.textContent = `Welcome, ${username}`; 
}

//add habit button opens pop-up form
const addHabit = document.getElementById('addhabit');

addHabit.addEventListener('click', showAddHabitForm);

function showAddHabitForm(e) {
  //e.preventDefault();
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
    localStorage.clear();
    window.location.pathname = '/';
    //window.location.assign("<deploy homepage URL>") //MAIN CODE WHEN DB CONNECTS
})

async function renderHabitPrep()
{
  const hName = document.querySelector('#hName').value;
  const hFrequency = document.querySelector('#hFrequency').value;
  const freqTarget = document.querySelector('#freqTarget').value;

  let postData = {
    habit_name: hName,
    frequency: hFrequency,
    frequency_target: freqTarget
  }

  console.log(`post data ${postData}`)
  console.log(`token is in profile ${localStorage.getItem('token')}`)
  try {
  let response = await axios.post(`http://localhost:3000/main/habits`, postData, {
    headers: {
      'authorization': localStorage.getItem('token')
    }})
    renderHabit(response.data)
  }
  catch (err)
  {
    console.log(`error in habitprep ${err}`)

  }


}

async function renderAllHabits()
{
  let habits = await axios.get(`http://localhost:3000/main/habit/allhabits`,  
  {
    headers: {
    'authorization': localStorage.getItem('token')
  }})
  console.log(`habits is : ${habits}`)
  for (const habit of habits.data) {
    console.log("in the loop")
    renderHabit(habit)
  }
}

async function initialise(){
  renderAllHabits();
  welcomeUser();
}
async function showTime(habit)
{

  //const dateObject = new Date(habit.deadline * 1)
  // console.log("LOOK HERE")
  // console.log(habit.deadline)
  // console.log(dateObject);
  // let nowTime = new Date()
  // let betweenTime = dateObject - nowTime;


  // // const days = Math.floor(betweenTime / (1000 * 60 * 60 * 24)); 
  // // betweenTime -= days * 1000 * 60 * 60 * 24
  // // const hours = Math.floor(betweenTime / (1000 * 60 * 60)); 
  // // betweenTime -= hours * 1000 * 60 * 60
  // // const minutes = Math.floor(betweenTime / (1000 * 60)); 
  // // betweenTime -= minutes * 1000 * 60

  // // const timeTemp = [];

  // // (days) && timeTemp.push(days + ' days');

  // // (days || hours) && timeTemp.push(' ' + hours + ' hours');

  // // (days || hours || minutes) && timeTemp.push(' and ' + minutes + ' minutes');
  // // timeTemp.join(' ');
  // //return `You have ${timeTemp} left to complete this habit`
  let deadline;
  if (habit.frequency === "Daily")
  {
    let tomorrow = dayjs().day() + 1
    deadline = dayjs().day(tomorrow).hour(0).minute(0).second(0)
    return(dayjs().to(deadline))
  }
  else if (habit.frequency === "Weekly")
  {
    let today = dayjs().day()
    deadline = dayjs().day(6).hour(23).minute(59).second(59)
    console.log("deadline")
    console.log(deadline)
    console.log(dayjs().to(deadline))
    return(dayjs().to(deadline))
  }
  else if (habit.frequency === "Monthly")
  {
    let today = dayjs().day()
    deadline = dayjs().date(31).hour(23).minute(59).second(59)
    console.log("deadline")
    console.log(deadline)
    console.log(dayjs().to(deadline))
    return(dayjs().to(deadline))
  }
}

async function renderHabit(habit) {
  const timeToDisplay = showTime(habit)
  console.log(timeToDisplay)

  const habitsContainer = document.getElementById('habitsContainer');
  
  //create div for each habit
  const habitDiv = document.createElement("div");
  habitDiv.setAttribute("id", "habitDiv");

  //add habit name
  const hNameElement = document.createElement("h2");
  hNameElement.setAttribute("id", "hNameElement");

  const hName = document.querySelector('#hName').value;
  hNameElement.textContent = habit.habit_name;

  //add habit frequency
  const hFrequencyElement = document.createElement("h3");
  hFrequencyElement.setAttribute("id", "hFrequencyElement");

  const hFrequency = document.querySelector('#hFrequency').value;
  hFrequencyElement.textContent = habit.frequency;


  //add frequency target
  const freqTargetElement = document.createElement("p");
  freqTargetElement.setAttribute("id", "freqTargetElement");

  
  const freqTarget = document.querySelector('#freqTarget').value;
  freqTargetElement.textContent = `${habit.frequency_track} / ${habit.frequency_target}`;
  console.log(habit)
  if (habit.complete == "true")
  {
    habitDiv.style.backgroundColor = 'green';

  }
  else if  (habit.complete == "failed")
  {
    habitDiv.style.backgroundColor = 'red';
  }

 
  //show time element
  const showTimeElement = document.createElement("p");
  showTimeElement.setAttribute("id", "showTimeElement");

  showTimeElement.textContent = await showTime(habit);

  //add freqTargetDecrement
  const fTargetDownElement = document.createElement('button');
  fTargetDownElement.textContent = '-';
  fTargetDownElement.setAttribute('id', "fTargetDownElement")
  fTargetDownElement.onclick=decrementButton

  async function decrementButton() {
    if (habit.complete == "true")
    {
      return "Already completed"
    }
    try {
    let updateButton = await fetch(`http://localhost:3000/main/habit/rfrequency/${habit.id}`,
    {
      method: 'PATCH',
      headers: {
        'authorization': localStorage.getItem('token')
      }
    })
    const updateHabit = await axios.get(`http://localhost:3000/main/habit/${habit.id}`,
    {
      headers: {
        'authorization': localStorage.getItem('token')
      }
    })
    console.log(updateHabit);
    freqTargetElement.textContent = `${updateHabit.data.frequency_track} / ${habit.frequency_target}`;
    }
    catch (err)
    {
      console.log(err)
    }

  } 

  //add freqTargetIncrement
  const fTargetUpElement = document.createElement('button');
  fTargetUpElement.textContent = '+';
  fTargetUpElement.setAttribute('id', "fTargetUpElement");
  fTargetUpElement.onclick=incrementButton

  async function incrementButton() {
    try {
    let updateButton = await fetch(`http://localhost:3000/main/habit/frequency/${habit.id}`,
    {
      method: 'PATCH',
      headers: {
        'authorization': localStorage.getItem('token')
      }
    })
    const updateHabit = await axios.get(`http://localhost:3000/main/habit/${habit.id}`,
    {
      headers: {
        'authorization': localStorage.getItem('token')
      }
    })
    console.log(updateHabit);
    freqTargetElement.textContent = `${updateHabit.data.frequency_track} / ${habit.frequency_target}`;
    
    if(updateHabit.data.frequency_track === updateHabit.data.frequency_target) {
      let updateButton = await fetch(`http://localhost:3000/main/habit/frequency/${habit.id}`,
      {
        method: 'PATCH',
        headers: {
          'authorization': localStorage.getItem('token')
        }
      })
      let parent = this.parentNode;      
      parent.style.backgroundColor = 'green';
    }
    }
    catch (err)
    {
      console.log(err)
    }

  }

  
  //add delete button
  const deleteBtnElement = document.createElement('button');
  deleteBtnElement.textContent = 'Remove';
  deleteBtnElement.setAttribute('id', 'deleteBtn');
  deleteBtnElement.onclick=  async function (e) { 
    let parent = this.parentNode;
    try {
      const options = { method: 'DELETE',
      headers: {
        'authorization': localStorage.getItem('token')
        }
      //need the jwt to let the server know we are logged in
      }
      await fetch(`http://localhost:3000/main/habit/${habit.id}`, options);
      
    } catch (err) {
      console.log(err)
    }
    parent.remove()

  }
  

  
  //insert into DOM
  habitDiv.appendChild(hNameElement);
  habitDiv.appendChild(hFrequencyElement);
  habitDiv.appendChild(freqTargetElement)
  habitDiv.appendChild(showTimeElement);
  habitDiv.appendChild(fTargetDownElement);
  habitDiv.appendChild(fTargetUpElement);
  habitDiv.appendChild(deleteBtnElement);

  

  const element = document.getElementById("habitsContainer");
  element.insertBefore(habitDiv, element.firstChild);


  console.log(`token is in profile ${localStorage.getItem('token')}`)


  const closeModal = document.querySelector('.habit-modal')
  closeModal.classList.add('hidden')

  
};


initialise()

