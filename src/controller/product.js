const faker =require('faker')
const colors =require('colors')
class Product {
    constructor(name,description,material,price,image){
        this.name=name;
        this.description=description;
        this.material=material;
        this.price=price;
        this.image=image;
    }
}
const obtenerData= (req,res)=>{
//valida que se pasen los objetos de request y response
if (Object.prototype.toString.call(req) !== '[object Object]') throw new Error("req should be an object")
if (!("render" in res)) throw new Error("res should be an object")
const response =[]
for (let i=0;i<5;i++){
    const fotoSelector=['fashion']
response.push(new Product(faker.commerce.productName(),faker.commerce.productDescription(),faker.commerce.productMaterial() ,faker.commerce.price(),faker.image.business(200,200,true)))
}
res.render("home",{products:response})
return response
}
module.exports=obtenerData