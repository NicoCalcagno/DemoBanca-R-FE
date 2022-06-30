

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableBody from "@mui/material/TableBody/TableBody";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import { Account } from "../../../../InterfaceData";
import TableHeaderA from './TableHeaderA';
import TableRowA from './TableRowA';

const TableBasicA: React.FC<{ data: Account[] , columns: string[] }> = ({data, columns }) => {
    
    return (

        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableHeaderA {...columns} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(account => <TableRowA {...account} />)}
                </TableBody>
                
        </Table>
        </TableContainer>
    );
}

export default TableBasicA;