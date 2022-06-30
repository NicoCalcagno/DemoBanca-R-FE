
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';

import { Account } from '../../../../InterfaceData';
import { BodyAccountContext } from '../BodyAccount';


const TableRowA : React.FC<Account> = (account) => {
  const bodyAccountContext = useContext(BodyAccountContext);
  

  const deleteAccount = (accountId: number) => {
    bodyAccountContext.setIdAccountToDelete(accountId);
  }
  
  return (
    <>
        <TableRow
            key={account.accountId}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="right">
            {account.accountId}
            </TableCell>
            <TableCell align="right">
            {account.balance}
            </TableCell>
            <TableCell align="right">
            <Button variant="danger" onClick={() => deleteAccount(account.accountId)}>Delete</Button>
            </TableCell>
            </TableRow>
    </>



    );
}

export default TableRowA;