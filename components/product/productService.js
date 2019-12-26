const ProductModel = require('../../model/category');

module.exports.getAll = async () => {
    const result = await ProductModel.find({});
    return result;
}
module.exports.getCate = async (id) => {
    const result = await ProductModel.find({ 'categoryid': id });
    return result;
}

module.exports.getById = async (id) => {
    const result = await ProductModel.findById(id);
    return result;
}

module.exports.getAllQuery = async (s, l, sk, search) => {
    let result=null;
    if(search){
        let a="\"";
        const t=search.replace('+',' ');
        a=a.concat(t,"\"");
        result = await ProductModel.find({$text:{$search: a}},
            null,
            {
                skip: sk,
                limit: l,
                sort: {
                    price: s
                }
            });
    }else{
        result = await ProductModel.find({},
            null,
            {
                skip: sk,
                limit: l,
                sort: {
                    price: s
                }
            });
    }
    
    return result;
}

module.exports.getCateQuery = async (id, s, l, sk, search) => {
    let result=null;
    console.log(search)
    if(search)
    {
        let a="\"";
        const t=search.replace('+',' ');
        a=a.concat(t,"\"");
        console.log("có search")
        result = await ProductModel.find({ 'categoryid': id,$text:{$search: a}},
            null,
            {
                skip: sk,
                limit: l,
                sort: {
                    price: s
                },
                
            });
    }else{
        console.log("không search")
        result = await ProductModel.find({ 'categoryid': id},
            null,
            {
                skip: sk,
                limit: l,
                sort: {
                    price: s
                },
                
            });
    }
    console.log(result)
    return result;
}