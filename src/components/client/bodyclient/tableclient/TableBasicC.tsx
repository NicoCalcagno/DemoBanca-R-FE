import TableHeaderC from "./TableHeaderC";
import TableRowC from "./TableRowC";


import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableBody from "@mui/material/TableBody/TableBody";
import TableHead from "@mui/material/TableHead/TableHead";
import TableRow from "@mui/material/TableRow/TableRow";
import { Client } from "../../../../InterfaceData";

const TableBasicC: React.FC<{ data: Client[] , columns: string[] }> = ({data, columns }) => {
    
    return (

        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableHeaderC {...columns} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(client => <TableRowC {...client} />)}
                </TableBody>
                
        </Table>
        </TableContainer>
    );
}

export default TableBasicC;