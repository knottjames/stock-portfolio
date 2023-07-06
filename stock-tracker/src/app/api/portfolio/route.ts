// /pages/api/stocks.js
import firebaseApp from '../../../../lib/firebase';
import { getAuth } from 'firebase/auth';
import clientPromise from '../../../../lib/mongdb';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {

  try {
    const { uid, ticker, shares, price } = await req.json();
    const data = await insertStock(uid, ticker, parseFloat(shares), parseFloat(price));
    const res = NextResponse.json(data);
    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }

}

async function insertStock(uid: string, ticker: string, shares: number, price: number) {
  const client = await clientPromise;
  const db = client.db('stock');
  const collection = db.collection('portfolios');


  console.log(uid);
  if (!uid) {
    throw new Error('User not logged in');
  }

  const newStock = {
    ticker,
    shares,
    price
  };
  const result = await collection.updateOne(
    { uid },
    { $push: { stocks: newStock } },
    { upsert: true }
  );
  return result;
}
