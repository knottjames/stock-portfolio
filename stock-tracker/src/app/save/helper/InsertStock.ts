
export default async function submitStock(ticker: string, shares: number, price: number) {
    const res = await fetch('/api/portfolio', {
        method: 'POST',
        body: JSON.stringify({ ticker, shares, price }),
    });
 
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

   // return data;
}