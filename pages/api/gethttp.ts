import type { NextApiRequest, NextApiResponse } from 'next';
// import { promises as fs } from 'fs';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      // GET 요청 처리
      res.status(200).json({ message: 'This is a GET response' });
      break;

    case 'POST':
      // POST 요청 처리
      res.status(200).json({ message: 'This is a Post response' });
      // ... 여기에 POST 처리 로직 .
      console.log(req.body);
      
      break;

    default:
      // 다른 HTTP 메서드에 대한 처리
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}