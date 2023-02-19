import axios from "axios";

export class StockService{

    public static getAllStocks(){
        let StockUrl:string = "http://localhost:8080/stocks"
        return axios.get(StockUrl)
    }
}

