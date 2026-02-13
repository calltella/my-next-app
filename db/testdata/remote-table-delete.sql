
-- Local delete
-- rm -rf ./.wrangler/state
-- rm -rf ./drizzle/migrations/*


-- remote table delete
-- npx wrangler d1 execute vercel-apline --remote --file=./drizzle/migrations/0000_XXX.sql
DROP TABLE IF EXISTS files;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS notes;
-- DROP TABLE IF EXISTS sqlite_sequence;
DROP TABLE IF EXISTS __drizzle_migrations;

