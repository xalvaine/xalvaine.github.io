function close() {
    body.classList.remove('overflow-hidden');
    exchange.classList.add('visually-hidden');
    attention.classList.add('visually-hidden');
    success.classList.add('visually-hidden');
    howTo.classList.add('visually-hidden');
    cancel.classList.add('visually-hidden');
}

//Sections
let body = document.querySelector('body'),
    exchange = document.querySelector('#exchange'),
    attention = document.querySelector('#attention'),
    success = document.querySelector('#success'),
    howTo = document.querySelector('#how-to'),
    cancel = document.querySelector('#cancel');

//Buttons
let to_attention = document.querySelector('#to_attention'),
    exchange_to_attention = document.querySelector('#exchange_to_attention'),
    attention_to_exchange = document.querySelector('#attention_to_success'),
    exchange_to_howTo = document.querySelector('#exchange_to_how-to'),
    howTo_to_exchange = document.querySelector('#how-to_to_exchange'),
    exchange_to_cancel = document.querySelector('#exchange_to_cancel'),
    cancel_to_exchange = document.querySelector('#cancel_to_exchange'),
    cancel_close = document.querySelector('#cancel_close');

//Close pop-up close when clicked outside
popups = document.querySelectorAll('.popup');
[].forEach.call(popups, function (popup) {
    popup.onclick = function (event) {
        if ((event.target === popup) || (event.target === popup.querySelector('.popup__wrapper'))) {
            f(popup);
        }
    };
});

//Moving between different sections
let canopen1 = 0;
let canopen2 = 0;

to_attention.addEventListener('click', function (event) {
    event.preventDefault();
    if (canopen2 === 0) {
        document.querySelector('.form__range--second').classList.add('form__range--incorrect');
        document.querySelector('.form__quantity--second').classList.add('form__quantity--incorrect');
    }
    if (canopen1 === 0) {
        document.querySelector('.form__range--first').classList.add('form__range--incorrect');
        document.querySelector('.form__quantity--first').classList.add('form__quantity--incorrect');
    }
    if (canopen1 === 0 || canopen2 === 0) {
        return 0;
    }
    body.classList.add('overflow-hidden');
    attention.classList.remove('visually-hidden');
});

exchange_to_attention.addEventListener('click', function () {
    exchange.classList.add('visually-hidden');
    success.classList.remove('visually-hidden');
});

attention_to_exchange.addEventListener('click', function () {
    attention.classList.add('visually-hidden');
    exchange.classList.remove('visually-hidden');
});

exchange_to_howTo.addEventListener('click', function () {
    exchange.classList.add('visually-hidden');
    howTo.classList.remove('visually-hidden');
});

howTo_to_exchange.addEventListener('click', function () {
    howTo.classList.add('visually-hidden');
    exchange.classList.remove('visually-hidden');
});

exchange_to_cancel.addEventListener('click', function () {
    f()
});

cancel_close.addEventListener('click', function () {
    cancel.classList.add('visually-hidden');
    body.classList.remove('overflow-hidden');
});

function f() {
    cancel.classList.remove('visually-hidden');

    cancel_to_exchange.addEventListener('click', function () {
        cancel.classList.add('visually-hidden');
        return 0;
    });

    cancel_close.addEventListener('click', function () {
        close();
        return 0;
    });
}

//forms-swap
document.querySelector('.form__swap').addEventListener('click', function () {
    let forms = document.querySelectorAll('.form__section--swappable');
    [].forEach.call(forms, function (form) {
        form.classList.toggle('form__section--second');
    });
    let swapping = document.querySelectorAll('.form__wrapper--right');
    [].forEach.call(swapping, function (swapp) {
        swapp.classList.toggle('form__wrapper--swap');
    });
});


//select-values

let first_select = "Bitcoin";
let second_select = "Qiwi";
let bicoin = "min 0.001 BTC / max 1 BTC";
let cash = "min 8000 RUB / max 99000 RUB";

