import React from "react";

const RecommendationCard = ({ recomendation }) => {
  return (
    <div>
      <div className="flex-1 flex justify-center items-center">
        <div className="flex flex-col pt-5">
          <div className="mt-4 ">
            <img
              className="w-60 h-48 mx-auto"
              src={recomendation.recommendedProductImage}
              alt=""
            />
            <div>
              <p className="text-xl mt-3">
                <strong>Product Name:</strong>{" "}
                {recomendation.recommendedProductName}
              </p>

              <p className="text-xl mt-4">
                <strong>Query Title:</strong>{" "}
                {recomendation.recommendationTitle}
              </p>
              <p className="text-xl">
                <strong>Reason :</strong> {recomendation.recommendationReason}
              </p>
              <p className="text-xl mt-4">
                <strong>Recommended By:</strong> {recomendation.recomenderName}{" "}
                <br />
                <strong> Email:</strong> {recomendation.recomenderEmail}
              </p>
            </div>
          </div>
          {/* <div className="overflow-x-auto ">
    <h2 className="text-xl font-semibold mt-5">
      Recommends for this product
    </h2>
  </div> */}
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
