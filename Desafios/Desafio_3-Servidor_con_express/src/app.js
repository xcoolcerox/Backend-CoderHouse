import Express from 'express';
import ProductManager from './ProductManager.js'


const app = new Express()




app.get('/', (req, res) => {
  res.send('<h1 style="color:blue;"> Bienvenido a mi pagina web </h1>');
})




app.get('/products', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : null;
  const products = ProductManager.getProducts();
  if (limit) {
    res.send({
      products: products.slice(0, limit)
    });
  } else {
    res.send({
      products
    });
  }
});

app.get('/products/:pid', async (req, res) => {
  let pid = parseInt(req.params.pid);
  let response = await ProductManager.getElementById(pid)
  console.log(response)
  res.json(response || {
    "Error": "Producto no encontrado"
  })
})

const port = 8080;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});