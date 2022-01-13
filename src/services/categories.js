const url = "http://localhost:3000/categories/";

const getUserFixedExpensesCategories = function () {
    return fetch(url + localStorage.getItem("userId") + "/fixedExpenses", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response.userFixedExpensesCategories;
    }).catch(error => console.error('Error: ', error));
}

function getUserNotFixedExpensesCategories() {
    return fetch(url + localStorage.getItem("userId") + "/notFixedExpenses", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response.userNotFixedExpensesCategories;
    }).catch(error => console.error('Error: ', error));
}

const functionsToExport = {
    getUserFixedExpensesCategories,
    getUserNotFixedExpensesCategories
}
export default functionsToExport;