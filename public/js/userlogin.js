const inputs = document.querySelectorAll(".input");

function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});

function togglePasswordVisibility(inputId, icon) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passwordInput.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

// Fetch user form data and submit to server
async function submituserForm(event) {
    event.preventDefault();

    const form = document.getElementById("userlogin");
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            console.log("Login successful");
            window.location.href = "/dashboard";
        } else {
            const errorResult = await response.json();
            alert(errorResult.message || "Login failed. Please check your credentials.");
            console.error('Error:', errorResult.message)
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

// Fetch admin form data and submit to server
async function submitadminForm(event) {
    event.preventDefault();

    const form = document.getElementById("adminlogin");
    const formData = new FormData(form);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('/loginadmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            console.log(result.message);
            console.log("Login successful");
            window.location.href = "/admindash";
        } else {
            const errorResult = await response.json();
            alert(errorResult.message || "Login failed. Please check your credentials.");
            console.error('Error:', errorResult.message)
        }
    } catch (error) {
        console.error('Network error:', error);
    }
}

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});