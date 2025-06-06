export async function logoutHandler() {
    try {
        const url = `http://${import.meta.env.VITE_IP_SERVER}:3000/users/logout`
        const res = await fetch(url, {
            credentials: "include",
            method: "DELETE"
        });
        if (!res.ok) {
            throw new Error("Error while fetching data");
        }
        return true;
    } catch (err) {
        console.log(err instanceof Error ? err.message : "Unknown Error")
    }
}