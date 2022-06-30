import { createContext, useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { apiAddMovement, apiDeleteMovement } from "../../../api/movement/apiMovement";
import { Account, Movement } from "../../../InterfaceData";
import NavBar from "../../navbar/NavBar";
import { MovementContext } from "../Movement";

import TableBasicM from "./tablemovement/TableBasicM";



export const columns = [
    "MovementId",
    "Type",
    "Amount",
    "Date",
    "Balance"
]



export const BodyMovementContext = createContext({
    idMovementToDelete: 0,
    setIdMovementToDelete: (movementId: number) => {}
});



const BodyMovements: React.FC = () => {
    const movementContext = useContext(MovementContext);


    const [movements, setMovements] = useState<Movement[]>([]);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        movementContext.setIsLoading(true);
        (async () => {
        const response = await fetch('http://localhost:8080/api/movement')
            setMovements(await response.json());
        })();
        setReload(false);
        movementContext.setIsLoading(false);
    }, [movementContext, reload]);
    

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
    //const methods = useForm<Movement>();

    const onSubmit = handleSubmit((data) => {
        apiAddMovement(data);
        setReload(true);
    });



    const [idMovementToDelete, setIdMovementToDelete] = useState<number>(0);

    useEffect(() => {
        if (idMovementToDelete !== 0) {
            deleteMovement(idMovementToDelete);
        }
    }, [idMovementToDelete])

    const deleteMovement = async (idMovement: number) => {
        await apiDeleteMovement(idMovement);
        setReload(true);
    }

        return (
            <>
                <NavBar></NavBar>
                <Button variant="primary" onClick={handleShow}>
                    Add Movement
                </Button>

                <BodyMovementContext.Provider value={{ idMovementToDelete, setIdMovementToDelete} }>
                    <TableBasicM data={movements} columns={columns} ></TableBasicM>
                </BodyMovementContext.Provider>



                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={onSubmit}>
                        <Modal.Body>
                            <div>
                                <label htmlFor="type">Type</label>
                                <input {...register("type")} type="text" placeholder="Prelievo o Deposito" />
                            </div>
                            <div>
                                <label htmlFor="amount">Amount</label>
                                <input {...register("amount")} type="number" placeholder="Amount" />
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
    
export default BodyMovements;