import { NextResponse } from "next/server";

async function fetchStocks(ticker) {
    const response = await fetch('https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=' + 'msft' + '&region=US', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ef0efe121cmsh79fc3c9b48fefddp18ebd1jsn6464d4519546',
            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    })

    const result = await response.json()
    return result


}
export async function GET(request) {
    const coins = await fetchStocks();
    return NextResponse.json(coins);
}