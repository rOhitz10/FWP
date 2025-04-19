import { createSearchParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const CropSuggestion = (props) => {
    const navigate = useNavigate();

    function displayresult(e) {
        e.preventDefault()
        let soilType = document.querySelector("#soiltype").value;
        let season = document.querySelector("#season").value;
        let investment = document.querySelector("#investment").value;
        let waterReq = document.querySelector('input[type="radio"]:checked').id

        if (soilType !== "none" && season !== "none" && investment !== "none") {
            const data = {soilType,season,investment,waterReq}
            props.onSearch(data)
            const params = {soilType,season,investment,waterReq}
            navigate({
                pathname:'/cropResults',
                search : `?${createSearchParams(params)}`
            })
        } else {
            alert("Enter all fields")
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-emerald-500 to-green-600 font-sans text-gray-800 flex justify-center items-center  w-full pt-[7vh] ">
            <div className="max-w-6xl  w-[80vw] mx-auto  bg-white rounded-xl overflow-hidden shadow-lg flex flex-col  md:flex-row h-[78vh]">
                {/* Left Section */}
                <div className="md:w-3/5 bg-cover bg-center relative hidden md:flex" style={{backgroundImage: "url('/public/cropSuggestion_bg.jpg')"}}>
                    <div className="absolute inset-0 bg-indigo-500 bg-opacity-70 p-12 flex flex-col justify-center">
                        <h1 className="text-4xl lg:text-5xl font-medium mb-6 text-white">Crop Suggestions</h1>
                        <p className="text-xl lg:text-2xl text-black leading-relaxed mb-8">
                            Faced a Disaster?<br />
                            Don't worry find suitable crops according to your situation.<br />
                            Enter the required inputs and get a list of personalised crops for your needs
                        </p>
                        <Link 
                            to='/cropSuggestionHistory' 
                            className="text-3xl text-white hover:text-gray-200 transition duration-300 mt-12"
                        >
                            Recents
                        </Link>
                    </div>
                </div>

                {/* Right Section */}
                <div className="md:w-3/5 p-8 flex flex-col justify-center items-center">
                    <div className="text-center max-w-md mx-auto">
                        <h1 className="text-2xl font-sans text-gray-600 mb-8">Get Crops Personalised for you!</h1>
                        
                        <form onSubmit={displayresult} className="space-y-6">
                            <div className="flex flex-col space-y-2">
                                <label className="text-left">Soil Type:</label>
                                <select 
                                    name="soilType" 
                                    id="soiltype" 
                                    required
                                    className="border border-purple-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="none">Select the Soil</option>
                                    <option value="Red">Red Soil</option>
                                    <option value="Black">Black Soil</option>
                                    <option value="Sandy">Sandy Soil</option>
                                    <option value="Alluvial">Alluvial Soil</option>
                                </select>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label className="text-left">Season:</label>
                                <select 
                                    name="season" 
                                    id="season" 
                                    required
                                    className="border border-purple-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="none">Select a Season</option>
                                    <option value="Rabi">Rabi</option>
                                    <option value="Kharif">Kharif</option>
                                    <option value="Zaid">Zaid</option>
                                </select>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label className="text-left">Investment:</label>
                                <select 
                                    name="investment" 
                                    id="investment" 
                                    required
                                    className="border border-purple-300 rounded-md p-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                    <option value="none">Select the range</option>
                                    <option value="10000">Less than 10k</option>
                                    <option value="90000">Less than 90k</option>
                                    <option value="250000">Less than 2.5L</option>
                                </select>
                            </div>

                            <div className="flex flex-col space-y-2">
                                <label className="text-left">Water Availability:</label>
                                <div className="flex space-x-4 justify-start">
                                    {['High', 'medium', 'Low'].map((level) => (
                                        <div key={level} className="flex items-center">
                                            <input 
                                                type="radio" 
                                                name="water" 
                                                id={level}
                                                required={level === 'High'}
                                                className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                                            />
                                            <label htmlFor={level} className="ml-2">{level}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-lg hover:from-purple-500 hover:to-purple-600 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                            >
                                Get Crops
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CropSuggestion;