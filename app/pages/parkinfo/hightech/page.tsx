
import { Myarr } from "@/pages/api/gethttp";
// import { useState, useReducer, useEffect } from "react";
import Parkinfo from "@/app/container/cart";
// import { Parkupdate } from "@/stores/Store";
// import { autorun } from "mobx";
import { unstable_cache as noStore } from "next/cache";
import type { NextApiRequest, NextApiResponse } from 'next';
import { features } from "process";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import Link from "next/link";



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
  const newdata = fetchArr();
  console.log("여기는 카트")
  const countFalseValues = arrData && arrData.filter(value => !value).length

  return (
      <>
      <div>
      <CartItem k={countFalseValues} />
      </div>
      {/* <Parkinfo ParkArr={arrData} /> */}
      <div>
<h4 className="title-miss">하이테크 주차장 현황</h4>
<div className="cart-item">
  <p>건물 이름</p>
  <p>여석</p>
  <p>전체좌석</p>
</div>

<div className="high">
  <img src="/high1.png" className="park1-img" />
  <div className="image-container">
    {arrData && arrData.map((value, index) => (
      <img
        key={index}
        src={value === false ? '/green1.png' : '/red1.png'}
        alt={`주차장 이미지 ${index + 1}`}
        className="green1-img"
      />
    ))}
  </div>
</div>


<Link href="/">
    <button className='mybtn'>뒤로가기</button>
  </Link>
</div>
      </>
  )
}