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

