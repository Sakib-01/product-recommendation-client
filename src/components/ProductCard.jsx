import { format } from "date-fns";
import React from "react";
import { useLocation } from "react-router-dom";

const ProductCard = ({ query }) => {
  const location = useLocation();
  const {
    productName,
    productBrand,
    productImageUrl,
    queryTitle,
    boycottingReason,
    currentDateTime,
    recommendationCount,
    userName,
    userEmail,
    userImage,
  } = query;
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img className="h-52" src={productImageUrl} alt={productName} />
      </figure>
      <div className="card-body p-0 justify-start items-start">
        <h2 className="card-title">Product : {productName}</h2>
        <p> Brand/Category: {productBrand}</p>
        <div className="card-actions justify-start">
          <div className="badge badge-outline">
            Recomendation: {recommendationCount}
          </div>
          <div className="">
            Posted Date:{format(new Date(currentDateTime), "P")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
