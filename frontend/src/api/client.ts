const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(
    path: string,
    options?: RequestInit
) {
    const respone = await fetch(
        `${API_BASE_URL}${path}`,
        options
    );

    if(!respone.ok){
        throw new Error("Request failed");
    }

    return respone.json();
    
}
