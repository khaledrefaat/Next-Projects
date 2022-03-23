import { readFileSync } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { Product } from '../../product.model';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { pid } = req.query;

  const filePath = path.join(process.cwd(), 'data', 'DUMMY_BACKEND.json');
  const jsonData = await readFileSync(filePath);
  const { DUMMY_DATA } = await JSON.parse(`${jsonData}`);

  const product = DUMMY_DATA.find((product: Product) => product.id === pid);
  res.json(product);
}
