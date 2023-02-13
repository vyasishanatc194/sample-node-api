// Initialize
const chai = require('chai');
const request = require('supertest')

const dirtyChai = require('dirty-chai');
const chaiChange = require('chai-change');
const container = require('src/container')
const server = container.resolve('server')
const config = container.resolve('config')
const logger = container.resolve('logger')


logger.transports.forEach((t) => (t.silent = true))
chai.use(dirtyChai);
chai.use(chaiChange);
global.app = container
global.request = request(server.app)
global.config = config