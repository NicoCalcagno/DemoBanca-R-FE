
import TableCell from '@mui/material/TableCell';
import {  columnsMovement } from '../../../../InterfaceData';

const TableHeaderM: React.FC<string[]> = (headings) => {


    const arrayHeadings = columnsMovement;
    return (
        
        <>
            {arrayHeadings.map(heading => 
                <TableCell align="right" color="white">{heading}</TableCell>
            )}
        </>
        );
}

export default TableHeaderM;