import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Queries = () => {
  const [queries, setQueries] = useState([]);
  const [search, setSearch] = useState("");

  const [gridColumns, setGridColumns] = useState("grid-cols-2");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/all-queries?searchParams=${search}`)
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort(
          (a, b) => new Date(b.currentDateTime) - new Date(a.currentDateTime)
        );
        setQueries(sortedData);
      });
  }, [search]);

  const handleGridChange = (columns) => {
    setGridColumns(columns);
  };

  useEffect(() => {
    document.title = "ProRecco - Queries";
    AOS.init({
      duration: 1000, // Animation duration
      easing: "ease-in-out", // Easing function
      once: true, // Whether animation happens only once
    });
  }, []);

  return (
    <div className="w-11/12 mx-auto pt-10">
      <h2 data-aos="fade-up" className="text-3xl font-bold py-10">
        All the queries of products
      </h2>

      {/* Buttons for toggling grid layout */}
      <div className=" flex justify-between items-center">
        <label data-aos="zoom-in" className="form-control w-full max-w-xs ">
          <div className="label">
            <span className="label-text text-base font-semibold">
              Search Query
            </span>
            <input
              type="text"
              name="searchParams"
              placeholder="Search by Name"
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered  input-primary w-full max-w-xs"
            />
          </div>
        </label>
        <div className="flex flex-col md:flex-row justify-center gap-2 space-x-4 mb-6">
          <button
            data-aos="fade-up"
            className="btn btn-primary lg:hidden"
            onClick={() => handleGridChange("grid-cols-1")}
          >
            1 Column
          </button>
          <button
            data-aos="fade-up"
            className="btn btn-secondary"
            onClick={() => handleGridChange("grid-cols-2")}
          >
            2 Columns
          </button>
          <button
            data-aos="fade-up"
            className=" hidden md:block btn btn-accent"
            onClick={() => handleGridChange("grid-cols-3")}
          >
            3 Columns
          </button>
          <button
            data-aos="fade-up"
            className=" hidden md:block btn btn-primary"
            onClick={() => handleGridChange("grid-cols-4")}
          >
            4 Columns
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className={`grid ${gridColumns} gap-5`}>
        {queries.map((query) => (
          <div
            data-aos="zoom-in"
            key={query._id}
            className="card bg-base-100 shadow-xl"
          >
            <figure>
              <img
                className="h-52 pt-2 w-[14rem]"
                src={query.productImageUrl}
                alt={query.productName}
              />
            </figure>
            <div
              data-aos="zoom-in"
              className="card-body p-5 justify-start items-start"
            >
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
