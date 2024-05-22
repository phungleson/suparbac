CREATE TABLE posts (
  id uuid NOT NULL PRIMARY KEY,
  name text NOT NULL,
  description text,
  content text,
  created_at timestamp WITHOUT TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
