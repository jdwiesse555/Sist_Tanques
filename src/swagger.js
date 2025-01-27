
import swaggerAutogen from "swagger-autogen"

const outputFile = './swagger.json' 
const endPointsFile = ['./index.js']

const doc = {
    info: {
        title: 'API de Sistemas de Tanques',
        description:' Esta API permite gestionar el volumen de los tanques'
    },
    host: 'localhost:3000',
    schemes:['http']
    
}

swaggerAutogen()(outputFile,endPointsFile,doc);




