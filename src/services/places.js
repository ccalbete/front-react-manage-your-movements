const url = "http://localhost:3000/places/";
const user = localStorage.getItem("userId");

async function getUserPlaces() {
    try {
        const response = await fetch(url + user, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            }
        });
        const response_1 = await response.json();
        return response_1.userPlaces;
    } catch (error) {
        throw new Error(error);
    }
}

const functionsToExport = {
    getUserPlaces
}

export default functionsToExport;