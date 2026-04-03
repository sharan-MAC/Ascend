import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const db = new Database("ascend.db");

// Initialize Database Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    age INTEGER,
    gender TEXT,
    academic_level TEXT,
    target_exam TEXT,
    current_class TEXT,
    school_schedule TEXT, -- JSON
    coaching_hours TEXT, -- JSON
    sleep_pattern TEXT, -- JSON
    daily_availability INTEGER,
    weak_subjects TEXT, -- JSON
    strong_subjects TEXT, -- JSON
    lifestyle_habits TEXT, -- JSON
    emotional_baseline TEXT,
    bio TEXT,
    location TEXT,
    avatar_url TEXT,
    xp INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    streak INTEGER DEFAULT 0,
    shields INTEGER DEFAULT 3,
    guild TEXT,
    last_active TEXT
  );

  CREATE TABLE IF NOT EXISTS goals (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    title TEXT,
    roadmap TEXT, -- JSON
    status TEXT DEFAULT 'active', -- 'active', 'completed', 'archived'
    difficulty INTEGER, -- 1-5
    estimated_timeline TEXT,
    created_at TEXT
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    goal_id TEXT,
    title TEXT,
    description TEXT,
    type TEXT, -- 'study', 'revision', 'mock_test', 'exercise', 'wellness'
    scheduled_at TEXT,
    completed_at TEXT,
    status TEXT DEFAULT 'pending',
    mastery_pack TEXT -- JSON
  );

  CREATE TABLE IF NOT EXISTS focus_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    start_time TEXT,
    end_time TEXT,
    duration INTEGER,
    focus_score INTEGER,
    distractions INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    title TEXT,
    description TEXT,
    icon TEXT,
    unlocked_at TEXT
  );

  CREATE TABLE IF NOT EXISTS skill_tree (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    skill_name TEXT,
    level INTEGER DEFAULT 0,
    xp INTEGER DEFAULT 0,
    category TEXT -- 'Cognitive', 'Physical', 'Emotional', 'Technical'
  );

  CREATE TABLE IF NOT EXISTS meditations (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    duration INTEGER,
    category TEXT -- 'Stress', 'Focus', 'Sleep'
  );

  CREATE TABLE IF NOT EXISTS daily_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    date TEXT,
    mood TEXT,
    energy_level INTEGER,
    stress_level INTEGER
  );

  CREATE TABLE IF NOT EXISTS activity_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    activity_type TEXT, -- 'study_progress', 'reading', 'problem_solving', 'sleep', 'diet', 'social_media', 'task_completion'
    value REAL, -- e.g., pages read, problems solved, hours slept, calories, minutes on social media
    metadata TEXT, -- JSON for extra details
    timestamp TEXT
  );
