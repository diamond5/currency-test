import React, {useEffect} from 'react';
import {
    currentCurrency,
    getDayCurrency, getHistoricalCurrency,
} from "./redux/currency";
import {
    Container,
    Grid, Typography,
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import History from "./components/History";
import Today from "./components/Today";
import MainCurrency from "./components/MainCurrency";
import {useStyles} from "../styles";

const App = () => {
    const classes = useStyles();
    const currency = useSelector(currentCurrency);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDayCurrency())
        dispatch(getHistoricalCurrency())
    }, [currency, dispatch]);

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid container item xs={12} justify="center">
                    <Typography variant="h3">
                        CURRENCY CONVERTER
                    </Typography>
                </Grid>
                <Grid container item xs={12} spacing={3} justify="center">
                    <MainCurrency/>
                    <Today/>
                </Grid>
                <Grid container item xs={12}>
                    <History/>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
