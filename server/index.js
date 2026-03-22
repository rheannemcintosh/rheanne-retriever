import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { DefaultAzureCredential } from '@azure/identity';

if (!process.env.CLIENT_ORIGIN) throw new Error('CLIENT_ORIGIN is not set');
if (!process.env.FOUNDRY_PROJECT_ENDPOINT) throw new Error('FOUNDRY_PROJECT_ENDPOINT is not set');
if (!process.env.FOUNDRY_MODEL) throw new Error('FOUNDRY_MODEL is not set');

const app = express();
const port = process.env.PORT ?? 3000;
const credential = new DefaultAzureCredential();

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.post('/api/chat', async (req, res, next) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'message is required' });
        }

        const { token } = await credential.getToken('https://ai.azure.com/.default');

        const foundryRes = await fetch(process.env.FOUNDRY_PROJECT_ENDPOINT, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: process.env.FOUNDRY_MODEL,
                input: message,
            }),
        });

        if (!foundryRes.ok) {
            const text = await foundryRes.text();
            return res.status(foundryRes.status).json({ error: text });
        }

        const data = await foundryRes.json();

        const messageOutput = data.output?.find((item) => item.type === 'message');
        const content = messageOutput?.content ?? [];

        const reply = content
            .filter((c) => c.type === 'output_text')
            .map((c) => c.text)
            .join('');

        const citations = content.flatMap((c) => c.annotations ?? []);

        res.json({ reply, citations });
    } catch (err) {
        next(err);
    }
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
