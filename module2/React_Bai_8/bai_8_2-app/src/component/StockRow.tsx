
import { Box, TableCell, TableRow } from '@mui/material';
import React from 'react';
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"

export interface StockType {
    change: number;
    symbol: number;
    changePercent: number;
    volume: number;
    price: number;
}

interface StockRowProps {
    stock: StockType;
}

const StockRow = React.memo(( {stock}:StockRowProps ) => {
    const isUp = stock.change > 0;
    const isDown = stock.change < 0;
    const color = isUp ? "#2e7d32" : isDown ? "#d32f2f" : "#ed6c02";

    return (
        <TableRow hover>
            <TableCell sx={{ fontHeight: "bold", color: "#1a237e" }}>{stock.symbol}</TableCell>
            <TableCell align='right'>${parseFloat(String(stock.price)).toFixed(2)}</TableCell>
            <TableCell align='right' sx={{ color:{color}, fontHeight: "bold" }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justyCentent: "flex-end" }}>
                    {isUp && <ArrowDropUpIcon />}
                    {isDown && <ArrowDropDownIcon />}
                    {stock.change.toFixed(2)}
                </Box>
            </TableCell>
            <TableCell align="right" sx={{ color: color }}>{stock.changePercent}%</TableCell>
            <TableCell align="right" sx={{ color: 'text.secondary' }}>{(stock.volume).toLocaleString()}</TableCell>
        </TableRow>
    )

})
export default StockRow;