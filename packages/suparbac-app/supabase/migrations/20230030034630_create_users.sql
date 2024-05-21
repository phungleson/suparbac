/**
* This table contains extra user data for auth.users.
*/
CREATE TABLE users (
  id uuid NOT NULL PRIMARY KEY,
  -- Allows delete auth.users, but keep this data consistent.
  auth_user_id uuid REFERENCES auth.users ON DELETE SET NULL ON UPDATE SET NULL,
  email text NOT NULL,
  created_at timestamp WITHOUT TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX users_auth_user_id ON users (auth_user_id);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Can select own users" ON users FOR SELECT USING (
  (SELECT auth.uid()) = id
);

/**
* This trigger automatically creates a user when a new user signs up via Supabase Auth.
*/
CREATE FUNCTION public.create_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, auth_user_id, email)
  VALUES (new.id, new.id, new.email);
  RETURN new;
END;

$$ LANGUAGE plpgsql SECURITY definer;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR each ROW EXECUTE PROCEDURE public.create_user();
