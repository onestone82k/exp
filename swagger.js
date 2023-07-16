const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc= require("swagger-jsdoc");

const options = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            version:"1.0.0",
            title:"test",
            description:"api 설명"
        },
        servers:[
            {
                url: 'http://localhost:3000'
            }
        ],
    },
    apis:['./routers/*.js','./routers/user/*.js']
}
const specs = swaggereJsdoc(options);
module.exports = {swaggerUi, specs};