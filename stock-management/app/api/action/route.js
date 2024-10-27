import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  let { action, slug, initialQuantity } = await request.json()
  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://mongodb:di9utTasUi4AHxoJ@mongoyoutube.nhtraxd.mongodb.net/";
  const client = new MongoClient(uri);
  try {
    const database = client.db('stock');
    const inventory = database.collection('inventory');
    const filter = { slug: slug };

    let newQuantity = action == "plus" ? (parseInt(initialQuantity) + 1) : (parseInt(initialQuantity) - 1)
    const updateDoc = {
      $set: {
        quantity: newQuantity
      },
    };
    const result = await inventory.updateOne(filter, updateDoc, {});

    return NextResponse.json({ success: true, message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)` })
  }
  catch {
    return NextResponse.json({ success: false, message: `Some error occurred` })
  }
  finally {
    await client.close();
  }
}