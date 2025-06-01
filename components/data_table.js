import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Advice from '../components/advice'

export default function DataTable({ r }) {
  if(!r?.loaded) return <></>;
  const maxColorDiff = 441.7;
    return <><TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Left</TableCell>
            <TableCell>Right</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(r.r['left results']).map((k) => (
            <TableRow key={k}>
              <TableCell>
                {k}
                {k == 'color distance' &&  ' (as % of maximum ΔRGB distance)'}
              </TableCell>
              <TableCell>
              {k == 'color distance' ?
                (100* r.r['left results'][k]/maxColorDiff).toLocaleString(undefined, {maximumFractionDigits: 1}) +
                '%'
                : (r.r['left results'][k]).toLocaleString(undefined, {maximumFractionDigits: 1}) + '%'
          }
              </TableCell>
              <TableCell>
              {k == 'color distance' ?
                (100* r.r['right results'][k]/maxColorDiff).toLocaleString(undefined, {maximumFractionDigits: 1}) +
                '%'
                : (r.r['right results'][k]).toLocaleString(undefined, {maximumFractionDigits: 1}) + '%'
          }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  }