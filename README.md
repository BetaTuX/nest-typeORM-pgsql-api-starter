<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
<p align="center">A starter project based on <a href="http://nestjs.com" target="blank">Nest.js</a> framework for building efficient and scalable server-side applications.</p>
<p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository. The goal is to provide a starter project for any REST APIs with Authentication and Rights system.

## Features

- [x] User resource
    - [ ] Management
    - [x] Real login/register process
    - [x] Password Hashing
- [ ] Right resource
    - [ ] Management
    - [ ] Real add/remove process
    - [ ] Custom decorators
- [x] DB Management
    - [x] One DB
    - [x] Multiple DB (prod, dev, test)
    - [x] Managed through YAML config file

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
