import { useCallback, useState } from "react";

const LoadMoreLogic = () => {
  const [visiblieCard, setVisibleCard] = useState(4);

  // ===== LOAD MORE =====
  const handleLoadMore = useCallback(() => {
    setVisibleCard((prevValue) => prevValue + 4);
  });
  // ===== LOAD MORE =====

  return { handleLoadMore, visiblieCard };
};

export default LoadMoreLogic;
