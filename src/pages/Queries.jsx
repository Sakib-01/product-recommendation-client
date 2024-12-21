import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/all-queries`)
      .then((res) => res.json())
      .then((data) => setQueries(data));
  }, []);
  return (
    <div className="pt-10">
      <h2 className="text-3xl  font-bold ">All the queries of products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {queries.map((query) => (
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img
                className="h-52"
                src={query.productImageUrl}
                alt={query.productName}
              />
            </figure>
            <div className="card-body p-0 justify-start items-start">
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
              className="flex justify-start mt-2"
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
