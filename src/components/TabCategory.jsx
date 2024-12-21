import React, { useEffect, useState } from "react";

const TabCategory = () => {
  const [queries, setQueries] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/all-queries`)
      .then((res) => res.json())
      .then((data) => setQueries(data));
  }, []);
  return (
    <div>
      <h2>{queries.length}</h2>
    </div>
  );
};

export default TabCategory;
