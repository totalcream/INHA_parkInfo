'use client'

import { Myarr } from "@/pages/api/gethttp";
import { useState, useReducer, useEffect } from "react";
import Parkinfo from "@/app/container/cart";
import { Parkupdate } from "@/stores/Store";
import { autorun } from "mobx";
import { unstable_cache as noStore } from "next/cache";
import type { NextApiRequest, NextApiResponse } from 'next';
import { features } from "process";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";



let arrData: Array<boolean>;
function CartItem({ k }: { k: number }) {
  return (
    <div className="cart-item">
      <p>하이테크 </p>
      <p>{k}칸</p>
      <p>9칸</p>
    </div>
  );
}

const fetchArr = async () => {
  const response = await fetch(('http://localhost:3000/api/gethttp'), {
    cache: "no-cache",
  });
  const data = await response.json()
  arrData = data;
  console.log("여기는페이지");
  console.log(arrData);
  
  return data;
};

export default function Cart() {
  const [parkData, setParkData] = useState([]);
  const newdata = fetchArr();
  console.log("여기는 카트")
  console.log(newdata);
  Parkupdate.injectData(newdata);
  // console.log(newdata);
  // const data = await fetchArr();
  // console.log(data);
  // const newData = await fetch('../../../../pages/api/gethttp.ts')
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       console.log("Fetching Data...");
  //       const response = await fetch('../../../../pages/api/gethttp');
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       console.log("Data received: ", data);
  //       setParkData(data);
  //     } catch (error) {
  //       console.error('Error fetching data: ', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  autorun(() => {
    <Parkinfo ParkArr={arrData}></Parkinfo>
  });
  // console.log("hightech_Page");
  // console.log(Parkupdate.SensorArr);
  return (
    <Parkinfo ParkArr={arrData}/>
  )
}

export {fetchArr}