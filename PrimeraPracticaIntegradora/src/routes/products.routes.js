import { Router } from 'express'
import { uploader } from '../utils/multer.js'
import productDao from '../dao/productDao.js'

// ☐ IMPLEMENTAR MONGO PARA REGISTRAR TODO POR ATLAS



const router = Router()

// METODO GET PARA LISTAR PRODUCTOS
router.get('/', async (req, res) => {
  let limit = parseInt(req.query.limit)
  try {
    res.json(await productDao.getProducts(limit));
  } catch (error) {
   res.json({error}) 
  }
})

//METODO PARA OBTENER PRODUCTO POR ID
router.get('/:pid', async (req, res) => {
  let pid = (req.params.pid);
  try {
    res.json(await productDao.getProductById(pid))
  } catch (error) {
   res.json({error}) 
  }
})

router.post('/', uploader.single('thumbnail'), async (req, res) => {
  const { title, description, category, price, thumbnail, code, stock } = req.body;
  !req.file && res.status(400).send({ status: "error", error: "No se pudo guardar la imagen" })
  let thumbnailName = req.file.filename || 'Sin Imagen';
  try {
    let addedProduct = await productDao.createProduct({
      title, description, category, price, thumbnailName, code, stock
    })
    res.status(201).json({ info: 'Producto Agregado', addedProduct })
  } catch (error) {
    console.log("Ha ocurrido un error: \n", error)
    res.status(400).json({ info: `Ha ocurrido un error: ${error}` })
  }
})

router.put('/:pid', async (req, res) => {
  const pid = (req.params.pid)
  const updatedValue = req.body
  try {
  await productDao.updateProduct(pid, updatedValue)
  res.send({ status: 200, payload: updatedValue })
  } catch (error) {
   res.json({error}) 
  }
})

router.delete('/:pid', async (req, res) => {
  let pid = (req.params.pid)
  try {
   await productDao.deleteProduct(pid) 
  res.json({status:200, message:'Producto producto eliminado'})
  } catch (error) {
   res.json({error}) 
  }
})

export default router;


