const post_form = document.querySelector("[name = 'postForm']");
const firstName = document.querySelector("[name = 'first']");
const secondName = document.querySelector("[name = 'second']");
const address = document.querySelector("[name = 'email']");
const date = document.querySelector("[name = 'date']");
const gender = document.querySelectorAll("[name = 'gender']");
const teh = document.querySelectorAll("[name = 'teh']");
const submitbtn = document.querySelector("[name = 'submit_btn']");
const rem_check = document.querySelector("[name = 'remember']");
const passName = document.querySelectorAll("[name = 'password']");

var validationSummary = "";

function validate(form) {
    let result = true;
    validationSummary = "";
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (!firstName.value) {
        result = false;
        validationSummary += "Имя пустое!\n";
    }
    if (!secondName.value) {
        result = false;
        validationSummary += "Фамилия пуста!\n";
    }
    if (!address.value) {
        result = false;
        validationSummary += "Логин пуст!\n";
    }
    else if (reg.test(address.value) == false) {
        result = false;
        validationSummary += "Введите корректный e-mail!\n";
    }

    return result;
}

function dateAge(form) {
    let result = true;

    if (!date.value) {
        result = false;
        validationSummary += "Дата пустая!\n";
    }
    else {
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //Текущя дата без времени
        let dob = new Date(date.value);
        let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate()); //ДР в текущем году
        let age = today.getFullYear() - dob.getFullYear();

        //Если ДР в этом году ещё предстоит, то вычитаем из age один год
        if (today < dobnow) {
            age = age - 1;
        }

        if (age < 18) {
            result = false;
            validationSummary += "Ваш возраст меньше 18!\n";
        }
    }
    return result;
}

function checkTeh(form) {
    let count = 0;
    let result = true;

    for (let check of teh) {
        if (check.checked) count++;
    }

    if (count < 3) {
        result = false;
        validationSummary += "Должно быть выбрано 3 и более значений!\n";
    }

    return result;
}

function checkPass(form) {
    let result = true;
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/;

    if (!passName[0].value) {
        result = false;
        validationSummary += "Пароль пуст!\n";
    }
    else if (passName[0].value !== passName[1].value) {
        result = false;
        validationSummary += "Пароли должны совпадать\n";
    }
    else if (reg.test(passName[0].value) == false) {
        result = false;
        validationSummary += "Введите корректный пароль!\n";
    }
    return result;
}

var ls = window.localStorage;

function checkRemember(form) {
    if (rem_check.checked) {
        const myLog = JSON.stringify(address.value);
        const myPass = JSON.stringify(passName[0].value);
        if (window.localStorage != undefined) {
            ls.setItem("login", myLog);
            ls.setItem("password", myPass);
        }
        else {
            document.cookie = "login=" + myLog + "; password=" + myPass + "; ";
        }
    }
    else {
        ls.clear();
    }
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

window.addEventListener("load", (e) => {
    if (ls.length > 0) {
        address.value = JSON.parse(ls.getItem("login"));
        passName[0].value = JSON.parse(ls.getItem("password"));
    }
    else if (document.cookie.length > 0) {
        address.value = getCookie("login");
        passName[0].value = getCookie("password");
    }
})

submitbtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (validate(this) && dateAge(this) && checkTeh(this) && checkPass(this)) {
        checkRemember(this);
        post_form.submit();
        alert("Отправлено!");
    }
    else {
        alert(validationSummary);
    }
})

