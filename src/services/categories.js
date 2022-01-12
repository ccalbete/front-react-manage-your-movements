const getUserFixedExpensesCategories = function() {
    return fetch("http://localhost:3000/categories/" + localStorage.getItem("userId") + "/fixedExpenses", {
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

export default {
    getUserFixedExpensesCategories,
};