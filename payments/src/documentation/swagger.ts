import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './payments.documentation.json';
import express from 'express';

const swaggerDocumentation = express.Router();

swaggerDocumentation.use('/api-docs', swaggerUi.serve);
swaggerDocumentation.get('/api-docs', swaggerUi.setup(swaggerDocument));

export default swaggerDocumentation;
