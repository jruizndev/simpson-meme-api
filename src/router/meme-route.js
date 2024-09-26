const router = require('express').Router();
const { faker } = require('@faker-js/faker')

const Meme = require('../models/memeModels.js');
const { where } = require('sequelize');

router.get('/memes', async (req, res) => {
    const memes = await memes.findAll()
    res.status(200).json({
        ok: true,
        status: 200,
        body: memes
    });
});

router.get('/memes/:meme_id', async (req, res) => {
    const id = req.params.meme_id
    const meme = await memes.findOne({
        where: {
            meme_id: id,
        }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: meme,
    });
});

router.post('/memes', async (req, res) => {
    const dataMemes = req.body
    await Meme.sync()
    const creatMeme = await Meme.create({
        meme_name: dataMemes.meme_name,
        url: faker.commerce.url(),
    });
    res.status(201).json({
        ok: true,
        status: 201,
        mssage: "Meme Creado",
    });
});

router.put('/memes/:meme_id', async (req, res) => {
    const id = req.params.meme_id;
    const dataMemes = req.body;
    const updateMeme = await memes.update({
        meme_name: dataMemes.meme_name,
        url: faker.commerce.url(),
    },
        {
            where: {
                meme_id: id,
            }
        });

    res.status(200).json({
        ok: true,
        status: 200,
        body: updateMeme
    });

});

router.delete('/memes', (req, res) => {
    res.send('soy tu router')
});

module.exports = router;