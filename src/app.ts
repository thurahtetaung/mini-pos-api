import express from 'express';
import bodyParser from 'body-parser';
import { router as shopRoutes } from './routes/shopRoutes';
import { router as productRoutes } from './routes/productRoutes';
import { router as userRoutes } from './routes/userRoutes';

const app = express();
const port = 8080;

app.use(bodyParser.json({ limit: '1000mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/shop', shopRoutes);
app.use('/product', productRoutes);
app.use('/user', userRoutes);

export async function start() {
  app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
  });
}
