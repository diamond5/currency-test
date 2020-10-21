import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import {AppThunk, RootState} from '../types/currency';
import {CurrencyState, IHistoryRates, ITodayRate} from "../types/currency";
import {currencyUrl, dateFormat, defaultCurrencies} from "../../constants/common";
import DateFnsAdapter from "@date-io/date-fns";

const dateFns = new DateFnsAdapter();

const initialState: CurrencyState = {
    amount: 1,
    currency: defaultCurrencies[0],
    startDate: dateFns.addDays(new Date(), -10).toISOString(),
    endDate: dateFns.addDays(new Date(), -1).toISOString(),
    currenciesList: defaultCurrencies,
    currenciesToDisplay: [],
    todayRates: {},
    historicalRates: {}
};

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrency: (state, action: PayloadAction<string>) => {
            state.currency = action.payload;
        },
        setAmount: (state, action: PayloadAction<number>) => {
            state.amount = action.payload;
        },
        setStartDate: (state, action: PayloadAction<string>) => {
            state.startDate = action.payload;
        },
        setEndDate: (state, action: PayloadAction<string>) => {
            state.endDate = action.payload;
        },
        setCurrenciesList: (state, action: PayloadAction<string[]>) => {
            state.currenciesList = action.payload;
        },
        setCurrenciesToDisplay: (state, action: PayloadAction<string[]>) => {
            state.currenciesToDisplay = action.payload;
        },
        setToday: (state, action: PayloadAction<ITodayRate>) => {
            state.todayRates = action.payload;
        },
        setHistory: (state, action: PayloadAction<IHistoryRates>) => {
            state.historicalRates = action.payload;
        },
    },
});

export const {
    setCurrency,
    setAmount,
    setStartDate,
    setEndDate,
    setCurrenciesList,
    setToday,
    setHistory,
    setCurrenciesToDisplay
} = currencySlice.actions;

export const getDayCurrency = (): AppThunk => async (dispatch, getState) => {
    const {currency: {currency}} = getState();
    try {
        const result = await axios.get(`${currencyUrl}/latest?base=${currency}`)
        dispatch(setToday(result.data.rates))
        dispatch(setCurrenciesList(Object.keys(result.data.rates)))
    } catch (e) {
        console.warn(e)
        alert('Something went wrong')
    }
}

export const getHistoricalCurrency = (): AppThunk => async (dispatch, getState) => {
    const {currency: {startDate, endDate, currency}} = getState();
    const startDay = dateFns.format(dateFns.date(startDate), dateFormat);
    const endDay = dateFns.format(dateFns.date(endDate), dateFormat);

    try {
        const result = await axios.get(`${currencyUrl}/history?start_at=${startDay}&end_at=${endDay}&base=${currency}`)
        dispatch(setHistory(result.data.rates))
    } catch (e) {
        console.warn(e)
        alert('Something went wrong')
    }
}
export const currenciesToDisplay = ({currency}: RootState) => currency.currenciesToDisplay;
export const currenciesList = ({currency}: RootState) => currency.currenciesList;
export const historicalRates = ({currency}: RootState) => currency.historicalRates;
export const currentCurrency = ({currency}: RootState) => currency.currency;
export const todayRates = ({currency}: RootState) => currency.todayRates;
export const startDate = ({currency}: RootState) => currency.startDate;
export const endDate = ({currency}: RootState) => currency.endDate;
export const amount = ({currency}: RootState) => currency.amount;

export default currencySlice.reducer;
