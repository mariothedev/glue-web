import db from "../../lib/couchdb"
import type { NextApiHandler } from 'next'

const userHandler: NextApiHandler = async (request, response) => {
  const { query: { email }, method} = request

  if(method === "GET"){
    const doc = await db.get(email)
    return response.json(doc)
  }

  if(method === "POST"){
    await db.insert({ _id: email })
    const doc = await db.get(email)
    return response.json(doc)
  }

}

export default userHandler
