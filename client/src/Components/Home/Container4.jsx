import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Container4() {
    useEffect(() => {
        AOS.init({
          duration: 800,
          once: true,
          offset: 120,
          easing: 'ease-out-quad'
        });
      }, []);

  return (
    <div className="bg-white py-24">
      {/* About Section */}
      <section className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-serif text-center mb-16">
          ABOUT THIS PORTAL
        </h1>

        {/* First Feature Row */}
        <div className="flex flex-col lg:flex-row items-center mb-24 gap-8">
          <div className="lg:w-1/2" data-aos="zoom-in-right">
            <img
              src="/HomePage_Images/svg.svg"
              alt="Crop Suggestions"
              loading="lazy"
              className="w-full max-w-lg mx-auto rounded-lg shadow-xl"
            />
          </div>
          <div className="lg:w-1/2" data-aos="zoom-in-left">
            <h2 className="text-3xl font-bold mb-6">CROP SUGGESTIONS....</h2>
            <p className="text-lg leading-relaxed">
              This portal is used to educate farmers about various types of
              crops. The <strong className="font-semibold">CROPS</strong> page
              takes input from the user and displays the best possible and
              suitable crops according to the input given. This page displays
              full-fledged details such as investment, water requirement, Gross
              income and total profit that can be earned.
              <br />
              <br />
              This helps the Farmers to have better understanding of
              professional farming.
            </p>
          </div>
        </div>

        {/* Second Feature Row */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-8">
          <div className="lg:w-1/2" data-aos="zoom-in-left">
            <img
              src="/HomePage_Images/14.png"
              alt="Market Place"
              className="w-full max-w-lg mx-auto rounded-lg shadow-xl"
            />
          </div>
          <div className="lg:w-1/2" data-aos="zoom-in-right">
            <h2 className="text-3xl font-bold mb-6">MARKET PLACE....</h2>
            <p className="text-lg leading-relaxed">
              This portal also works as a platform that provides the farmers all
              the essential items from trustworthy manufacturers who have their
              products verified, certified and approved by the Government of
              India.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 relative">
            <div
              className="absolute top-0 right-0 w-32 h-32 bg-no-repeat bg-contain bg-right-top"
              style={{ backgroundImage: "url(/HomePage_Images/quotes1.svg)" }}
            ></div>
            <blockquote className="text-xl italic mb-8">
              "Because of their connection to the land, farmers do more to
              protect and preserve our environment than almost anyone else. They
              are some of the best environmentalists around."
            </blockquote>
            <div className="text-right font-medium">
              <p>Ike Skelton, American politician</p>
            </div>
            <div
              className="absolute bottom-0 left-0 w-32 h-32 bg-no-repeat bg-contain bg-left-bottom transform rotate-180"
              style={{ backgroundImage: "url(/HomePage_Images/quotes1.svg)" }}
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Container4;
