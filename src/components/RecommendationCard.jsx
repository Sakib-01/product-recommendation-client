import React from "react";

const RecommendationCard = ({ recomendation }) => {
  return (
    <div className="overflow-x-auto p-5">
      <table className="table w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="py-3 px-4">Image</th>
            <th className="py-3 px-4">Product Name</th>
            <th className="py-3 px-4">Query Title</th>
            <th className="py-3 px-4">Reason</th>
            <th className="py-3 px-4">Recommended By</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-100">
            <td className="py-3 px-4">
              <img
                className="w-32 h-24 rounded-md"
                src={recomendation.recommendedProductImage}
                alt={recomendation.recommendedProductName}
              />
            </td>
            <td className="py-3 px-4">
              {recomendation.recommendedProductName}
            </td>
            <td className="py-3 px-4">{recomendation.recommendationTitle}</td>
            <td className="py-3 px-4">{recomendation.recommendationReason}</td>
            <td className="py-3 px-4">
              <div>
                <p>
                  <strong>Name:</strong> {recomendation.recomenderName}
                </p>
                <p>
                  <strong>Email:</strong> {recomendation.recomenderEmail}
                </p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RecommendationCard;
