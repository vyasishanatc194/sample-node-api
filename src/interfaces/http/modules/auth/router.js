const Status = require('http-status')
const { Router } = require('express')

module.exports = ({
  tokenPostUseCase,
  postUseCase,
  logger,
  auth,
  response: { Success, Fail },
}) => {
  const router = Router()

  /**
 * @swagger
 * definitions:
 *   auth:
 *     properties:
 *       email:
 *         type: string
 *       password:
 *         type: string
 */

  /**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Authenticate
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: User's credentials
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/auth'
 *     responses:
 *       200:
 *         description: Successfully login
 *       400:
 *         $ref: '#/responses/BadRequest'
 */
  router
    .post('/login', (req, res) => {
      tokenPostUseCase
        .validate({ body: req.body })
        .then((result) => {
          res.status(Status.OK).json(Success(result.data, result.message))
        })
        .catch((result) => {
          logger.error(result.error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(result.data, result.error))
        })
    })

  /**
 * @swagger
 * /users:
 *   put:
 *     tags:
 *       - Users
 *     description: Update User
 *     security:
 *       - JWT: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: User's ID to update
 *         type: string
 *       - name: body
 *         description: User's Entity
 *         in: body
 *         required: true
 *         type: string
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: Successfully Updated
 *         schema:
 *           $ref: '#/definitions/user'
 *       401:
 *         $ref: '#/responses/Unauthorized'
 *       400:
 *         $ref: '#/responses/BadRequest'
 */

  router
    .post('/change/password', auth.tokenAuthenticate, (req, res) => {
      postUseCase
        .changePassword({ user: req.user, body: req.body })
        .then(result => {
          res.status(Status.OK).json(Success(result.data, result.message))
        })
        .catch((result) => {
          logger.error(result.error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(result.data, result.error))
        })
    })

  /**
* @swagger
* /users:
*   put:
*     tags:
*       - Users
*     description: Update User
*     security:
*       - JWT: []
*     produces:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         required: true
*         description: User's ID to update
*         type: string
*       - name: body
*         description: User's Entity
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/user'
*     responses:
*       200:
*         description: Successfully Updated
*         schema:
*           $ref: '#/definitions/user'
*       401:
*         $ref: '#/responses/Unauthorized'
*       400:
*         $ref: '#/responses/BadRequest'
*/
  router
    .post('/reset/password', (req, res) => {
      postUseCase
        .resetPassword({ body: req.body })
        .then(result => {
          res.status(Status.OK).json(Success(result.data, result.message))
        })
        .catch((result) => {
          logger.error(result.error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(result.data, result.error))
        })
    })

  /**
* @swagger
* /users:
*   post:
*     tags:
*       - Users
*     description: Create new user
*     security:
*       - JWT: []
*     produces:
*       - application/json
*     parameters:
*       - name: body
*         description: User's Entity
*         in: body
*         required: true
*         type: string
*         schema:
*           $ref: '#/definitions/user'
*     responses:
*       200:
*         description: Successfully Created
*         schema:
*           $ref: '#/definitions/user'
*       401:
*         $ref: '#/responses/Unauthorized'
*       400:
*         $ref: '#/responses/BadRequest'
*/
  router
    .post('/forgot/password', (req, res) => {
      postUseCase
        .generateUrl({ body: req.body })
        .then(result => {
          res.status(Status.OK).json(Success(result.data, result.message))
        })
        .catch((result) => {
          logger.error(result.error) // we still need to log every error for debugging
          res.status(Status.BAD_REQUEST).json(
            Fail(result.data, result.error))
        })
    })
  return router
}
