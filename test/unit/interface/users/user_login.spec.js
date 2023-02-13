/* eslint-env mocha */
const { expect } = require('chai');
const {
  userRepository
} = app.resolve('repository')

describe('Routes: Login', () => {
  const BASE_URI = `/api/${config.version}/login`

  beforeEach((done) => {
    // we need to add user before we can request our token
    userRepository
      .destroy({ where: {} })
      .then(() =>
        userRepository.create({
          Email: 'testdev1@gmail.com',
          Password: 'test@123',
          LegalName: "test_legal_name",
          Type: "ADMIN",
          IsActive: 1,
        })
      ).then(() => {
        done()
      })
  })

  describe('POST Token', () => {
    it('should retrieved token', done => {
      request.post(`${BASE_URI}`)
        .send({
          Email: 'testdev1@gmail.com',
          Password: 'test@123'
        })
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.include.keys('data')
          expect(res.body.data).to.include.keys('Token')
          done(err)
        })
    })

    it('should throw error if email not existing', done => {
      request.post(`${BASE_URI}`)
        .send({
          Email: 'testdev1234@gmail.com',
          Password: 'test@123'
        })
        .expect(400)
        .end((err, res) => {
          expect((res.body.success)).to.equal(false)
          done(err)
        })
    })

    it('should throw error if password incorrect', done => {
      request.post(`${BASE_URI}`)
        .send({
          Email: 'testdev1@gmail.com',
          Password: 'pass123'
        })
        .expect(400)
        .end((err, res) => {
          expect((res.body.success)).to.equal(false)
          done(err)
        })
    })
  })
})

