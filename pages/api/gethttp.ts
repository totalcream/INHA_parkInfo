import type { NextApiRequest, NextApiResponse } from 'next';

//아두이노 데이터 저장변수
const Myarr: boolean[] = Array(10).fill(false);

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
      const body = req.body;

      console.log(body.SensorValue);

      for (let index = 0; index < 10; index++) {
        if(body.SensorValue[index])
          Myarr[index] = true;
        else
        Myarr[index] = false;
      }
      console.log(Myarr);
      break;

    default:
      // 다른 HTTP 메서드에 대한 처리
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export {Myarr};