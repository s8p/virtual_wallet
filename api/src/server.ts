import app from './app'
import AppDataSource from './data-source'
import dotenv from 'dotenv'
dotenv.config()

AppDataSource.initialize()
  .then(() => {
    console.log('💾 Database Connected')
    const port = process.env.PORT || 3000

    app.listen(port, () => {
      console.log(
        `🚀 App running on:\n>\t${
          process.env.API_URL || 'http://localhost:' + port
        }`
      )
    })
  })
  .catch((e) => console.error(e))
