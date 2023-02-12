const knex = require('./knex');//connection

module.exports = {
	getAll(){
        return knex.from('user').select('email', 'name');
	},
	getOneEmail(email){
		return knex('user').where('email',email).first();
	},
	create(data){
		return knex('user').insert(data, '*');
	},
	update(id,data){
		return knex('user').where('id', id).update(data, '*');
	},
	delete(id){
		return knex('user').where('id', id).del();
	}
}