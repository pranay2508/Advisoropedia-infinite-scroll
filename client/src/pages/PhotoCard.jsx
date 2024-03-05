/* eslint-disable react/prop-types */
// import React from "react";

const PhotoCard = ({ photo }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={photo.urls.regular} alt={photo.alt_description} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{photo.alt_description}</h2>
        <p className="text-gray-700">{photo.description}</p>
      </div>
    </div>
  );
};

export default PhotoCard;
