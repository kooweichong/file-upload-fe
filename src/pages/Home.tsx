import { useEffect, useState } from "react"
import FileForm from "../components/FileForm"
import { IStock } from "../models/IStock"
import { StockService } from "../services/StockService"

interface IState{
    loading:boolean,
    stocks:IStock[],
    errorMessage:string
}

export default function Home(){
    const [state, setState] = useState<IState>(
        {
            loading:false,
            stocks: [] as IStock[],
            errorMessage: ''
        }
    )

    useEffect(
        () =>{
            setState({...state, loading:true})
            StockService
            .getAllStocks()
            .then( response => setState({
                ...state, loading:false, stocks:response.data
            }) )
            .catch( err => setState({
                ...state, loading:false, errorMessage:err.message
            }) )
        }, []
    );

    const {loading, stocks, errorMessage } = state

    return(
        <>
            <h1>
                Stock Listing
            </h1>
            {errorMessage && (<p>{errorMessage}</p>)}
            {loading && <h1>Loading....</h1>}
            
            <FileForm />
            <table id="example" className="table table-striped">
                <thead>
                    <tr>
                        <th>Invoice No</th>
                        <th>Stock Code</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Invoice Date</th>
                        <th>Unit Price</th>
                        <th>CustomerId</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        stocks.length > 0 && stocks.map(
                            stock => (
                                <tr key={stock.id}>
                                    <td> {stock.invoiceno} </td>
                                    <td> {stock.stockcode} </td>
                                    <td> {stock.description} </td>
                                    <td> {stock.quantity} </td>
                                    <td> {stock.invoicedate} </td>
                                    <td> {stock.unitprice} </td>
                                    <td> {stock.customerid} </td>
                                    <td> {stock.country} </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <th>Invoice No</th>
                        <th>Stock Code</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Invoice Date</th>
                        <th>Unit Price</th>
                        <th>CustomerId</th>
                        <th>Country</th>
                    </tr>
                </tfoot>
            </table>
        </>
    )
}