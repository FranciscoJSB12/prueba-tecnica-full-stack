# Servicio rest con DB

Versión de Node usada: v22.14.0  
Versión de Nest CLI: v11.0.6

## Cómo levantar el proyecto en desarrollo

1. Instalar dependencias `npm install`.
2. Levantar base de datos mongoDB con docker `docker-compose up -d`.
3. Copiar y renombrar el archivo `.env.template` a `.env`.
4. Rellenar las variables `GMAIL_ADDRESS` con su correo gmail y para `GMAIL_APP_PASSWORD` debe crearse
   para su cuenta de gmail una password de aplicacion en `https://myaccount.google.com/apppasswords`, recuerde tener la verificacion en dos pasos activada. Por defecto deje `EMAIL_HOST` como se encuentra en el archivo `.env.template`.
5. En caso de tener conflicto con los puertos recuerde hacer la modificacion hacia donde apunta el servicio rest que no posee base de datos. Si la base de datos le genera conflicto, entonces puede cambiar el puerto hacia donde se mapea en arhico `docker-compose.yml`, recuerde tambien cambiar el puerto en la cadena de conexion.
6. Correr `npm run start:dev`
