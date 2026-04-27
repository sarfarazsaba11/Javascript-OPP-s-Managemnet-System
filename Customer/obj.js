// Objects with classes
// Encapsulation
// hide the data and complexity
// Simple Definition: 
// Encapsulation = Wrapping data + methods together and controlling access to them.

// Bad Practice
function Banks(){
    this.amount = 0
}
// const yourAccount = new Bank()
// classes are syntactic suger of Prototyal Inheritence
// because behined the scene js engine controlls these
// classes with the help of prototypal Inheritence

class Bank {
    #balance // private data
    constructor() {
        
    }
}
const newAccount = new Bank();
// here the bug is
// newAccount is an object, below are asigning a new property balance to it,
// therefore, when we get new balance it gives us 1000, without touching the 
// Bank class
newAccount.#balance = 1000
console.log(`New Balance: ${newAccount.balance}`)

const obj = {}
obj.balance = 1000
console.log(obj.balance)



