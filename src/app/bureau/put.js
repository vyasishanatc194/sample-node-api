/**
 * this file will hold all the get use-case for bureau domain
 */
const { Bureau } = require('src/domain/bureau')

/**
  * function for getter bureau.
  */
module.exports = ({ bureauRepository }) => {
  // code for getting all the items
  const update = ({ id, body }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const bureau = Bureau(body)
        await bureauRepository.update(bureau, {
          where: { id }
        })

        resolve(bureau)
      } catch (error) {
        reject(error)
      }
    })
  }

  return {
    update
  }
}
