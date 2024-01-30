import React, { useCallback, useState } from "react";

const PriceFilterLogic = () => {
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [rangePriceFilter, setRangePriceFilter] = useState("");

  const handleRangePrice = useCallback((data) => {
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
  });
  return { minPrice, maxPrice, rangePriceFilter, handleRangePrice };
};

export default PriceFilterLogic;
