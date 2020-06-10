# One License Dashboard

## Introduction

One License is solution for developers who want to distribute their offline solutions with an online licensing system. One Licensing Server is the online part of the solution that is responsible for creation, management and syncing of licenses. One License comprises of four modules:

| Module                                                                               | Description                                                          |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| [One License Server](https://github.com/one-ai/one-license-server)                   | The online server for storing and validating licenses                |
| [One License Dashboard (this repo)](https://github.com/one-ai/one-license-dashboard) | A dashboard for interacting with the server                          |
| [One License Client](https://github.com/one-ai/one-license-client)                   | Script for integrating this licensing system into your own softwares |
| [One License Thin Client](https://github.com/one-ai/one-license-thin-client)         | Intermediate client for preventing virtual machine frauds            |

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Pre-requisites

-   node (v12+)
-   npm (v6+)

### Running for development

-   Clone this repo
-   `npm i`
-   `REACT_APP_API_GATEWAY={one-license-server-address} npm run start`

### Building for production

-   `npm run build`

### Environment Variables

-   `REACT_APP_API_GATEWAY`: one license server address

### Running on Heroku Dyno

-   Create new app
-   Under deployment method select `GitHub`
-   Connect your github account and select the forked repo.
-   Under settings, in Config Vars section, add the all the env variables.
-   Under settings, in Buildpacks section, add:
    -   https://github.com/mars/create-react-app-buildpack.git

## Built with

-   [Node](https://nodejs.org/) - JS runtime for backend and development
-   [ReactJS](https://reactjs.org/) - Frontend library
-   [TypeScript](https://www.typescriptlang.org/) - The language we speak

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
