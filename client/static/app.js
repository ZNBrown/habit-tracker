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
    const newUser = await axios.post(`http://localhost:3000/main/login`, postData);
    userData = JSON.parse(atob(newUser.data.token.split(' ')[1].split('.')[1]))
    localStorage.setItem('token', newUser.data.token);
    localStorage.setItem('username', userData.username)
    localStorage.setItem('email', userData.email)
    localStorage.setItem('id', userData.id)
    window.location.href = "profile.html";
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
    try{
      const loginData = {
        email: postData.email,
        password: postData.password
      }
      const newUser = await axios.post(`http://localhost:3000/main/login`, postData);
      userData = JSON.parse(atob(newUser.data.token.split(' ')[1].split('.')[1]))
      localStorage.setItem('token', newUser.data.token);
      localStorage.setItem('username', userData.username)
      localStorage.setItem('email', userData.email)
      localStorage.setItem('id', userData.id)
      window.location.href = "profile.html";
    }
    catch
    {
      console.log("Failed to log in post register")
    }

  }
  catch (err)
  {
    console.log(err)
    console.log("Failed to sign up")
  }
}

