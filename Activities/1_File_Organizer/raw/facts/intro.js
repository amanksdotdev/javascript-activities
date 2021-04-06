console.log("Hello");  //print

var test = 12;     //variable
let newTest = 12;  //es6 variable
console.log(test);

function isPrime(num) {  //function to find prime
    if(num < 2){
        return false;
    }

    for(var i = 2; i*i <= num; i++){
        if(num % i == 0) {
            return false;
        }
    }
    return true;
}

//if else
if(isPrime(test)) {
    console.log("Prime");
} else {
    console.log("Not prime");
}

//switch
let value = 3;
switch(value){
    case 1:
    case 2:
    case 3:
        console.log("top");
        break;
    default:
        console.log("Ok");
}
