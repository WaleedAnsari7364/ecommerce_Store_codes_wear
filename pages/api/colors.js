// pages/api/colors.js
import mongoose from 'mongoose';
import Product from '@/models/Product';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { size } = req.query;

    if (!size) {
      return res.status(400).json({ error: 'Size is required' });
    }

    try {
      await mongoose.connect(process.env.MONGO_URI);
      const colors = await Product.distinct('color', { size: size });
      res.status(200).json(colors);
    } catch (error) {
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
