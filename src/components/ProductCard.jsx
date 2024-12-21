import React from "react";

const ProductCard = ({ query }) => {
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
    <div>
      <h2>product name:{productName}</h2>
    </div>
  );
};

export default ProductCard;
