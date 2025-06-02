import React from 'react'; // Add this import
import { useDropzone } from 'react-dropzone';
import { Box, Collapse, Container, Link } from '@mui/material'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import DataTable from '../components/data_table'
import Instructions from '../components/instructions'
import Paper from '@mui/material/Paper';
import Pictures from '../components/pictures'
import Footer from '../components/footer'
import { Alert } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme(); // Ensure theme is properly configured
const useStyles = makeStyles(() => ({
  optionalColumn: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'auto',
    },
    [theme.breakpoints.up('lg')]: {
      display: 'auto',
    },
  },
  firstHero: {
    width: '100vw',
    minHeight: '100vh',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundImage: "linear-gradient(to bottom right, #AAA, #eee, #aaa)",
    backgroundSize: 'cover',
  },
  loadingHolder: {
    padding: '20px'
  }
}));

export default function Home() {
  const classes = useStyles();
  const [results, setResults] = useState({});
  const [open, setOpen] = React.useState(true);

  const onDrop = (acceptedFiles) => {
    if (!acceptedFiles || acceptedFiles.length === 0) return;
    const reader = new FileReader();
    reader.onloadend = function (event) {
      setResults({ loading: true, src: event.target.result });
      var img = document.createElement("img");
      img.src = event.target.result;
      handleChange(acceptedFiles, setResults);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 10000000,
    accept: 'image/*',
  });

  return (
    <>
      <div className={classes.firstHero}>
        <Collapse in={open} style={{ flexGrow: 1 }}>
          <Alert severity="info" onClose={() => setOpen(false)}>
            Want to get recommendations on your TikTok account? Try{' '}
            <Link href="https://www.statschecklol.com">Stats Check Lol</Link>
          </Alert>
        </Collapse>
        <Typography component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
          2<wbr />Face<wbr />2<wbr />Furious
        </Typography>
        <Container maxWidth="sm">
          <Paper>
            <Instructions />
            <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
              <input {...getInputProps()} />
              <Typography>Drag and drop an image here, or click to select one.</Typography>
            </div>
          </Paper>
        </Container>
        <Container maxWidth="sm">
          {results?.loading && <Loading />}
          {results.loaded && <Typography variant="h3" align="center">Numeric Results</Typography>}
          <DataTable r={results} />
        </Container>
          <Container maxWidth="lg" style={{visibility: results.loaded ? 'visible' : 'hidden'}}>
            <Pictures />
          </Container>
      </div>
      <Footer />
    </>
  );
}

function Loading() {
  return <Box maxWidth='sm'
    style={{ backgroundColor: '#FFF', marginTop: '5px', padding: '5px', borderRadius: '5px' }} >
    <Typography>Please be patient. This can take up to a minute to upload, as we use high-resolution images.</Typography>
    <Box style={{ margin: 'auto', width: '40px' }}>
      <CircularProgress />
    </Box>
  </Box >
}

function resizeCanvas(canvas) {
  const MAX_WIDTH = 1024;
  const MAX_HEIGHT = 1024;
  if (canvas.width > MAX_WIDTH) {
    canvas.height = canvas.height * MAX_WIDTH / canvas.width
    canvas.width = MAX_WIDTH
  }
  if (canvas.height > MAX_HEIGHT) {
    canvas.width = canvas.width * MAX_HEIGHT / canvas.height
    canvas.height = MAX_WIDTH
  }
}


const imageSize = (canvas, image) => {
  const max_width = canvas.width;
  const max_height = canvas.height;
  var width = image.width;
  var height = image.height;
  if (width > max_width) {
    height = (max_width / width) * height;
    width = max_width;
  }
  if (height > max_height) {
    width = (max_height / height) * width;
    height = max_height;
  }
  return [width, height]
}
async function handleChange(files, setState) {
  if (!files || files.length == 0) return;

  const formData = new FormData()
  formData.append('image_file', files[0])

  const r = await fetch(process.env.NEXT_PUBLIC_API_URL,
    {
      method: 'POST',
      body: formData
    }
  ).then(r => r.json());
  setState({ loading: false, loaded: true, r });
  Array.from(document.getElementsByTagName('canvas')).forEach(canvas => {
    if (canvas.id == 'preview') return;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  });

  ['image', 'gradient'].forEach(v => {
    const canvas = document.getElementById('canvas-' + v + '-full');
    const ctx = canvas.getContext("2d");
    var image = new Image();
    const max_width = canvas.width;
    const max_height = canvas.height;
    image.onload = function () {
      var width = image.width;
      var height = image.height;
      if (width > max_width) {
        height = (max_width / width) * height;
        width = max_width;
      }
      if (height > max_height) {
        width = (max_height / height) * width;
        height = max_height;
      }
      ctx.drawImage(image, 0, 0, image.width, image.height,     // source rectangle
        (max_width - width) / 2, (max_height - height) / 2, width, height);
    };
    image.src = 'data:image/jpeg;base64,' + r[v + ' full']
  });

  const x = r['x offset'];
  const y = r['y offset'];
  ['Left', 'Right'].map(s => ['Yes', 'No'].map(y => [s, y])).flat()
    .map(v => ['eye', 'cheek', 'full'].map(k => [...v, k])).flat()
    .forEach(v => {
      const canvas = document.getElementById(v[0] + '-' + v[1] + '-' + v[2]);
      const ctx = canvas.getContext("2d");
      var image = new Image();
      const image_type = v[1] == 'Yes' ? 'gradient' : 'image'
      let p1, p2, height, width;
      if (v[0] == 'Left') {
        [p1, p2] = r.landmarks[v[0].toLowerCase() + ' ' + v[2] + ' square']
        width = p2[0] - p1[0]
        height = p2[1] - p1[1]
      } else {
        let i1, i2;
        [i1, i2] = r.landmarks[v[0].toLowerCase() + ' ' + v[2] + ' square']
        p1 = [i2[0], i1[1]]
        p2 = [i1[0], i2[1]]
        width = p2[0] - p1[0]
        height = p2[1] - p1[1]
      }
      image.onload = function () {
        const [new_width, new_height] = imageSize(canvas, image)
        ctx.drawImage(image, p1[0] - (image_type == 'gradient' ? x : 0), p1[1] - (image_type == 'gradient' ? y : 0), width, height, 0, 0, new_width, new_height);
      };
      image.src = 'data:image/jpeg;base64,' + r[image_type + ' full']
    })

}