'use client'

import Image from "next/image";
import styled from "styled-components";
import { Myarr } from "@/pages/api/gethttp";
import { useState, useReducer, useEffect } from "react";
import Parkinfo from "@/app/container/cart";

function CartItem({ k }: { k: boolean }) {
  return (
    <div className="cart-item">
      <p>하이테크 </p>
      <p>{k}칸</p>
      <p>9칸</p>
    </div>
  );
}

export default function Cart() {

  // 가정: 주어진 데이터 배열 (0 또는 1 값)
  const data = [1, 1, 0, 1, 0, 1, 0, 1, 0];
  const countFalseValues = Myarr && Myarr.filter(value => !value).length;
  console.log(Myarr);
  useEffect(() => {
    console.log('Effect triggered');
  }, []);

  return (
    <Parkinfo parkarr={Myarr} />
  )
}
