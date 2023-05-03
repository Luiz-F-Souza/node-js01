import { randomUUID } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'

export class Database {

  #database = {}
  dbPath = new URL('../db.json',import.meta.url)

  constructor(){
    const data = readFile(this.dbPath,"utf-8").then( (data) => {
      this.#database = JSON.parse(data)
    }).catch( () => {
      this.#persist()
    })
  }

  #persist(){
    writeFile(this.dbPath, JSON.stringify(this.#database))
  }

  select(tableName){
    const data = this.#database[tableName] ?? []

    return data
  }

  insert(tableName, data){

    
    data.id = randomUUID()
    
    if(this.#database[tableName]) this.#database[tableName].push(data)
    else this.#database[tableName] = [data]


    this.#persist()

    return(data)
  }
}