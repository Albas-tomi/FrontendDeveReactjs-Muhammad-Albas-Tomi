import React from "react";

const FilterByCategory = ({ setSelectedFilter, selectedFilter, dataResto }) => {
  return (
    <div className="flex gap-2 rounded-sm md:justify-center items-center">
      <select
        id="filterByPrice"
        onChange={(e) => setSelectedFilter(e.target.value)}
        value={selectedFilter}
      >
        <option value="">category</option>
        {dataResto.map((data) => (
          <option key={data.id} value={data.kategori}>
            {data.kategori}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterByCategory;
