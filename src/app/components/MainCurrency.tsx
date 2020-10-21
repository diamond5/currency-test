import {FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField} from "@material-ui/core";
import React, {ChangeEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    currenciesList, currentCurrency, setCurrency, setAmount, amount
} from "../redux/currency";
import {useStyles} from "../../styles";


const MainCurrency = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const currency = useSelector(currentCurrency);
    const currencies = useSelector(currenciesList);
    const amountValue = useSelector(amount);

    const handleChangeCurrency = (event: ChangeEvent<{ value: unknown }>) =>
        dispatch(setCurrency(event.target.value as string))

    const handleChangeAmount = (event: ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as number;
        if (value >= 0) {
            dispatch(setAmount(event.target.value as number));
        }
    };

    return (
        <Grid item container xs={12} md={4}>
            <Paper classes={{root: classes.paper}}>
                <Grid container alignItems="center">
                    <FormControl className={classes.formControl}>
                        <InputLabel>Currency</InputLabel>
                        <Select
                            value={currency}
                            onChange={handleChangeCurrency}
                            classes={{root: classes.selectRoot}}
                        >
                            {currencies.map((value) => (
                                <MenuItem value={value} key={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        value={amountValue}
                        onChange={handleChangeAmount}
                        label="Amount"
                        type="number"
                    />
                </Grid>
            </Paper>
        </Grid>
    )
}

export default MainCurrency
