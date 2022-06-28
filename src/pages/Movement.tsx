import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";


import NavBar from "./NavBar";

interface Movement{
    movementId: number,
    type: string,
    amount: number,
    date: Date,
    balance: number,
    accountId: number
}

interface Account{
    accountId: number,
    balance: number,
    clientId: number
}


const Movements: React.FC = () => {
    const [movements, setMovements] = useState<Movement[]>([]);
    
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
        const response = await fetch('http://localhost:8080/api/movement')
            setMovements(await response.json());
        })();
        setReload(false);
    }, [reload]);
    

    const [accounts, setAccounts] = useState<Account[]>([]);

    useEffect(() => {
        (async () => {
        const response = await fetch('http://localhost:8080/api/account')
            setAccounts(await response.json());
        })();
    }, []);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { register, handleSubmit } = useForm<Movement>();

    const onSubmit = handleSubmit((data) => {
        console.log(JSON.stringify(data));
        const response = fetch('http://localhost:8080/api/movement', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        setReload(true);
        console.log(response);
    });


    const deleteMovement = async (idMovement: number) => {
        console.log(idMovement);
        const response = await fetch('http://localhost:8080/api/movement/' + idMovement, {
            method: 'delete'
        })
        console.log("response delete: " + response);
        setReload(true);
    }


    return (
        <>  
            <NavBar></NavBar>
            <Button variant="primary" onClick={handleShow}>
                Add Movement
            </Button>
        <table>
            <tbody>
                <tr>
                    <th>MovementId</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th></th>
                </tr>
                {movements.map((movement) => {
                    return <tr>
                        <td>{movement.movementId}</td>
                        <td>{movement.type}</td>
                        <td>{movement.amount}</td>
                        <td>{movement.balance}</td>
                        <td>
                            <Button variant="danger" onClick={() => deleteMovement(movement.movementId)}>Delete</Button>
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
                            <label htmlFor="type">Type</label>
                            <input {...register("type")} type="text" placeholder="Prelievo o Deposito"/>
                        </div>
                        <div>
                            <label htmlFor="amount">Amount</label>
                            <input {...register("amount")} type="number" placeholder="Amount"/>
                        </div>
                        <div>
                            <label htmlFor="accountId">Select account</label><br />
                            <select {...register("accountId")}>
                            {accounts.map((account) => {
                                return <option value={account.accountId}>{account.accountId}</option>;
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

export default Movements;