
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { BodyClientContext } from '../BodyClient';
import { Client } from '../../../../InterfaceData';


const TableRowC : React.FC<Client> = (client) => {
  const bodyClientContext = useContext(BodyClientContext);
  
  const updateClient = (client: Client) => {
    bodyClientContext.setClientToUpdate(client);
  }
  const deleteClient = (clientId: number) => {
    bodyClientContext.setIdClientToDelete(clientId);
  }
  
  return (
    <>
      <TableRow
              key={client.clientId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
              <TableCell align="right">
                <img src={client.imageUrl} alt="" />
              </TableCell>
              <TableCell align="right">
                {client.clientId}
              </TableCell>
              <TableCell align="right" >
                {client.name}
              </TableCell>
              <TableCell align="right">
                {client.surname}
              </TableCell>
              <TableCell align="right" >
                {client.email}
              </TableCell>
              <TableCell align="right">
                {client.tel}
              </TableCell>
          <TableCell align="right">
            <Button variant="warning" onClick={() => updateClient(client)}>Update</Button>
            <Button variant="danger" onClick={() => deleteClient(client.clientId)}>Delete</Button>
          </TableCell>
          </TableRow>
    </>



    );
}

export default TableRowC;