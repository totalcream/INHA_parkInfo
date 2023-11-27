// import exp from "constants";
// import { GetServerSideProps, NextPage } from "next";
// import Head from "next/head";
// import { unstable_noStore as noStore } from "next/cache";
// import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

// const P = styled.p`
//     color: red;
//     `

export default function Page() {
    return (
        <div>
            <h4 className="title">hightech</h4>
            <div className="cart-item">
                <p>주차장 이름</p>
                <p>여석</p>
                <p>전체 좌석</p>
            </div>

            <CartItem/>

            <div className="high">
            <Image
            src="/high1.png"
            alt={"1"}
            className="park1_img"
            layout="fixed"
            width={1362}
            height={174}
            ></Image>
            {Array.from({ length: 9 }, (_, index) => (
                <Image
                    key={index} src="/green1.png"
                    width={1728}
                    height={1080}
                    layout="fixed"
                    alt={`주차장 이미지 ${index + 1}`}
                    className="green1-img"></Image>
            ))}
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