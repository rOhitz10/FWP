import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CropResults = () => {
  const location = useLocation();
  const crop_data = location.state?.crop_data;
  console.log(crop_data[0].crop.name);

  if (!crop_data) {
    return <div className="text-center text-red-500 text-lg mt-10">Invalid crop data</div>;
  }

  return (
    <div className=" bg-green-50 ">
      <h1 className="text-3xl font-bold  text-center text-black">List of Crops</h1>
      <div className="flex justify-center items-center p-8 border-2 gap-6">
       
        {crop_data && crop_data.length > 0 ? (
          crop_data.map((crop) => (
            <div
              key={crop._id || crop.name}
              className="bg-gray-400 rounded-2xl shadow-md transform hover:scale-105 transition-transform duration-300"
            >
              <Link to={`/croppage/${crop._id}`}>
                <div className="overflow-hidden rounded-2xl">
                
                  <div className="p-4 text-red-700">
                    <h2 className="text-lg font-semibold mb-2 ">{crop.crop.name}</h2>
                    <p className="text-sm text-gray-600">{crop.crop.description}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-xl text-gray-600">
            No crops found for the given input 😢
          </div>
        )}
      </div>
    </div>
  );
};

export default CropResults;
