const url = "http://localhost:3000/categories/";
const user = localStorage.getItem("userId");
const pesosId = 1
const dollarsId = 2

function getUserCategories() {

    return fetch(url + user, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response.userCategories;
    }).catch(error => { throw new Error(error); });
}

const getUserFixedExpensesCategories = function () {
    return fetch(url + user + "/fixedExpenses", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response.userFixedExpensesCategories;
    }).catch(error => { throw new Error(error); });
}

function getUserNotFixedExpensesCategoriesPesos() {
    return fetch(url + user + "/notFixedExpenses/" + pesosId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response.userNotFixedExpensesCategories;
    }).catch(error => { throw new Error(error);});
}

function getUserNotFixedExpensesCategoriesDollars() {
    return fetch(url + user + "/notFixedExpenses/" + dollarsId, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response.userNotFixedExpensesCategories;
    }).catch(error => { throw new Error(error); });
}

const functionsToExport = {
    getUserCategories,
    getUserFixedExpensesCategories,
    getUserNotFixedExpensesCategoriesPesos,
    getUserNotFixedExpensesCategoriesDollars
}
export default functionsToExport;