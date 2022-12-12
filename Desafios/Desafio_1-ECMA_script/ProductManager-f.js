class ProductManager {

    constructor() {
        this.listProducts = []
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        console.log('Add prduct');
        let id = this.listProducts.length + 1    
        let Find = this.listProducts.some(elm => elm.code === code)
        let object = {
        'title' : title,
        'description' : description,
        'price' : price,
        'code' : code,
        'thumbnail' : thumbnail,
        'stock' : stock,
        'id' : id
        }

        if (Find) {
            console.log('Duplicate product');
        } else {
            this.listProducts.push(object)
        }
    }

    getProduct() {
        return this.listProducts;
    }

    getProductById (id) {
        let product = this.listProducts.find(elm => elm.id === id)
        if (product) {
            console.log('Product found');
            console.log(product);
        } else {
            console.log('Not found');
        }
    }

} 
      
    
    
    

let Manager = new ProductManager
Manager.addProduct("pera", "Fruta", 500, "Instert img", 'R102', 150)
Manager.addProduct("fresa", "Fruta", 480, "Instert img", 'R103', 20)
Manager.addProduct("Manzana", "Fruta", 105, "Instert img", 'R104', 67)
Manager.addProduct("Banana", "Fruta", 305, "Instert img", 'R105', 10)
console.log(Manager.getProduct());
Manager.getProductById(3)