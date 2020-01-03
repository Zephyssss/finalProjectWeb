//const ProductModel = require('../../model/category');
const SoldModel = require('../../model/sold');
module.exports.createCheckout = async (res,buff,name, phone,email,add1, add2, zip,userid) => {
    
    let errors = [];
    let today = new Date().toISOString().slice(0, 10)
    let status="Đang giao"
    let list=JSON.parse(buff)
    let address2=""
    if(add2){
        address2=add2
    }
    
    if(!buff){
        errors.push({ msg: 'Bạn chưa có đơn hàng nào' });
        res.render('checkout', {errors });
    }
    if (!name || !phone||!email||!add1||!zip) {
        errors.push({ msg: 'Bạn cần điền hết các thông tin' });
    }
    
    if (errors.length > 0) {
        res.render('checkout', {errors });
    } else {
        for(i=0;i<list.length;i++)
        {
            if(list[i].key==="number")
            {
                list.splice(i,1);
                break;
            }
        }
        const newsold = new SoldModel({sp:list,idUser:userid,name:name,phone:phone,email:email,add1:add1,add2:address2,zip:zip,date:today,status:status});
        return newsold.save();
    }
    
}