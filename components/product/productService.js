const ProductModel = require('../../model/category');
const CommentModel=require('../../model/comment');

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
    await ProductModel.update({ '_id': id },{ $inc: { 'views': 1 } });
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

module.exports.cart = async (buff) => {
    var list=JSON.parse(buff)
    let arr=[]
    for(i=0;i<list.length;i++)
    {
        if(list[i].key!='number')
            {
                let result = await ProductModel.findById(list[i].key);
                arr.push(result)
            }
    }
    return arr;
}

module.exports.getComments= (q)=>{
    const result = CommentModel.find({ 'productid': q });
    return result;
    }
    
    module.exports.saveComment= async (res,name,productid,comment)=>{
    let newcomment;
    try {
    newcomment= new CommentModel({name,productid,comment,date:""});
    } catch (error) {
    throw(error)
    }
    newcomment.save();
    
    }