const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async index(request, response) {
    // pagination
    const { page = 1 } = request.query;

    // incidentes registered
    const [count] = await connection('incidents').count();
    
    const incidents = await connection('incidents')
      // Relates the incident entity to the ong entity and joins them, returning data from both
      .join('ongs', 'ong_id', '=', 'incidents.ong_id')
      .limit(5) // 5 incidents per page
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);

    // return to front-end, a count of incidents registered in header
    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    // id of the NGO that is registering a new case
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }

};