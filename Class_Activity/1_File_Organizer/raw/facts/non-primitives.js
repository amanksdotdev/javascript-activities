/*  1) functions
    2) arrays
    3) objects
*/


//*********FUNCTIONS************
//function definition
function greet(name) {
    console.log("Hello " , name);
}
//function invokation
greet("Jasbir");


//*********ARRAYS***********
let arr = [
    1,
    "string",
    'also a string',
    true,
    null,
    undefined,
    [1,2,3,4,5],
    function funcInArray() {
        console.log("I am inside the function which is inside array");
        return "Returned from function inside array";
    }
];

console.log(arr[arr.length - 1]());  // calling function
console.log(arr[6][4]);   // print 5

//slice -> returns subarray from start-index to end-index - 1  (doesn't affect original array)
console.log("Sliced array -> ",arr.slice(1,3)); 

//splice -> removes elements in array from start-index to number of elements given  (affects original array)
console.log("Spliced array -> ",arr.splice(4,2));

//split
let str = "123 232 423 131";
let numArr = str.split(" ");
console.log("splitted string into array -> ", numArr);

//parseInt
let sum = 0;
for(let i = 0; i < numArr.length; i++) {
    sum += parseInt(numArr[i]);
}
console.log("sum of numArr -> ", sum);


/*********OBJECTS***********/

