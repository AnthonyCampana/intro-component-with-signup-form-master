const submitButton = document.getElementById("submitButton");
const errorMessage = document.getElementsByClassName("error-message");

function validatePrefix(prefix) {
    let quoteClosure = true;
        
        for (let i = 0; i < prefix.length; i++) {
            if(quoteClosure) {
                if((33 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 39) || prefix.charCodeAt(i) === 42 || prefix.charCodeAt(i) === 43 || (45 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 47) || prefix.charCodeAt(i) === 61 || prefix.charCodeAt(i) == 63 || (123 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 126)) {
                    if(prefix.charAt(i) === '"' ) {
                        quoteClosure = false
                    } else if(prefix.charAt(i) === '.') {
                        if(i === 0 || i === prefix.length -1) {
                            return false;
                        } else if(prefix.charAt(i+1) === '.') {
                            return false;
                        }
                    }
                } else if((48 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 57) || (65 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 90) || (97 <= prefix.charCodeAt(i) && prefix.charCodeAt(i) <= 122)) {
                } else {
                    return false
                }
            } else {
                if(prefix.charAt(i) === '"') {
                    quoteClosure = true;
                } else if(i == prefix.length-1) {
                    return false;
                }
            }
        }
        return true;
}

function validateDomain(domain) {
    let IPaddress = false;
    for (let i = 0; i < domain.length; i++) {
        if(!IPaddress) {
            if(domain.charCodeAt(i) === 45 || domain.charCodeAt(i) === 46 || (48 <= domain.charCodeAt(i) && domain.charCodeAt(i) <= 57) || (65 <= domain.charCodeAt(i) && domain.charCodeAt(i) <= 91) || (97 <= domain.charCodeAt(i) && domain.charCodeAt(i) <= 122)) {
                if(domain.charAt(i) === '-' && (i === 0 || i === domain.length -1)) {
                    return false
                } else if(domain.charAt(i) == '.' && domain.length - (i+1) < 2) {
                    return false;
                } else if(domain.charAt(i) === '[') {
                    IPaddress = true;
                }
            }
        } else {
            if(domain.charAt(i) === ']' && i != domain.length-1) {
                return false;
            }  
        }
    }
    return true;
}

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName")
    const lastName = document.getElementById("lastName")
    const email = document.getElementById("email")
    const password = document.getElementById("password")

    if(firstName.value === "") {
        console.log("no first name")
        errorMessage[0].style.display = "block";
        firstName.style.borderColor = "hsl(0, 100%, 74%)";
        firstName.classList.add("error-background");
    }
    else {
        errorMessage[0].style.display = "none";
        firstName.style.borderColor = "rgb(118, 118, 118)";
        firstName.classList.remove("error-background");
    }
    if(lastName.value === "") {
        console.log("no last name")
        errorMessage[1].style.display = "block";
        lastName.style.borderColor = "hsl(0, 100%, 74%) ";
        lastName.classList.add("error-background");
    } else {
        errorMessage[1].style.display = "none";
        lastName.style.borderColor = "rgb(118, 118, 118)";
        lastName.classList.remove("error-background");
    }
    if(email.value.charAt("@") != ""){
        const emailSeparator = email.value.split("@")
        if( validatePrefix(emailSeparator[0]) && validateDomain(emailSeparator[1])) {
            errorMessage[2].style.display = "none";
            email.style.borderColor = "rgb(118, 118, 118)";
            email.classList.remove("error-background");
        }
    } 
    else {
        console.log("bad email ")
        errorMessage[2].style.display = "block";
        email.style.borderColor = "hsl(0, 100%, 74%) ";
        email.classList.add("error-background");
    }
    if(password.value === "") {
        console.log("no password")
        errorMessage[3].style.display = "block";
        password.style.borderColor = "hsl(0, 100%, 74%) ";
        password.classList.add("error-background");
    } else {
        errorMessage[3].style.display = "none";
        password.style.borderColor = "rgb(118, 118, 118)";
        password.classList.remove("error-background");
    }
})