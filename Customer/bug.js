class Bank {
    #balance // private variable
    #history
    constructor(name) {
        this.accountHolderName = name
        this.#balance = 0
        this.#history = [{
            balance: this.#balance,
            addDate: (new Date()).toLocaleString()
        }]
    }
    // set methods
    set addAmount(amount) {
        const oldBalance = this.#balance;
        const oldHistory = this.#history
        this.#balance = oldBalance + amount
        this.#history = [...oldHistory, { newAmount: amount, addDate: (new Date()).toLocaleString() }]
    }

    // get methods
    get getBalance() {
        return this.#balance
    }

    // get history
    get getHistory() {
        return this.#history
    }

    #getInfo(){
        return this.accountHolderName;
    }

    publicInfo(){
        const info = this.#getInfo()
        return info
    }

}
const newAccount = new Bank('John Doe')

newAccount.addAmount = 1000
console.log(newAccount.getBalance)

newAccount.addAmount = 500
console.log(newAccount.getBalance)
console.log(newAccount.getHistory)

console.log(newAccount.publicInfo())
console.log(Object.getPrototypeOf(newAccount))


newAccount.addAmount = 500000
console.log(newAccount.getBalance)
console.log(newAccount.getHistory)




// ===================== Event Listener ==============

//Create Customer Form

document.getElementById('createCustomerForm').addEventListener('submit',(e) =>{
    e.preventDefault();
    try{
        const name = document.getElementById('customerName').value ;
        const deposit = document.getElementById('deposit').value ;
        console.log(name, deposit)
    }catch(error){
        console.log(error)

    }
}
)