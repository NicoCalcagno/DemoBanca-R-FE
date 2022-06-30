

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableBody from "@mui/material/TableBody/TableBody";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import { Movement } from '../../../../InterfaceData';
import TableHeaderM from './TableHeaderM';
import TableRowM from './TableRowM';


const TableBasicM: React.FC<{ data: Movement[] , columns: string[] }> = ({data, columns }) => {
    
    return (

        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableHeaderM {...columns} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(movement => <TableRowM {...movement} />)}
                </TableBody>
                
        </Table>
        </TableContainer>
    );
}

export default TableBasicM;