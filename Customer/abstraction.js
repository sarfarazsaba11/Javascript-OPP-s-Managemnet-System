class Payment {
  constructor() {
    if (new.target === Payment) {
      throw new Error("Create a subclass (e.g., Stripe) to use Payment");
    }
  }
  getBalance(){
    throw new Error('Implement this inside sub class')
  }
}

const pay = new Payment();  
