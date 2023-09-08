## Database Relational Diagrams

https://lucid.app/lucidchart/1591aa55-5a2c-4f52-9ba2-e6e876d68662/edit?page=0_0&invitationId=inv_1fdbccfe-e498-4fc5-a656-74f62f60e80e#

## To run a migration

We must build the project first: `npm run build`

To generate a migration: `npm run typeorm -- -o -d app-data-source.ts migration:generate ./dist/src/database/migrations/${name of the migration}`

To run the migrations: `npm run typeorm migration:run -- -d app-data-source.ts`

## BLOG

### August 29 2023

- I had issues with users being logged out on refresh. I had not correctly registered the Allowed Web Origin. It needed localhost, not 127.0.0.1

#### July 20 2023

- Wanted to debug the application with VSCode, needed to add sourceMap: true in tsconfig.json
