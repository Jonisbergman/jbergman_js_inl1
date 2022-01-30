import User from './models/UserModel.js'

const form = document.querySelector('#form');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');
const output = document.querySelector('#output');

const users = [];

const createUser = (firstName, lastName, email) => {
    const user = new User (firstName, lastName, email);
    users.push(user);    
    console.log(users);
    output.insertAdjacentHTML('afterbegin', newUser(user))
    addRemoveOnClick(user)
   
}

const addRemoveOnClick = (user) => {
    const delButton = document.querySelector(`#del-btn${user.id}`)
    delButton.addEventListener(`click`, function(){
    delButton.parentElement.classList.add('slideout')   
    delButton.parentElement.addEventListener('animationend', function(){
        users.splice(users.indexOf(user), 1)
        delButton.parentElement.remove()
        console.log(users);
     })
    })
    
}

const newUser = user => {
    return `
    <div id="user${user.id}" class="user-card animate">
    <h2>${user.firstName} ${user.lastName}</h2>
    <h3>${user.email}</h3>    
    <button class="btn-icon far fa-edit"></button>
    <button id="del-btn${user.id}" class="btn-icon far fa-trash-alt"></button>
</div>
` 
}

const validateText = (input) => {
    if(input.value.trim() === '') { 
      setError(input, 'Namn måste fyllas i')
      return false;
    }
    else if(input.value.trim().length < 2) {
      setError(input, 'Ditt namn måste vara 2 bokstäver långt')
      return false;
    }
    else {
      setSuccess(input)
      return true;
    }
  }

const validateEmail = email => {
    let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  
    if(email.value.trim() === '') {
      setError(email, 'Skriv in en epost adress');
      return false;
    } 
    else if(!regEx.test(email.value)) {
      setError(email, 'Inte en giltig epost');
      return false;
    }
    else {
      setSuccess(email)
      return true;
    }
  }

const setError = (input, textMessage) => {
    const parent = input.parentElement;
    parent.classList.add('is-invalid');
    parent.classList.remove('is-valid');
    parent.querySelector('.invalid-input').innerText = textMessage;
  }
 
function clearClass (){
    form.children.classList.remove('is-invalid');
    form.children.classList.remove('is-valid');
  
    // lastName.classList.remove('is-invalid');
    // lastName.classList.remove('is-valid');
  
    // email.classList.remove('is-invalid');
    // email.classList.remove('is-valid');
 } 
  
  const setSuccess = input => {
    const parent = input.parentElement;
    parent.classList.remove('is-invalid');
    parent.classList.add('is-valid');
  }

const validate = input => {
    switch(input.type) {
      case 'text': return validateText(input)
      case 'email': return validateEmail(input)    
      default:
        break;
    }
  }
  
  form.addEventListener('submit', e => {
      e.preventDefault();
     
      //Validering   
      let errors = []

      for(let i = 0; i < form.length; i++) {
        errors[i] = validate(form[i])
      }
      console.log(errors)
      if(!errors.includes(false)) {
      createUser(firstName.value, lastName.value, email.value)     
    }
    form.reset()
    form.clearClass()

  })