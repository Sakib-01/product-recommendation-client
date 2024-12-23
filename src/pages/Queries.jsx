import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [gridColumns, setGridColumns] = useState("grid-cols-2");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/all-queries`)
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.currentDateTime) - new Date(a.currentDateTime)
        );
        setQueries(sortedData);
      });
  }, []);

  const handleGridChange = (columns) => {
    setGridColumns(columns);
  };

  return (
    <div className="w-11/12 mx-auto pt-10">
      <h2 className="text-3xl font-bold py-10">All the queries of products</h2>

      {/* Buttons for toggling grid layout */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className="btn btn-primary lg:hidden"
          onClick={() => handleGridChange("grid-cols-1")}
        >
          1 Column
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleGridChange("grid-cols-2")}
        >
          2 Columns
        </button>
        <button
          className=" hidden md:block btn btn-accent"
          onClick={() => handleGridChange("grid-cols-3")}
        >
          3 Columns
        </button>
        <button
          className=" hidden md:block btn btn-primary"
          onClick={() => handleGridChange("grid-cols-4")}
        >
          4 Columns
        </button>
      </div>

      {/* Grid Layout */}
      <div className={`grid ${gridColumns} gap-5`}>
        {queries.map((query) => (
          <div key={query._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                className="h-52 pt-2 w-[14rem]"
                src={query.productImageUrl}
                alt={query.productName}
              />
            </figure>
            <div className="card-body p-5 justify-start items-start">
              <h2 className="card-title">Product : {query.productName}</h2>
              <p> Brand/Category: {query.productBrand}</p>
              <div className="card-actions justify-start">
                <div className="badge badge-outline">
                  Recommendation: {query.recommendationCount}
                </div>
                <div className="">
                  Posted Date: {format(new Date(query.currentDateTime), "P")}
                </div>
              </div>
            </div>
            <Link
              to={`/queryDetails/${query._id}`}
              className="flex justify-start my-2 p-6"
            >
              <button className="btn btn-primary">Recommend</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queries;
