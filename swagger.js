const swaggerAutogen = require('swagger-autogen')();

const outputFile = './src/config/swagger.json';
const endpointsFiles = ['./src/routes/route_default.js', './src/routes/user_route.js', './src/routes/blogPost_route.js', './src/routes/follow_route.js', './src/routes/reaction_route.js'];

const doc = {
  info: {
    title: 'TravelTales API',
    description: 'Auto-generated docs with swagger-autogen'
  },
  host: 'localhost:4000',
  basePath: '/travel-tales/api',
  schemes: ['http'],
  securityDefinitions: {
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'session'
    }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated successfully.');
});