const Seller = require('../model/seller')
const Product = require('../model/product')
const Crop = require('../model/crop')
const redisClient = require('../utils/redisClient')

module.exports.getCropRecommendation = async(req,res) =>{
    try {
        
        const {soilType, season,waterAvailability,investmentRange} = req.body;
        
        if (!soilType || !season || !waterAvailability || !investmentRange) {
            return res.status(400).json({ message: "Please provide all the required parameters" });        
        }
        const query = {
            suitableSoil : soilType,
            suitableSeason :season,
            waterRequired:{$lte :waterAvailability},
            investmentRange:{$lte :investmentRange}
        }
        const crop = await Crop.find(query).limit(2);
        
        if (crop.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No crops found matching your criteria"
            });
        }     
    
    const cropWithScores = crop.map(crop => {
        let score = 0;
        if (Array.isArray(crop.suitableSoilTypes) && crop.suitableSoilTypes.includes(soilType)) score += 30;
        if (Array.isArray(crop.suitableSeason) && crop.suitableSeason.includes(season)) score += 30;
        if (crop.waterRequired <= waterAvailability) score += 20;
        if (crop.investmentRange <= investmentRange) score += 20;
        
        return { ...crop, score };
    });
    
    return res.status(200).json(
        { success: true, message: "Crop recommendation found", data: cropWithScores }    );
 } catch (error) {
        console.error('Crop recommendation error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error while processing recommendations",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}


module.exports.getAllProducts = async (req, res) => {
    const results = await Product.find({}).lean()
    res.status(200).json({ success: true, message: "All products", data: results })
}

module.exports.productpage_id_get = async (req, res) => {

    const id = req.params.id;
    let productDetails = {};
    const key = `productDetails - ${id}`;
    let clients = await redisClient.get(key);
    if (!clients) {
        console.log("Cache Miss");
        productDetails = await Product.findById(id);

        await redisClient.set(key , JSON.stringify(productDetails));
    } else {
        // already there
        productDetails = clients;
        productDetails = JSON.parse(productDetails);
        console.log("Cache Hit");
    }

    res.json(productDetails);
}

module.exports.croppage_id_get = async (req, res) => {
    let cropDetails = {};
    const id = req.params.id;
    const key = `cropDetails - ${id}`;
    let clients = await redisClient.get(key);
    if (!clients) {
        console.log("Cache Miss");
        cropDetails = await Crop.findById(id);

        await redisClient.set(key , JSON.stringify(cropDetails));
    } else {
        // already there
        cropDetails = clients;
        cropDetails = JSON.parse(cropDetails);
        console.log("Cache Hit");
    }
    res.json(cropDetails);
}



module.exports.search_post = async (req, res) => {
    let searchDetails = [];
    const query = req.body.query.toLowerCase().trim()
    const key = `searchDetails - ${query}`;
    let clients = await redisClient.get(key);
    if (!clients) {
        console.log("Cache Miss");
        let data = await Product.find({ name: { $regex: `${query}`, $options: 'i' } }).lean()
        if (!data.length > 0) {
            data = await Product.find({ category: { $regex: `${query}`, $options: 'i' } })
        }
        searchDetails = data;

        await redisClient.set(key , JSON.stringify(searchDetails));
    } else {
        // already there
        searchDetails = clients;
        searchDetails = JSON.parse(searchDetails);
        console.log("Cache Hit");
    }

    res.json(searchDetails);
    // const query = req.body.query.toLowerCase().trim()
    // try {
    //     let data = await Product.find({ name: { $regex: `${query}`, $options: 'i' } }).lean()
    //     if (!data.length > 0) {
    //         data = await Product.find({ category: { $regex: `${query}`, $options: 'i' } })
    //     }
    //     return res.json(data)
    // } catch (error) {
    //     console.log(error)
    // }
}



module.exports.adminportal_post = async (req, res) => {
    const seller = await Seller.findOne({ email: req.body.email }).lean()
    if (!seller) {
        return res.json({ msg: 'err' })
    }
    const products = await Product.find({ sellerId: seller._id }).lean()
    const seeds = products.filter(prod => prod.category === 'seeds').length
    const fertilizers = products.filter(prod => prod.category === 'fertilizers').length
    const pesticides = products.filter(prod => prod.category === 'pesticides').length
    const total = seeds + fertilizers + pesticides
    const data = { seeds, fertilizers, pesticides, total }
    return res.json({ data, products })
}