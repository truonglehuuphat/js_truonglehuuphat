import axios from "axios";

// const API_KEY = "27c992f123a64b19b459376168540f79";
const BASE_URL = "https://api.twelvedata.com";

export interface RawQuoteItem {
    price: string | number;
    change: string | number;
    percent_change: string | number;
    volume: number;
    [key: string]: unknown; // Cho phép các trường phụ khác từ API nếu có
}

// Type cho cấu trúc Response tổng thể từ API
export interface ApiResponseData {
    code?: number | string;
    message?: string;
    [symbol: string]: RawQuoteItem | unknown;
}

// Type cho Object kết quả đầu ra sau khi transform
export interface FormattedStockQuote {
    symbol: string;       // Lưu ý: Đã đổi tên thuộc tính 'symbols' ở return thành 'symbol' cho đúng ngữ cảnh 1 mã
    price: number;
    change: number;
    changePercent: string; // Chứa chuỗi "%" đằng sau
    volume: number;
    lastUpdate: string;
}

// Interface định nghĩa cho cả Service
export interface StockService {
    getQuotes: (symbols: string[]) => Promise<FormattedStockQuote[]>;
}

export const stockService = {
    getQuotes: async (symbols: string[]): Promise<FormattedStockQuote[]> => {
        try {
            const res = await axios.get(`${BASE_URL}/quote`, {
                params: {
                    symbol: symbols.join(","),
                    apikey: API_KEY,
                },
            });
            console.log(res.data);
            const data = res.data;
            
            if (data.code) {
                throw new Error(data.message || "API_ERROR");
            }
            
            return Object.keys(data)
                .filter((key) => key !== "code" && key !== "message")
                .map((sym) => {
                    const item = data[sym];
                    return {
                        symbol: sym,
                        price: parseFloat(String(item.open)),
                        change: parseFloat(String(item.change)),
                        changePercent: `${item.percent_change}%`,
                        volume: Number(item.volume),
                        lastUpdate: new Date().toLocaleTimeString(),
                    };
                });

        } catch (err) {
            console.log(err);
            throw new Error("API_ERROR");
        }
    }

}
