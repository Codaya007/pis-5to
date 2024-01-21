import { BASE_URL, LIMIT_PAGINATOR } from "../hooks/Constants"


export async function obtener(recurso, token = "") {
    let header = {
        "Accept": "application/json",
        "Content-type": "application/json",
    }

    if (token !== "") {
        header = { ...header, "jwt": token }
    }

    const response = await fetch(BASE_URL + recurso, { cache: 'no-store', headers: header })

    return await response.json()
}


export async function enviar(recurso, data, token = "") {
    let header = {
        "Accept": "application/json",
        "Content-type": "application/json",
    }

    if (token !== "") {
        header = { ...header, "jwt": token }
    }

    const response = await fetch(BASE_URL + recurso, {
        method: "POST",
        headers: header,
        body: JSON.stringify(data)
    });

    return await response.json()
}