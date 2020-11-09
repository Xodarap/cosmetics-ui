import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'

export default function Pictures({}) {
    return <>
    <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
        Processed Images 
    </Typography>
    <Container maxWidth="lg">
        
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell><canvas id="canvas-image-full" width="500" height="500" style={{width: '500px', height: '500px'}}/></TableCell>
              <TableCell><canvas id="canvas-gradient-full" width="500" height="500" style={{width: '500px', height: '500px'}}/></TableCell>
              </TableRow>
              </TableBody>
              </Table>
              </TableContainer>
    </Container>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Face Side</TableCell>
              <TableCell>Edge Detection On</TableCell>
              <TableCell>Eye</TableCell>
              <TableCell>Cheek</TableCell>
              <TableCell>Full</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {['Left', 'Right'].map(s => ['Yes', 'No'].map(y => [s,y])).flat().map(v => (
              <TableRow key={v[0] + '-' + v[1]}>
              <TableCell>{v[0]}</TableCell> 
              <TableCell>{v[1]}</TableCell>               
              <TableCell><canvas id={v[0] + '-' + v[1] + '-eye'}/></TableCell> 
              <TableCell><canvas id={v[0] + '-' + v[1] + '-cheek'}/></TableCell> 
              <TableCell><canvas id={v[0] + '-' + v[1] + '-full'}/></TableCell> 
              </TableRow>
              )) }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  }
  