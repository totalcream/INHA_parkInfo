import Link from "next/link"

const Parkinfo = ({ parkarr }: { parkarr: Array<boolean> }) => {
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
    {parkarr && parkarr.map((value, index) => (
      <img
        key={index}
        src={value === true ? '/green1.png' : '/red1.png'}
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
}

export default Parkinfo