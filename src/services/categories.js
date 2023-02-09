const url = "http://localhost:3000/categories/";
const user = localStorage.getItem("userId");

async function getUserCategories() {

    try {
        const response = await fetch(url + user, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            }
        });
        const response_1 = await response.json();
        return response_1.userCategories;
    } catch (error) {
        throw new Error(error);
    }
}

const getUserFixedExpensesCategories = async function () {
    try {
        const response = await fetch(url + user + "/fixedExpenses", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            }
        });
        const response_1 = await response.json();
        return response_1.userFixedExpensesCategories;
    } catch (error) {
        throw new Error(error);
    }
}

async function getUserNotFixedExpensesCategories() {
    try {
        const response = await fetch(url + user + "/notFixedExpenses", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            }
        });
        const response_1 = await response.json();
        return response_1.userNotFixedExpensesCategories;
    } catch (error) {
        throw new Error(error);
    }
}

const functionsToExport = {
    getUserCategories,
    getUserFixedExpensesCategories,
    getUserNotFixedExpensesCategories
}
export default functionsToExport;