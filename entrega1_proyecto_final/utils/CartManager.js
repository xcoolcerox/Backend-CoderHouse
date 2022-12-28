import fs from 'fs'

class CartManager {
constructor(path) {
this.path = path
fs.existsSync(this.path) ? this.cart = JSON.parse(fs.readFileSync(this.path, 'utf-8')) : this.cart = []
}

async createCart() {
const carrito = { products: [] }
this.cart.length === 0 ? carrito.id = 1 : carrito.id = this.cart[this.cart.length - 1].id + 1
this.cart.push(carrito)
await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, '\t'))
}

async addToCart(cartId, productId, quantity) {
const index = this.cart.findIndex(c => c.id === cartId)
if (index === -1 || this.cart[index].products === undefined) return false
const indexProduct = this.cart[index].products.findIndex(pid => pid.productId === productId)
const alreadyExists = this.cart[index].products.some(pid => pid.productId === productId)
if (alreadyExists) {
this.cart[index].products[indexProduct].quantity += quantity
} else {
this.cart[index].products.push({ productId, quantity })
}
await fs.promises.writeFile(this.path, JSON.stringify(this.cart, null, '\t'))
return true
}

getCart = id => this.cart.find(el => el.id === id) || false
}

export default new CartManager('./carrito.json')