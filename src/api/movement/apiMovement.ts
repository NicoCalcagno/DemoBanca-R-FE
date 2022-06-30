import { Movement } from "../../InterfaceData"


export const apiAddMovement = (data: Movement) => {
    fetch('http://localhost:8080/api/movement', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
}


export const apiDeleteMovement = (idMovement: number) => {
    fetch('http://localhost:8080/api/movement/' + idMovement, {
            method: 'delete'
        })
}