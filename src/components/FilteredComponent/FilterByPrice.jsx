import React from "react";

const FilterByPrice = ({ rangePriceFilter, handleRangePrice }) => {
  return (
    <div className="flex gap-2 rounded-sm md:justify-center md:items-center">
      <select
        id="filterByPrice"
        onChange={(e) => handleRangePrice(e.target.value)}
        value={rangePriceFilter}
      >
        <option value={null}>price</option>
        <option value="100.00 - 200.00">Rp.100.00 - Rp.200.00</option>
        <option value="200.00 - 300.00">Rp.200.00 - Rp.300.00</option>
        <option value="300.00 - 400.00">Rp.300.00 - Rp.400.00</option>
        <option value="500.00 - 600.00">Rp.500.00 - Rp.600.00</option>
        <option value="600.00 - 700.00">Rp.600.00 - Rp.700.00</option>
        <option value="700.00 - 800.00">Rp.700.00 - Rp.800.00</option>
        <option value="800.00 - 900.00">Rp.800.00 - Rp.900.00</option>
        <option value="900.00 - 1000.00">Rp.900.00 - Rp.1000.00</option>
      </select>
    </div>
  );
};

export default FilterByPrice;
