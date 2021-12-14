const nano = require('nano')(process.env.COUCHDB_URL)
const db = nano.use('learners')

export default db