function Submit() {
    var name = document.getElementById('name-input').value
    var regex = /^[a-zA-Z ]*$/;
    // var regex = /^^[\u0600-\u06FF\s]*$/;

    if (!name.match(regex) || name.length > 255) {
        alert('Name should contains only space and alphabets!')
        return
    }

    const Http = new XMLHttpRequest();
    const url = `https://api.genderize.io/?name=${name}`;
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            var result = JSON.parse(Http.responseText);
            console.log(result);
        }
    }
}