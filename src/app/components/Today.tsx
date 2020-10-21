import {
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Theme,
    Typography,
    useTheme
} from "@material-ui/core";
import React, {ChangeEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    currenciesToDisplay,
    todayRates,
    setCurrenciesToDisplay,
    currenciesList,
    amount
} from "../redux/currency";
import {useStyles} from "../../styles";

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 12.5,
            width: 250,
        },
    },
};
const getStyles = (name: string, personName: string[], theme: Theme) => ({
    fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
});

const Today = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const classes = useStyles();
    const currencies = useSelector(currenciesList);
    const currenciesDisplay = useSelector(currenciesToDisplay);
    const todayData = useSelector(todayRates);
    const amountValue = useSelector(amount);

    const handleSetCurrenciesList = (event: ChangeEvent<{ value: unknown }>) => {
        dispatch(setCurrenciesToDisplay(event.target.value as string[]))
    }

    return (
        <Grid container item xs={12} md={6} alignItems="stretch">
            <Paper classes={{root: classes.paper}}>
                <Grid container>
                    <Grid container item xs={12}>
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel>Currencies to convert</InputLabel>
                            <Select
                                multiple
                                value={currenciesDisplay}
                                onChange={handleSetCurrenciesList}
                                input={<Input/>}
                                MenuProps={MenuProps}
                                classes={{root: classes.selectRoot}}
                            >
                                {currencies.map((name) => (
                                    <MenuItem
                                        key={name}
                                        value={name}
                                        style={getStyles(name, currenciesDisplay, theme)}
                                    >
                                        {name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid container item xs={12}>
                        {currenciesDisplay.map((key) => (
                            <Grid container item xs={12} key={key} alignItems="center">
                                <Typography
                                    variant="body1"
                                    classes={{root: classes.currencyName}}
                                >
                                    {key}:
                                </Typography>
                                <Typography variant="body1">
                                    {+todayData[key] * amountValue || 0}
                                </Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Today
