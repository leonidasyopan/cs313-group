const process = (firstNumber, secondNumber, operator) => {
    let result = 0;
    switch (operator) {
        case "addition":
            result = firstNumber + secondNumber;
            break;
        case "subtraction":
            result = firstNumber - secondNumber;            
            break;
        case "multiplication":
            result = firstNumber * secondNumber;
            break;
        case "division":
            result = firstNumber / secondNumber;
            break;
        default:
            console.log("Error: No operator selected");
        }

        let resultDiv = document.querySelector("#display-results")

        console.log(result);
        return result;
}

exports.process = process;