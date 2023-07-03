import { NextRequest, NextResponse } from "next/server";

async function fetchStocks(ticker: string) {
    
    const response = await fetch('https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=' + ticker + '&region=US', {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    })
    console.log(process.env.NEXT_PUBLIC_RAPIDAPI_KEY)
    const result = await response.json()
    return result


}
export async function GET(request: NextRequest) {

    const { searchParams } = new URL(request.url);
    console.log("params: "+ searchParams.get('query'))

    const query = searchParams.get('query');
    const coins = await fetchStocks(query as string);
    return NextResponse.json(coins);
}