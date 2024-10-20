let budget = 0;
let expenses = 0;
let remainingBudget = 0;
let usage = 0;
let expensesRecord = [];
const Dashboard = `
          <!-- Conditionally Rendered Content -->
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-5">
            <!-- Cards -->
            <div
              class="rounded-lg border bg-white text-card-foreground shadow-sm py-10 px-12"
            >
              <div class="card-header flex justify-between items-center">
                <span class="text-sm font-medium">Total Budget</span>
                <svg class="h-4 w-4 text-muted-foreground"><!-- Icon --></svg>
              </div>
              <div class="card-content">
                <span class="text-2xl font-bold">${budget}</span>
              </div>
            </div>
            <div
              class="rounded-lg border bg-white text-card-foreground shadow-sm py-10 px-12"
            >
              <div class="card-header flex justify-between items-center">
                <span class="text-sm font-medium">Total Expenses</span>
                <svg class="h-4 w-4 text-muted-foreground"><!-- Icon --></svg>
              </div>
              <div class="card-content">
                <span class="text-2xl font-bold">${expenses}</span>
              </div>
            </div>
            <div
              class="rounded-lg border bg-white text-card-foreground shadow-sm py-10 px-12"
            >
              <div class="card-header flex justify-between items-center">
                <span class="text-sm font-medium">Remaining Budget</span>
                <svg class="h-4 w-4 text-muted-foreground"><!-- Icon --></svg>
              </div>
              <div class="card-content">
                <span class="text-2xl font-bold">${remainingBudget}</span>
              </div>
            </div>
            <div
              class="rounded-lg border bg-white text-card-foreground shadow-sm py-10 px-12"
            >
              <div class="card-header flex justify-between items-center">
                <span class="text-sm font-medium">Budget Usage</span>
                <svg class="h-4 w-4 text-muted-foreground"><!-- Icon --></svg>
              </div>
              <div class="card-content">
                <span class="text-2xl font-bold">${usage}%</span>
                <div class="progress mt-2"></div>
              </div>
            </div>
          </div>

          <!-- Recent Expenses Section -->
          <div class="grid gap-4 md:grid-cols-2">
            <div
              class="rounded-lg border bg-white text-card-foreground shadow-sm lg:py-10 lg:px-12 p-6"
            >
              <div class="card-header">
                <span class="text-2xl font-semibold leading-none tracking-tight">Recent Expenses</span>
              </div>
              <div class="card-content mt-10">
                <div class="scroll-area h-[300px] overflow-auto scrollable-container ">
                  <div class="space-y-4 expense-container">
                    <p>No Expenses Found</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Add New Expense Form -->
            <div
              class="rounded-lg border bg-white text-card-foreground shadow-sm lg:py-10 lg:px-12 p-6"
            >
              <div class="card-header">
                <span class="text-2xl font-semibold leading-none tracking-tight">Add New Expense</span>
              </div>
              <div class="card-content mt-10">
                <form class="space-y-6">
                  <div class="space-y-2 flex flex-col">
                    <label for="description" class=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg">Description</label>
                    <input
                      id="description"
                      class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-black  placeholder:text-gray-500 "
                      placeholder="Enter expense description"
                      required
                    />
                  </div>
                  <div class="space-y-2 flex flex-col">
                    <label for="amount" class=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg">Amount</label>
                    <input
                      id="amount"
                      type="number"
                      class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-black  placeholder:text-gray-500 "
                      placeholder="Enter expense amount"
                      required
                    />
                  </div>
                  <button class="bg-black text-white hover:bg-primary/90 h-10 w-full  px-6 py-2 rounded-lg" >
                    <!-- Icon -->Add Expense
                  </button>
                </form>
              </div>
            </div>
          </div>
        `;

const BudgetSettings = `
          <div
          class="rounded-lg border bg-white shadow-sm lg:py-10 lg:px-12 px-8 py-6 lg:w-2/3 w-full m-auto my-5  "
        >
          <div class="card-header">
            <span class="text-2xl font-semibold leading-none tracking-tight">Budget Settings</span>
          </div>
          <div class="card-content mt-10">
            <div class="space-y-6">
              <div class="space-y-3.5 flex flex-col">
                <label for="description" class=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-lg">Current Budget : ${budget}</label>
                <input
                type="number"
                  id="budget-input"
                  class="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-black  placeholder:text-gray-500 "
                  placeholder="Enter new budget"
                  required
                />
                <button id="budget-btn" class="bg-black text-white hover:bg-primary/90 h-10 w-full  px-6 py-2 rounded-lg">Update Budget</button>
              </div>
       `;
const Expenses = `<div
            class="rounded-lg border bg-white shadow-sm lg:py-10 py-6 lg:px-12 px-4 lg:w-3/4 w-full m-auto lg:my-5 lg:h-[90%] h-[86dvh] overflow-hidden "
          >
            <div class="header mb-3">
              <span class="text-2xl font-semibold leading-none tracking-tight"
                >All Expenses
              </span>
            </div>
            <div class="content h-full overflow-y-scroll scrollable-container">
            <p>No Expenses Found</p>
            </div>
          </div>`;

