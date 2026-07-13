
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('users', {
        id: {type: 'uuid', primaryKey: true, default: pgm.func('gen_random_uuid()')},
        email: {type: 'varchar(255)', notNull: true, unique: true},
        password_hash: {type: 'varchar(255)', notNull: true},
        created_at: {type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp')},
        updated_at: {type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp')},
    });

    pgm.createTable('urls', {
        id: {type: 'bigserial', primaryKey: true},
        short_code: {type: 'varchar(255)', notNull: false, unique: true},
        original_url: {type: 'text', notNull: true},
        user_id: {type: 'uuid', notNull: false, references: 'users(id)', onDelete: 'SET NULL'},
        created_at: {type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp')},
        updated_at: {type: 'timestamptz', notNull: true, default: pgm.func('current_timestamp')},
        is_active: {type: 'boolean', notNull: true, default: true},
    })

    pgm.createIndex('urls', 'user_id');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('urls');
    pgm.dropTable('users');
};
