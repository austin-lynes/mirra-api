
exports.up = function (knex) {
    return knex.schema.createTable('auth', tbl => {
        tbl.increments();
        tbl.string('username').unique().notNullable();
        tbl.string('password').notNullable();
        tbl.string('email').notNullable().unique();
        tbl.string('access-token').notNullable();
        tbl.timestamp('created-at').defaultsTo(knex.fn.now());
        tbl.timestamp('last-edit-at').defaultsTo(knex.fn.now());
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('auth')
};