`);

// Insert some default meditations if empty
const medCount = (db.prepare("SELECT COUNT(*) as count FROM meditations").get() as any).count;
if (medCount === 0) {
  const insertMed = db.prepare("INSERT INTO meditations (id, title, description, duration, category) VALUES (?, ?, ?, ?, ?)");
  insertMed.run("med1", "Zen Focus", "Clear your mind for deep work.", 10, "Focus");
  insertMed.run("med2", "Stress Dissolve", "Release tension after a long session.", 15, "Stress");
  insertMed.run("med3", "Deep Sleep", "Prepare your body for optimal recovery.", 20, "Sleep");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/user/:id", (req, res) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
    res.json(user || null);
  });

  app.post("/api/user", (req, res) => {
    const { 
      id, name, age, gender, academic_level, target_exam, current_class, 
      school_schedule, coaching_hours, sleep_pattern, daily_availability, 
      weak_subjects, strong_subjects, lifestyle_habits, emotional_baseline,
      bio, location, avatar_url
    } = req.body;
    
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO users (
        id, name, age, gender, academic_level, target_exam, current_class, 
        school_schedule, coaching_hours, sleep_pattern, daily_availability, 
        weak_subjects, strong_subjects, lifestyle_habits, emotional_baseline, 
        bio, location, avatar_url, last_active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `);
    
    stmt.run(
      id, name, age, gender, academic_level, target_exam, current_class, 
      JSON.stringify(school_schedule), JSON.stringify(coaching_hours), 
      JSON.stringify(sleep_pattern), daily_availability, 
      JSON.stringify(weak_subjects), JSON.stringify(strong_subjects), 
      JSON.stringify(lifestyle_habits), emotional_baseline,
      bio, location, avatar_url
    );
    res.json({ success: true });
  });
  
  app.patch("/api/user/:id", (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
    const allowedUpdates = ['name', 'bio', 'location', 'avatar_url', 'target_exam', 'academic_level'];
    const keys = Object.keys(updates).filter(k => allowedUpdates.includes(k));
    
    if (keys.length === 0) return res.status(400).json({ error: "No valid updates provided" });
    
    const setClause = keys.map(k => `${k} = ?`).join(', ');
    const values = keys.map(k => updates[k]);
    
    try {
      db.prepare(`UPDATE users SET ${setClause} WHERE id = ?`).run(...values, id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/tasks/:userId", (req, res) => {
    const tasks = db.prepare("SELECT * FROM tasks WHERE user_id = ? ORDER BY scheduled_at ASC").all(req.params.userId);
    res.json(tasks.map(t => ({ ...t, mastery_pack: t.mastery_pack ? JSON.parse(t.mastery_pack) : null })));
  });

  app.post("/api/tasks/complete", (req, res) => {
    const { taskId, userId, xpGain } = req.body;
    db.prepare("UPDATE tasks SET status = 'completed', completed_at = datetime('now') WHERE id = ?").run(taskId);
    db.prepare("UPDATE users SET xp = xp + ?, last_active = datetime('now') WHERE id = ?").run(xpGain, userId);
    res.json({ success: true });
  });

  // Save Roadmap (Generated on Frontend)
  app.post("/api/goals/save", async (req, res) => {
    const { userId, roadmap } = req.body;
    const data = roadmap;
    
    const goalId = Math.random().toString(36).substring(7);
    db.prepare("INSERT INTO goals (id, user_id, title, roadmap, difficulty, estimated_timeline, created_at) VALUES (?, ?, ?, ?, ?, ?, datetime('now'))")
      .run(goalId, userId, data.title, JSON.stringify(data.milestones), data.difficulty, data.estimated_timeline);

    // Create initial tasks from roadmap
    data.milestones.forEach((milestone: any, idx: number) => {
      milestone.tasks.forEach((task: any, tIdx: number) => {
        const taskId = Math.random().toString(36).substring(7);
        db.prepare(`
          INSERT INTO tasks (id, user_id, goal_id, title, description, type, scheduled_at)
          VALUES (?, ?, ?, ?, ?, ?, datetime('now', '+${idx * 7 + tIdx} days'))
        `).run(taskId, userId, goalId, task.title, task.description, task.type);
      });
    });

    res.json({ goalId, roadmap: data });
  });

  // Save Mastery Pack (Generated on Frontend)
  app.post("/api/tasks/mastery-pack/save", async (req, res) => {
    const { taskId, pack } = req.body;
    db.prepare("UPDATE tasks SET mastery_pack = ? WHERE id = ?").run(JSON.stringify(pack), taskId);
    res.json({ success: true });
  });

  // Fetch User Context for AI (Frontend will use this)
  app.get("/api/ai/context/:userId", (req, res) => {
    const { userId } = req.params;
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const tasks = db.prepare("SELECT * FROM tasks WHERE user_id = ? AND status = 'pending' AND date(scheduled_at) = date('now')").all(userId);
    const recentActivities = db.prepare("SELECT * FROM activity_logs WHERE user_id = ? AND timestamp > datetime('now', '-24 hours')").all(userId);

    res.json({ user, tasks, recentActivities });
  });

  // Save Focus Session
  app.post("/api/focus/session", (req, res) => {
    const { userId, duration, score, distractions } = req.body;
    const id = Math.random().toString(36).substring(7);
    db.prepare(`
      INSERT INTO focus_sessions (id, user_id, start_time, end_time, duration, focus_score, distractions)
      VALUES (?, ?, datetime('now', '-${duration} seconds'), datetime('now'), ?, ?, ?)
    `).run(id, userId, duration, score, distractions);
    
    // Reward XP for focus
    const xpGain = Math.floor(duration / 60) * 2 + (score > 80 ? 50 : 0);
    db.prepare("UPDATE users SET xp = xp + ? WHERE id = ?").run(xpGain, userId);
    
    res.json({ success: true, xpGain });
  });

  // Save Daily Check-in
  app.post("/api/daily-checkin", (req, res) => {
    const { userId, mood, energy, stress } = req.body;
    const id = Math.random().toString(36).substring(7);
    db.prepare(`
      INSERT INTO daily_logs (id, user_id, date, mood, energy_level, stress_level)
      VALUES (?, ?, date('now'), ?, ?, ?)
    `).run(id, userId, mood, energy, stress);
    
    db.prepare("UPDATE users SET last_active = datetime('now'), emotional_baseline = ? WHERE id = ?").run(mood, userId);
    
    res.json({ success: true });
  });

  // Join Guild
  app.post("/api/guild/join", (req, res) => {
    const { userId, guildName } = req.body;
    db.prepare("UPDATE users SET guild = ? WHERE id = ?").run(guildName, userId);
    res.json({ success: true });
  });

  // Get Meditations
  app.get("/api/meditations", (req, res) => {
    const meds = db.prepare("SELECT * FROM meditations").all();
    res.json(meds);
  });

  // Get Achievements
  app.get("/api/achievements/:userId", (req, res) => {
    const achievements = db.prepare("SELECT * FROM achievements WHERE user_id = ?").all(req.params.userId);
    res.json(achievements);
  });

  // Get Skill Tree
  app.get("/api/skills/:userId", (req, res) => {
    const skills = db.prepare("SELECT * FROM skill_tree WHERE user_id = ?").all(req.params.userId);
    res.json(skills);
  });

  // Get Leaderboard
  app.get("/api/leaderboard", (req, res) => {
    const leaderboard = db.prepare("SELECT name, level, xp, guild FROM users ORDER BY xp DESC LIMIT 10").all();
    res.json(leaderboard);
  });

  // Get User Goals
  app.get("/api/goals/:userId", (req, res) => {
    const goals = db.prepare("SELECT * FROM goals WHERE user_id = ?").all(req.params.userId);
    res.json(goals);
  });

  // Switch Active Goal
  app.post("/api/goals/switch", (req, res) => {
    const { userId, goalId } = req.body;
    db.prepare("UPDATE goals SET status = 'archived' WHERE user_id = ? AND status = 'active'").run(userId);
    db.prepare("UPDATE goals SET status = 'active' WHERE id = ?").run(goalId);
    res.json({ success: true });
  });

  // Activity Logging
  app.post("/api/activity/log", (req, res) => {
    const { userId, activityType, value, metadata } = req.body;
    const id = Math.random().toString(36).substring(7);
    db.prepare(`
      INSERT INTO activity_logs (id, user_id, activity_type, value, metadata, timestamp)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `).run(id, userId, activityType, value, JSON.stringify(metadata || {}));
    
    // Reward small XP for logging
    db.prepare("UPDATE users SET xp = xp + 5 WHERE id = ?").run(userId);
    
    res.json({ success: true });
  });

  app.get("/api/activity/stats/:userId", (req, res) => {
    const stats = db.prepare(`
      SELECT activity_type, SUM(value) as total_value, COUNT(*) as count 
      FROM activity_logs 
      WHERE user_id = ? AND date(timestamp) = date('now')
      GROUP BY activity_type
    `).all(req.params.userId);
    res.json(stats);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ASCEND Protocol active on http://localhost:${PORT}`);
  });
}

startServer();
