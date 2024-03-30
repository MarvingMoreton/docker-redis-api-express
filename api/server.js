const express = require('express');
const redis = require('redis');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');

const app = express();
const redisClient = redis.createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: 6379
    }
});

const connectRedisClient = async () => {
    await redisClient.connect();
}

connectRedisClient();

app.post('/articles/seed', async (req, res) => {
    const articles = [
        { title: 'First Article', description: 'This is the description for the first article.' },
        { title: 'Second Article', description: 'This is the description for the second article.' },
        { title: 'Third Article', description: 'This is the description for the third article.' },
        { title: 'Fourth Article', description: 'This is the description for the fourth article.' },
        { title: 'Fifth Article', description: 'This is the description for the fifth article.' },
        { title: 'Sixth Article', description: 'This is the description for the sixth article.' },
        { title: 'Seventh Article', description: 'This is the description for the seventh article.' },
        { title: 'Eighth Article', description: 'This is the description for the eighth article.' },
        { title: 'Ninth Article', description: 'This is the description for the ninth article.' },
        { title: 'Tenth Article', description: 'This is the description for the tenth article.' }
    ];

    await prisma.article.createMany({
        data: articles,
    });

    res.send('Seed succeeded.');
});

app.get('/articles/:articleId', async (req, res) => {

    const articleId = req.params.articleId;

    const articleJson = await redisClient.get(articleId);

    if (articleJson) {
        console.log('return from redis');
        res.send(JSON.parse(articleJson));
    } else {
        console.log('return from database');

        const articleFromDb = await prisma.article.findUnique({
            where: { id: Number(articleId) },
        });

        // If article from BD: return a 404 directly
        if (!articleFromDb) {
            res.status(404).send('Not found');
            return;
        }
        redisClient.set(articleId, JSON.stringify(articleFromDb));
        res.send(articleFromDb);
    }
});

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;

// Migrated to start.js for test purposes
// app.listen(5000, function () {
//     console.log('Web application is listening on port 5000');
// });
