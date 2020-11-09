import { DropzoneArea } from 'material-ui-dropzone'
import { Container } from '@material-ui/core'
import { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DataTable from '../components/data_table'
import Instructions from '../components/instructions'
import Paper from '@material-ui/core/Paper';
import Pictures from '../components/pictures'

const useStyles = makeStyles(theme => ({
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
    minHeight: '80vh',
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundImage: "url('/img/bg.jpg')",
    backgroundSize: 'cover',
  },
  loadingHolder: {
    padding: '20px'
  }
}));

export default function Home() {
  const classes = useStyles();
  const [results, setResults] = useState({})

  const imgWithPreview = (files) => {
    if (!files || files.length == 0) return;
    var reader = new FileReader();
    reader.onloadend = function (event) {
      setResults({ loading: true, src: event.target.result });
      var img = document.createElement("img");
      img.src = event.target.result;
      handleChange(files, setResults);
    }
    reader.readAsDataURL(files[0]);
  }
  return (
    <>
      <div className={classes.firstHero}>
        <Typography component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
          Hair
      </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Do hair good
      </Typography>
        <Container maxWidth="sm">
          <Paper>
            <Instructions />
            <DropzoneArea
              onChange={imgWithPreview.bind(this)}
              filesLimit={1}
              maxFileSize={10000000}
              showPreviews={false}
            />
          </Paper>
        </Container>
        <Container maxWidth="sm" >
          <Grid container justify="center" className={classes.loadingHolder}>
            {(results?.loading) && <CircularProgress />}
          </Grid>
          <Typography variant="h3">Numeric Results</Typography>
          <DataTable r={results}/>
        </Container>
        <Container maxWidth="lg" >
          <Pictures />
        </Container>
      </div>
    </>
  )
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
  console.log(width, height)
  if (width > max_width) {
    height = (max_width / width) * height;
    width = max_width;
  }
  console.log(width, height)
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

  // var canvas = document.getElementById('myCanvas')
  // var urlencoded = new URLSearchParams();
  // urlencoded.append("image_base64", canvas.toDataURL('image/jpeg'))

  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const r = await fetch('http://localhost:7071/api/Cosmetics',
    {
      // headers: myHeaders,
      method: 'POST',
      body: formData
    }
  ).then(r => r.json());
  setState({loading: false, loaded: true, r});
  Array.from(document.getElementsByTagName('canvas')).forEach(canvas => {
    if(canvas.id == 'preview') return;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  });
  // var ctx = canvas.getContext("2d");
  // var image = new Image();
  // image.onload = function() {
  //   ctx.drawImage(image, 0, 0);
  // };
  // image.src = 'data:image/jpeg;base64,' + r['gradient full']
  ['image', 'gradient'].forEach(v => {
    const canvas = document.getElementById('canvas-' + v + '-full');
    const ctx = canvas.getContext("2d");
    var image = new Image();
    const max_width = canvas.width;
    const max_height = canvas.height;
    image.onload = function () {
      var width = image.width;
      var height = image.height;
      console.log(width, height)
      if (width > max_width) {
        height = (max_width / width) * height;
        width = max_width;
      }
      console.log(width, height)
      if (height > max_height) {
        width = (max_height / height) * width;
        height = max_height;
      }
      ctx.drawImage(image, 0, 0, image.width, image.height,     // source rectangle
        0, 0, width, height);
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
        ctx.drawImage(image, p1[0] - (image_type == 'gradient' ?  x : 0), p1[1] - (image_type == 'gradient' ?  y : 0), width, height, 0, 0, new_width, new_height);
      };
      image.src = 'data:image/jpeg;base64,' + r[image_type + ' full']
    })

}