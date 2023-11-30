'use client'

import { Myarr } from "@/pages/api/gethttp";
import { useState, useReducer, useEffect } from "react";
import Parkinfo from "@/app/container/cart";

function CartItem({ k }: { k: number }) {
  return (
    <div className="cart-item">
      <p>하이테크 </p>
      <p>{k}칸</p>
      <p>9칸</p>
    </div>
  );
}

export default function Cart() {

  return (
    <Parkinfo/>
  )
}