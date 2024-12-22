import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Queries = () => {
  const [queries, setQueries] = useState([]);
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
  return (
    <div className=" w-11/12 mx-auto  pt-10">
      <h2 className="text-3xl  font-bold py-10">All the queries of products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {queries.map((query) => (
          <div key={query._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                className="h-52 pt-2"
                src={query.productImageUrl}
                alt={query.productName}
              />
            </figure>
            <div className="card-body p-5 justify-start items-start">
              <h2 className="card-title">Product : {query.productName}</h2>
              <p> Brand/Category: {query.productBrand}</p>
              <div className="card-actions justify-start">
                <div className="badge badge-outline">
                  Recomendation: {query.recommendationCount}
                </div>
                <div className="">
                  Posted Date:{format(new Date(query.currentDateTime), "P")}
                </div>
              </div>
            </div>
            <Link
              to={`/queryDetails/${query._id}`}
              className="flex justify-start my-2 p-6"
            >
              <button className="btn btn-primary">Recommend </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queries;