let convert_mode = "";
buttons = document.querySelectorAll('.interaction__button ');
[].forEach.call(buttons, function (button) {
    button.onclick = function () {
        if (button === document.querySelector('.interaction__button--highlighted')) {
            return 0;
        }
        document.querySelector('.interaction__button--last').classList.remove('interaction__button--last');
        document.querySelector('.interaction__button--highlighted').classList.add('interaction__button--last');
        document.querySelector('.interaction__button--highlighted').classList.remove('interaction__button--highlighted');
        button.classList.add('interaction__button--highlighted');
        convert_mode = button.id;

        document.querySelector('.form__select-label--first').classList.remove('form__select-label--qiwi');
        document.querySelector('.form__select-label--first').classList.remove('form__select-label--bitcoin');
        document.querySelector('.form__select-label--second').classList.remove('form__select-label--qiwi');
        document.querySelector('.form__select-label--second').classList.remove('form__select-label--bitcoin');
        document.querySelector('.form__select-label--second').classList.remove('form__select-label--card');

        if (convert_mode === "btc-to-qiwi") {
            document.querySelector('.form__select-label--first').classList.add('form__select-label--bitcoin');
            document.querySelector('.form__select-label--second').classList.add('form__select-label--qiwi');
            document.querySelector('.form__range--first').innerHTML = bicoin;
            document.querySelector('.form__range--second').innerHTML = cash;
            first_select = "Bitcoin";
            second_select = "Qiwi";
            document.querySelector('#btc-address').classList.add('visually-hidden');
            document.querySelector('#card-number').classList.add('visually-hidden');
            document.getElementsByName('currency-quantity')[0].placeholder = '1.388';
            document.getElementsByName('wallet-profit')[0].placeholder = '711494,77';
        } else if (convert_mode === "qiwi-to-btc") {
            document.querySelector('.form__select-label--first').classList.add('form__select-label--qiwi');
            document.querySelector('.form__select-label--second').classList.add('form__select-label--bitcoin');
            document.querySelector('.form__range--first').innerHTML = cash;
            document.querySelector('.form__range--second').innerHTML = bicoin;
            first_select = "Qiwi";
            second_select = "Bitcoin";
            document.querySelector('#btc-address').classList.remove('visually-hidden');
            document.querySelector('#card-number').classList.add('visually-hidden');
            document.getElementsByName('currency-quantity')[0].placeholder = '711494,77';
            document.getElementsByName('wallet-profit')[0].placeholder = '1.388';
        } else {
            document.querySelector('.form__select-label--first').classList.add('form__select-label--bitcoin');
            document.querySelector('.form__select-label--second').classList.add('form__select-label--card');
            document.querySelector('.form__range--first').innerHTML = bicoin;
            document.querySelector('.form__range--second').innerHTML = cash;
            first_select = "Bitcoin";
            second_select = "Карты";
            document.querySelector('#btc-address').classList.add('visually-hidden');
            document.querySelector('#card-number').classList.remove('visually-hidden');
            document.getElementsByName('currency-quantity')[0].placeholder = '1.388';
            document.getElementsByName('wallet-profit')[0].placeholder = '711494,77';
        }
        document.querySelector('#send').value = first_select;
        document.querySelector('#get').value = second_select;
        document.querySelector('.crypto-to-card').classList.add('visually-hidden');
        document.querySelector('.crypto-to-qiwi').classList.add('visually-hidden');
        document.querySelector('.card-to-crypto').classList.add('visually-hidden');
        document.querySelector('.qiwi-to-crypto').classList.add('visually-hidden');
        if (first_select === "Bitcoin" || first_select === "Litecoin" || first_select === "USDT") {
            if (second_select === "Карты") {
                document.querySelector('.crypto-to-card').classList.remove('visually-hidden');
            } else {
                document.querySelector('.crypto-to-qiwi').classList.remove('visually-hidden');
            }
        } else if (first_select === "Карты") {
            document.querySelector('.card-to-crypto').classList.remove('visually-hidden');
        } else {
            document.querySelector('.qiwi-to-crypto').classList.remove('visually-hidden');
        }
    };
});


document.querySelector('#send').addEventListener('change', function (event) {
    let elem = document.querySelector('#get');
    first_select = event.target.value;
    while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
    }
    if (event.target.value === "Qiwi" || event.target.value === "Карты") {
        elem.innerHTML =
            "<option class=\"form__option\" value=\"Litecoin\" selected>Litecoin</option>\n" +
            "<option class=\"form__option\" value=\"Bitcoin\">Bitcoin</option>\n" +
            "<option class=\"form__option\" value=\"USDT\">USDT</option>";
        second_select = "Litecoin";
        document.querySelector('.form__range--second').innerHTML = litecoin;
        document.querySelector('.form__range--first').innerHTML = cash;
        document.getElementsByName('currency-quantity')[0].placeholder = '711494,77';
        document.getElementsByName('wallet-profit')[0].placeholder = '1.388';
        document.querySelector('.form__select-label--first').classList.remove('form__select-label--bitcoin');
        document.querySelector('.form__select-label--first').classList.add('form__select-label--qiwi');
        document.querySelector('.form__select-label--second').classList.remove('form__select-label--qiwi');
        document.querySelector('.form__select-label--second').classList.add('form__select-label--bitcoin');
    } else {
        elem.innerHTML =
            "<option class=\"form__option\" value=\"Qiwi\" selected>Qiwi</option>\n" +
            "<option class=\"form__option\" value=\"Карты\">Карты</option>";
        second_select = "Qiwi";
        document.querySelector('.form__range--second').innerHTML = cash;
        document.getElementsByName('currency-quantity')[0].placeholder = '1.388';
        document.getElementsByName('wallet-profit')[0].placeholder = '711494,77';
        document.querySelector('.form__select-label--first').classList.remove('form__select-label--qiwi');
        document.querySelector('.form__select-label--first').classList.add('form__select-label--bitcoin');
        document.querySelector('.form__select-label--second').classList.remove('form__select-label--bitcoin');
        document.querySelector('.form__select-label--second').classList.add('form__select-label--qiwi');
        if (first_select === "Bitcoin") {
            document.querySelector('.form__range--first').innerHTML = bicoin;
        } else if (first_select === "Litecoin") {
            document.querySelector('.form__range--first').innerHTML = litecoin;
        } else {
            document.querySelector('.form__range--first').innerHTML = USDT;
        }
    }

    if (event.target.value === "Qiwi" && first_select === "Bitcoin") {
        document.querySelector('.form__wrapper--right').classList.remove('visually-hidden');
    } else {
        document.querySelector('.form__wrapper--right').classList.add('visually-hidden');
    }
});


