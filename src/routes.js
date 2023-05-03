import { Database } from "./database.js"

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: "/users",
    handler: (req, res) => {
      const usersTable = database.select('users')
      const usersTableAsJson = JSON.stringify(usersTable)
      
      return res.setHeader("Content-type", "application/json").end(usersTableAsJson)
    }
  },
  {
    method: 'POST',
    path: "/users",
    handler: (req, res) => {
      const responseFromDB = database.insert("users", req.body)

      return res.writeHead(201).end("Inserido com sucesso!")
    }
  }

]