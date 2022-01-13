const url = "http://localhost:3000/reasons/";
const user = localStorage.getItem("userId");

function getUserReasons() {
    return fetch(url + user, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response.userReasons;
    }).catch(error => { throw new Error(error); });
};

const functionsToExport = {
    getUserReasons
}

export default functionsToExport;