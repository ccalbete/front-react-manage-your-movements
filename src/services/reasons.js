const url = "http://localhost:3000/reasons/";
const user = localStorage.getItem("userId");

async function getUserReasons() {
    try {
        const response = await fetch(url + user, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
            }
        });
        const response_1 = await response.json();
        return response_1.userReasons;
    } catch (error) {
        throw new Error(error);
    }
};

const functionsToExport = {
    getUserReasons
}

export default functionsToExport;