//Q-1
/* Ans- 10
		-6

*/

//Q-2
// Ans - 5 4 3 2

//Q-3
/* Ans - 

const input = [
{ name: "Roorkee", rainfall: [5, 6, 5, 5, 4, 7, 8] },
{ name: "Pauri", rainfall: [3, 3, 3, 1, 2, 2, 2] },
];

function rainDance(input){
	const resultArr = [];
	for(const obj of input){
		const result = {};
		const {name, rainfall} = obj;
		let avg = 0;
		for(const data of rainfall){
			avg += data;
		}
		avg /= rainfall.length;

		result.name = name;
		result.avgRainfall = avg;
		
		resultArr.push(result);	
	}
	
	return resultArr;
}

console.log(rainDance(input));
*/


//Q-4
/* Ans -
const obj = {
	newObj: {
		obj2: {
			obj5: {
				one: 1,
			},
		},
	},
	obj3: {
		obj4: { two: 2 },
	},
};

function flatten(obj, newKey){
	const flattened = {};
	Object.keys(obj).forEach((key)=>{
		if(typeof obj[key] === 'object' && obj[key] != null) {
			Object.assign(flattened, flatten(obj[key], newKey+"."+key))
		} else {
			flattened[newKey] = obj[key];
		}
	})

	return flattened;
}

console.log(flatten(obj, ""));
*/

//Q-5
/*Ans - [1,2,3]
		9
		undefined
*/

//Q-6
/* Ans- 1
		2
		5
		6
*/

//Q-7
/* Ans-

*****Code*****
let a = "This only works if and only if";
let b = a.slice(a.indexOf("only"));
let c = b.lastIndexOf("only");
b[c] = "i";
console.log(a);
console.log(b);

*****Output****
This only works if and only if
only work if and only if

*****Explaination****
This code works and line number 93 doesn't throw an error because we are not using strict mode. Javascript silentyly fails and ignores the string mutation and moves on. 
Whereas in strict mode this code will produce an error.
*/

//Q-8
/* Ans-
function decToBin(num){
	let str = "";
	while(num > 0){
		let rem = num % 2;
		str = rem + str;
		num = Number.parseInt(num / 2);
	}
	return str;
}
*/

//Q-9
/* Ans -
function spoon(word){
	const arr = word.split(' ');
	const temp = arr[0][0];
	arr[0] = arr[1][0] + arr[0].slice(1);
	arr[1] = temp + arr[1].slice(1);

	return arr.join(" ");
}

console.log(spoon("kite flying"));
*/

//Q-10
/* Ans- 14
		14
******Explaination*****
JavaScript supports overriding not overloading, meaning, that if you define two functions with the same name,
the last one defined will override the previously defined version and every time a call will be made to the function, the last defined one will get executed.


//Q-11
/* Ans- undefinded
		Argument Object
		2
		Error
*/

//Q-12
/* Ans-*  JSON */
// let obj = {"concept":""};
// console.log(
// JSON.parse(
// JSON.stringify(obj).slice(0, 12) + "JSON" + JSON.stringify(obj).slice(12)
// ).concept
// );
// console.log(JSON.stringify(obj).slice(0,12));


//Q-13
/* Ans- undefined
		3
		undefined
		6
		6
		2
		2
		2
*/


//Q-14
let users = [
{
	name: "Rajneesh",
	age: 34,
	address: {
		local: "22 Alaknanda",
		city: "Dehradun",
		state: "UK",
	},
	orders: [{ id: 1, name: "GOT Book Series" }],
},
{
	name: "Bhavesh",
	age: 37,
	address: {
		local: "48 DT Row",
		city: "Hyderabad",
		state: "AP",
	},
},
{
	name: "Jasbir",
	age: 38,
	address: {
		local: "196 Lama Bhavan",city: "Gangtok",
		state: "Sikkim",
	},
	orders: [
		{ id: 1, name: "Chair" },
		{ id: 2, name: "PS5" },
	],
},
];

function updateUsers(users, userObject, item) {
	//write your code here
	
}
console.log(
JSON.stringify(
updateUsers(
users,
{
name: "Rajneesh",
age: 34,
address: {
local: "22 Alaknanda",
city: "Dehradun",
state: "UK",},
},
"GOT Book Series"
)
)
);
console.log(
JSON.stringify(
updateUsers(users, {
name: "Ravi",
age: 24,
address: {
local: "25 Iroda",
city: "Dehradun",
state: "UK",
},
})
)
);
console.log(
JSON.stringify(
updateUsers(
users,{
name: "Ravi",
age: 24,
address: {
local: "25 Iroda",
city: "Dehradun",
state: "UK",
},
},
"Chair"
)
)
);
console.log(
JSON.stringify(
updateUsers(
users,
{
name: "Rajneesh",
age: 34,
address: {
local: "22 Alaknanda",
city: "Dehradun",
state: "UK",},
},
"Fan"
)
)
);

