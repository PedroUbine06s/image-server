import express from 'express';
import bodyParser from 'body-parser';
import mediaRoutes from './routes/routes';


const app = express();
app.use(bodyParser.json());

app.use('/media', mediaRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});