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
const cell = (v, t) => (
  <Grid
    size={{ xs: 6, md: 3 }}
    sx={{ 
      maxWidth: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px' // Give the container some height
    }}
  >
    <canvas 
      id={v[0] + '-' + v[1] + '-' + t.toLowerCase()} 
      width="150" 
      height="150"
      style={{ border: '1px solid #ccc' }} // Add border to see the canvas
    />
    <Typography variant="body1" align="center">
      {v[0]} {v[1] == 'Yes' ? 'Edge Detection' : 'Normal'} {t}
    </Typography>
  </Grid>
);
  return <>
    <Typography variant="h3" align="center" color="textPrimary" gutterBottom>
      Processed Images
    </Typography>
    <Container maxWidth="lg">
      <Grid container component={Paper} justify="center" spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <canvas id="canvas-image-full" width="500" height="500" style={{ maxWidth: '100%', 
    width: '100%',  
    height: 'auto'   }} />
          <Typography variant="body1" align="center" color="textPrimary" gutterBottom style={{ maxWidth: '500px' }}>
            This image shows the facial landmarks identified by the algorithm. Importantly it displays the rectangles
            used to calculate eye and cheek wrinkles percentage. Color distance is also defined as
            the average color distance between the eye rectangle and the cheek rectangle on each side.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <canvas id="canvas-gradient-full" width="500" height="500" style={{ maxWidth:'100%', 
    width: '100%',  
    height: 'auto'  }} />
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
