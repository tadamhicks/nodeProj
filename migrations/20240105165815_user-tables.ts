import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create the 'users' table
  await knex.schema.createTable('users', (table) => {
    table.specificType('id', 'CHAR(16)').primary();
    table.string('email').notNullable().unique();
    table.string('firstName');
    table.string('lastName');
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
  });

  // Create the 'tokens' table
  await knex.schema.createTable('tokens', (table) => {
    table.specificType('id', 'CHAR(16)').primary();
    table.timestamp('createdAt').defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updatedAt').defaultTo(knex.fn.now()).notNullable();
    table.enu('type', ['EMAIL', 'API']).notNullable();
    table.string('emailToken').unique();
    table.boolean('valid').defaultTo(true).notNullable();
    table.timestamp('expiration');
    table.string('userId').references('id').inTable('users').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('posts');
  await knex.schema.dropTable('users');
  await knex.schema.dropTable('tokens');
}
