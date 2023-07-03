
export default async function fetchResults(ticker: string): Promise<any> {
    
        try {
            const response = await fetch(`/api/stocks?query=${ticker}`);
            const json = await response.json();
            return json;
        } catch (err) {
            console.error("An error occurred during fetch:", err); // Log any errors
        }
    
    
    
}