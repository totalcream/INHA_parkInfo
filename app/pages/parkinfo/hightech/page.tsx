// import exp from "constants";
// import { GetServerSideProps, NextPage } from "next";
// import Head from "next/head";
// import { unstable_noStore as noStore } from "next/cache";
// import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

// 2023-11-28 수정

// const P = styled.p`
//     color: red;
//     `

export default function Cart() {
  // 가정: 주어진 데이터 배열 (0 또는 1 값)
  const data = [1, 1, 0, 1, 0, 1, 0, 1, 0];

  return (
    <div>
      <h4 className="title">하이테크 주차장 현황</h4>
      <div className="cart-item">
        <p>주차장이름</p>
        <p>여석</p>
        <p>전체좌석</p>
      </div>

      <CartItem />

      <div className="high">
  <img src="/high1.png" className="park1-img" />
  <div className="image-container">
    {data.map((value, index) => (
      <img
        key={index}
        src={value === 0 ? '/green1.png' : '/red1.png'}
        alt={`주차장 이미지 ${index + 1}`}
        className="green1-img"
      />
    ))}
  </div>
</div>

    </div>
  );
}

function CartItem() {
  return (
    <div className="cart-item">
      <p>하이테크 주차장</p>
      <p>n칸</p>
      <p>9칸</p>
    </div>
  );
}