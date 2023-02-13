/* eslint-env mocha */
const { expect } = require('chai');
const {
    userRepository
} = app.resolve('repository')
const signIn = app.resolve('jwt').signin()
const BASE_URI = `/api/${config.version}`
let token
let userEmail
describe('Routes: Forgot-Password', () => {
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
                userEmail = user.Email
                done()
            })
    })
    it('should forgot password', done => {
        const forgotPasswordData = {
            "Email": userEmail,
        }
        request.post(`${BASE_URI}/forgot/password`)
            .send(forgotPasswordData)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.include.keys('data')
                expect(res.body).to.include.keys('message')
                expect(res.body.success).to.equal(true)
                done(err)
            })
    })

    it('should reset password', done => {
        const resetPasswordData = {
            Token: token,
            NewPassword: "test@123",
        }
        request.post(`${BASE_URI}/reset/password`)
            .send(resetPasswordData)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.include.keys('data')
                expect(res.body).to.include.keys('message')
                expect(res.body.success).to.equal(true)
                done(err)
            })
    })

    it('should throw token error for reset password', done => {
        const resetPasswordData = {
            NewPassword: "test@123"
        }
        request.post(`${BASE_URI}/reset/password`)
            .send(resetPasswordData)
            .expect(400)
            .end((err, res) => {
                expect(res.body.success).to.equal(false)
                done(err)
            })
    })
})