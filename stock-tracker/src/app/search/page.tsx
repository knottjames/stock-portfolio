'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {

    const searchParams = useSearchParams();
    const ticker = searchParams.get('query');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/stocks?query=${ticker}`);
                const json = await response.json();
                console.log(json);
                setData(json.defaultKeyStatistics);
                setLoading(false);
            } catch (err) {
                console.error("An error occurred during fetch:", err); // Log any errors
            }
        };
       
        console.log("Fetching data...");
        fetchData();

    }, []); // The empty array [] means this useEffect will run once when the component mounts.  
    if (loading) {
        return <div>Loading...</div>;
    }
    return <div>Stock: {ticker}</div>
}