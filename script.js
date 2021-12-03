var savedNames = JSON.parse(localStorage.getItem('saved'));

// cheking the name pattern using custome regex - sending Get Http request to given url and predicting the 
// gender and making proper error message if predicting was unsuccessfull - show/hide the answer box if there
// is any saved answers
function Submit() {
    var name = document.getElementById('name-input').value
    var regex = /^[a-zA-Z ]*$/;
    // var regex = /^^[\u0600-\u06FF\s]*$/;

    if (!name.match(regex) || name.length > 255 || name.length == 0) {
        alert('Name should contains only space and alphabets!')
        return
    }

    //making the http url
    const Http = new XMLHttpRequest();
    const url = `https://api.genderize.io/?name=${name}`;

    var savedMessage = document.getElementById("save-message");

    savedMessage.style.display = 'flex';
    savedMessage.style.color = 'blue';
    savedMessage.innerHTML = "Sending request ...";

    //sending http Get request
    Http.open("GET", url);
    Http.send();


    //waiting for http response and set the result
    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(Http.responseText);
            if (result.gender) {
                document.getElementById('predicted-gender').style.color = 'black'
                document.getElementById('predicted-gender').innerHTML = result.gender;
                document.getElementById('predicted-probability').innerHTML = result.probability;
                console.log(result);
            } else {
                document.getElementById('predicted-gender').innerHTML = "Gender not found";
                document.getElementById('predicted-gender').style.color = 'red'
                document.getElementById('predicted-probability').innerHTML = "";
            }

        } else {
            document.getElementById('predicted-gender').innerHTML = "Request was unsuccessful!";
            document.getElementById('predicted-gender').style.color = 'red'
            document.getElementById('predicted-probability').innerHTML = "";
        }

        savedMessage.style.display = 'none'
        savedMessage.innerHTML = "";
    }

    loadSavedGender()
}

//finding the cheked radio button and saving the key value to an object in localStorage
function Save() {
    if (savedNames == null) {
        savedNames = new Object();
    } else {
        console.log(savedNames);
    }

    
    var gender = null;
    //find the radio input which is checked
    var rates = document.getElementsByName('gender_selector');
    for (var i = 0; i < rates.length; i++) {
        if (rates[i].checked) {
            gender = rates[i].value
        }
    }
    if (gender == null) {
        alert('You should choose a gender first to save!')
        return
    }

    var name = document.getElementById('name-input').value
    savedNames[name] = gender

    localStorage.setItem('saved', JSON.stringify(savedNames))

    var savedMessage = document.getElementById("save-message");

    savedMessage.style.display = 'flex'
    savedMessage.style.color = 'green'
    savedMessage.innerHTML = "Successfully saved";
    setTimeout(function () {
        savedMessage.style.display = 'none'
        savedMessage.innerHTML = "";
    }, 1000);
}

// cheking the localStorage to find whether there is a saved answer for the entered name and show/hide
// the answer box 
function loadSavedGender() {
    var name = document.getElementById('name-input').value

    var x = document.getElementById("saved-answers-box");

    if (name in savedNames) {
        var savedGender = savedNames[name]
        document.getElementById('saved-gender').innerHTML = savedGender;
        x.style.display = "flex";
    } else {
        x.style.display = "none";
    }
}

// deleting a key value pair form object saved in localStorage
function clearSavedGender() {
    var name = document.getElementById('name-input').value

    if (name in savedNames) {
        var x = document.getElementById("saved-answers-box");
        delete savedNames[name]
        x.style.display = "none";
    }
}