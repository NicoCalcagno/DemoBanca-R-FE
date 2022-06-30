import { Client } from "../../InterfaceData"



export const apiAddClients = (data: Client) => {
    return fetch('http://localhost:8080/api/client', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
}

export const apiDeleteClient = (idClient: number) => {
    fetch('http://localhost:8080/api/client/' + idClient, {
            method: 'delete'
    })
}


export const apiUpdateClient = (data: Client) => {
    fetch('http://localhost:8080/api/client/', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
}