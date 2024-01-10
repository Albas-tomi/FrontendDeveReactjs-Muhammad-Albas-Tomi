import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingStar from "../CardReasto/RatingStar";
import { Spinner } from "flowbite-react";

const DetailPage = () => {
  const [dataDetail, seDataDetail] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const getDataRestoById = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://659d6d92633f9aee7909681f.mockapi.io/restaurants/${id}`
      );
      seDataDetail(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataRestoById();
  }, [id]);

  if (isLoading)
    return (
      <div className="w-full text-center h-screen">
        <Spinner
          aria-label="Extra large spinner example Center-aligned "
          className="w-1/4 h-1/4 mt-32"
        />
      </div>
    );

  return (
    <div className="grid grid-flow-row md:grid-cols-2  gap-3 p-3">
      <section className="grid-cols-5 bg-slate-500 shadow-md p-3 rounded-sm ">
        <img src={dataDetail.image} alt="foto restop" />
      </section>
      <section className="grid-cols-7">
        <h1 className="font-bold text-xl my-2">{dataDetail.name}</h1>
        <div className="my-2">
          <p>{dataDetail.deskripsi}</p>
          <p>{dataDetail.address}</p>
        </div>
        <RatingStar restoData={dataDetail} />
        <div className="flex gap-5">
          <p className="font-semibold">Rp. {dataDetail.price}</p>
          <p className="text-blue-500">{dataDetail.kategori}</p>
        </div>
      </section>
    </div>
  );
};

export default DetailPage;
