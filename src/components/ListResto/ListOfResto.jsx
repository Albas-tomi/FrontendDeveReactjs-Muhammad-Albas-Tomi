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
  const [loading, setLoading] = useState(false);
  const [visiblieCard, setVisibleCard] = useState(4);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isOpenCloseFilter, setIsOpenCloseFilter] = useState(false);
  const userLogin = localStorage.getItem("userLogin");

  //   Server Side Exp
  const [dataRestoBy, setDataRestoBy] = useState([]);
  const [idSelected, setIdSelected] = useState("");
  //   Server Side Exp

  const handleLoadMore = () => {
    setVisibleCard((prevValue) => prevValue + 4);
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

  useEffect(() => {
    if (idSelected !== "") getDataRestoBy(idSelected);
  }, [idSelected]);
  //   GET DATA SERVER SIDE

  useEffect(() => {
    getDataResto();
  }, []);

  //   Filter Data By Price
  const filterDataByPrice = (data) => {
    if (!Array.isArray(data)) {
      return [];
    }
    if (selectedFilter === "") {
      return data;
    } else {
      return data.filter((restoData) => {
        // jika harga tersedia pada
        return selectedFilter.includes(restoData.price);
      });
    }
  };

  //   Filter Data By Price Client Side
  const filterDataByCategory = (data) => {
    if (!Array.isArray(data)) {
      return [];
    }
    if (selectedFilter === "") {
      return data;
    } else {
      return data.filter((restoData) => restoData.kategori === selectedFilter);
    }
  };

  //   FILTER BY OPEN RESTO
  const filterDataByOpenStatus = (data) => {
    if (!isOpenCloseFilter) {
      return "";
    } else {
      return data.filter((restoData) => restoData.isOpen === isOpenCloseFilter);
    }
  };

  //   == DATA FILTER ==
  const filteredDataByPrice = filterDataByPrice(dataResto);
  const filteredDataByCategory = filterDataByCategory(dataResto);
  const filteredDataByOpen = filterDataByOpenStatus(dataResto);
  //   == DATA FILTER ==

  //   DATA FILTER COMPARE ==
  const allDataResto = Array.from(
    new Set([...filteredDataByPrice, ...filteredDataByCategory])
  ); //   DATA FILTER ==

  const handleClearFilter = () => {
    setSelectedFilter("");
    setIsOpenCloseFilter(false);
    setIdSelected("");
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
              id="filterByPrice"
              onChange={(e) => setIdSelected(e.target.value)}
              value={idSelected}
            >
              <option value="">Exp Server Side</option>
              {allDataResto.map((data) => (
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
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
            dataResto={dataResto}
          />
          <FilterByCategory
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
            dataResto={dataResto}
          />
          <button onClick={handleClearFilter}>Clear All</button>
        </div>
      </div>
      <div>
        <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-3 gap-3 my-2">
          {filteredDataByOpen.length > 0
            ? filteredDataByOpen.map((restoData) => (
                <div key={restoData.id}>
                  <RestoCard restoData={restoData} />
                </div>
              ))
            : dataRestoBy.length > 0 && idSelected !== ""
            ? dataRestoBy.map((restoData) => (
                <div key={restoData.id}>
                  <RestoCard restoData={restoData} />
                </div>
              ))
            : allDataResto.slice(0, visiblieCard).map((restoData) => (
                <div key={restoData.id}>
                  <RestoCard restoData={restoData} />
                </div>
              ))}
        </div>
        {userLogin !== null ? (
          <Button
            onClick={() => handleLoadMore()}
            className={`${
              filteredDataByOpen.length >= 1 ||
              visiblieCard >= allDataResto.length ||
              allDataResto.length <= 3
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
            <Button className="mx-auto">
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
