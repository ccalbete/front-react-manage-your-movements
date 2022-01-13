const url = "http://localhost:3000/paymentModes/";
const user = localStorage.getItem("userId");

function getUserPaymentModes() {
    return fetch(url + user, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response.userPaymentModes;
    }).catch(error => { throw new Error(error); });
}

function getUserDebitPaymentModes() {
    return fetch(url + user + "/debit", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response.debitPaymentModes;
    }).catch(error => { throw new Error(error); });
};

const functionsToExport = {
    getUserPaymentModes,
    getUserDebitPaymentModes
}
export default functionsToExport;