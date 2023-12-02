import type { NextApiRequest, NextApiResponse } from 'next';
import { createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Parkupdate } from '@/stores/Store';

//아두이노 데이터 저장변수

const parkarr = Parkupdate;
const Myarr: boolean[] = Array(9).fill(false);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      // GET 요청 처리
      console.log("HTTP GET Called!");
      res.status(200).json(Parkupdate.SensorArr);
      break;

    case 'POST':
      // POST 요청 처리
      const body = req.body;
      
      for (let index = 0; index < 9; index++) {
        if(body.SensorValue[index])
        Myarr[index] = true;
      else
      Myarr[index] = false;
  }
  Parkupdate.injectData(Myarr);
  console.log(Parkupdate.SensorArr);
  res.status(200).json(Parkupdate.SensorArr);
  break;

    default:
      // 다른 HTTP 메서드에 대한 처리
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export {Myarr};