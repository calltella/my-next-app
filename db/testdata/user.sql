

INSERT INTO user (
  id,
  email,
  name,
  avatar_url,
  password_hash,
  email_verified,
  is_active,
  role,
  updated_at,
  deleted_at
) VALUES
(
  'user_001',
  'alice@example.com',
  'Alice',
  'default.png',
  '$2b$10$Wqmu1QFRELZAMWh8/Fq57ONHNrpa/J.rqmtdxQ605x/4ebdJLElUq',
  datetime('now'),
  1,
  'user',
  datetime('now'),
  NULL
),
(
  'user_002',
  'bob@example.com',
  'Bob',
  'default.png',
  '$2b$10$Wqmu1QFRELZAMWh8/Fq57ONHNrpa/J.rqmtdxQ605x/4ebdJLElUq',
  datetime('now'),
  1,
  'admin',
  datetime('now'),
  NULL
),
(
  'user_003',
  'carol@example.com',
  'Carol',
  'default.png',
  '$2b$10$Wqmu1QFRELZAMWh8/Fq57ONHNrpa/J.rqmtdxQ605x/4ebdJLElUq',
  datetime('now'),
  1,
  'user',
  datetime('now'),
  NULL
),
(
  'user_004',
  'dave@example.com',
  'Dave',
  'default.png',
  '$2b$10$Wqmu1QFRELZAMWh8/Fq57ONHNrpa/J.rqmtdxQ605x/4ebdJLElUq',
  datetime('now'),
  0,
  'user',
  datetime('now'),
  NULL
),
(
  'user_005',
  'eve@example.com',
  'Eve',
  'default.png',
  '$2b$10$Wqmu1QFRELZAMWh8/Fq57ONHNrpa/J.rqmtdxQ605x/4ebdJLElUq',
  datetime('now'),
  1,
  'user',
  datetime('now'),
  NULL
);

INSERT INTO account (
  id,
  user_id,
  type,
  theme_mode,
  color_themes
) VALUES
(
  'account_001',
  'user_001',
  'basic',
  'default',
  'blue'
),
(
  'account_002',
  'user_002',
  'premium',  'default',
  'green'
),
(
  'account_003',
  'user_003',
  'basic',  'default',
  'purple'
),
(
  'account_004',
  'user_004',
  'basic',  'default',
  'default'
),
(
  'account_005',
  'user_005',
  'premium',  'default',
  'orange'
);
