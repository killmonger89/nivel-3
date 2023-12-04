    // Importar el módulo 'express' para crear un servidor web
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const crypto = require('crypto');
    const tokenService = require('./tokenService');
    const PrecioMaterial = require('./models/PrecioMaterial');
    
    // Importar el módulo 'body-parser' para parsear los cuerpos de las solicitudes HTTP
    const bodyParser = require('body-parser');
    
    // Crear una instancia de la aplicación Express
    const app = express();
    
    const { swaggerSpec, swaggerUi } = require(''); // Ajusta la ruta según tu estructura de carpetas
    
    // Utilizar el middleware 'body-parser' para parsear el cuerpo de las solicitudes JSON
    app.use(bodyParser.json());
    
    //Genera Clave Secreta
    const secretKey = 'cl@veRetoTecnicoNiv2';
    
    //funciones para generar y verificar tokens JWT
    const generateToken = (payload) => {
        return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Expira en 1 hora
      };
      
      const verifyToken = (token) => {
        try {
          return jwt.verify(token, secretKey);
        } catch (error) {
          return null;
        }
      };

// Ruta para servir la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.post('/calcular-prestamo', async (req, res) => {
  
// Importar la conexión a la base de datos desde db.js
const db = require('./db');

// Configurar la conexión a la base de datos
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
  
  // Iniciar tu servidor Express después de que se haya conectado a la base de datos
  app.listen(3000, () => {
    console.log('Servidor en ejecución en el puerto 3000');
  });
});

// Definir la tabla de precios por material
const preciosPorMaterial = {
  '001': 1500.00,
  '002': 1000.00,
  '003': 800.00,
  '004': 500.00,
  '005': 300.00,
  '006': 200.00,
  '007': 100.00,
};

// Definir la función que se ejecutará en Google Cloud Functions
exports.calcularPrestamo = async (req, res) => {
    const secretKey = tokenService.generateKey();
    const token = tokenService.generateToken({ userId: 'usuario123' }, secretKey);
   
    try {
        // Verificar la existencia del token en el encabezado de la solicitud
        const token = req.headers.authorization;
        if (!token) {
          return res.status(401).json({ error: 'Token no proporcionado' });
        }
    
        // Verificar el token y extraer la información del usuario
        const userData = verifyToken(token);
        if (!userData) {
          return res.status(401).json({ error: 'Token inválido' });
        }
  
     // Extraer el ID del material y el peso en gramos de la solicitud
    const { idMaterial, pesoGramos } = req.body;

   // Buscar el precio del material en la base de datos
   const precioMaterial = await PrecioMaterial.findOne({ materialId: idMaterial });

   // Verificar si el material existe en la base de datos
   if (!precioMaterial) {
     return res.status(400).json({ error: 'Material no válido' });
   }
    // Calcular el monto del préstamo utilizando el precio de la base de datos
    const montoPrestamo = (pesoGramos * precioMaterial.precio) * 0.8;

    // Enviar la respuesta con el monto del préstamo calculado
    res.status(200).json({ montoPrestamo });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error interno del servidor');
  }
};
  });
  
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});