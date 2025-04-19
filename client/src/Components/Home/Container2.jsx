import React from 'react';

function Container2() {
  return (
    <div className="relative">
      {/* Shaped Border with clip-path */}
      <div className="h-[70px] w-full bg-emerald-500 relative -top-[1.3vh] z-30
        clip-polygon
        md:clip-polygon-md">
      </div>
      
      {/* Full-width image grid container - positioned absolutely below the shaped border */}
      <div className="absolute top-[79vh] w-full h-[25vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div 
            key={item}
            className={`relative flex items-center justify-center bg-cover bg-center
              h-full p-[140px_30px_80px] md:p-[100px_25px_60px]`}
            style={{ backgroundImage: `url(/HomePage_Images/${item}.png)` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
            <h3 className="text-white text-xl md:text-2xl relative z-10">Feature {item}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Container2;