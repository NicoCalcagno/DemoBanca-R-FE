import { Account } from "../../InterfaceData"

export const apiAddAccount = (data: Account) => {
    fetch('http://localhost:8080/api/account', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
}

export const apiDeleteAccunt = (idAccount: number) => {
    fetch('http://localhost:8080/api/account/' + idAccount, {
            method: 'delete'
        })
}