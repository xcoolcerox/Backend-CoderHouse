import { Router } from 'express';
import { uploader } from '../utils/multer.js';
import ProductManager from '../utils/ProductManager.js';

const router = Router();

// GET PARA AÑADIR PRODUCTOS
router.get('/', (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;
  let products = ProductManager.getProducts();
  let limitedProducts = products.slice(0, limit);
  res.status(202).send(limitedProducts);
});

//OBTENER PRODUCTOS POR ID
router.get('/:pid', async (req, res) => {
  let {pid} = req.params;
  let {response} = await ProductManager.getElementById(pid);
  res.send(response || { "Error": "El producto no se ha encontrado en nuestra base de datos" });
});

router.post('/', uploader.single('thumbnail'), async (req, res) => {
  const { title, description, category, price, thumbnail, code, stock } = req.body;
  !req.file
    ? res.status(400).send({status:"error", error : "No se ha podido guardar la imagen en el servidor"})
    : await ProductManager.addProduct(title, description,category, price, req.file.path, code, stock)
    ? res.status(201).send({ info: "Producto añadido con éxito" })
    : res.status(406).send({ info: "Este producto ya ha sido añadido previamente" });
});

router.put('/', async (req, res) => {
  const { id, campo, valorNuevo } = req.body;
  await ProductManager.updateProduct(id, campo, valorNuevo)
    ? res.status(200).send({ info: "El producto ha sido modificado" })
    : res.status(400).send({ error: "El id del producto es único y no puede ser modificado" });
});

router.delete('/:pid', async (req, res) => {
  let {pid} = req.params;
  await ProductManager.deleteProduct(pid)
    ? res.status(200).send({ info: "El producto ha sido eliminado de la base de datos" })
    : res.status(400).send({ error: "No se ha encontrado el producto con el id especificado" });
});

export default router;
