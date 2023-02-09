const url = "http://localhost:3000/paymentModes/";
const user = localStorage.getItem("userId");

async function getUserPaymentModes() {
    try {
        const response = await fetch(url + user, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            }
        });
        const response_1 = await response.json();
        return response_1.userPaymentModes;
    } catch (error) {
        throw new Error(error);
    }
}

async function getUserDebitPaymentModes() {
    try {
        const response = await fetch(url + user + "/debit", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            }
        });
        const response_1 = await response.json();
        return response_1.debitPaymentModes;
    } catch (error) {
        throw new Error(error);
    }
};

const functionsToExport = {
    getUserPaymentModes,
    getUserDebitPaymentModes
}
export default functionsToExport;