import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CropSuggestion = () => {
    const Navigate = useNavigate();
  const [cropData, setCropData] = useState({
    soilTypes: '',
    season: '',
    water: '',
    investment: ''
 });

  const handleChange = (field) => (e) => {
    setCropData({ ...cropData, [field]: e.target.value });
  };

  const displayResult = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/user/crop', cropData);
      console.log(res.data);
      
        if (res.data.success) {
            Navigate('/cropResults', {state: { crop_data: res.data.data }})
        }else {
            alert(res.data.message)
        }
    } catch (error) {
      console.error('Error fetching crop suggestions:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-500 to-green-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl min-h-80: w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Section */}
        <div
          className="md:w-2/5 bg-cover bg-center relative hidden md:block"
          style={{ backgroundImage: "url('/public/cropSuggestion_bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 p-10 flex flex-col justify-center text-white">
            <h1 className="text-4xl font-bold mb-4">Crop Suggestions</h1>
            <p className="text-lg leading-relaxed">
              Faced a disaster? Don’t worry. Find crops suitable for your specific conditions.
              Provide a few inputs to get personalized recommendations.
            </p>
            <Link
              to="/cropSuggestionHistory"
              className="mt-8 inline-block text-lg underline hover:text-gray-300"
            >
              View Previous Suggestions
            </Link>
          </div>
        </div>

        {/* Right Section */}
        <div className="md:w-3/5 p-8 md:p-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
            Get Crops Personalized for You!
          </h2>

          <form onSubmit={displayResult} className="space-y-6">
            {/* Soil Type */}
            <div>
              <label className="block text-gray-600 mb-2">Soil Type</label>
              <select
                required
                value={cropData.soilTypes}
                onChange={handleChange('soilTypes')}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="">Select the Soil</option>
                <option value="Red">Red Soil</option>
                <option value="Black">Black Soil</option>
                <option value="Sandy">Sandy Soil</option>
                <option value="Alluvial">Alluvial Soil</option>
              </select>
            </div>

            {/* Season */}
            <div>
              <label className="block text-gray-600 mb-2">Season</label>
              <select
                required
                value={cropData.season}
                onChange={handleChange('season')}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="">Select a Season</option>
                <option value="Rabi">Rabi</option>
                <option value="Kharif">Kharif</option>
                <option value="Zaid">Zaid</option>
              </select>
            </div>

            {/* Investment */}
            <div>
              <label className="block text-gray-600 mb-2">Investment Range</label>
              <select
                required
                value={cropData.investment}
                onChange={handleChange('investment')}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="">Select the range</option>
                <option value="10000">Less than ₹10,000</option>
                <option value="90000">Less than ₹90,000</option>
                <option value="250000">Less than ₹2.5 Lakhs</option>
              </select>
            </div>

            {/* Water Availability */}
            <div>
              <label className="block text-gray-600 mb-2">Water Availability</label>
              <div className="flex gap-4">
                {['High', 'medium', 'Low'].map((level) => (
                  <label key={level} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="waterAvailability"
                      value={level}
                      required
                      onChange={handleChange('water')}
                      checked={cropData.water === level}
                      className="accent-emerald-500"
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition duration-300"
            >
              Get Crop Suggestions
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CropSuggestion;
