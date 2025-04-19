import React from 'react';

const features = [
  {
    id: 'image1',
    title: 'CROP SUGGESTIONS',
    description: 'This page will suggest the best crops and their detailed information according to the given input.',
    image: '/HomePage_Images/1.png'
  },
  {
    id: 'image2',
    title: 'MARKET PLACE',
    description: 'This Page provides farmers the best products at the very minimal price',
    image: '/HomePage_Images/2.png'
  },
  {
    id: 'image3',
    title: 'CHAT BOT',
    description: 'ChatBot helps the users to solve their problems instantly.',
    image: '/HomePage_Images/3.png'
  },
  {
    id: 'image4',
    title: 'DISCUSSIONS',
    description: 'Discussions tab helps to unite all the farmers for the query solving among each other',
    image: '/HomePage_Images/4.png'
  }
];

function Container3() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => (
        <div 
          key={feature.id}
          className="relative h-64 bg-cover bg-center flex items-center justify-center group"
          style={{ backgroundImage: `url(${feature.image})` }}
        >
          {/* Background overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-30 transition-all duration-300"></div>
          
          {/* Content */}
          <div className="relative z-10 p-6 text-center text-white">
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-sm md:text-base">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Container3;