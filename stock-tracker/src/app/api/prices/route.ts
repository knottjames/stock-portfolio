import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const url = req.nextUrl;
    const tickers = url.searchParams.get('tickers');
    const prices = await fetchPrices(tickers as string);
    return NextResponse.json(prices);
}

async function fetchPrices(tickers: string) {
    console.log("tickers: "+ tickers)
    const response = await fetch('https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols='+tickers, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPID_API_KEY as string,
            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }

    })
    const result = await response.json()
    return result


}

