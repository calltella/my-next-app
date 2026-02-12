-- npx wrangler d1 execute vercel-apline --local --file=./db/testdata/user.sql
INSERT INTO user (
  id,
  email,
  name,
  avatar_url,
  password_hash,
  email_verified,
  is_active,
  role,
  created_at,
  updated_at
) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'admin@example.com',
  'Admin User',
  'default.png',
  'hashed_password_1',
  datetime('now'),
  1,
  'admin',
  datetime('now'),
  datetime('now')
),
(
  '22222222-2222-2222-2222-222222222222',
  'user1@example.com',
  'User One',
  'default.png',
  'hashed_password_2',
  datetime('now'),
  1,
  'user',
  datetime('now'),
  datetime('now')
),
(
  '33333333-3333-3333-3333-333333333333',
  'user2@example.com',
  'User Two',
  'default.png',
  'hashed_password_3',
  datetime('now'),
  1,
  'user',
  datetime('now'),
  datetime('now')
);

INSERT INTO account (
  id,
  user_id,
  type,
  color_thmemes
) VALUES
(
  'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
  '11111111-1111-1111-1111-111111111111',
  'personal',
  'purple'
),
(
  'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
  '22222222-2222-2222-2222-222222222222',
  'personal',
  'blue'
),
(
  'aaaaaaa3-aaaa-aaaa-aaaa-aaaaaaaaaaa3',
  '22222222-2222-2222-2222-222222222222',
  'business',
  'green'
),
(
  'aaaaaaa4-aaaa-aaaa-aaaa-aaaaaaaaaaa4',
  '33333333-3333-3333-3333-333333333333',
  'personal',
  'orange'
);