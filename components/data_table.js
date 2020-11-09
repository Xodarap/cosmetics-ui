import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
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