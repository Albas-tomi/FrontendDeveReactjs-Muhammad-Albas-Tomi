import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import RestoCard from "../CardReasto/RestoCard";
import FilterByPrice from "../FilteredComponent/FilterByPrice";
import FilterByCategory from "../FilteredComponent/FilterByCategory";
import FilterByOpen from "../FilteredComponent/FilterByOpen";
import { Button, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import LoadMoreLogic from "./LoadMoreLogic";
import PriceFilterLogic from "./PriceFilterLogic";
const ListOfResto = () => {
  const [dataResto, setDataResto] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilterByCategory, setSelectedFilterByCategory] = useState("");
  const [isOpenCloseFilter, setIsOpenCloseFilter] = useState(false);
  const [dataRestoById, setDataRestoById] = useState([]);
  const [idSelected, setIdSelected] = useState("");

  const logicLoadmore = LoadMoreLogic();
  const logicPriceFilter = PriceFilterLogic();
  const userLogin = localStorage.getItem("userLogin");

  //#REGION_FILTEREDDATA ===========
  const handleFilteredData = useCallback(() => {
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
    if (logicPriceFilter.minPrice !== null) {
      dataDisplay = dataDisplay.filter(
        (data) =>
          data.price >= logicPriceFilter.minPrice &&
          data.price <= logicPriceFilter.maxPrice
      );
    }
    if (dataRestoById.length > 0 && idSelected !== "") {
      dataDisplay = dataRestoById;
    }
    setDataFilter(dataDisplay);
  }, [
    dataResto,
    logicPriceFilter.maxPrice,
    selectedFilterByCategory,
    isOpenCloseFilter,
    logicPriceFilter.minPrice,
    dataRestoById,
    idSelected,
  ]);
  //#END_REGION_FILTEREDDATA ===========

  //#REGION_GETDATA ===========
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

  useEffect(() => {
    getDataResto();
  }, []);
  //#END_REGION_GETDATA ===========

  //#REGION_GET-DATA-BYID =========
  const getDataRestoById = async (id) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://659d6d92633f9aee7909681f.mockapi.io/restaurants/${id}`
      );
      setDataRestoById(Array(res.data));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idSelected !== "") {
      getDataRestoById(idSelected);
    } else {
      getDataResto();
    }
  }, [idSelected]);
  //#END_REGION_GET-DATA-BYID =========

  //#REGION_FILTER DATA ============
  useEffect(() => {
    handleFilteredData();
  }, [
    selectedFilterByCategory,
    isOpenCloseFilter,
    dataResto,
    logicPriceFilter.minPrice,
    logicPriceFilter.maxPrice,
    idSelected,
    logicPriceFilter.rangePriceFilter,
    dataRestoById,
  ]);
  //#REGION_FILTER DATA ============

  //#REGION_CLEAR-FILTER
  const handleClearFilter = () => {
    setSelectedFilterByCategory("");
    setIsOpenCloseFilter(false);
    setIdSelected("");
    setRangePriceFilter("");
    setMinPrice(null);
    setMaxPrice(null);
  };
  //#END_REGION_CLEAR-FILTER

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
            rangePriceFilter={logicPriceFilter.rangePriceFilter}
            handleRangePrice={logicPriceFilter.handleRangePrice}
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
            dataFilter.slice(0, logicLoadmore.visiblieCard).map((restoData) => (
              <div key={restoData.id}>
                <RestoCard restoData={restoData} />
              </div>
            ))
          )}
        </div>
        {userLogin !== null ? (
          <Button
            onClick={() => logicLoadmore.handleLoadMore()}
            className={`${
              logicLoadmore.visiblieCard >= dataFilter.length ||
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
