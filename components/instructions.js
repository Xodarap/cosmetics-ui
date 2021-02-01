import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
            Upload a picture of yourself wearing makeup and a machine learning algorithm will evaluate its quality.
            You may wish to use  different styles or products on different halfs  of your face in order to compare multiple products.
        </Typography>
        <Typography component="p" variant="body1" align="center" color="textPrimary" gutterBottom>
            Use a neutral expression and face straight towards the camera for best results
        </Typography>
    </Container>)
}