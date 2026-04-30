// Make Customer Class

class Customer {
    static customerCounter = 1000; // Static property for auto-incrementing ID

    constructor(name, email) {
        this.id = ++Customer.customerCounter;
        this.name = name;
        this.email = email;
        this.createdAt = new Date();
    }

    getInfo() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt.toLocaleDateString()
        };
    }
}

// Transaction Class - Records each transaction
class Transaction {
    constructor(type, amount, balanceAfter) {
        this.id = Date.now() + Math.random(); // Unique ID
        this.type = type; // 'deposit', 'withdraw', 'transfer-in', 'transfer-out'
        this.amount = amount;
        this.balanceAfter = balanceAfter;
        this.date = new Date();
    }

    getDetails() {
        return {
            id: this.id,
            type: this.type,
            amount: this.amount,
            balanceAfter: this.balanceAfter,
            date: this.date.toLocaleString()
        };
    }
}
class Account{

     static accountCounter = 10000; // Static property for account numbers

     constructor(customerId, initialDeposit = 0) {
        this.accountNumber = ++Account.accountCounter;
        this.customerId = customerId;
        this.balance = initialDeposit;
        this.transactions = []; // Array to store transaction history
        this.createdAt = new Date();
        this.isActive = true;

     }

 deposit(amount){
      if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        
  this.balance += amount;
  this.recordTransaction('deposit', amount);
  return this.balance;

}

   withdraw(amount) {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        
        if (amount > this.balance) {
            throw new Error('Insufficient balance');
        }
        
        this.balance -= amount;
        this.recordTransaction('withdraw', amount);
        return this.balance;
    }

     // Get current balance
    getBalance() {
        return this.balance;
    }

    // Get account information
    getAccountInfo() {
        return {
            accountNumber: this.accountNumber,
            customerId: this.customerId,
            balance: this.balance,
            type: this.constructor.name, // Gets class name
            createdAt: this.createdAt.toLocaleDateString(),
            isActive: this.isActive,
            transactionCount: this.transactions.length
        };
    }

    recordTransaction(type,amount){
        const transaction = new Transaction(type, amount, this.balance)
         this.transactions.push(transaction)

    }

}



class Bank {
    constructor(name) {
        this.name = name;
        this.customers = []; // Array to store all customers
        this.accounts = []; // Array to store all accounts
    }

    // Create new customer
    createCustomer(name, email) {
        // Validate email
        if (!this.validateEmail(email)) {
            throw new Error('Invalid email format');
        }
        
        const customer = new Customer(name, email);
        this.customers.push(customer);
        return customer;
    }

    // Create new account
    createAccount(customerId, initialDeposit = 0) {
        // Check if customer exists
        const customer = this.findCustomerById(customerId);
        if (!customer) {
            throw new Error('Customer not found');
        }
        
        let account = new Account(customerId, initialDeposit)
        
        this.accounts.push(account);
        return account;
    }

    // Find account by account number
    findAccount(accountNumber) {
        return this.accounts.find(acc => acc.accountNumber === parseInt(accountNumber));
    }

    // Find customer by ID
    findCustomerById(customerId) {
        return this.customers.find(cust => cust.id === parseInt(customerId));
    }

