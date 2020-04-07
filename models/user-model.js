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
    return db('user').where({ username }).first()
}

function find(username) {
    let query = db('user')
    if (username) {
        query = db('user').where({ username }).first()
    }
    return query
}

function findById(id) {
    return db('user').where({ id }).first()
}

function create(user) {
    return db('user').insert(user).returning('id').then(ids => findById(ids[0]));
}

function update(id, changes) {
    return db('user').update(changes).where({ id })
}

function remove(id) {
    return db('user').where({ id }).del()
}