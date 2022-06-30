
export interface Client{
    clientId: number,
    name: string,
    surname: string,
    email: string,
    tel: string,
    imageUrl: string
}


export const initClient:Client = {
    clientId: 0,
    name: "",
    surname: "",
    email: "",
    tel: "",
    imageUrl: ""
}

export const columnsClient = [
    "Immagine Profilo",
    "ClientId",
    "Name",
    "Surname",
    "Email",
    "Phone",
    "Operazioni"
];


export interface Account{
    accountId: number,
    balance: number,
    clientId: number
}

export const columnsAccount = [
    "AccountId",
    "Balance",
    "Operazioni"
]


export interface Movement{
    movementId: number,
    type: string,
    amount: number,
    date: Date,
    balance: number,
    accountId: number
}

export const columnsMovement = [
    "MovementID",
    "Type",
    "Amount",
    "Balance",
    "Operazioni"
]


export function isAnClient(obj: any): obj is Client {
    return 'imageUrl' in obj;
}


export function isAnAccount(obj: any): obj is Account {
    return 'balance' in obj;
}


export function isAnMovement(obj: any): obj is Movement {
    return 'movementId' in obj;
}