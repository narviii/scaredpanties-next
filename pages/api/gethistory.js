import {connectToDatabase} from '../../src/mongodb'

export default async function gethistory  (req, res) {
    const { db } = await connectToDatabase();
    const history = await db
      .collection("history")
      .find({})
      .sort({ _id: -1 })
      .limit(20)
      .toArray();
    res.json(history);
  };