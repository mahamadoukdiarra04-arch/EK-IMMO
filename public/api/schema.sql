CREATE TABLE IF NOT EXISTS ekimmo_app_state (
  id VARCHAR(80) NOT NULL PRIMARY KEY,
  payload LONGTEXT NOT NULL,
  revision INT UNSIGNED NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS ekimmo_document_exports (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id VARCHAR(80) NULL,
  document_type VARCHAR(120) NOT NULL,
  file_name VARCHAR(220) NOT NULL,
  module VARCHAR(80) NOT NULL DEFAULT 'Docs',
  payload_json LONGTEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_document_exports_user (user_id),
  INDEX idx_document_exports_module (module),
  INDEX idx_document_exports_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
