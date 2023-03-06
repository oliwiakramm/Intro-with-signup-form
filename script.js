const formContainer = document.querySelector(".form__container");
const formEl = document.querySelector(".form");
const inputs = document.querySelectorAll("input");
const passwordInput = document.getElementById("password");
const strengthBar = document.querySelector(".strength__measure");
const strengthText = document.querySelector(".password__txt");
const showBtn = document.querySelector(".passwordBtn");

const textRegExp = /^[A-Z][a-zA-Z]+$/;
const emailRegExp = /^\S+@\S+\.\S+$/;

const weakPassword = /[a-zA-Z]/;
const mediumPassword = /\d+/;
const strongPassword = /.[!,@,#,$,%,^,*,?,_,~,-,(,)]/;

formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  inputs.forEach((input) => {
    if (input.value === "") {
      input.parentNode.classList.add("empty");
    } else {
      input.parentNode.classList.remove("empty");
    }
  });

  const nameInput = document.getElementById("name");
  validation(nameInput, textRegExp);

  const surnameInput = document.getElementById("surname");
  validation(surnameInput, textRegExp);

  const emailInput = document.getElementById("email");
  validation(emailInput, emailRegExp);

  const inputContainers = formEl.querySelectorAll(".input__container");
  const emptyResult = [...inputContainers].every(containsEmpty);

  if (emptyResult && !strengthBar.classList.contains("weak")) {
    formContainer.classList.add("claimed");
  } else {
    return;
  }
});

// TEXT INPUTS AND EMAIL INPUT VALIDATION
function validation(input, regEx) {
  if (regEx.test(input.value)) {
    return;
  } else if (input.value !== "") {
    input.parentNode.classList.add("empty");
    input.nextElementSibling.textContent = `Looks like this is not a correct format`;
  }
}

// SHOW PASSWORD

showBtn.addEventListener("click", function () {
  const showIcon = document.querySelector(".fa-eye");
  const hideIcon = document.querySelector(".fa-eye-slash");

  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    hideIcon.classList.remove("hidden");
    showIcon.classList.add("hidden");
  } else {
    passwordInput.type = "password";
    hideIcon.classList.add("hidden");
    showIcon.classList.remove("hidden");
  }
});

// PASSWORD VALIDATION

passwordInput.addEventListener("input", function () {
  if (passwordInput.value !== "") {
    strengthBar.style.display = "block";
    strengthText.style.display = "block";

    if (
      weakPassword.test(passwordInput.value) ||
      mediumPassword.test(passwordInput.value) ||
      strongPassword.test(passwordInput.value)
    ) {
      strengthBar.classList.add("weak");
      strengthText.textContent = `Your password is too weak`;
    }

    if (
      passwordInput.value.length >= 6 &&
      ((weakPassword.test(passwordInput.value) &&
        mediumPassword.test(passwordInput.value)) ||
        (weakPassword.test(passwordInput.value) &&
          strongPassword.test(passwordInput.value)) ||
        (strongPassword.test(passwordInput.value) &&
          mediumPassword.test(passwordInput.value)))
    ) {
      strengthBar.classList.remove("weak");
      strengthBar.classList.add("medium");
      strengthText.textContent = `Your password is medium`;
    } else {
      strengthBar.classList.remove("medium");
    }

    if (
      passwordInput.value.length >= 6 &&
      weakPassword.test(passwordInput.value) &&
      mediumPassword.test(passwordInput.value) &&
      strongPassword.test(passwordInput.value)
    ) {
      strengthBar.classList.remove("medium");
      strengthBar.classList.add("strong");
      strengthText.textContent = `Your password is strong`;
    } else {
      strengthBar.classList.remove("strong");
    }
  } else {
    strengthBar.style.display = "none";
    strengthText.style.display = "none";
  }
});

function containsEmpty(element) {
  return !element.classList.contains("empty");
}
