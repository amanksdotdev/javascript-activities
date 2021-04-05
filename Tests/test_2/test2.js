// Q1 -
// side effects
// 	1. the global array arr gets mutated.

// pure function :

// const arr = [1,2,3,4];

// function f(arr){
// 	const newArr = [];
// 	for(x in arr){
// 		newArr.push(0);
// 	}
// 	return newArr;
// }


// Q2-

// let obj = {
// 	1:0,
// 	2:1,
// 	3:2,
// 	4:3,
// 	5:4,
// 	length:5,
// };


// function f(obj) {
// 	const newObj = {...obj};
// 	for(let i = 1; i < newObj.length; i++){
// 		newObj[i] = newObj[i] + 1;
// 	}
// 	delete newObj['length'];

// 	return newObj;
// }

// function g(fn, obj){
// 	obj = fn(obj);
// 	for(const x in obj){
// 		console.log(`at index ${x} we have value ${obj[x]}`);
// 	}
// }

// g(f,obj)

// Q3
// function f(x,y){
// 	if(y){
// 		return x*y;
// 	}else return function(y){
// 		return x*y;
// 	}
// }

// let v = f(2)(3);
// console.log(v);

// let a = ['a', 'b'];
// a[2] = a;

// function f(a){
// 	a = a[2];
// 	console.log(a);
// 	let n = Array("a", "b");
// 	console.log(a[2] = n);
// 	console.log(a);
// 	console.log(n);
// 	a = n;
// 	console.log(a);
// }

// console.log(a);
// f(a);
// console.log(a);

// q-7
// let count = 0;
// let interval = setInterval(function() {
// 	console.log(count);
// 	count++;
// }, 100);

// setTimeout(function(){
// 	clearInterval(interval);
// 	interval = setInterval(function(){
// 		console.log(count);
// 		count--;
// 		if(count < 0) clearInterval(interval);
// 	});
// }, 500); 


// q-9
// function globalFunction(x){
// 	return function of(y){
// 		return function ifun(z){
// 			return x+y+z;
// 		}
// 	}
// }

// console.log(globalFunction(2)(3)());

// Q-10
// let arr = ["a", "b", "c", "d", 1, 2, 3, 4];
// arr.map(function (e) {
// return 2 * e;
// });
// (function () {
// arr.filter(function () {});
// })();
// console.log(arr);
// let nArr;
// nArr = arr.filter(function (e) {
// return Number.isInteger(e);
// });
// nArr = new Array();
// console.log(nArr);
// nArr = arr
// .filter(function (e) {
// return !Number.isInteger(e);
// })
// .map(function (e) {
// return e + 1;
// });
// console.log(nArr);