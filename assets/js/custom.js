function isValidFormChangePassword() {
    var login       = document.querySelector("#login");
    var email       = document.querySelector("#email");
    var pass1       = document.querySelector("#pass1");
    var pass2       = document.querySelector("#pass2");
    var pass2label  = document.querySelector("#pass2label");

    login.classList.remove("error");
    email.classList.remove("error");
    pass1.classList.remove("error");
    pass2.classList.remove("error");
    pass2label.classList.remove("errorpass");

    var check = true;

    if(!login.value || login.value.length == '') { login.classList.add("error"); check = false; }
    if(!email.value || email.value.length == '') { email.classList.add("error"); check = false; }
    if(!pass1.value || pass1.value.length == '') { pass1.classList.add("error"); check = false; }
    if(!pass2.value || pass2.value.length == '') { pass2.classList.add("error"); check = false; }
    if(pass1.value != pass2.value || pass1.value == '' || pass2.value == '') {
        pass2label.classList.add("errorpass");
        check = false;
    }
    return check;
}

var translations = {
    "error.fields.empty": "One or more fields are empty.",
    "error.fields.error": "Internal error. Some of the data might be incorrect.",
    "error.error.nochange": "Ошибка:\n\rНе удалось изменить пароль.\n\rПроверьте правильность ввода логина и e-mail.",
    "success.changed": "Пароль изменён успешно."
};

function setNewPassword() {

    var check = isValidFormChangePassword();
    if (check != true) return;

    var login = document.querySelector("#login").value;
    var email = document.querySelector("#email").value;
    var pass1 = document.querySelector("#pass1").value;

    var pass = md5(pass1);


    var xhr = new XMLHttpRequest();
    var url = "http://139.59.142.46:7776/api/password/reset";
    try{
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xhr.onreadystatechange = function() {

            if (xhr.readyState === 4 && xhr.status === 0) {
                alert("Ошибка:\n\rНе удалось выполнить запрос на изменение пароля.\n\rЕсли у вас установлен блокировщик рекламы Adblock - отключите его для этого сайта. Здесь всё равно нет рекламы :)");
            }

            if (xhr.readyState === 4 && (xhr.status === 400 || xhr.status === 200 )) {
                var json = JSON.parse(xhr.responseText);
                alert(translations[json.message]);
            }

        };
        var data = 'login=' + encodeURIComponent(login) + '&email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(pass);
        //var data = JSON.stringify({"login": login, "email": email, "password": pass});
        xhr.send(data);
    } catch(e){
      console.log('catch', e);
    }

}
