const swaggerJsDoc=require("swagger-jsdoc");
const option={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"API",
            version:"1.0.0",
            description:"API for the application"
        },
        servers:[
            {
                url:"https://sitandlipapi.onrender.com"
            }
        ]
    },
    apis:["src/api/v1/routes/**/*.js"]  
};

const specs=swaggerJsDoc(option);
module.exports=specs;
