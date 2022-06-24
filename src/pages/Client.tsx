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
    const [add, setAdd] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
        const response = await fetch('http://localhost:8080/api/client')
            setClients(await response.json());
        })();
    }, [add]);
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const { register,handleSubmit } = useForm<Client>();

    const onSubmit = handleSubmit((data) => {
        console.log(JSON.stringify(data));
        const response = fetch('http://localhost:8080/api/client', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        setAdd(true);
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
                        <td><Button variant="warning">Update</Button><Button variant="danger">Delete</Button></td>
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
            </Modal></>
    
    );

}

export default Clients;