const productService = require('./productService');

module.exports.Category = async (req, res, next) => {
    let value;
    if (typeof req.query.q === 'undefined') {
        try {
            value = await productService.getAll();
        } catch (error) {
            next(error);
        }
        res.render('category', { title: 'category', list: value })
    }
    else {
        try {
            value = await productService.getCate(req.query.q);
        } catch (error) {
            next(error);
        }
        console.log("query la:" + req.query.q);
        if (value && value.length)
            res.render('category', { title: value[0].category, list: value })
        else
            res.render('category', { list: value })

    }
}

module.exports.singlePro = async (req, res, next) => {
    let value
    try {
        value = await productService.getById(req.query.q);

    } catch (error) {
        next(error);
    }

    //console.log("get data successfully");
    res.render('singleproduct', { value })
}