//Qiwi to Bitcoin
document.querySelector('#get').addEventListener('change', function (event) {
    console.log(first_select);
    second_select = event.target.value;
    if (event.target.value === "Bitcoin" && first_select === "Qiwi") {
        document.querySelector('.form__wrapper--right').classList.remove('visually-hidden');
    } else {
        document.querySelector('.form__wrapper--right').classList.add('visually-hidden');
    }

    if (second_select === "Bitcoin") {
        document.querySelector('.form__range--second').innerHTML = bicoin;
    } else if (second_select === "Litecoin") {
        document.querySelector('.form__range--second').innerHTML = litecoin;
    } else if (second_select === "USDT") {
        document.querySelector('.form__range--second').innerHTML = USDT;
    } else {
        document.querySelector('.form__range--second').innerHTML = cash;
    }
});

//check spelling
function check_first(elem) {
    console.log(elem);
    let min = 0, max = 0;
    if (first_select === "Bitcoin") {
        min = 0.001;
        max = 1;
    }
    if (first_select === "Litecoin") {
        min = 0.001;
        max = 1;
    }
    if (first_select === "USDT") {
        min = 0.001;
        max = 1;
    }
    if (first_select === "Qiwi" || first_select === "Карты") {
        min = 8000;
        max = 99000;
    }

    if (elem < min || elem > max) {
        document.querySelector('.form__range--first').classList.add('form__range--incorrect');
        document.querySelector('.form__quantity--first').classList.add('form__quantity--incorrect');
        canopen1 = 0;
    } else {
        document.querySelector('.form__range--first').classList.remove('form__range--incorrect');
        document.querySelector('.form__quantity--first').classList.remove('form__quantity--incorrect');
        canopen1 = 1;
    }
}

function check_second(elem) {
    console.log(elem);
    let min = 0, max = 0;
    if (second_select === "Bitcoin") {
        min = 0.001;
        max = 1;
    }
    if (second_select === "Litecoin") {
        min = 0.001;
        max = 1;
    }
    if (second_select === "USDT") {
        min = 0.001;
        max = 1;
    }
    if (second_select === "Qiwi" || second_select === "Карты") {
        min = 8000;
        max = 99000;
    }

    if (elem < min || elem > max) {
        document.querySelector('.form__range--second').classList.add('form__range--incorrect');
        document.querySelector('.form__quantity--second').classList.add('form__quantity--incorrect');
        canopen2 = 0;
    } else {
        document.querySelector('.form__range--second').classList.remove('form__range--incorrect');
        document.querySelector('.form__quantity--second').classList.remove('form__quantity--incorrect');
        canopen2 = 1;
    }
}

//swapping popup text
form_selects = document.querySelectorAll('.form__select');
[].forEach.call(form_selects, function (selects) {
    selects.onchange = function () {
        document.querySelector('.crypto-to-card').classList.add('visually-hidden');
        document.querySelector('.crypto-to-qiwi').classList.add('visually-hidden');
        document.querySelector('.card-to-crypto').classList.add('visually-hidden');
        document.querySelector('.qiwi-to-crypto').classList.add('visually-hidden');
        if (first_select === "Bitcoin" || first_select === "Litecoin" || first_select === "USDT") {
            if (second_select === "Карты") {
                document.querySelector('.crypto-to-card').classList.remove('visually-hidden');
            } else {
                document.querySelector('.crypto-to-qiwi').classList.remove('visually-hidden');
            }
        } else if (first_select === "Карты") {
            document.querySelector('.card-to-crypto').classList.remove('visually-hidden');
        } else {
            document.querySelector('.qiwi-to-crypto').classList.remove('visually-hidden');
        }
    };
});