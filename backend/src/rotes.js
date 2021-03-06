const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const multer = require('multer');
const multerConfig = require('./config/multer');

const Post = require('../src/models/Post')

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.required()
    })
}), SessionController.create);

routes.get('/ongs',  OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}), ProfileController.index);


routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),
    [Segments.BODY]: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number()
    })
}), IncidentController.create);


routes.get('/incidents', IncidentController.index);

routes.get('/incidentsAll', IncidentController.indexAll);

//Recupera apenas 1 caso
routes.get('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.indexOne);


routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    })
}), IncidentController.delete);


routes.put('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required
    })
}), IncidentController.update);


routes.post('/posts', multer(multerConfig).single('file'), async (req, res) => {
    const {originalname: name, size, filename: key} = req.file;

    const post = await Post.create({
        name,
        size,
        key,
        url: '',
    });
    return res.json(post);

});


routes.get('/posts', async (req, res) => {
    
    const post = await Post.find()
 
    return res.json(post);

});



module.exports = routes;

