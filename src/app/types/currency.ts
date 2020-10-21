import {Action, ThunkAction} from "@reduxjs/toolkit";
import {store} from "../../index";

export interface CurrencyState {
    amount: number;
    currency: string;
    startDate: string;
    endDate: string;
    currenciesList: string[];
    currenciesToDisplay: string[];
    todayRates: ITodayRate;
    historicalRates: IHistoryRates;
}

export interface IHistoryRates {
    [date: string]: {
        [name: string]: string
    }
}

export interface ITodayRate {
    [name: string]: string
}

export interface IChartItem {
    name: string;

    [currency: string]: string;
}

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
