import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'database.sqlite');
const db = new Database(dbPath);

// Initialize schema
db.exec(`
  CREATE TABLE IF NOT EXISTS slides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_url TEXT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    order_index INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS cases (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL, -- 'medical' or 'education'
    image_url TEXT NOT NULL,
    details TEXT,
    family_background TEXT,
    appeal TEXT,
    support_documents TEXT, -- JSON array of strings
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

export default db;

export interface Slide {
  id: number;
  image_url: string;
  title: string;
  subtitle: string;
  order_index: number;
}

export interface Case {
  id: number;
  name: string;
  slug: string;
  type: 'medical' | 'education';
  image_url: string;
  details: string;
  family_background: string;
  appeal: string;
  support_documents: string; // JSON string
  created_at: string;
}
