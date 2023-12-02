import Link from "next/link"
import { useState, useEffect } from "react"
import { Myarr } from "@/pages/api/gethttp";
import { observer } from "mobx-react-lite";
import { Parkupdate } from "../../stores/Store";
import { fetchArr } from "../pages/parkinfo/hightech/page";


const Parkinfo = observer(({ParkArr}: {ParkArr: Array<boolean>}) => {
useEffect(() => {
  const newData = async() => fetchArr();
  console.log("여기는 컴포넌트");
  console.log(newData);
}, []);

// const [parkData, setParkData] = useState(Array(10).fill(false));
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         console.log("useeffect");
//         setParkData(Parkupdate.SensorArr)
//       } catch (error) {
//         console.error('Error fetching data: ', error);
//       }
//     };
//     fetchData();
//   }, []);
  
  console.log("component_Page");
  console.log(Parkupdate.SensorArr);
  console.log("component_Page_parkdata");
  console.log(ParkArr);
  
  
    return (

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
    {ParkArr && ParkArr.map((value, index) => (
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
    )
});

export default Parkinfo