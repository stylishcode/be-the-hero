
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) {
    table.increments(); // It will increase the id's as the cases will be created

    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    // Relationship with ong entity
    table.string('ong_id').notNullable();

    // Ong foreign key
    table.foreign('ong_id').references('id').inTable('ongs');

  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
