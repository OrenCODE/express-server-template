import swaggerUi from 'swagger-ui-express';
import swaggerAuthDocument from './auth.documentation.json';
import express from 'express';

const swaggerDocumentation = express.Router();

swaggerDocumentation.use('/api-docs', swaggerUi.serve);
swaggerDocumentation.get('/api-docs', swaggerUi.setup(swaggerAuthDocument));

export default swaggerDocumentation;
