import Link from "next/link"

// `app/page.tsx` is the UI for the `/` URL
export default function jeungsuck() {
    return (
      <>
      <h1>Hello, Home page!</h1>
      <h2>
        <Link href="/">
          <a>홈으로 돌아가기</a>
        </Link>
      </h2>
      </>
    )
  }