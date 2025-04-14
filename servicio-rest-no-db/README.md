# Servicio rest sin DB

Versión de Node usada: v22.14.0  
Versión de Nest CLI: v11.0.6

## Cómo levantar el proyecto en desarrollo

1. Instalar dependencias `npm install`.
2. Copiar y renombrar el archivo `.env.template` a `.env`.
3. Mantener la configuracion del `env.template` ya que tiene todas variables configuradas por defecto, solo renombrar copiar y renombrar a `.env`. En caso de tener conflicto con los puertos cambie la variables de los mismos, tenga el cuidado de que si cambia el puerto de este aplicativo debe hacer
   la correcion en la url de frontend.
4. Correr `npm run start:dev`
