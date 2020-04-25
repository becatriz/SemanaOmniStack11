const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const connection = require('../database/connection');



module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16,async (err, hash, response) => {
                if (err) cb(err);

                const incidents = await connection('incidents')
                    .select().max('id', { as: 'id' });
                //response.header('id', incidents[0].id + 1);


                const id = response.data;

                const fileName = `${id}-${file.originalname}`;

                cb(null, fileName);
            })

        }

    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjped',
            'image/png',
            'image/gif'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type.'))
        }
    }

};