    // Find customer by name
    searchCustomerByName(name) {
        return this.customers.filter(cust => 
            cust.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    // Get all accounts of a customer
    getAccountsByCustomer(customerId) {
        return this.accounts.filter(acc => acc.customerId === parseInt(customerId));
    }

    // Get total bank balance (all accounts)
    getTotalBankBalance() {
        return this.accounts.reduce((total, acc) => total + acc.balance, 0);
    }

    // Get all customers
    getAllCustomers() {
        return this.customers.map(cust => cust.getInfo());
    }

    // Get all accounts
    getAllAccounts() {
        return this.accounts.map(acc => acc.getAccountInfo());
    }

    // Validate email format
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

const bank = new Bank("Js bank")

// const customer = bank.createCustomer("saba", "saba@gmail.com")
// const customer2 = bank.createCustomer("Haris","haris@gmail.com" )



// console.log(customer.getInfo(), customer2.getInfo())

// const acc1 = bank.createAccount("1001", 400)
// const acc2 = bank.createAccount("1002", 500)

// console.log(acc1.getAccountInfo(), acc2.getAccountInfo())


// ===================== Event Listener ==============

//Create Customer Form
document.getElementById('createCustomerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    try {
        const name = document.getElementById('customerName').value;
        const email = document.getElementById('email').value;

        // Create the new customer object inside the event listener
        const customer =  bank.createCustomer(name, email)
         showMessage(`User ${customer.name} created  successfully`)

        // Call displayCustomers to update the UI
        displayCustomers();

         // Reset form
        e.target.reset();

        // Dynamically show and hide the detail section by adding/removing a class
        document.getElementById('showCustomerDetail').addEventListener('click', (e) => {

            e.preventDefault();
            const customerdetailSection = document.getElementById('customerDetailSection');
            customerdetailSection.classList.remove('hidden'); // Show the section    
        });

        document.getElementById('hideCustomerDetail').addEventListener('click', (e) => {
            e.preventDefault();
            const detailSection = document.getElementById('customerDetailSection');
            detailSection.classList.add('hidden'); // Hide the section

      });

    } catch (error) {
        showMessage(error.message, "failure")
    }
});

//Create Account Form 
document.getElementById('createAccountForm').addEventListener('submit', (e) =>{
    e.preventDefault()
    try{
        const cusId = document.getElementById('customerId').value;
        const deposit = parseInt(document.getElementById('deposit').value);

         // Create the account by customerId object inside the event listener
        const customerAccount =  bank.createAccount(cusId,deposit)

        console.log(customerAccount)
        const customer = bank.findCustomerById(customerAccount.customerId)
        console.log(customer.name)
        showMessage(`User ${customer.name.toLowerCase()} account ${customerAccount.accountNumber} created  successfully`)
         
        // Call displayCustomers to update the UI
        displayAccounts();

         // Reset form
        e.target.reset();

        document.getElementById("showAccountDetail").addEventListener('click', ()=>{
            e.preventDefault();
            const showAccountDetail = document.getElementById("accountDetailSection")
            showAccountDetail.classList.remove('hidden');
        
        })

        document.getElementById("hideAccountDetail").addEventListener('click', ()=>{
            e.preventDefault();
            const hideAccountDetail = document.getElementById("accountDetailSection")
            hideAccountDetail.classList.add("hidden")
        })
        updateAccountDropdowns();
        
    }catch(error){
        showMessage(error.message, "failure")
    }
}
);
// ==================== UI FUNCTIONS ====================

// Show message to user
function showMessage(text, type = 'success') {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type} show`;
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 3000);
}

// Display all customers
function displayCustomers() {
    const container = document.getElementById('customer-detail');
    const customers = bank.getAllCustomers();
    
    if (customers.length === 0) {
        container.innerHTML = '<p>No customers yet.</p>';
        return;
    }
    if(customers.length != 0){
        
        container.innerHTML = customers.map(cust => `
            <div class="customer-item">
                <h4>👤 ${cust.name}</h4>
                <p>ID: ${cust.id}</p>
                <p>Email: ${cust.email}</p>
                <p>Created: ${cust.createdAt}</p>
            </div>
        `).join('');
    }
}

function displayAccounts() {
    const container = document.getElementById('account-detail');
    const accounts = bank.getAllAccounts();
    
    if (accounts.length === 0) {
        container.innerHTML = '<p>No accounts created yet.</p>';
        return;
    }
    if(accounts.length != 0){
        
        container.innerHTML = accounts.map(acc => `
            <div class="customer-item">
                <h4>👤 ${acc.accountNumber}</h4>
                <p>Customer ID: ${acc.customerId}</p>
                <p>Balance: ${acc.balance}</p>
            </div>
        `).join('');
    }
}


// Update all dropdowns with accounts
function updateAccountDropdowns() {
    const accounts = bank.getAllAccounts();
    const dropdowns = document.querySelectorAll('.account-select');
    
    dropdowns.forEach(dropdown => {
        dropdown.innerHTML = '<option value="">Select Account</option>';
        accounts.forEach(acc => {
            const customer = bank.findCustomerById(acc.customerId);
            const option = document.createElement('option');
            option.value = acc.accountNumber;
            option.textContent = `${acc.accountNumber} - ${customer.name} - Balance: $${acc.balance}`;
            dropdown.appendChild(option);
        });
    });
}

// Perform deposit
function performDeposit() {
    try {
        const accountNumber = document.getElementById('depositAccount').value;
        const amount = parseFloat(document.getElementById('depositAmount').value);
        
        if (!accountNumber) throw new Error('Please select an account');
        if (!amount || amount <= 0) throw new Error('Please enter a valid amount');
        
        const account = bank.findAccount(accountNumber);

        console.log(account,"account")
        account.deposit(amount);
        
        showMessage(`Successfully deposited $${amount.toFixed(2)}`, 'success');
        document.getElementById('depositAmount').value = '';
        updateAccountDropdowns();
        displayAccounts();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// Perform withdrawal
function performWithdraw() {
    try {
        const accountNumber = document.getElementById('withdrawAccount').value;
        const amount = parseFloat(document.getElementById('withdrawAmount').value);
        
        if (!accountNumber) throw new Error('Please select an account');
        if (!amount || amount <= 0) throw new Error('Please enter a valid amount');
        
        const account = bank.findAccount(accountNumber);
        account.withdraw(amount);
        
        showMessage(`Successfully withdrew $${amount.toFixed(2)}`, 'success');
        document.getElementById('withdrawAmount').value = '';
        updateAccountDropdowns();
        displayAccounts();
    } catch (error) {
        showMessage(error.message, 'error');
    }
}
// ==================== INITIALIZE UI ====================
document.addEventListener('DOMContentLoaded', () => {
    displayCustomers();
    updateAccountDropdowns();
   
    
    console.log('🏦 Bank Management System Loaded!');
    console.log('Bank Object:', bank);

});

function showTransactions(){
    const accountNumber = document.getElementById("accNum").value
    const container =document.getElementById("trans")

    const transactions= bank.findAccount(accountNumber).transactions

    console.log("accNum", accountNumber)
    console.log(transactions)
    if (!accountNumber) {
        container.innerHTML = '<p>Please select an account.</p>';
        return;
    }

    if (transactions.length === 0) {
        container.innerHTML = '<p>No transactions yet.</p>';
        return;
    }

    container.innerHTML = transactions.reverse().map(trans => `
        <div class="transaction-item">
            <div>
                <span class="transaction-type ${trans.type}">${trans.type}</span>
                <div class="transaction-date">${trans.date}</div>
            </div>
            <div>
                <div class="transaction-amount">$${trans.amount.toFixed(2)}</div>
                <div style="font-size: 12px; color: #888;">Balance: $${trans.balanceAfter.toFixed(2)}</div>
            </div>
        </div>
    `).join('');



}