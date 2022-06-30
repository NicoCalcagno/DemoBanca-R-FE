import { createContext, useContext, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { apiAddAccount, apiDeleteAccunt } from "../../../api/account/apiAccount";
import { Account, Client } from "../../../InterfaceData";
import NavBar from "../../navbar/NavBar";

import { AccountContext } from "../Account";
import FormAccount from "./FormAccount";
import TableBasicA from "./tableaccount/TableBasicA";

export const columns = [
    "accountId",
    "balance"
]



export const BodyAccountContext = createContext({
    idAccountToDelete: 0,
    setIdAccountToDelete: (accountId: number) => {}
});



const BodyAccounts: React.FC = () => {
    const accountContext = useContext(AccountContext);



    const [accounts, setAccounts] = useState<Account[]>([]);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        accountContext.setIsLoading(true);
        (async () => {
            const response = await fetch('http://localhost:8080/api/account')
            setAccounts(await response.json());
        })();
        setReload(false);
        accountContext.setIsLoading(false);
    }, [accountContext, reload]);
    
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


    const { register, handleSubmit } = useForm<Account>();
    //const methods = useForm<Account>();

    const onSubmit = handleSubmit((data) => {
        apiAddAccount(data);//post
        setReload(true);
    });

    const [idAccountToDelete, setIdAccountToDelete] = useState<number>(0);

    useEffect(() => {
        if (idAccountToDelete !== 0) {
            deleteAccount(idAccountToDelete);
        }
    }, [idAccountToDelete])
    
    const deleteAccount = async (idAccount: number) => {
        await apiDeleteAccunt(idAccount);//delete
        setReload(true);
    }

    
        return (
            <>
                <NavBar></NavBar>
                <Button variant="primary" onClick={handleShow}>
                    Add Account
                </Button>



                <BodyAccountContext.Provider value={{ idAccountToDelete, setIdAccountToDelete} }>
                    <TableBasicA data={accounts} columns={columns} ></TableBasicA>
                </BodyAccountContext.Provider>
            


                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    
                    <form onSubmit={onSubmit}>
                        <Modal.Body>
                        <div>
                            <label htmlFor="balance">Amount</label>
                            <input {...register("balance")} type="number" placeholder="Balance" />
                        </div>
                        <div>
                        <label htmlFor="clientId">Select client</label><br />
                        <select {...register("clientId")}>
                        {clients.map((client) => {
                            return <option value={client.clientId}>{client.clientId}-{client.name} {client.surname}</option>;
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


export default BodyAccounts;