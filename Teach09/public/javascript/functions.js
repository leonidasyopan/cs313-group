function getResult() {
    var firstNumber = document.getElementById("firstNumber").value,
    secondNumber = document.getElementById("secondNumber").value,
    operator = document.getElementById("operator").value,
    url = '/math_service?firstNumber=' + firstNumber + '&secondNumber=' + secondNumber + '&operator=' + operator;
    ajax = new XMLHttpRequest();
    ajax.open('GET', url, true);

    //Send the proper header information along with the request
    //ajax.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    ajax.onreadystatechange = function() {//Call a function when the state changes.
        if(ajax.readyState == 4 && ajax.status == 200) {
            console.log(ajax.responseText);
            try {
                var object = JSON.parse(ajax.responseText)
                document.getElementById("result").innerHTML = object.value;
            }
            catch(err) {
                console.log(err.message + "in" + ajax.responseText)
            }
           
        }
    }
    ajax.send();
}