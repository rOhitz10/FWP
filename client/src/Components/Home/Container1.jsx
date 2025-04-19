import React from 'react';

function Container1() {
  return (
    <div className="h-[80vh] bg-emerald-500 z-10">
      <div className="pt-[10vh] grid grid-cols-1 md:grid-cols-2 justify-center w-auto">
        <div className="md:ml-0 p-[200px] text-center h-[70vh] bg-emerald-500 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            WELCOME TO FARMERS PORTAL
          </h1>
          <p className="text-lg md:text-xl">
            Join the portal and learn the professional way of farming
          </p>
        </div>
        
        <div className="relative -top-[15vh] md:left-[20vh]">
          <div className="flex relative">
            <img
              src="/HomePage_Images/11.png"
              alt="Farm produce"
              className="absolute w-40 h-40 md:w-48 md:h-48 rounded-tr-3xl rounded-bl-3xl z-20 right-20 md:right-[80px] top-[150px] md:top-[250px] animate-float"
            />
            <img
              src="/HomePage_Images/8.png"
              alt="Farm tools"
              className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full right-0 md:right-[180px] top-[100px] md:top-[150px] animate-float-reverse"
            />
            <img
              src="/HomePage_Images/9.png"
              alt="Farm landscape"
              className="absolute w-40 h-40 md:w-48 md:h-48 rounded-tr-3xl rounded-bl-3xl -right-20 md:right-[80px] top-[50px] md:top-[50px] animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Container1;