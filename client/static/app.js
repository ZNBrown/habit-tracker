//switching between log in and register in the homepage
const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const signupForm = document.querySelector('#signup-form');
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
});
loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});
signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});


////////log in user
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  localStorage.clear();
  console.log(e)
  const postData = {
    email: e.target[0].value,
    password:  e.target[1].value,
  }
  try{
    console.log(postData)
    const newUser = await axios.post(`http://localhost:3000/main/login`, postData);
    console.log(newUser.data.token);
    localStorage.setItem('token', newUser.data.token);
    window.location.href = "http://localhost:8080/profile";
  }
  catch
  {
    console.log("Failed to log in")
  }
})

signupForm.addEventListener('submit', signupHelper)
async function signupHelper(e) {
  e.preventDefault();
  console.log(e)
  const postData = {
    username: e.target[0].value,
    email:  e.target[1].value,
    password: e.target[2].value
  }
  console.log(postData)
  try{
    const newUser = await axios.post(`http://localhost:3000/main/register`, postData);
    console.log(newUser.data);
  }
  catch (err)
  {
    console.log(err)
    console.log("Failed to sign up")
  }
}

