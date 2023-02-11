
# About

It is a news website prototype which is built on node js and nuxt 3. Here user can create his account, create news articles, post reactions and comments on the articles.

- It has login, register, dashboard, my articles, category, article detail, update profile and update password pages
- User can see the public articles on dashboard
- You can like, and comment on the article at detail page
- You can check your private and public articles in My articles page
- You can create category and check articles specific to that category on category page

# Concepts

### Knex ORM
- Knex.js is a SQL Query Builder for JavaScript.
- It is used to create queries with postgreSQL and migrations for the database schemas

### Passport JS
- Passport is Express-compatible authentication middleware for Node.js.
- Passport's sole purpose is to authenticate requests, which it does through an extensible set of plugins known as strategies.
- Implemented the Passport js authentication with local strategy at login and jwt strategy at updating user and articles

### JWT
- A JSON web token(JWT) is JSON Object which is used to securely transfer information over the web(between two parties). 
- It is used for an authentication system and also used for information exchange.

### Bcrypt
- The bcrypt hashing function allows us to build a password security platform that scales with computation power
- It is used to hash the user's password with a salt.

### ESLint
- This helped in catching errors during development, keep a consistent code style, and avoid formatting creating large diffs in pull requests.

# Installation

Requirements:

1. Nodejs(>v14.20.0)
2. PostgreSQL(v14.6)

#### Steps to run the backend server:

1. Create the database with the name "tnews"

```bash
sudo -i -u postgres
```

```bash
createdb tnews
```

```bash
psql tnews
```

2. Run the migrations,

```bash
npm run migrate
```

3. Run the server,

```bash
npm run start
```

Now the api server is running on [http://localhost:3000](http://localhost:3000).

#### Steps to run the frontend:

1. Go to the ui directory

```bash
cd ui
```

2. Run the development server

```bash
npm run dev
```

You can check the results on [http://localhost:3001](http://localhost:3001).



# Screenshots

- Register new user
![tnews-register-page](https://user-images.githubusercontent.com/15182066/209081693-a50b0382-5c9f-47bf-94dc-67a7aa1b6b66.png)


----

- Create new article
![Create new article](https://user-images.githubusercontent.com/15182066/208695151-4875af4f-3aeb-43d8-86f8-96dda05a08c6.png)

----

- All articles
![tnews-all-publication-1 2](https://user-images.githubusercontent.com/15182066/209315318-c67b099f-f8d7-403b-8967-4b3adc58b7eb.png)

----

- Article detail page
![Article detail page](https://user-images.githubusercontent.com/15182066/208694920-4373146d-7ff9-4be5-84d9-307eebff932b.png)

----

- Create new category
![Create new category](https://user-images.githubusercontent.com/15182066/208694932-a47e3ccc-43bb-4b3b-88d4-4e8fd91b7095.png)

----

- Categories grid view
![All categories](https://user-images.githubusercontent.com/15182066/208696351-15e5a4e1-e1ba-49fa-9f41-a4a381030315.png)

# Tech Stack

**Client:** Nuxt 3, Typescript, Pinia, TailwindCSS

**Server:** Node, Express, Knex, PostgreSQL, PassportJS, JWT, Bcrypt

# Formatting and Linting
- ESLint
- Prettier
