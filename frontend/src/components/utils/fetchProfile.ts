export async function getProfile(id: number | null) {
    try {
        if (id) {
            const url = `http://${import.meta.env.VITE_IP_SERVER}:3000/users/${id}`
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Error fetching data");
            }
            const profile = await res.json();
            return profile;
        }
        else {
            throw new Error("No id provided");
        }
    }

    catch (err) {
        throw new Error(err instanceof Error ? err.message : "Unknown Error")
    }
}