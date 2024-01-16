import React from "react";

const FilterByCategory = ({
  setSelectedFilterByCategory,
  selectedFilterByCategory,
  dataResto,
}) => {
  return (
    <div className="flex gap-2 rounded-sm md:justify-center items-center">
      <select
        id="filterByCategory"
        onChange={(e) => setSelectedFilterByCategory(e.target.value)}
        value={selectedFilterByCategory}
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
