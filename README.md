## Database Relational Diagrams

https://lucid.app/lucidchart/1591aa55-5a2c-4f52-9ba2-e6e876d68662/edit?page=0_0&invitationId=inv_1fdbccfe-e498-4fc5-a656-74f62f60e80e#

## To run a migration

We must build the project first: `npm run build`

To generate a migration: `npm run typeorm -- -o -d app-data-source.ts migration:generate ./dist/src/database/migrations/${name of the migration}`

To run the migrations: `npm run typeorm migration:run -- -d app-data-source.ts`
