import { Rating } from "flowbite-react";
import React from "react";

const RatingStar = ({ restoData }) => {
  // Merubah rating ambil angka depan
  let rating = Number(String(restoData?.rating)[0]);

  //   Max 5
  rating = Math.min(rating, 5);
  4;

  //   Max star 5 -> ubah menjadi null -> buat new array -> Membuat komponen Rating.Star untuk setiap elemen array
  const stars = Array(5)
    .fill(null)
    .map((_, index) => (
      <Rating.Star key={index} filled={`${index < rating ? false : ""}`} />
    ));
  return <Rating>{stars}</Rating>;
};

export default RatingStar;
