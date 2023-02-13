/* eslint-env mocha */
const { expect, assert } = require('chai');
const {
    userRepository, bureauRepository
} = app.resolve('repository')
const signIn = app.resolve('jwt').signin()
const BASE_URI = `/api/${config.version}`
let token
let userId

describe('Routes: List-bureaus', () => {
    beforeEach((done) => {
        // we need to add user before we can request our token
        userRepository
            .destroy({ where: {} })
            .then(() =>
                userRepository.create({
                    Email: 'testdev1@gmail.com',
                    LegalName: "test_legal_name",
                    Password: "test@123",
                    Type: "ADMIN",
                    IsActive: 1,
                })
            ).then((user) => {
                token = signIn({
                    ID: user.ID,
                    Email: user.Email,
                    Type: user.Type,
                    useCase: config.passwordChangeUseCase
                })
                userId = user.id
                done()
            })
    })
    it('should get list bureaus', done => {
        request.get(`${BASE_URI}/bureau`)
            .set('Authorization', `JWT ${token}`)
            .expect(200)
            .end((err, res) => {
                done(err)
            })
    })

    it('should  get unauthorized error without token', done => {
        request.get(`${BASE_URI}/bureaus`)
            .expect(404)
            .end((err, res) => {
                done(err)
            })
    })

    it('should raise invalid token error', done => {
        request.get(`${BASE_URI}/bureaus`)
            .set('Authorization', '')
            .expect(404)
            .end((err, res) => {
                done(err)
            })
    })

})