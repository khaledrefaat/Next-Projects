import { readFileSync, writeFileSync } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path, { parse } from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const filePath = path.join(process.cwd(), 'data', 'DUMMY_BACKEND.json');
  const jsonData = await readFileSync(filePath);
  const { DUMMY_DATA } = await JSON.parse(jsonData.toString());

  if (req.method === 'GET') {
    return res.status(200).json(DUMMY_DATA);
  }
  if (req.method === 'POST') {
    const { title, description } = req.body;
    const lastDummy = DUMMY_DATA[DUMMY_DATA.length - 1];
    const lastIdNum = lastDummy.id.split('p')[1];
    const newDummy = {
      DUMMY_DATA: [
        ...DUMMY_DATA,
        {
          id: `p${+lastIdNum + 1}`,
          title,
          description,
        },
      ],
    };
    await writeFileSync(filePath, JSON.stringify(newDummy));
    const bufferData = await readFileSync(filePath);
    const data = await JSON.parse(bufferData.toString());
    res.status(201).json(data.DUMMY_DATA);
  }
}
