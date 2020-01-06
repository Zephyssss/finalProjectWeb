const productService = require('./productService');
const user = require('../../model/users');

module.exports.Category = async (req, res, next) => {
    let value;
    if (typeof req.query.q === 'undefined') {
        let is1 = (req.query.sort == 1);
        let is_1 = (req.query.sort == -1);
        let is6 = (req.query.limit == 6);
        let is12 = (req.query.limit == 12);
        let is20 = (req.query.limit == 20);
        let is30 = (req.query.limit == 30);

        let search_q = null;
        let sort_criteria = 1;
        let limit_number = 6;
        let skip_index = 0;
        let total;

        if (typeof req.query.sort != 'undefined') {
            sort_criteria = req.query.sort;
        }
        if (typeof req.query.limit != 'undefined') {
            limit_number = parseInt(req.query.limit);
        }
        if (typeof req.query.skip != 'undefined') {
            skip_index = parseInt(req.query.skip);
        }
        if (typeof req.query.search != 'undefined') {
            search_q = req.query.search;
        }

        try {
            total = await productService.getAll();
        } catch (error) {
            next(error);
        }
        let array = [];
        for (let i = 0; i < Math.ceil(total.length / limit_number); i++) {
            array.push({ pagenum: i + 1 });
            if (i === (skip_index / limit_number)) {
                array[i].isActive = true;
            } else array[i].isActive = false;
        }

        if (skip_index > total.length) {
            skip_index = 0;
        }

        try {
            value = await productService.getAllQuery(sort_criteria, limit_number, skip_index, search_q);
        } catch (error) {
            next(error);
        }
        res.render('category', { title: 'category', list: value, array: array, lim: limit_number, is1: is1, is_1: is_1, is6: is6, is12: is12, is20: is20, is30: is30 })


    }
    else {
        let search_q = null;
        let sort_criteria = 1;
        let limit_number = 6;
        let skip_index = 0;
        let total;

        let is1 = (req.query.sort == 1);
        let is_1 = (req.query.sort == -1);
        let is6 = (req.query.limit == 6);
        let is12 = (req.query.limit == 12);
        let is20 = (req.query.limit == 20);
        let is30 = (req.query.limit == 30);

        if (typeof req.query.sort != 'undefined') {
            sort_criteria = req.query.sort;
        }
        if (typeof req.query.limit != 'undefined') {
            limit_number = parseInt(req.query.limit);
        }
        if (typeof req.query.skip != 'undefined') {
            skip_index = parseInt(req.query.skip);
        }
        if (typeof req.query.search != 'undefined') {
            search_q = req.query.search;
        }

        try {
            total = await productService.getCate(req.query.q);
        } catch (error) {
            next(error);
        }
        let array = [];
        for (let i = 0; i < Math.ceil(total.length / limit_number); i++) {
            array.push({ pagenum: i + 1 });
            if (i === (skip_index / limit_number)) {
                array[i].isActive = true;
            } else array[i].isActive = false;
        }

        try {
            value = await productService.getCateQuery(req.query.q, sort_criteria, limit_number, skip_index, search_q);
        } catch (error) {
            next(error);
        }

        if (value && value.length)
            res.render('category', { title: value[0].category, list: value, array: array, lim: limit_number, is1: is1, is_1: is_1, is6: is6, is12: is12, is20: is20, is30: is30 })
        else
            res.render('category', { list: value, array: array, lim: limit_number, is1: is1, is_1: is_1, is6: is6, is12: is12, is20: is20, is30: is30 })
    }
}

module.exports.cart = async (req, res, next) => {
    let value
    try {
        value = await productService.cart(req.body.cartsession);

    } catch (error) {
        next(error);
    }
    res.render('cart', { title: 'Cart', value: value })
}


module.exports.singlePro = async (req, res, next) => {
    let value, comments
    try {
        value = await productService.getById(req.query.q);
        comments = await productService.getComments(req.query.q);
        relation= await productService.Relation(req.query.q);

    } catch (error) {
        next(error);
    }
    res.render('singleproduct', { value, comments,relation })
}

module.exports.postComment = async (req, res, next) => {

    await productService.saveComment(res, req.body.name, req.query.q, req.body.comment);
    console.log("commment added");
    res.redirect('back');
}