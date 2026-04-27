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
// const newAccount = new Bank('John Doe')

// newAccount.addAmount = 1000
// console.log(newAccount.getBalance)

// newAccount.addAmount = 500
// console.log(newAccount.getBalance)
// console.log(newAccount.getHistory)

// console.log(newAccount.publicInfo())
// console.log(Object.getPrototypeOf(newAccount))


// newAccount.addAmount = 500000
// console.log(newAccount.getBalance)
// console.log(newAccount.getHistory)




// ===================== Event Listener ==============

//Create Customer Form
document.getElementById('createCustomerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        const name = document.getElementById('customerName').value;
        const deposit = parseFloat(document.getElementById('deposit').value);
        console.log(name, deposit);

        // Create the new account object inside the event listener
        const newAccount1 = new Bank(name);
        newAccount1.addAmount = deposit;

        console.log(newAccount1.getHistory);
        console.log(newAccount1.publicInfo());

        // Dynamically show and hide the detail section by adding/removing a class
        document.getElementById('detail').addEventListener('click', (e) => {
            console.log("Show detail button clicked");
            e.preventDefault();
            const detailSection = document.getElementById('detail-section');
            detailSection.classList.remove('hidden'); // Show the section

            const p = document.getElementById('info').textContent = newAccount1.publicInfo();
            const bal = document.getElementById('bal').textContent = newAccount1.getBalance;
        });

        document.getElementById('hide').addEventListener('click', (e) => {
            console.log("Hide button clicked");
            e.preventDefault();
            const detailSection = document.getElementById('detail-section');
            detailSection.classList.add('hidden'); // Hide the section

            const p = document.getElementById('info').textContent = "";
            const bal = document.getElementById('bal').textContent = "";
        });

    } catch (error) {
        console.log(error);
    }
});