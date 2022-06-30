
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { Movement } from '../../../../InterfaceData';
import { BodyMovementContext } from '../BodyMovements';




const TableRowM : React.FC<Movement> = (movement) => {
  const bodyMovementContext = useContext(BodyMovementContext);
  

  const deleteMovement = (movementId: number) => {
    bodyMovementContext.setIdMovementToDelete(movementId);
  }
  
  return (
    <>
        <TableRow
            key={movement.movementId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="right">
            {movement.movementId}
            </TableCell>
            <TableCell align="right">
            {movement.type}
            </TableCell>
            <TableCell align="right">
            {movement.amount}
            </TableCell>
            
            <TableCell align="right">
            {movement.balance}
            </TableCell>
            <TableCell align="right">
            <Button variant="danger" onClick={() => deleteMovement(movement.movementId)}>Delete</Button>
            </TableCell>
            </TableRow>
    </>



    );
}

export default TableRowM;