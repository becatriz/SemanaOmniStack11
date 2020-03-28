const connection = require('../database/connection');

module.exports = {

    async index(request, response) {
        //Paginação
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();


        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5) //Quantidade de retorno na paginacao
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf']);

        //Enviar via cabeçalho a quantidade de casos
        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);

    },

    async indexOne(request, response) {

        let { id } = request.params;
        let [recebidoFront] = id.split(":");
        id = recebidoFront;

        if (!id)
            return response.status(401).json({
                'error': 'ID desconhecido!'
            });

        const incidents = await connection('incidents')
            .select('*')
            .where('id', id)
            .first();


        return response.json(incidents);

    },

    async create(request, response) {
        const { title, description, value } = request.body;

        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async update(request, response) {


        const { id } = request.params;
        
        const incident = await connection('incidents').
            where('id', id).
            select('ong_id').
            first();

    
        const { title, description, value, ongId } = request.body;
   
        if (incident.ong_id != ongId) {
         return response.status(401).json({
                error: 'operation not permitted'
            });
        }

        await connection('incidents').where('id', id).update({ title, description, value });

        return response.status(204).send();

    },


    async delete(request, response) {

        const { id } = request.params;
        const ong_id = request.headers.authorization;
        
        

        const incident = await connection('incidents').
            where('id', id).
            select('ong_id').
            first();

        if (incident.ong_id != ong_id) {

            return response.status(401).json({
                error: 'operation not permitted'
            });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();

    },
}