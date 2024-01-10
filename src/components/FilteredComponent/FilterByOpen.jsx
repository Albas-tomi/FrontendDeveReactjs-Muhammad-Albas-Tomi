import React from "react";

const FilterByOpen = ({ isOpenCloseFilter, setIsOpenCloseFilter }) => {
  return (
    <div className="flex gap-2 md:items-center">
      <input
        type="checkbox"
        onChange={() => setIsOpenCloseFilter(!isOpenCloseFilter)}
        checked={isOpenCloseFilter}
      />
      <label>Open Now</label>
    </div>
  );
};

export default FilterByOpen;
