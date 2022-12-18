import fs from 'fs'

class ProductManager {
  constructor(path) {
    this.path = path
    fs.existsSync(this.path) ? this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.products = [];
  }

  getProducts() {
    return this.products
  }

  addProduct = (title, description, price, thumbnail, code, stock) => {
    let producto = {
      'title': title,
      'description': description,
      'price': price,
      'thumbnail': thumbnail,
      'code': code,
      'stock': stock,
    }
 
    this.products.length === 0 ? producto["id"] = 1 : producto["id"] = this.products[this.products.length -1 ]["id"] + 1
    let encontrado = this.products.some(elemento => elemento.code === code)

    if (encontrado) console.warn('El codigo de producto ya existe')
    else {
      this.products.push(producto)
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
    }

  }

  getProducts = () => {
    console.log('Productos existentes: ')
    return this.products
  }

  getElementById = (id) => {
    let producto = this.products.find(el => el.id === id)
    console.log('Cargando producto por ID:', producto || 'El producto no existe')
  }


  updateProduct(id, campo, valorNuevo) {

    let index = this.products.findIndex(element => element.id === id)
    let campoValido = Object.keys(this.products[index]).some(el => el === campo)
    if (campo === 'id') {
      console.error('El producto no puede ser actualizado\n')
    } else if (!campoValido) {
      console.error('Elija un campo valido\n')
    } else {
      this.products[index][campo] = valorNuevo;
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
    }


  }


  deleteProduct(id) {
    let encontrado = this.products.some(el => el.id === id)
    if (encontrado) {
      this.products = this.products.filter(el => el.id !== id)
      fs.writeFileSync(this.path, JSON.stringify(this.products, null, '\t'))
      console.log('Producto eliminado \n')
    } else {
      console.error('El producto no existe')
    }
  }
}


// Realizar pruebas

const manager = new ProductManager('./desafio.json')
//manager.addProduct('Producto 3', 'Probando sistema', 5400, 'insertar imagen', '3', 20)
//manager.addProduct('Producto 4', 'Probando sistema', 6400, 'insertar imagen', '4', 30)
//manager.addProduct('Producto 5', 'Probando sistema', 7400, 'insertar imagen', '5', 40)
//manager.addProduct('Producto 6', 'Probando sistema', 8400, 'insertar imagen', '6', 50)
//manager.addProduct('Producto 7', 'Probando sistema', 9400, 'insertar imagen', '7', 60)
//manager.addProduct('Producto 8', 'Probando sistema', 100, 'insertar imagen', '8', 70)
//manager.addProduct('Producto 9', 'Probando sistema', 200, 'insertar imagen', '9', 80)
//manager.addProduct('Producto 10', 'Probando sistema', 300, 'insertar imagen', '10', 90)
//manager.addProduct('Producto 11', 'Probando sistema', 400, 'insertar imagen', '11', 100)
//manager.getElementById(3)
//manager.updateProduct(1,'pric8',300)
//console.log(manager.getProducts())
//manager.deleteProduct(1)

export default new ProductManager('./desafio.json')