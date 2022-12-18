import Express  from 'express';
import ProductManager from './ProductManager'

const app = new Express()


app.get('/bienvenida', (req, res) => {
    res.send('<h1 style="color:blue;"> Bienvenido a mi pagina web </h1>');
})

/*app.get('/products', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const products = manager.getProducts();
    if (limit) {
      res.send({ products: products.slice(0, limit) });
    } else {
      res.send({ products });
    }
  });
  
  app.post('/products', (req, res) => {
    const { title, description, price, thumbnail, code, stock } = req.body;
    manager.addProduct(title, description, price, thumbnail, code, stock);
    res.send({ message: 'Producto añadido' });
  }); */

const port = 8080;
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
  });


