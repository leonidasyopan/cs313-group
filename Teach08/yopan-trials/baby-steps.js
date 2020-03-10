var numbers = process.argv;

var sum = 0;

for (i = 2; i < numbers.length; i++) {
    var j = Number(numbers[i]);
    sum += j;
}

console.log(sum);