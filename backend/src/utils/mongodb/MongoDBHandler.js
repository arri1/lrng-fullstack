const { MongoClient } = require('mongodb')
const { mongodb_uri } = require('../Constants')

class MongoDBHandler {
  constructor(uri) {
    this.uri = uri
    this.client = new MongoClient(uri)
  }

  async connect() {
    await this.client.connect()
  }

  async close() {
    await this.client.close()
  }

  async init() {
    try {
      await this.connect()
      console.log('Connected to MongoDB')
    } catch (error) {
      console.error('Error connecting to MongoDB:', error)
      process.exit(1)
    }
  }

  async getAllPosts() {
    try {
      await this.connect()
      const database = this.client.db('me_db')
      const posts = database.collection('posts')

      const postAnswerCursor = await posts.find()
      const postAnswer = await postAnswerCursor.toArray()

      return postAnswer
    } finally {
      await this.close()
    }
  }
}

module.exports = MongoDBHandler;
