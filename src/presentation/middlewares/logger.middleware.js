export const loggerMiddleware = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] metodo: ${req.method} | ruta: ${req.url}`);
  next();
}