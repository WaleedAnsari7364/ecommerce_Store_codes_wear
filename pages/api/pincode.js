import pincodes from '../../pincodes.json'
import cors,{runMiddleware} from '@/middleware/cors';

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
    
    res.status(200).json(pincodes);
  }