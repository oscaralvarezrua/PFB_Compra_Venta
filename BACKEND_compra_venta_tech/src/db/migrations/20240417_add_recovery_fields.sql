-- Agregar campos para recuperación de contraseña
ALTER TABLE users
ADD COLUMN recovery_token VARCHAR(100) DEFAULT NULL,
ADD COLUMN recovery_expires DATETIME DEFAULT NULL;

-- Crear índice para búsquedas más rápidas
CREATE INDEX idx_recovery_token ON users(recovery_token); 