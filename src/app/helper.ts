import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {compareAsc} from "date-fns";
import DateFnsAdapter from "@date-io/date-fns";
import {dateChartFormat} from "../constants/common";
import {IChartItem} from "./types/currency";

const dateFns = new DateFnsAdapter();

export const convertToIso = (date: MaterialUiPickersDate) => dateFns.date(date).toISOString()
export const convertToDate = (date: string) => dateFns.format(dateFns.date(date), dateChartFormat)
export const minDay = () => dateFns.addDays(dateFns.date(), -365).toDateString()

export const orderDates = (arr: IChartItem[]) => arr.sort((a, b) =>
    compareAsc(
        dateFns.date(a.name),
        dateFns.date(b.name)
    ))
