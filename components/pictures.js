import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import { Grid, Box } from '@mui/material';

export default function Pictures({ }) {
  const cell = (v, t) => <Grid item style={{maxWidth: '100%'}}>
    <canvas id={v[0] + '-' + v[1] + '-' + t.toLowerCase()} />
    <Typography variant="body1">{v[0]} {v[1] == 'Yes' ? 'Edge Detection' : 'Normal'} {t}</Typography>
  </Grid>
  return <>
    <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
      Processed Images
    </Typography>
    <Container maxWidth="lg">
      <Grid container component={Paper} justify="center" >
        <Grid item  xs={12} lg={6}>
          <canvas id="canvas-image-full" width="500" height="500" style={{ maxWidth: '100%' }} />
          <Typography variant="body1" align="center" color="textPrimary" gutterBottom style={{ maxWidth: '500px' }}>
            This image shows the facial landmarks identified by the algorithm. Importantly it displays the rectangles
            used to calculate eye and cheek wrinkles percentage. Color distance is also defined as
            the average color distance between the eye rectangle and the cheek rectangle on each side.
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <canvas id="canvas-gradient-full" width="500" height="500" style={{ maxWidth: '100%' }} />
          <Typography variant="body1" align="center" color="textPrimary" gutterBottom>
            This image is the edge detection algorithm's output. Importantly, it is used to identify wrinkles.
            The wrinkle percentage listed above is the percentage of pixels in the relevant rectangle which were
            identified as edges in this image.
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h4" align="center" color="textPrimary" gutterBottom>
        Zoomed in images
      </Typography>
      <Typography variant="body1" align="center" color="textPrimary" gutterBottom>
        These images are zoomed in images of the rectangles shown above in both the edge detection
        and normal images.
      </Typography>
      <Grid container component={Paper} justify="center" >
        {['Left', 'Right'].map(s => ['Yes', 'No'].map(y => [s, y])).flat().map(v => (
          <>
            {cell(v, 'Eye')}
            {cell(v, 'Cheek')}
            {cell(v, 'Full')}
            {/* <Grid item><canvas id={v[0] + '-' + v[1] + '-cheek'} /></Grid>
              <Grid item><canvas id={v[0] + '-' + v[1] + '-full'} /></Grid> */}
          </>
        ))}
      </Grid>
    </Container>
  </>
}
