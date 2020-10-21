import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    paper: {
        marginTop: theme.spacing(3),
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        alignSelf: 'stretch',
        display: 'flex',
        flex: 1
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    currencyName: {
        fontWeight: 600
    },
    selectRoot: {
        textAlign: 'left',
    },
    chartContainer: {
        marginTop: theme.spacing(3),
    },
    historyTitle: {
        margin: '15px 0'
    }
}));
