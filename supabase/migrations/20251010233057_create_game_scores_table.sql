/*
  # Create Game Scores Table

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Unique user identifier
      - `wallet_address` (text, unique) - User's wallet address
      - `username` (text) - User's display name
      - `highest_score` (integer) - User's highest single game score
      - `total_accumulated_score` (integer) - Sum of all game scores
      - `games_played` (integer) - Total number of games played
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `game_scores`
      - `id` (uuid, primary key) - Unique score entry identifier
      - `user_id` (uuid, foreign key) - Reference to users table
      - `wallet_address` (text) - User's wallet address for quick lookup
      - `score` (integer) - Score achieved in the game
      - `played_at` (timestamptz) - When the game was played
      - `game_duration` (integer) - Optional game duration in seconds
  
  2. Security
    - Enable RLS on both tables
    - Users can read their own data
    - Users can insert their own game scores
    - Users can read their own game score history
  
  3. Indexes
    - Index on wallet_address for fast lookups
    - Index on user_id for game_scores queries
    - Index on played_at for sorting recent games
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text UNIQUE NOT NULL,
  username text NOT NULL,
  highest_score integer DEFAULT 0,
  total_accumulated_score integer DEFAULT 0,
  games_played integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS game_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  wallet_address text NOT NULL,
  score integer NOT NULL DEFAULT 0,
  played_at timestamptz DEFAULT now(),
  game_duration integer DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_users_wallet ON users(wallet_address);
CREATE INDEX IF NOT EXISTS idx_game_scores_user ON game_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_game_scores_wallet ON game_scores(wallet_address);
CREATE INDEX IF NOT EXISTS idx_game_scores_played_at ON game_scores(played_at DESC);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'wallet_address' = wallet_address);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'wallet_address' = wallet_address)
  WITH CHECK (auth.jwt() ->> 'wallet_address' = wallet_address);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'wallet_address' = wallet_address);

CREATE POLICY "Users can read own game scores"
  ON game_scores FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'wallet_address' = wallet_address);

CREATE POLICY "Users can insert own game scores"
  ON game_scores FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'wallet_address' = wallet_address);

CREATE POLICY "Allow anonymous users to read all profiles"
  ON users FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous users to insert profiles"
  ON users FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anonymous users to update profiles"
  ON users FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anonymous users to read all game scores"
  ON game_scores FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anonymous users to insert game scores"
  ON game_scores FOR INSERT
  TO anon
  WITH CHECK (true);