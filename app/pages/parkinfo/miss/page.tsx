// import exp from "constants";
// import { GetServerSideProps, NextPage } from "next";
// import Head from "next/head";
// import { unstable_noStore as noStore } from "next/cache";
// import { useState } from "react";
import Link from 'next/link';

export default function miss() {

  return (

    <div>
      
      <h4 className="title-miss">죄송합니다! 아직 업데이트 작업중입니다.</h4>
      <p className="title-miss2">뒤로 가려면 아래 버튼을 클릭하세요.</p>
        <Link href="/">
          <button className='mybtn'>뒤로가기</button>
        </Link>
    
    </div>

  )
}