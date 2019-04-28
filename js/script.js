let startBtn = document.getElementById('start'),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	daybudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
	monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
	yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
	calculate = document.getElementsByTagName('button')[2],
	optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	chooseSum = document.querySelector('.choose-sum'),
	choosePercent = document.querySelector('.choose-percent'),
	yearValue = document.querySelector('.year-value'),
	monthValue = document.querySelector('.month-value'),
	dayValue = document.querySelector('.day-value');


let money, time;



startBtn.addEventListener('click', function () {
	time = prompt("Введите датув формате YYYY-MM-DD", "");
	money = +prompt("Ваш бюджет на месяц?", "");

	while (isNaN(money) || money == '' || money == null) {
		money = prompt("Ваш бюджет?", "");
	}
	appData.budget = money;
	appData.timeData = time;
	budgetValue.textContent = money.toFixed();
	yearValue.value = new Date(Date.parse(time)).getFullYear();
	monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
	dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesBtn.setAttribute("disabled", true);
expensesBtn.style.opacity = 0.5;
optionalExpensesBtn.setAttribute("disabled", true);
optionalExpensesBtn.style.opacity = 0.5;

for (let i = 0; i < expensesItem.length; i++){
	expensesItem[i].addEventListener('input', function () {
		let items1 = document.querySelector('#expenses_1'),
			items2 = document.querySelector('#expenses_2'),
			items3 = document.querySelector('#expenses_3'),
			items4 = document.querySelector('#expenses_4');
	
		if (items1.value != '' && items2.value != '' && items3.value != '' && items4.value != '') {
			expensesBtn.disabled = false;
			expensesBtn.style.opacity = 1;
		} else {
			expensesBtn.setAttribute("disabled", true);
			expensesBtn.style.opacity = 0.5;
		}
	})
};

	


for (let i = 0; i < optionalExpensesItem.length; i++){
	optionalExpensesItem[i].addEventListener('input', function () {
		let items1 = document.querySelector('#optionalexpenses_1'),
			items2 = document.querySelector('#optionalexpenses_2'),
			items3 = document.querySelector('#optionalexpenses_3');
	
		if (items1.value != '' && items2.value != '' && items3.value != '') {
			optionalExpensesBtn.disabled = false;
			optionalExpensesBtn.style.opacity = 1;
		} else {
			optionalExpensesBtn.disabled = true;
			optionalExpensesBtn.style.opacity = 0.5;
		}
	})
};

// expensesBtn.setAttribute("disabled", "disabled");
// expensesBtn.removeAttribute("disabled", "enabled");


expensesBtn.addEventListener('click', function () {
	let sum = 0;

	for (let i = 0; i < expensesItem.length; i++) {
		let article = expensesItem[i].value,
			price = expensesItem[++i].value;

		if ((typeof (article)) === 'string' && (typeof (article)) != null && (typeof (price)) != null
			&& article != '' && price != '' && article != null && price != null && article.length < 50) {
			console.log("done");
			appData.expenses[article] = price;
			sum += +price;
		} else {
			// alert ('Введите обязательные расходы');
		}
	}
	expensesValue.textContent = sum;
	console.log(expensesValue.textContent);
});

optionalExpensesBtn.addEventListener('click', function () {
	for (let i = 0; i < optionalExpensesItem.length; i++) {
		let articleOpt = optionalExpensesItem[i].value;

		if ((typeof (articleOpt)) === 'string' && (typeof (articleOpt)) != null && articleOpt != '' &&
			articleOpt != null && articleOpt.length < 50) {
			console.log("doneOpt");
			appData.optionalExpenses[i] = articleOpt;
			optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
		} else {
			
		}

	}
});

calculate.addEventListener('click', function () {

	if (appData.budget != undefined) {
		appData.moneyPerDay = ((appData.budget - expensesValue.textContent) / 30).toFixed();
		daybudgetValue.textContent = appData.moneyPerDay;

		if (appData.moneyPerDay < 100) {
			levelValue.textContent = "Минимальный уровень достатка";
		} else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
			levelValue.textContent = "Средний уровен достатка";
		} else if (appData.moneyPerDay > 2000) {
			levelValue.textContent = "Высокий уровень достатка";
		} else {
			levelValue.textContent = "Произошла ошибка";
		}
	} else {
		daybudgetValue.textContent = 'Произошла ошибка';
	}
});

incomeItem.addEventListener('input', function () {
	let items = incomeItem.value

	if ((typeof (items)) === 'string' && items != '' && items != null && (typeof (items)) != null) {
		appData.income = items.split(', ');
		incomeValue.textContent = appData.income;
	} else {
		appData.chooseIncome()
	}
});

checkSavings.addEventListener('click', function () {
	if (appData.savings == true) {
		appData.savings = false;
	} else {
		appData.savings = true;
	}
});

chooseSum.addEventListener('input', function () {
	if (appData.savings == true) {
		let sum = +chooseSum.value,
			percent = +choosePercent.value;

		appData.monthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});

choosePercent.addEventListener('input', function () {
	if (appData.savings == true) {
		let sum = +chooseSum.value,
			percent = +choosePercent.value;

		appData.monthIncome = sum / 100 / 12 * percent;
		appData.yearIncome = sum / 100 * percent;

		monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
		yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
	}
});
// article = prompt("Введите обязательную статью расходов в этом месяце", "");
// price = prompt("Во сколько обойдется?", "");
// articleSecond = prompt("Введите обязательную статью расходов в этом месяце", "");
// priceSecond = prompt("Во сколько обойдется?", "");


// console.log(article);
// console.log(price);
// console.log(articleSecond);
// console.log(priceSecond);

let appData = {
	budget: money,
	timeData: time,
	expenses: {},
	optionalExpenses: {},
	income: [],
	savings: false
};
console.log(appData);



// let num = 0;
// while (num < 2) {
//   let article = prompt("Введите обязательную статью расходов в этом месяце", ""),
//     price = prompt("Во сколько обойдется?", "");
//   // appData.expenses[article] = price;
//   num++;

//   if ((typeof (article)) === 'string' && (typeof (article)) != null && (typeof (price)) != null &&
//     article != '' && price != '' && article != null && price != null && article.length < 50) {
//     console.log("done");
//     appData.expenses[article] = price;
//   } else {
//     num--;
//   }

// };



// let num = 0;
// do {
//   let article = prompt("Введите обязательную статью расходов в этом месяце", ""),
//     price = prompt("Во сколько обойдется?", "");
//   // appData.expenses[article] = price;
//   num++;

//   if ((typeof (article)) === 'string' && (typeof (article)) != null && (typeof (price)) != null &&
//     article != '' && price != '' && article != null && price != null && article.length < 50) {
//     console.log("done");
//     appData.expenses[article] = price;
//   } else {
//     num--;
//   }
// }
// while (num < 2);



