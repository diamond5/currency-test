import { Grid, Paper, Typography} from "@material-ui/core";
import {DatePicker} from "@material-ui/pickers";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    endDate,
    startDate,
    setStartDate,
    setEndDate,
    getHistoricalCurrency,
    currentCurrency
} from "../redux/currency";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {convertToIso, minDay} from "../helper";
import Chart from "./Chart";
import {useStyles} from "../../styles";


const History = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const startDateValue = useSelector(startDate);
    const endDateValue = useSelector(endDate);
    const currency = useSelector(currentCurrency);

    useEffect(() => {
        dispatch(getHistoricalCurrency())
    }, [startDateValue, endDateValue, currency, dispatch]);

    const selectedStartDate = (date: MaterialUiPickersDate) =>
        dispatch(setStartDate(convertToIso(date)))

    const selectedEndDate = (date: MaterialUiPickersDate) =>
        dispatch(setEndDate(convertToIso(date)))

    return (
        <Paper classes={{root: classes.paper}}>
            <Grid item container xs={12} alignItems="stretch">
                <Grid item container xs={12} justify="center" classes={{root: classes.historyTitle}}>
                    <Typography variant="h5">
                        CURRENCY HISTORY
                    </Typography>
                </Grid>
                <Grid item container xs={12} spacing={2} justify="center">
                    <Grid item xs={12} md={6}>
                        <DatePicker
                            fullWidth
                            label="Start date"
                            value={startDateValue}
                            onChange={selectedStartDate}
                            maxDate={endDateValue}
                            disableFuture
                            minDate={minDay()}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <DatePicker
                            fullWidth
                            label="End date"
                            value={endDateValue}
                            onChange={selectedEndDate}
                            maxDate={new Date()}
                            minDate={minDay()}
                            disableFuture
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12} justify="center" classes={{root: classes.chartContainer}}>
                    <Chart/>
                </Grid>
            </Grid>
        </Paper>

    )
}

export default History
