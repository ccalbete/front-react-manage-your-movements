const url = "http://localhost:3000/places/";
const user = localStorage.getItem("userId");

function getUserPlaces() {
    return fetch(url + user , {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
        }
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        return response.userPlaces;
    }).catch(error => { throw new Error(error); });
}

const functionsToExport = {
    getUserPlaces
}

export default functionsToExport;