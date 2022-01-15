const url = "http://localhost:3000/categories/";
const user = localStorage.getItem("userId");

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

function getUserNotFixedExpensesCategories() {
    return fetch(url + user + "/notFixedExpenses", {
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

const functionsToExport = {
    getUserCategories,
    getUserFixedExpensesCategories,
    getUserNotFixedExpensesCategories
}
export default functionsToExport;