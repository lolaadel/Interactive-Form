// 1. Get HTML Elements
const registrationForm = document.getElementById("registrationForm");

const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");

const formFeedback = document.getElementById("formFeedback");
const submitBtn = document.querySelector(".submit-btn");

const strengthBars = document.querySelector(".strength-bars");
const passwordHint = document.getElementById("passwordHint");
// 2. Error Messages
const errorMessages = {
    fullName: document.getElementById("fullNameError"),
    email: document.getElementById("emailError"),
    phone: document.getElementById("phoneError"),
    password: document.getElementById("passwordError"),
    confirmPassword: document.getElementById("confirmPasswordError"),
    terms: document.getElementById("termsError")
};
// 3. Validation Functions
function validateFullName() {
    const nameValue = fullName.value.trim();
    if (nameValue === "") {
        return "Please enter your full name.";
    }
    if (nameValue.length < 3) {
        return "Name must contain at least 3 characters.";
    }
    return "";
}

function validateEmail() {
    const emailValue = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === "") {
        return "Please enter your email address.";
    }
    if (!emailPattern.test(emailValue)) {
        return "Please enter a valid email address.";
    }
    return "";
}
function validatePhone() {
    const phoneValue = phone.value.trim();
    const phonePattern = /^\+?[0-9\s()-]+$/;
    const digits = phoneValue.replace(/\D/g, "");
    if (phoneValue === "") {
        return "Please enter your phone number.";
    }
    if (!phonePattern.test(phoneValue) || digits.length < 7 || digits.length > 15) {
        return "Please enter a valid phone number.";
    }
    return "";
}
function validatePassword() {
    const passwordValue = password.value;
    if (passwordValue === "") {
        return "Please enter a password.";
    }
    if (passwordValue.length < 8) {
        return "Password must contain at least 8 characters.";
    }
    if (!/[A-Z]/.test(passwordValue)) {
        return "Add at least one uppercase letter.";
    }
    if (!/[a-z]/.test(passwordValue)) {
        return "Add at least one lowercase letter.";
    }
    if (!/[0-9]/.test(passwordValue)) {
        return "Add at least one number.";
    }
    if (!/[^A-Za-z0-9]/.test(passwordValue)) {
        return "Add at least one special character.";
    }
    return "";
}
function validateConfirmPassword() {
    if (confirmPassword.value === "") {
        return "Please confirm your password.";
    }
    if (confirmPassword.value !== password.value) {
        return "Passwords do not match.";
    }
    return "";
}
function validateTerms() {
    if (!terms.checked) {
        return "You must agree to the terms and conditions.";
    }
    return "";
}
// 4. Show Validation Results
function showFieldResult(field, errorElement, message) {
    errorElement.textContent = message;

    field.classList.toggle("is-invalid", message !== "");

    field.classList.toggle(
        "is-valid",
        message === "" && field.value.trim() !== ""
    );
    field.setAttribute("aria-invalid", message ? "true" : "false");
    return message === "";
}
// 5. Validate Individual Fields
function checkFullName() {
    return showFieldResult(
        fullName,
        errorMessages.fullName,
        validateFullName()
    );
}
function checkEmail() {
    return showFieldResult(
        email,
        errorMessages.email,
        validateEmail()
    );
}
function checkPhone() {
    return showFieldResult(
        phone,
        errorMessages.phone,
        validatePhone()
    );
}
function checkPassword() {
    const isValid = showFieldResult(
        password,
        errorMessages.password,
        validatePassword()
    );
    updatePasswordStrength();
    if (confirmPassword.value !== "") {
        checkConfirmPassword();
    }
    return isValid;
}
function checkConfirmPassword() {
    return showFieldResult(
        confirmPassword,
        errorMessages.confirmPassword,
        validateConfirmPassword()
    );
}
function checkTerms() {
    errorMessages.terms.textContent = validateTerms();
    terms.setAttribute(
        "aria-invalid",
        terms.checked ? "false" : "true"
    );
    return terms.checked;
}
// 6. Password Strength Indicator

