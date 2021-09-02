## About Example Polare

Example website for login + profile page, using a stack of PostSQL 12, Laravel (including routing) and React (+ React Admin). Really simple and scatfold-y.

## Setup

Make sure there's a Postsql server running with a database named `polare` (name can be changed), and the right credentials are present over in the `.env` file.

```bash
composer install
npm install
php artisan key:generate
php artisan migrate:install
```

Use `php artisan migrate:fresh --seed` instead to already add some example profiles.

To see if the database is properly setup:
```bash
php artisan migrate:status
```

## Testing
To do a dev test:
```bash
npm run watch
php artisan serve
```

## Production
Change the `.env` file to production and then...
```bash
```

## To-do
- Include React Admin
  - Understand how to integrate axios for API access
- Move away from Bootstrap (like c'mon)
- Create login and profile views
- Seed database
- Move to Heroku for testing
- Github CI/CD