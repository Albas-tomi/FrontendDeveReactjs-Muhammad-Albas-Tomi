import axios from "axios";
import React, { useEffect, useState } from "react";
import RestoCard from "../CardReasto/RestoCard";
import FilterByPrice from "../FilteredComponent/FilterByPrice";
import FilterByCategory from "../FilteredComponent/FilterByCategory";
import FilterByOpen from "../FilteredComponent/FilterByOpen";
import { Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";

const ListOfResto = () => {
  const [dataResto, setDataResto] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visiblieCard, setVisibleCard] = useState(4);

  // Category
  const [selectedFilterByCategory, setSelectedFilterByCategory] = useState("");
  // Category

  // Open Resto
  const [isOpenCloseFilter, setIsOpenCloseFilter] = useState(false);
  // Open Resto

  // Filter By price
  const [rangePriceFilter, setRangePriceFilter] = useState("");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  // Filter By price

  const userLogin = localStorage.getItem("userLogin");

  //   Server Side Exp
  const [dataRestoBy, setDataRestoBy] = useState([]);
  const [idSelected, setIdSelected] = useState("");
  //   Server Side Exp

  const handleLoadMore = () => {
    setVisibleCard((prevValue) => prevValue + 4);
  };

  const handleRangePrice = (data) => {
    if (data.includes("100.00 - 200.00")) {
      setMinPrice(100);
      setMaxPrice(200);
    } else if (data.includes("200.00 - 300.00")) {
      setMinPrice(200);
      setMaxPrice(300);
    } else if (data.includes("300.00 - 400.00")) {
      setMinPrice(300);
      setMaxPrice(400);
    } else if (data.includes("400.00 - 500.00")) {
      setMinPrice(400);
      setMaxPrice(500);
    } else if (data.includes("500.00 - 600.00")) {
      setMinPrice(500);
      setMaxPrice(600);
    } else if (data.includes("600.00 - 700.00")) {
      setMinPrice(600);
      setMaxPrice(700);
    } else if (data.includes("700.00 - 800.00")) {
      setMinPrice(700);
      setMaxPrice(800);
    } else if (data.includes("800.00 - 900.00")) {
      setMinPrice(800);
      setMaxPrice(900);
    } else if (data.includes("900.00 - 1000.00")) {
      setMinPrice(900);
      setMaxPrice(1000);
    } else {
      setMinPrice(null);
      setMaxPrice(null);
    }
    setRangePriceFilter(data);
  };

  const handleFilteredData = () => {
    let dataDisplay = dataResto;
    if (isOpenCloseFilter === true) {
      dataDisplay = dataDisplay.filter(
        (restoData) => restoData.isOpen === isOpenCloseFilter
      );
    }
    if (selectedFilterByCategory) {
      dataDisplay = dataDisplay.filter(
        (data) => data.kategori === selectedFilterByCategory
      );
    }
    if (minPrice !== null) {
      dataDisplay = dataDisplay.filter(
        (dataPrice) =>
          parseFloat(dataPrice.price) >= minPrice &&
          parseFloat(dataPrice.price) <= maxPrice
      );
    }
    if (idSelected !== "") {
      dataDisplay = dataRestoBy;
    }

    setDataFilter(dataDisplay);
  };

  //   GET DATA
  const getDataResto = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://659d6d92633f9aee7909681f.mockapi.io/restaurants"
      );
      setDataResto(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //   GET DATA SERVER SIDE
  const getDataRestoBy = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://659d6d92633f9aee7909681f.mockapi.io/restaurants/${id}`
      );
      setDataRestoBy(Array(res.data));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //   GET DATA SERVER SIDE
  useEffect(() => {
    if (idSelected !== "") getDataRestoBy(idSelected);
  }, [idSelected]);
  //   GET DATA SERVER SIDE

  useEffect(() => {
    getDataResto();
  }, []);

  useEffect(() => {
    handleFilteredData();
  }, [
    selectedFilterByCategory,
    isOpenCloseFilter,
    dataResto,
    minPrice,
    maxPrice,
    idSelected,
    rangePriceFilter,
  ]);

  // Reset All Filter
  const handleClearFilter = () => {
    setSelectedFilterByCategory("");
    setIsOpenCloseFilter(false);
    setIdSelected("");
    setRangePriceFilter("");
    setMinPrice(null);
    setMaxPrice(null);
  };

  if (loading)
    return (
      <div className="w-full text-center h-screen">
        <Spinner
          aria-label="Extra large spinner example Center-aligned "
          className="w-1/4 h-1/4 mt-32"
        />
      </div>
    );

  return (
    <section className="p-4 ">
      <div className="flex gap-4 items-center">
        {/* Logic Serverside */}
        <div className="flex shadow-sm my-2 w-screen  py-2 border-t-0 border-gray-500 flex-col md:flex-row justify-start md:justify-center md:items-center gap-2">
          <div className="flex gap-2 rounded-sm md:justify-center md:items-center">
            <select
              id="filterById"
              onChange={(e) => setIdSelected(e.target.value)}
              value={idSelected}
            >
              <option value="">Exp Server Side</option>
              {dataResto.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.id}
                </option>
              ))}
            </select>
          </div>
          <span>Filter By :</span>
          <FilterByOpen
            setIsOpenCloseFilter={setIsOpenCloseFilter}
            isOpenCloseFilter={isOpenCloseFilter}
          />

          <FilterByPrice
            setRangePriceFilter={setRangePriceFilter}
            rangePriceFilter={rangePriceFilter}
            dataResto={dataResto}
            handleRangePrice={handleRangePrice}
          />
          <FilterByCategory
            setSelectedFilterByCategory={setSelectedFilterByCategory}
            selectedFilterByCategory={selectedFilterByCategory}
            dataResto={dataResto}
          />
          <button onClick={handleClearFilter}>Clear All</button>
        </div>
      </div>
      <div>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-3 gap-3 my-2">
          {dataFilter.length <= 0 ? (
            <div className="text-center w-full absolute">
              <span className="text-2xl font-extrabold">Data Kosong</span>
            </div>
          ) : (
            dataFilter.slice(0, visiblieCard).map((restoData) => (
              <div key={restoData.id}>
                <RestoCard restoData={restoData} />
              </div>
            ))
          )}
        </div>
        {userLogin !== null ? (
          <Button
            onClick={() => handleLoadMore()}
            className={`${
              visiblieCard >= dataFilter.length ||
              dataFilter.length <= 4 ||
              !dataFilter
                ? "hidden"
                : ""
            }  mx-auto`}
          >
            Load more
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
        ) : (
          <Link to={"/login"}>
            <Button
              className={`${
                visiblieCard >= dataFilter.length ||
                dataFilter.length <= 4 ||
                !dataFilter
                  ? "hidden"
                  : ""
              }  mx-auto`}
            >
              Load more
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
        )}
      </div>
    </section>
  );
};

export default ListOfResto;
