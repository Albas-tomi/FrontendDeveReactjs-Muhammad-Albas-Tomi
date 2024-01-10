import { Badge, Button, Card } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";
import RatingStar from "./RatingStar";

const RestoCard = ({ restoData }) => {
  const userLogin = localStorage.getItem("userLogin");

  return (
    <>
      <Card
        className="max-w-sm"
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={restoData.image}
      >
        <h5 className="text-2xl line-clamp-1 cursor-pointer hover:text-blue-400 duration-300 font-bold tracking-tight text-gray-900 dark:text-white">
          {restoData.name}
        </h5>

        <p className="font-normal line-clamp-2 text-gray-700 dark:text-gray-400">
          {restoData.deskripsi}
        </p>
        <RatingStar restoData={restoData} />
        <p>Price Rp.{restoData.price}</p>
        <div className="flex justify-between">
          <p className="text-blue-400 line-clamp-1 text-sm font-semibold">
            {restoData.kategori}
          </p>
          <Badge color={`${restoData.isOpen === true ? "success" : "failure"}`}>
            {restoData.isOpen === true ? "Open" : "Close"}
          </Badge>
        </div>
        <Link
          className="w-full"
          to={userLogin !== null ? `/restaurants/${restoData.id}` : `/login`}
        >
          <Button className="w-full">
            Read more
            <svg
              className="-mr-1 ml-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Link>
      </Card>
    </>
  );
};

export default RestoCard;
