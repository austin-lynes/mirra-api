const db = require('../data/dbConfig')


module.exports = {
    create,
    find,
    findById,
    update,
    remove,
    findByUsername,
}

function findByUsername(username) {
    return db('auth').where({ username }).first()
}

function find(username) {
    let query = db('auth')
    if (username) {
        query = db('auth').where({ username }).first()
    }
    return query
}

function findById(id) {
    return db('auth').where({ id }).first()
}

function create(user) {
    return db('auth').insert(user).returning('id').then(ids => findById(ids[0]));
}

function update(id, changes) {
    return db('auth').update(changes).where({ id })
}

function remove(id) {
    return db('auth').where({ id }).del()
}