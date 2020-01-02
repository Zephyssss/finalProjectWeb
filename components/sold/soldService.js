//const ProductModel = require('../../model/category');
const SoldModel = require('../../model/sold');
module.exports.createCheckout = async (res,buff,name, phone,email,add1, add2, zip,userid) => {
    // console.log(buff)
    // console.log(name)
    // console.log(phone)
    // console.log(email)
    // console.log(add1)
    // console.log(add2)
    // console.log(zip)
    // console.log(userid)

    let address2=""
    if(add2)
    {
        address2=add2
    }
    
    let errors = [];
    if(!buff){
        errors.push({ msg: 'Bạn chưa có đơn hàng nào' });
        res.render('checkout', {errors });
    }
    if (!name || !phone||!email||!add1||!zip) {
        errors.push({ msg: 'Bạn cần điền hết các thông tin' });
    }

    let today = new Date().toISOString().slice(0, 10)
    let status="Đang giao"
    console.log(today)
    var list=JSON.parse(buff)
    if (errors.length > 0) {
        res.render('checkout', {errors });
        console.log("????????????????????????????????2")
    } else {
        for(i=0;i<list.length;i++)
        {
            if(list[i].key!='number')
                {
                    let masp=list[i].key;
                    let soluongsp=list[i].value;
                    const newsold = new SoldModel({idsp:masp,soluongsp:soluongsp,idUser:userid,name:name,phone:phone,email:email,add1:add1,add2:address2,zip:zip,date:today,status:status});
                    newsold.save();
                    console.log("????????????????????????????????1")
                }
        }
        return true
    }
    
}