import { Link, useNavigate, createSearchParams } from 'react-router-dom'

const CropSuggestionHistory = (props) => {
  const { history } = props;
  const navigate = useNavigate()

  const handleHistoryClick = (item) => {
    const { soilType, season, investment, waterReq } = item
    const params = { soilType, season, investment, waterReq }
    navigate({
      pathname: '/cropResults',
      search: `?${createSearchParams(params)}`
    })
  }

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('/cropsuggestion1.jpg')" }}
      ></div>
      
      {/* Content Overlay */}
      <div className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Crop Suggestion History
          </h1>
        </div>

        {/* History Items */}
        <div className="max-w-4xl mx-auto space-y-6">
          {!history && (
            <div className="text-center py-12">
              <h1 className="text-xl text-white">Loading...</h1>
            </div>
          )}

          {history && history.length === 0 && (
            <div className="bg-white bg-opacity-90 rounded-lg shadow-md p-6 text-center">
              <h1 className="text-xl text-gray-700">Sorry, No History Found 😞</h1>
            </div>
          )}

          {history && history.length > 0 && history.map((item, index) => (
            <div 
              key={index}
              onClick={() => handleHistoryClick(item)}
              className="bg-white bg-opacity-90 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-opacity-100 cursor-pointer"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-40">Soil Type:</span>
                      <span className="text-gray-900">{item.soilType}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-40">Season:</span>
                      <span className="text-gray-900">{item.season}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-40">Investment Range:</span>
                      <span className="text-gray-900">Less than {item.investment}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 w-40">Water Availability:</span>
                      <span className="text-gray-900">{item.waterReq}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CropSuggestionHistory;