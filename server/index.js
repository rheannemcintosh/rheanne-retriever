import 'dotenv/config';
import express from 'express';
import cors from 'cors';

if (!process.env.CLIENT_ORIGIN) throw new Error('CLIENT_ORIGIN is not set');

const app = express();
const port = process.env.PORT ?? 3000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status ?? 500).json({
        error: err.message ?? 'Internal server error',
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
