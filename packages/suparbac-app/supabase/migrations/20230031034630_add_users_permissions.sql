/**
* Adds permissions to users table.
*/
ALTER TABLE users ADD permissions text[];

CREATE INDEX users_id_permissions ON users (id, permissions);
