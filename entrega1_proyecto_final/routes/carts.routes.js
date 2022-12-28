import { Router } from 'express'
import CartManager from '../utils/CartManager.js'
import ProductManager from '../utils/ProductManager.js'

const ERROR_MESSAGE_CART_NOT_FOUND = {Error: "El carrito solicitado no existe"}
const SUCCESS_MESSAGE_CART_CREATED = {Info: "Nuevo carrito creado con éxito"}
const SUCCESS_MESSAGE_ITEMS_ADDED = {Info: "Los elementos se han agregado al carrito correctamente"}
const ERROR_MESSAGE_PRODUCT_NOT_FOUND = {error: "No se ha encontrado el producto en el sistema"}
const ERROR_MESSAGE_ADDING_ITEMS = {error: "Ha ocurrido un problema al intentar agregar el producto al carrito. Por favor, revise el número de carrito y vuelva a intentarlo"}

const router = Router()

router.get('/:cid', (req, res) => {
  const cid = parseInt(req.params.cid)
  if (CartManager.getCart(cid)) {
    res.status(200).json(CartManager.getCart(cid))
  } else {
    res.status(404).json(ERROR_MESSAGE_CART_NOT_FOUND)
  }
})

router.post('/', (req, res) => {
  CartManager.createCart()
  res.status(200).send(SUCCESS_MESSAGE_CART_CREATED)
})

router.post('/:cid/product/:pid', async (req, res) => {
  const cid = parseInt(req.params.cid)
  const pid = parseInt(req.params.pid)
  const quantity = req.body.quantity

  if (!Number.isInteger(cid) || !Number.isInteger(pid) || !Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({error: "Para poder procesar los parámetros de la URL y el campo 'quantity', deben ser números enteros válidos"})
  }

  const products = ProductManager.getProducts()
  const productExists = products.some(el => el.id === pid)
  if (!productExists) {
    return res.status(404).json(ERROR_MESSAGE_PRODUCT_NOT_FOUND)
  }

  if (await CartManager.addToCart(cid, pid, quantity)) {
    res.status(201).json({...SUCCESS_MESSAGE_ITEMS_ADDED, cid})
  } else {
    res.status(400).json(ERROR_MESSAGE_ADDING_ITEMS)
  }
})

export default router
