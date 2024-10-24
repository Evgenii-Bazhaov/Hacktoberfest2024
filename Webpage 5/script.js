let expenses = [];

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const amount = document.getElementById('expense-amount').value;

    if (name && amount) {
        expenses.push({ name, amount: parseFloat(amount) });
        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
        renderExpenses();
    } else {
        alert('Please enter both name and amount');
    }
}

function renderExpenses() {
    const expenseList = document.getElementById('expense-list');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.innerHTML = `${expense.name} - $${expense.amount.toFixed(2)}`;
        expenseList.appendChild(li);
    });
}