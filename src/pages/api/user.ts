import db from "../../lib/couchdb"
import type { NextApiHandler } from 'next'
import { getToken } from "next-auth/jwt"
/* 


Goal: verify token and have idToken pass through here...

*/
const userHandler: NextApiHandler = async (request, response) => {
  const { query: { email }, method, body: { settings, vocabulary }, headers: { authorization } } = request

  console.log('api user endpoint')
  console.log(authorization)
  console.log(await getToken(req: request, secret: process.env.SECRET))

  if (!email) {
    return response.status(400).json({ error: 'incorrect request url query' })
  }

  if (method === "GET") {
    try {
      console.log('get API hit')
      const user = await db.get(email)

      return response.json(user)
    } catch (error) {
      return response.status(404).json({ error: 'failed to load data' })
    }
  }

  if (method === "POST") {
    try {
      console.log('post API hit')
      const user = await db.insert({ _id: email, settings: {}, vocabulary: [] })
      return response.json(user)
    } catch (error) {
      return response.status(404).json({ error: 'failed to load data' })
    }
  }

  if (method === "PUT") {
    try {
      const user = await db.get(email)
      // note: you need _rev in order for update to work! Without it, it will at first 
      // create the entity, but if you try to update later, it will throw error. 
      const updatedUser = await db.insert({ _id: user._id, _rev: user._rev, settings, vocabulary })

      return response.json(updatedUser)
    } catch (error) {
      return response.status(404).json({ error: 'failed to load data' })
    }
  }
}

export default userHandler
