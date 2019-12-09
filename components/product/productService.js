const ProductModel = require('../../model/category');

module.exports.getAll = async () => {
    const result = await ProductModel.find({});
    return result;
}
module.exports.getCate = async (id) => {
    const result = await ProductModel.find({ 'categoryid': id});
    return result;
}

module.exports.getById = async (id) => {
    const result = await ProductModel.findById(id);
    return result;
}

module.exports.getAllQuery = async (s,l,sk) => {
    const result = await ProductModel.find({},
        null,
        {
            skip:sk,
            limit:l,
            sort:{
                price:s}
        });    
    return result;
}

module.exports.getCateQuery = async (id,s,l,sk) => {
    const result = await ProductModel.find({ 'categoryid': id},
        null,
        {
            skip:sk,
            limit:l,
            sort:{
                price:s}
    });
    return result;
}