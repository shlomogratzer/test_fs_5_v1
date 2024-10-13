import  express  from "express";
import dotenv from 'dotenv'
import connectDB from './config/db'
import cookie from 'cookie-parser'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerui from 'swagger-ui-express'
import authRoute from './routes/authRoute'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cookie())

const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'score managment',
        version: '1.0.0',
      },
      servers:[
        {
            url:'http://localhost:3131'
        }
      ],
      components: {
        securitySchemes: {
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'auth_token',
                description: 'JWT token stored in a cookie',
            },
        },
    },
    security: [
        {
            cookieAuth: [],
        },
    ],
    },
    apis: ['./src/routes/*.ts'], // files containing annotations as above
  };
  
  const openapiSpecification = swaggerJsdoc(options);
  app.use('/api-docs', swaggerui.serve , swaggerui.setup(openapiSpecification))

connectDB()

app.use('/auth',authRoute)

const port = process.env.PORT || 3018

app.listen(port,()=>{
    console.log(`server is up and listen to port ${port}`);
    
})