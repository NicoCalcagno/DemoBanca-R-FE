
import TableCell from '@mui/material/TableCell';
import { columnsAccount } from '../../../../InterfaceData';

const TableHeaderA: React.FC<string[]> = (headings) => {


    const arrayHeadings = columnsAccount;
    return (
        
        <>
            {arrayHeadings.map(heading => 
                <TableCell align="right" color="white">{heading}</TableCell>
            )}
        </>
        );
}

export default TableHeaderA;