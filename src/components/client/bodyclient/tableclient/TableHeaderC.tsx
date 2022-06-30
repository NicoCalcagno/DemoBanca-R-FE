
import TableCell from '@mui/material/TableCell';
import { columnsClient } from '../../../../InterfaceData';

const TableHeaderC: React.FC<string[]> = (headings) => {

  console.log(headings);
  const arrayHeadings = columnsClient;
  console.log(arrayHeadings);
  return (
      
      <>
          {arrayHeadings.map(heading => 
            <TableCell align="right" color="white">{heading}</TableCell>
          )}
      </>
    );
}

export default TableHeaderC;