function updatePasswordStrength() {
    const value = password.value;
    let score = 0;
    if (value === "") {
        strengthBars.className = "strength-bars";
        passwordHint.textContent =
            "Use 8+ characters, uppercase and lowercase letters, a number, and a special character.";
        return;
    }
    if (value.length >= 8) {
        score++;
    }
    if (/[A-Z]/.test(value) && /[a-z]/.test(value)) {
        score++;
    }
    if (/[0-9]/.test(value)) {
        score++;
    }
    if (/[^A-Za-z0-9]/.test(value)) {
        score++;
    }
    strengthBars.className = "strength-bars";
    if (score <= 1) {
        strengthBars.classList.add("weak");
        passwordHint.textContent = "Password strength: Weak";
    } else if (score === 2) {
        strengthBars.classList.add("medium");
        passwordHint.textContent = "Password strength: Medium";
    } else if (score === 3) {
        strengthBars.classList.add("strong");
        passwordHint.textContent = "Password strength: Strong";
    } else {
        strengthBars.classList.add("very-strong");
        passwordHint.textContent = "Password strength: Very Strong";
    }
}

// 7. Show / Hide Password
const toggleButtons = document.querySelectorAll(".toggle-password");
toggleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const targetId = button.getAttribute("data-target");
        const targetInput = document.getElementById(targetId);
        const isPasswordHidden = targetInput.type === "password";
        targetInput.type = isPasswordHidden ? "text" : "password";
        button.textContent = isPasswordHidden ? "Hide" : "Show";
        button.setAttribute("aria-label", isPasswordHidden ? "Hide password" : "Show password");
        button.setAttribute("aria-pressed", isPasswordHidden);
    });
});
// 8. Focus and Blur Events
const fields = [
    fullName,
    email,
    phone,
    password,
    confirmPassword
];
fields.forEach(function (field) {
    field.addEventListener("blur", function () {
        if (field === fullName) {
            checkFullName();
        } else if (field === email) {
            checkEmail();
        } else if (field === phone) {
            checkPhone();
        } else if (field === password) {
            checkPassword();
        } else if (field === confirmPassword) {
            checkConfirmPassword();
        }
    });
    field.addEventListener("input", function () {
        if (field === password) {
            updatePasswordStrength();
        }
        if (field.classList.contains("is-invalid")) {
            if (field === fullName) {
                checkFullName();
            } else if (field === email) {
                checkEmail();
            } else if (field === phone) {
                checkPhone();
            } else if (field === password) {
                checkPassword();
            } else if (field === confirmPassword) {
                checkConfirmPassword();
            }
        }
        formFeedback.textContent = "";
        formFeedback.className = "form-feedback";
    });
    field.addEventListener("focus", function () {
        formFeedback.textContent = "";
        formFeedback.className = "form-feedback";
    });
});
terms.addEventListener("change", function () {
    if (terms.checked) {
        errorMessages.terms.textContent = "";
        terms.setAttribute("aria-invalid", "false");
    }
});
// 9. Submit Form
registrationForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const isNameValid = checkFullName();
    const isEmailValid = checkEmail();
    const isPhoneValid = checkPhone();
    const isPasswordValid = checkPassword();
    const isConfirmPasswordValid = checkConfirmPassword();
    const areTermsAccepted = checkTerms();
    const isFormValid = isNameValid && isEmailValid && isPhoneValid &&
        isPasswordValid && isConfirmPasswordValid && areTermsAccepted;
    if (!isFormValid) {
        formFeedback.textContent = "Please correct the highlighted fields and try again.";
        formFeedback.className = "form-feedback error";
        const firstInvalidField = registrationForm.querySelector(
            ".is-invalid, input[aria-invalid='true']");
        if (firstInvalidField) {
            firstInvalidField.focus();
        }
        return;
    }
    formFeedback.textContent = "Your account details have been submitted successfully";
    formFeedback.className = "form-feedback success";
    registrationForm.reset();
    fields.forEach(function (field) {
        field.classList.remove("is-valid", "is-invalid");
        field.setAttribute("aria-invalid", "false");
    });
    terms.setAttribute("aria-invalid", "false");
    Object.values(errorMessages).forEach(function (element) {
        element.textContent = "";
    });
    strengthBars.className = "strength-bars";
    passwordHint.textContent = "Use 8+ characters, uppercase and lowercase letters, a number, and a special character.";
});
