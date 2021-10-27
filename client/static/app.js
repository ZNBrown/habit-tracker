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


// const form = document.querySelector("form");

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   if (location.hash == "#signup") {
//     let password = document.getElementById("password").value;
//     let confirmPassword = document.getElementById("confirmPassword").value;
//     let errorMessages = document.getElementById("error-messages");
//     if (password !== confirmPassword) {
//       errorMessages.style.color = "red";
//       errorMessages.textContent = "The passwords do not match!";
//       return;
//     }
//   }

//   const data = {
//     username: e.target.username.value,
//     password: e.target.password.value,
//   };

//   if (location.hash == "#signup") {
//     data.email = e.target.email.value;
//   }

//   // if any of the values are falsy, i.e empty, don't process.
//     for (const key in data) {
//       if (!data[key]) {
//         // this one is already live so no need to do anything.
//         document.getElementById("error-messages").textContent = "username or password missing.";
//         return;
//       }
//     }

//   helpers.clearAllInputFields();

//   const requestType = location.hash;

//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   };
//   let endpoint = "";

//   if (requestType == "#signup") {
//     endpoint = "/auth/register";
//   } else {
//     endpoint = "/auth/login";
//   }

//   const response = await fetch(
//     `https://${endpoint}`,
//     options
//   );

  
//   const tokenData = await response.json();

//   if (tokenData.err) {
//     document.getElementById("error-messages").textContent = "username or Email already in use.";
//     return;
//   }


////not sure if we can access jwt_decode here
////if not, can decode in native js with JSON.parse(atob(token.split('.')[1]))
////will also need to shove the jwt into local storage, even if we pull out of the data (need to pass it back to server)

//   if (requestType === "#login") {
//     const userData = jwt_decode(tokenData.token);
//
//     localStorage.setItem("userId", userData.id);
//     localStorage.setItem("username", userData.user);
//   } else {
//     localStorage.setItem("userId", tokenData.id);
//     localStorage.setItem("username", tokenData.user);
//   }

//   window.location.assign(`https:///profile/`);
  
// });