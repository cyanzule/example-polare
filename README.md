## About Example Polare

Example website for login + profile page, using a stack of PostSQL 12, Laravel (including routing) and React (though Inertia + React Admin). Really simple and scatfold-y.

## Setup

Make sure there's a Postsql server running with a database named `polare` (name can be changed), and the right credentials are present over in the `.env` file.

```bash
composer install
npm install
php artisan migrate:install
```

Use `php artisan migrate:fresh --seed` afterwards to add some example profiles.

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
- Include FUNCTIONAL React Admin
  - Understand how to integrate axios for API access
  - Lock access to Admin (special account? so an extra table?)
  - Logout is broken (integrate with Inertia)
- Figure out why email verification is being ignored
- Move to Heroku for testing
- Github CI/CD
- Add bell & whistles
  - Custom front page
  - Display user stats on Dashboard
  - More user stats?