// should not use this
// but doing it this way you can add properties to the string
const name1 = 'Jeff';
const name2 = new String('Jeff');

name2.foo = 'bar';
console.log(typeof name1);

// samples of other kine of constructor
// Number
const num1 = 5;
const num2 = new Number(5)

console.log(num1);
console.log(num2)

// Boolean
const bool1 = true;
const bool2 = new Boolean(true)

console.log(typeof bool1)
console.log(typeof bool2)