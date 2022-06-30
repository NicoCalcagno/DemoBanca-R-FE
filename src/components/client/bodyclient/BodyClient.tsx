import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { apiAddClients, apiDeleteClient, apiUpdateClient } from "../../../api/client/apiClient";
import { Client, initClient } from "../../../InterfaceData";
import NavBar from "../../navbar/NavBar";
import { ClientContext } from "../Client";
import FormClient from "./FormClient";
import TableBasicC from "./tableclient/TableBasicC";

export const BodyClientContext = createContext({
    clientToUpdate: initClient,
    setClientToUpdate: (clientToUpdate: Client) => {},
    idClientToDelete: 0,
    setIdClientToDelete: (clientId: number) => {}
});


const columns = [
    "Immagine Profilo",
    "Name",
    "Surname",
    "Email",
    "Phone"
];


const BodyClients: React.FC = () => {
    const clientContext = useContext(ClientContext);

    const [clients, setClients] = useState<Client[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    

    useEffect(() => {
        clientContext.setIsLoading(true);
        (async () => {
        const response = await fetch('http://localhost:8080/api/client')
            setClients(await response.json());
        })();
        setReload(false);
        clientContext.setIsLoading(false);
    }, [clientContext, reload]);
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //const { register, handleSubmit, reset } = useForm<Client>();
    const methods = useForm<Client>();

    const onSubmit = methods.handleSubmit((data) => {
        apiAddClients(data);//post
        setReload(true);
    });


    const [showUpdate, setShowUpdate] = useState(false);
    const [clientToUpdate, setClientToUpdate] = useState<Client>(initClient);
    const updateClose = () => setShowUpdate(false);

    const updateShow = (client: Client) => {
        methods.reset(client);
        setShowUpdate(true);
    }

    useEffect(() => {
        if (clientToUpdate !== initClient) {
            updateShow(clientToUpdate);
        }

    }, [clientToUpdate])

    const updateClient = methods.handleSubmit((data) => {
        apiUpdateClient(data);//put
        setReload(true);
    });



    const [idClientToDelete, setIdClientToDelete] = useState<number>(0);

    useEffect(() => {
        if (idClientToDelete !== 0) {
            deleteClient(idClientToDelete);
        }
    }, [idClientToDelete])
    
    const deleteClient = async (idClient: number) => {
        await apiDeleteClient(idClient);//delete
        setReload(true);
    }



    return (
        
        <>
            <NavBar></NavBar>
            <Button variant="primary" onClick={handleShow}>
                Add Client
            </Button>
            <BodyClientContext.Provider value={{ clientToUpdate, setClientToUpdate, idClientToDelete, setIdClientToDelete} }>
                <TableBasicC data={clients} columns={columns} ></TableBasicC>
            </BodyClientContext.Provider>
        
            
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <FormProvider {...methods} > 
                    <form onSubmit={onSubmit}>
                        <Modal.Body>
                            
                            <FormClient></FormClient>
                            
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
                </FormProvider>
            </Modal>


                
            <Modal show={showUpdate} onHide={updateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <FormProvider {...methods} > 
                    <form onSubmit={updateClient}>
                        <Modal.Body>

                            <FormClient></FormClient>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={updateClose}>
                                Close
                            </Button>
                            <Button variant="primary" type="submit" onClick={updateClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </form>
                </FormProvider>
            </Modal>
        
        </>
    );
}


export default BodyClients;