import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
    root: {
        'paddingTop': theme.spacing(5)
    },
}));

export default function Instructions() {
    const classes = useStyles();
    return (
    <Container className={classes.root}>
        <Typography component="p" variant="body1" align="center" color="textPrimary" gutterBottom>
            Put one type of makeup half of your face, and a different type (or no makeup) on the other.
            A machine learning algorithm will evaluate the quality of each.
        </Typography>
        <Typography component="p" variant="body1" align="center" color="textPrimary" gutterBottom>
            Use a neutral expression and face straight towards the camera for best results
        </Typography>
    </Container>)
}