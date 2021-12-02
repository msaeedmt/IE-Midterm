var savedNames = JSON.parse(localStorage.getItem('saved'));

function Submit() {
    var name = document.getElementById('name-input').value
    var regex = /^[a-zA-Z ]*$/;
    // var regex = /^^[\u0600-\u06FF\s]*$/;

    if (!name.match(regex) || name.length > 255 || name.length == 0) {
        alert('Name should contains only space and alphabets!')
        return
    }

    const Http = new XMLHttpRequest();
    const url = `https://api.genderize.io/?name=${name}`;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(Http.responseText);
            if (result.gender) {
                document.getElementById('predicted-gender').style.color = 'black'
                document.getElementById('predicted-gender').innerHTML = result.gender;
                document.getElementById('predicted-probability').innerHTML = result.probability;
                console.log(result);
            } else {
                document.getElementById('predicted-gender').innerHTML = "Not found";
                document.getElementById('predicted-gender').style.color = 'red'
                document.getElementById('predicted-probability').innerHTML = "";
            }

        } else {
            document.getElementById('predicted-gender').innerHTML = "Not found";
            document.getElementById('predicted-gender').style.color = 'red'
            document.getElementById('predicted-probability').innerHTML = "";
        }
    }
    loadSavedGender()
}

function Save() {
    if (savedNames == null) {
        savedNames = new Object();
    } else {
        console.log(savedNames);
    }

    var gender;
    var rates = document.getElementsByName('gender_selector');
    for (var i = 0; i < rates.length; i++) {
        if (rates[i].checked) {
            gender = rates[i].value
        }
    }
    var name = document.getElementById('name-input').value
    savedNames[name] = gender

    localStorage.setItem('saved', JSON.stringify(savedNames))
}

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

function clearSavedGender() {
    var name = document.getElementById('name-input').value

    if (name in savedNames) {
        var x = document.getElementById("saved-answers-box");
        delete savedNames[name]
        x.style.display = "none";
    }
}