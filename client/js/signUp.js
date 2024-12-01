let errorParagraph= document.getElementById("error")
console.log(errorParagraph)

// const form = document.getElementById('signUpForm'); 
const username = document.getElementById('username'); 
const fname = document.getElementById('fname'); 
const email = document.getElementById('email'); 
const phone = document.getElementById('phone'); 
const password = document.getElementById('password'); 
const rePassword = document.getElementById('re-password');
const address = document.getElementById('address')
const termsCheckbox = document.getElementById('termsCheckbox');
const signUpButton = document.getElementById('signUpButton');


// Regex patterns
const emailRegX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// let emailRegX = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
let passwordRegX = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
let phoneRegX =   /^(\+\d{1,3})?\d{10,15}$/;

// console.log(emailRegx.test("ifedikeze@gmail.com")); // true
console.log(passwordRegX.test("yecretAassw8or890@gmail.")); // true


termsCheckbox.addEventListener('change', () => {
    if (termsCheckbox.checked){
        signUpButton.disabled = false; // Enable the button
    }else{
        signUpButton.disabled = true; // Disable the button
    }
})



document.getElementById('signUpForm').addEventListener('submit', async function (e) {
  e.preventDefault()

  if(username.value === ""||fname.value === "" || email.value === "" || phone.value ==="" || password.value === "" || rePassword.value === "" || address.value === ""){
    errorParagraph.textContent = "Please validate all fields😊"
            setTimeout(() => { errorParagraph.textContent = "" },5000)
    }else if(password.value !== rePassword.value){
        errorParagraph.textContent = "password fields do not match"
        setTimeout(() => {  
            errorParagraph.textContent = ""
        },5000)           
    } else if(!emailRegX.test(email.value)){
        console.log("Invalid email:", email.value); // Debugging output

        errorParagraph.textContent = " Enter a valid email address."
        setTimeout( () => {
            errorParagraph.textContent = ""
        }, 5000)
    }else if(!passwordRegX.test(password.value)){
        console.log("password should have atleast one UPPERCASE,one LOWERCASE AND 8 characters:", password.value); // Debugging output
        errorParagraph.textContent = "password should have atleast one UPPERCASE,one LOWERCASE AND 8 characters"
        setTimeout( () => {
            errorParagraph.textContent = ""
        }, 5000)
    }else if (!phoneRegX.test(phone.value)) {
        console.log("Invalid phone number:", phone.value); // Debugging output
        errorParagraph.textContent = "Invalid phone number";
        setTimeout(() => { errorParagraph.textContent = "" }, 5000);
      }else {
        console.log("Form submitted successfully")
      }

    if (!termsCheckbox.checked) {
        alert('You must agree to the terms and conditions to proceed.');
        return;
    }


    
    // alert('Form submitted successfully!');
    console.log("Form submission handled by JavaScript");

})