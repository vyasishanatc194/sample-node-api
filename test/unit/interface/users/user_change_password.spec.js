/* eslint-env mocha */
const { expect } = require('chai');
const {
    userRepository
} = app.resolve('repository')
const signIn = app.resolve('jwt').signin()
const BASE_URI = `/api/${config.version}`
let token
let userId
let oldPassword
describe('Routes: Change-Password', () => {
    beforeEach((done) => {
        oldPassword = 'test@123'
        // we need to add user before we can request our token
        userRepository
            .destroy({ where: {} })
            .then(() =>
                userRepository.create({
                    Email: 'testdev1@gmail.com',
                    LegalName: "test_legal_name",
                    Password: oldPassword,
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
                userId = user.ID,
                    done()
            })
    })
    it('should change password', done => {
        const changePasswordData = {
            "OldPassword": oldPassword,
            "NewPassword": "test@123"
        }
        request.post(`${BASE_URI}/change/password`)
            .set('Authorization', `JWT ${token}`)
            .send(changePasswordData)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.include.keys('data')
                expect(res.body).to.include.keys('message')
                expect(res.body.success).to.equal(true)
                done(err)
            })
    })

    it('should  get unauthorized error without token', done => {
        const changePasswordData = {
            "OldPassword": oldPassword,
            "NewPassword": "test@123"
        }
        request.put(`${BASE_URI}/change/password`)
            .send(changePasswordData)
            .expect(404)
            .end((err, res) => {
                done(err)
            })
    })

    it('should raise invalid token error', done => {
        const changePasswordData = {
            "OldPassword": oldPassword,
            "NewPassword": "test@123"
        }
        request.put(`${BASE_URI}/change/password`)
            .set('Authorization', '')
            .send(changePasswordData)
            .expect(404)
            .end((err, res) => {
                done(err)
            })
    })

})