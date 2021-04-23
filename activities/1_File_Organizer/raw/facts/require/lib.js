let a = 'variable a inside libjs';

function f1(){
    console.log('library function f1 called');
}
function f2(){
    console.log('library function f2 called');
}

module.exports = {
    varName: a,
    fn: f1
}