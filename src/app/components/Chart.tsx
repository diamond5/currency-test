import React from 'react';
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import {useSelector} from "react-redux";
import {currenciesToDisplay, historicalRates} from "../redux/currency";
import {IChartItem} from "../types/currency";
import {convertToDate, orderDates} from "../helper";

const lineChartMargin = {
    top: 5,
    right: 20,
    bottom: 5,
    left: 0,
};

const Chart = () => {
    const currenciesDisplay = useSelector(currenciesToDisplay);
    const historyRates = useSelector(historicalRates);
    const historyData = Object.keys(historyRates).reduce((acc: IChartItem[], date) => {
        const res: IChartItem = {name: convertToDate(date)}
        currenciesDisplay.forEach((key) => {
            res[key] = historyRates[date][key]
        })

        acc.push(res)
        return acc
    }, []);

    return (
        <LineChart
            width={800}
            height={400}
            data={orderDates(historyData)}
            margin={lineChartMargin}
        >
            {currenciesDisplay.map((curr) => (
                <Line key={curr} type="monotone" dataKey={curr} stroke="#8884d8"/>
            ))}
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
            <XAxis dataKey="name"/>
            <YAxis/>
            <Tooltip/>
        </LineChart>
    );
}

export default Chart
