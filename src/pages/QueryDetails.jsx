import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useParams } from "react-router-dom";
import axios from "axios";

const QueryDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [query, setQuery] = useState(null);

  //   useEffect(() => {
  //     fetch(`${import.meta.env.VITE_API_URL}/query/${id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setQuery(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });
  //   }, [id]);

  useEffect(() => {
    fetchQueryData();
  }, [id]);

  const fetchQueryData = async () => {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/query/${id}`
    );
    setQuery(data);
    // setStartDate(new Date(data.deadline));
  };

  // Handle if no query is found
  if (!query) return <div>No query found</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold">Query Details</h2>
      <div className="mt-4">
        <p>
          <strong>Product Name:</strong> {query.productName}
        </p>
        <p>
          <strong>Brand:</strong> {query.productBrand}
        </p>
        <p>
          <strong>Query Title:</strong> {query.queryTitle}
        </p>
        <p>
          <strong>Boycotting Reason:</strong> {query.boycottingReason}
        </p>
      </div>
    </div>
  );
};

export default QueryDetails;
