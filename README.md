# WatchTower

[![CircleCI](https://circleci.com/gh/andela/watch-tower.svg?style=svg&circle-token=c0f65666b41a946385c269ad91ce903c4153e1eb)](https://circleci.com/gh/andela/watch-tower)
[![Maintainability](https://api.codeclimate.com/v1/badges/c8aca378abb90a557401/maintainability)](https://codeclimate.com/repos/5bb35f15e2f86a74e2005f45/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c8aca378abb90a557401/test_coverage)](https://codeclimate.com/repos/5bb35f15e2f86a74e2005f45/test_coverage)

WatchTower is a tool used to automate performance tracking and management within the D0B space.

This repo holds the code for the frontend of WatchTower

## Description

The D0 program is an integral part of the fellowship where fellows are constantly monitored by different stakeholders.
Watchtower automates the process of monitoring and notifying the different stakeholders within the D0 space of a fellow's progress. Fellows can also access their ratings using this platform.

## Table of contents

- [Dependencies](#dependencies)
- [Installing a dependency](#installing-a-dependency)
- [Setup(mac)](#setup)
- [To install requirements run](#to-install-requirements-run)
- [Running tests](#running-tests)
- [Setting up a local url](#setting-up-a-local-url)
- [Starting local development server](#starting-local-development-server)
- [Development Guidelines](#development-guidelines)

## Documentation

TODO

## Dependencies

- [Node](https://nodejs.org/en/download/) - A Javascript runtime environment.
- [React](https://github.com/facebook/create-react-app) - A Javascript library for building user interfaces.
- Enzyme
- Redux
- A package manager - [yarn](https://yarnpkg.com/lang/en/) or [NPM](https://www.npmjs.com/)

## Prerequisites

- [docker](https://docs.docker.com/)
- docker-compose

## Installing a Dependency

You may install a dependency by running:

```
yarn add <dependency>
```

## Setup

After installing the prerequisites, clone the repository:

```
$ git clone https://github.com/andela/watch-tower.git
```

Then change the directory to the repository:

```
$ cd watch-tower
```

#### To install requirements run:

```
yarn install
```

This will install all the requirements defined in the `package.json` file inside the watch-tower folder.

#### Setting up a local url

```
$ make set-url
```

This will add `127.0.0.1 watchtower-dev.andela.com` to the hosts file.
This only needs to be run at the initial setup.

### Running tests

#### With docker

```
$ make test
```

This will run the tests inside the container while giving you the output at your terminal.

#### Without docker

- Navigate to the project root directory in your console
- Run `yarn test` - to test the app

### Starting local development server

#### With docker

```
$ make start
```

This will run the application inside docker, which can be accessed via your browser. make start also grants you the ability of live editing.

after starting the local development server, application can be accessed at:

```
watchtower-dev.andela.com:3000
```

#### Without docker

- yarn start

### Making a secure shell (Docker)

```
$ make ssh
```

This will take you into the terminal of the container where the application is.

### Clean docker images (Docker)

```
$ make clean
```

This will delete the images that were created by docker.

### Development/ Contributing Guidelines

- The branch naming, commit message and pull request conventions are documented [here](https://github.com/andela/engineering-playbook/tree/master/5.%20Developing/Conventions)
- [Airbnb style guide for react](https://github.com/airbnb/javascript/tree/master/react)
- [Airbnb style guide for ES6/ES7](https://github.com/airbnb/javascript)`

## Deployment

TODO
