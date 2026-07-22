import React, { useCallback, useEffect, useMemo, useState } from "react"
import StockRow from "./StockRow";
import { stockService, type FormattedStockQuote } from "../services/service";
import { Alert, Box, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";

const REFESH_INTERVAL = 60000;


const StockDashBoard = () => {
    const [symbols] = useState(["AAPL", "MSFT", "TSLA", "GOOGL"]);
    const [stocks, setStocks] = useState<FormattedStockQuote[]>([]);
    const [search, setSearch] = useState("");
    const [error, setError] = useState("");

    const fetchStocks = useCallback(async () => {
        try {
            setError("");
            const data = await stockService.getQuotes(symbols);
            setStocks(data);
        } catch (err) {
            if (err.message.includes("Invalid")) {
                setError("Sai mã chứng khoán");
            } else {
                setError("Lỗi khi gọi API");
            }
        }
    }, [symbols])

    useEffect(() => {
        fetchStocks();
        const interval = setInterval(fetchStocks, REFESH_INTERVAL);
        return () => clearInterval(interval);
    }, [fetchStocks]);


    // filter
    const filteredStocks = useMemo(() => {
        return stocks.filter((s) => s.symbol.toLowerCase().includes(search.toLowerCase()));
    }, [stocks, search]);

    // up/down count
    const { upCount, downCount } = useMemo(() => {
        let up = 0;
        let down = 0;
        stocks.forEach((s) => {
            if (s.change > 0) up++;
            else if (s.change < 0) down++;
        });
        return { upCount: up, downCount: down };
    }, [stocks]);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5">
                📊Stock Dashboard
            </Typography>
            <Typography sx={{ mb: 2 }}>
                🔼 {upCount} | 🔽 {downCount}
            </Typography>
            <TextField fullWidth label="Search ticker..." size="small" sx={{ mb: 2 }} value={search} onChange={(e) => setSearch(e.target.value)} />
            {error && <Alert severity="error">{error}</Alert>}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Ticker</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="right">Change</TableCell>
                            <TableCell align="right">%</TableCell>
                            <TableCell align="right">Volume</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredStocks.map((stock) => (
                        <StockRow key={stock.symbol} stock={stock} />
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
}

export default StockDashBoard;