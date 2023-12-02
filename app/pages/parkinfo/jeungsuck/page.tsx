// import { GetServerSideProps, GetServerSideProps } from "next";
import { Myarr } from "@/pages/api/gethttp";

interface Myarr {
  Myarr: Array<boolean>;
}

const ShowDetailPage = ({Myarr}: {Myarr: Array<boolean>}) => {
  const newData = Myarr;

  console.log(newData);
  return (
    <div>
      <p>Test Pages </p>
    </div>
  );
};