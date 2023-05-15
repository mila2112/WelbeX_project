# welbex_project

## Description

This is the `welbex_project` package.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [License](#license)

## Installation

To install the required dependencies, run the following command:

```bash
npm install
```
Note: Some dependencies have specific version requirements. It is recommended to install the following mandatory versions:

- Node.js: `16.x.x`
- TypeScript: `^5.0.4`
- Sequelize: `6.3.1`
- sequelize-cli: `6.2.0`

## Usage
To run the project in development mode, use the following commands:
```bash
npm install
```
```bash
npm run migrate
```
```bash
npm run dev
```

## Endpoints
The following endpoints are available:

-POST /users/sign-up: Sign up a new user.
    -Request body: {firstName, lastName, email, password}.

-POST /users/sign-in: Sign in with an existing user. 
    -Request body: {email, password}.

-GET /blogs/list: Get a list of blogs. 

-POST /blogs/create: Create a new blog.
    -Request body: {text}. Requires header Authorization: Bearer {token}.

-POST /blogs/update: Update an existing blog.
    -Request body: {text}. Requires header Authorization: Bearer {token}.
-POST /blogs/delete: Delete a blog. 
    -Request body: {blogId}. Requires header Authorization: Bearer {token}.

## Scripts

- `test`: Runs tests using Mocha and TypeScript.
- `build`: Builds the project using the TypeScript compiler.
- `migrate`: Executes database migrations using Sequelize.
- `dev`: Starts the development server using ts-node.
- `start`: Starts the production server using the compiled code.

## License

This project is licensed under the ISC License. See the [![License](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC) file for details.

Please note that the generated `README.md` includes basic information and instructions based on the `package.json` file. You can modify and enhance it further to include additional sections or details as per your project's needs.
