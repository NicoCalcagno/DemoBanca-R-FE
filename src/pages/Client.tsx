import { useEffect, useState } from "react";
import  "./Client.css"
import { Modal, Button } from 'react-bootstrap'; 
import "bootstrap/dist/css/bootstrap.min.css";

import { useForm } from "react-hook-form";
import NavBar from "./NavBar";


interface Client{
    clientId: number,
    name: string,
    surname: string,
    email: string,
    tel: string,
    imageUrl: string
}


const Clients: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
        const response = await fetch('http://localhost:8080/api/client')
            setClients(await response.json());
        })();
        setReload(false);
    }, [reload]);
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { register, handleSubmit, reset } = useForm<Client>();

    const onSubmit = handleSubmit((data) => {
        console.log(JSON.stringify(data));
        const response = fetch('http://localhost:8080/api/client', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        setReload(true);
        console.log(response);
    });

    const deleteClient = async (idClient: number) => {
        console.log(idClient);
        const response = await fetch('http://localhost:8080/api/client/' + idClient, {
            method: 'delete'
        })
        console.log("response delete: " + response);
        setReload(true);
    }


    const [showUpdate, setShowUpdate] = useState(false);

    const updateClose = () => setShowUpdate(false);

    const updateShow = (client: Client) => {
        reset(client);
        setShowUpdate(true);
    }

    const updateClient = handleSubmit((data) => {
        const response = fetch('http://localhost:8080/api/client/', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        setReload(true);
        console.log(response);  
    });


    return (
    
        <>
            <NavBar></NavBar>
            <Button variant="primary" onClick={handleShow}>
                Add Client
            </Button>
            
            <table>
            <tbody>
                <tr>
                    <th>Image Client</th>
                    <th>ClientId</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th></th>

                </tr>
                {clients.map((client) => {
                    return <tr>
                        <td><img src={client.imageUrl} alt="" /></td>
                        <td>{client.clientId}</td>
                        <td>{client.name}</td>
                        <td>{client.surname}</td>
                        <td>{client.email}</td>
                        <td>{client.tel}</td>
                        <td><Button variant="warning" onClick={() => updateShow(client)}>Update</Button>
                            <Button variant="danger" onClick={() => deleteClient(client.clientId)}>Delete</Button></td>
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
                                <label htmlFor="name">Name</label>
                                <input {...register("name")} type="text" placeholder="Name"/>
                            </div>
                            <div>
                                <label htmlFor="surname">Surname</label>
                                <input {...register("surname")} type="text" placeholder="Surname"/>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input {...register("email")} type="text" placeholder="Email"/>
                            </div>
                            <div>
                                <label htmlFor="tel">Phone</label>
                                <input {...register("tel")} type="text" placeholder="Phone"/>
                            </div>
                            <div>
                                <label htmlFor="name">Image Url</label>
                                <input {...register("imageUrl")} type="text" placeholder="https://...."/>
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

            <Modal show={showUpdate} onHide={updateClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <form onSubmit={updateClient}>
                    <Modal.Body>
                    
                            <div>
                                <label htmlFor="name">Name</label>
                            <input  type="text" placeholder="Name" {...register("name")} />
                            </div>
                            <div>
                                <label htmlFor="surname">Surname</label>
                                <input type="text" placeholder="Surname" {...register("surname")}/>
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input {...register("email")} type="text" placeholder="Email"/>
                            </div>
                            <div>
                                <label htmlFor="tel">Phone</label>
                                <input {...register("tel")} type="text" placeholder="Phone" />
                            </div>
                            <div>
                                <label htmlFor="name">Image Url</label>
                                <input {...register("imageUrl")} type="text" placeholder="https://...." />
                            </div>
                        
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
            </Modal>
        
        
        
        </>
    
    );

}

export default Clients;