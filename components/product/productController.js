const productService = require('./productService');
const user = require('../../model/users');

module.exports.Category = async (req, res, next) => {
    let value;
    if (typeof req.query.q === 'undefined') {
        let search_q=null;
        let sort_criteria=1;
        let limit_number=12;
        let skip_index=0;
        let total;
        
        if(typeof req.query.sort!='undefined')
        {
            sort_criteria=req.query.sort;
        }
        if(typeof req.query.limit!='undefined')
        {
            limit_number=parseInt( req.query.limit);
        }
        if(typeof req.query.skip!='undefined')
        {
            skip_index=parseInt(req.query.skip);
        }
        if(typeof req.query.search!='undefined')
        {
            search_q=req.query.search;
        }

        try {
            total = await productService.getAll();
        } catch (error) {
            next(error);
        } 
        let array=[];
        for(let i=0;i<Math.ceil(total.length/limit_number);i++)
        {
            array.push({pagenum: i+1});
            if(i === (skip_index/limit_number))
            {
                array[i].isActive = true;
            }else array[i].isActive = false;
        } 

        if(skip_index>total.length)
        {
            skip_index=0;
        }
           
        try {
            value = await productService.getAllQuery(sort_criteria,limit_number,skip_index,search_q);
        } catch (error) {
            next(error);
        }     
        res.render('category', { title: 'category', list: value, user: req.user,array:array,lim:limit_number})
        
        
    }
    else {
        let search_q=null;
        let sort_criteria=1;
        let limit_number=12;
        let skip_index=0;
        let total;
        
        if(typeof req.query.sort!='undefined')
        {
            sort_criteria=req.query.sort;
        }
        if(typeof req.query.limit!='undefined')
        {
            limit_number=parseInt(req.query.limit);
        }
        if(typeof req.query.skip!='undefined')
        {
            skip_index=parseInt(req.query.skip);
        }
        if(typeof req.query.search!='undefined')
        {
            search_q=req.query.search;
        }

        try {
            total = await productService.getCate(req.query.q);
        } catch (error) {
            next(error);
        } 
        let array=[];
        for(let i=0;i<Math.ceil(total.length/limit_number);i++)
        {
            array.push({pagenum: i+1});
            if(i === (skip_index/limit_number))
            {
                array[i].isActive = true;
            }else array[i].isActive = false;
        } 

        try {
            value = await productService.getCateQuery(req.query.q,sort_criteria,limit_number,skip_index,search_q);
        } catch (error) {
            next(error);
        }

        if (value && value.length)
            res.render('category', { title: value[0].category, list: value, user: req.user,array:array,lim:limit_number })
        else
            res.render('category', { list: value, user: req.user,array:array,lim:limit_number })       
    }
}

module.exports.singlePro = async (req, res, next) => {
    let value
    try {
        value = await productService.getById(req.query.q);

    } catch (error) {
        next(error);
    }
    res.render('singleproduct', { value, user: req.user })
}