// Navigaion`
let hamburger = document.getElementsByClassName("outline-button-icon")[0];
let sidebar= document.getElementsByTagName("aside")[0];
let toggleSidebar = ()=>{
  if(hamburger.classList.contains("closed")){
    hamburger.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
    hamburger.classList.remove("closed");
    hamburger.classList.add("opened");
    sidebar.classList.remove("left-[-100%]")
    sidebar.classList.add("left-0")
  }
else{
  hamburger.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`
  hamburger.classList.remove("opened");
  hamburger.classList.add("closed");
  sidebar.classList.remove("left-0")
  sidebar.classList.add("left-[-100%]")
}
}
hamburger.addEventListener("click", toggleSidebar)
let NavBtns = document
  .getElementsByTagName("nav")[0]
  .getElementsByTagName("button");
let main = document.getElementsByTagName("main")[0];
let page;

Array.from(NavBtns).forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleSidebar()
    let activeBtn = document.getElementsByClassName("active")[0];
    if (!btn.classList.contains("active")) {
      activeBtn && activeBtn.classList.remove("active");
      btn.classList.add("active");
      page = btn.children[1].innerText;
    }

    switch (page) {
      case "Dashboard":
        main.innerHTML = Dashboard;
        DashboardActions();
        break;
      case "Expenses":
        main.innerHTML = Expenses;
        ExpensesActions();
        break;
      case "Budget Settings":
        main.innerHTML = BudgetSettings;
        BudgetSettingsActions();
        break;
      default:
        main.innerHTML = Dashboard;
        DashboardActions();
    }
  });
});

window.onload = () => {
  main.innerHTML = Dashboard;
  DashboardActions();
};

// Setting Budget
const BudgetSettingsActions = () => {
  let localStorageBudget = localStorage.getItem("budget");
  localStorageBudget ? (budget = parseInt(localStorageBudget)) : (budget = 0);
  document.getElementsByTagName(
    "label"
  )[0].innerHTML = `Current Budget ${budget}`;
  document.getElementById("budget-btn").addEventListener("click", () => {
    let budgetInput = document.getElementById("budget-input");
    if (budgetInput.value == ""){
      alert("Please enter a valid budget");
      return
    }
    budget = parseInt(budgetInput.value);
    document.getElementsByTagName(
      "label"
    )[0].innerHTML = `Current Budget ${budget}`;
    budgetInput.value = "";
    localStorage.setItem("budget", JSON.stringify(budget));
  });
};

let DashboardActions = () => {
  let localStorageBudget = localStorage.getItem("budget");
  localStorageBudget ? (budget = parseInt(localStorageBudget)) : (budget = 0);
  document.getElementsByClassName("card-content")[0].children[0].innerText =
    budget;

  let localStorageRecords = localStorage.getItem("expenseRecord");
  localStorageRecords
    ? (expensesRecord = JSON.parse(localStorageRecords))
    : (expensesRecord = []);
  if (expensesRecord.length != 0) {
    updateExpenselist();
    expenses = 0;
    expensesRecord.map((expense) => {
      expenses = Number(expenses) + Number(expense.amount);
    });
    calculateExpenses();
  }

  document.getElementsByTagName("button")[4].addEventListener("click", (e) => {
    e.preventDefault();
    let desc = document.getElementById("description");
    let amount = document.getElementById("amount");
    if (desc.value == "" || amount.value == "") {
      alert("Please fill in all the fields");
      return;
    }
    expensesRecord.push({
      desc: desc.value,
      amount: amount.value,
      date: new Date().toISOString().trim().split("T")[0],
    });
    expenses = Number(expenses) + Number(amount.value);
    desc.value = "";
    amount.value = "";
    localStorage.setItem("expenseRecord", JSON.stringify(expensesRecord));

    updateExpenselist();
    calculateExpenses();
  });
};
let ExpensesActions = () => {
  localStorage.getItem("expenseRecord")
    ? (expensesRecord = JSON.parse(localStorage.getItem("expenseRecord")))
    : (expensesRecord = []);
  if (expensesRecord.length != 0)
    document.getElementsByClassName("scrollable-container")[0].innerHTML =
      expensesRecord
        .reverse()
        .map((expense) => {
          return `<div class="card rounded-lg border bg-white shadow-sm px-5 py-8 m-auto my-5 space-y-4 mr-4">
                <div class="heading">
                  <span class="font-bold lg:text-2xl text-lg">${expense.desc}</span>
                </div>
                <div class="flex flex-row justify-between items-center w-full">
                  <p class="text-sm">${expense.date}</p>
                  <p class="lg:text-2xl text-lg font-semibold">₹${expense.amount}</p>
                </div>
              </div>`;
        })
        .join("");
};

let updateExpenselist = () => {
  document.getElementsByClassName("expense-container")[0].innerHTML =
    expensesRecord
      .reverse()
      .map((expense) => {
        return `<div class="flex items-center pr-5">
                    <div class="space-y-1">
                      <p class="text-base font-medium">${expense.desc}</p>
                      <p class="text-xs text-muted-foreground">${expense.date}</p>
                    </div>
                    <div class="ml-auto font-medium">₹${expense.amount}</div>
                  </div>`;
      })
      .join("");
};

let calculateExpenses = () => {
  remainingBudget = budget - expenses;
  usage = (expenses / budget) * 100;

  document.getElementsByClassName("card-content")[1].children[0].innerText =
    expenses.toFixed(2);
  document.getElementsByClassName("card-content")[2].children[0].innerText =
    remainingBudget.toFixed(2);
  document.getElementsByClassName("card-content")[3].children[0].innerText =
    usage.toFixed(2) + "%";
};
