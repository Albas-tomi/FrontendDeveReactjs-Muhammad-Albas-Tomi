import React from "react";

const FilterByPrice = ({ setSelectedFilter, selectedFilter, dataResto }) => {
  return (
    <div className="flex gap-2 rounded-sm md:justify-center md:items-center">
      <select
        id="filterByPrice"
        onChange={(e) => setSelectedFilter(e.target.value)}
        value={selectedFilter}
      >
        <option value="">price</option>
        {dataResto.map((data) => (
          <option key={data.id} value={data.price}>
            Rp.{data.price}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByPrice;
