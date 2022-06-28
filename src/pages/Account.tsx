import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

import NavBar from "./NavBar";

interface Account{
    accountId: number,
    balance: number,
    clientId: number
}


interface Client{
    clientId: number,
    name: string,
    surname: string,
    email: string,
    tel: string,
    imageUrl: string
}

const Accounts: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
        const response = await fetch('http://localhost:8080/api/account')
            setAccounts(await response.json());
        })();
        setReload(false);
    }, [reload]);
    
    const [clients, setClients] = useState<Client[]>([]);

    useEffect(() => {
        (async () => {
        const response = await fetch('http://localhost:8080/api/client')
            setClients(await response.json());
        })();
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { register,handleSubmit } = useForm<Account>();

    const onSubmit = handleSubmit((data) => {
        console.log(JSON.stringify(data));
        const response = fetch('http://localhost:8080/api/account', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        setReload(true);
        console.log(response);
    });


    const deleteAccount = async (idAccount: number) => {
        console.log(idAccount);
        const response = await fetch('http://localhost:8080/api/account/' + idAccount, {
            method: 'delete'
        })
        console.log("response delete: " + response);
        setReload(true);
    }


    return (
        <>
            <NavBar></NavBar>
            <Button variant="primary" onClick={handleShow}>
                Add Account
            </Button>



            <table>
            <tbody>
                <tr>
                    <th>AccountId</th>
                    <th>Balance</th>
                    <th></th>
                </tr>
                {accounts.map((account) => {
                    return <tr>
                        <td>{account.accountId}</td>
                        <td>{account.balance}</td>
                        <td>
                            <Button variant="danger" onClick={() => deleteAccount(account.accountId)}>Delete</Button>
                        </td>
                    </tr>;
                })}
            </tbody>
            </table>
            


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <form onSubmit={onSubmit}>
                    <Modal.Body>
                        <div>
                            <label htmlFor="balance">Amount</label>
                            <input {...register("balance")} type="number" placeholder="Balance"/>
                        </div>
                        <div>
                            <label htmlFor="clientId">Select client</label><br />
                            <select {...register("clientId")}>
                            {clients.map((client) => {
                                return <option value={client.clientId}>{client.clientId}</option>;
                            })}
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
            </>
    );

}

export default Accounts;