/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Zap, 
  Target, 
  Calendar, 
  BarChart3, 
  BookOpen, 
  Mic2, 
  Timer, 
  Settings, 
  ChevronRight, 
  Award, 
  Flame,
  Brain,
  Activity,
  User,
  CheckCircle2,
  Lock,
  ArrowRight,
  Plus,
  LayoutDashboard,
  Store,
  MessageSquare,
  Users,
  Mic,
  Play,
  X,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
interface UserProfile {
  id: string;
  name: string;
  age: number;
  academic_level: string;
  target_exam: string;
  bio?: string;
  location?: string;
  avatar_url?: string;
  xp: number;
  level: number;
  streak: number;
  guild?: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  scheduled_at: string;
  mastery_pack?: any;
}

// --- Components ---

const Onboarding = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    location: '',
    age: '',
    gender: '',
    academic_level: 'High School',
    target_exam: 'NEET',
    current_class: '',
    school_schedule: '',
    coaching_hours: '',
    sleep_pattern: '11PM - 6AM',
    daily_availability: 8,
    weak_subjects: '',
    strong_subjects: '',
    lifestyle_habits: '',
    emotional_baseline: 'Stable'
  });

  const steps = [
    { title: "Identity", fields: ["name", "age", "gender"] },
    { title: "Ambition", fields: ["academic_level", "target_exam", "current_class"] },
    { title: "Schedule", fields: ["school_schedule", "coaching_hours", "daily_availability", "sleep_pattern"] },
    { title: "Analysis", fields: ["weak_subjects", "strong_subjects", "lifestyle_habits", "emotional_baseline"] }
  ];

  const handleNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Shield className="text-black w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">ASCEND PROTOCOL</h1>
            <p className="text-xs text-white/40 uppercase tracking-widest">Initialization Phase</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((s, i) => (
              <div key={i} className={`h-1 flex-1 mx-1 rounded-full ${i <= step ? 'bg-emerald-500' : 'bg-white/10'}`} />
            ))}
          </div>
          <h2 className="text-2xl font-semibold mb-2">{steps[step].title}</h2>
          <p className="text-white/60 text-sm">Configure your optimization parameters.</p>
        </div>

        <div className="space-y-4 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {step === 0 && (
            <>
              <input 
                placeholder="Full Name" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
              <textarea 
                placeholder="Short Bio (Your Mission)" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-colors h-24 resize-none"
                value={formData.bio}
                onChange={e => setFormData({...formData, bio: e.target.value})}
              />
              <input 
                placeholder="Location (e.g. New Delhi, India)" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-colors"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="number"
                  placeholder="Age" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-colors"
                  value={formData.age}
                  onChange={e => setFormData({...formData, age: e.target.value})}
                />
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-colors"
                  value={formData.gender}
                  onChange={e => setFormData({...formData, gender: e.target.value})}
                >
                  <option value="">Gender (Optional)</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-colors"
                  value={formData.academic_level}
                  onChange={e => setFormData({...formData, academic_level: e.target.value})}
                >
                  <option>High School</option>
                  <option>Undergraduate</option>
                  <option>Postgraduate</option>
                </select>
                <select 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-colors"
                  value={formData.target_exam}
                  onChange={e => setFormData({...formData, target_exam: e.target.value})}
                >
                  <option>NEET</option>
                  <option>JEE</option>
                  <option>UPSC</option>
                  <option>GATE</option>
                  <option>AIIMS</option>
                  <option>Custom</option>
                </select>
              </div>
              <input 
                placeholder="Current Class / Degree" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-colors"
                value={formData.current_class}
                onChange={e => setFormData({...formData, current_class: e.target.value})}
              />
            </>
          )}
          {step === 2 && (
            <>
              <input 
                placeholder="School/College Schedule (e.g. 8AM - 2PM)" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-colors"
                value={formData.school_schedule}
                onChange={e => setFormData({...formData, school_schedule: e.target.value})}
              />
              <input 
                placeholder="Coaching Hours (e.g. 4PM - 7PM)" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-colors"
                value={formData.coaching_hours}
                onChange={e => setFormData({...formData, coaching_hours: e.target.value})}
              />
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase">Daily Availability (Hours)</label>
                <input 
                  type="range" min="1" max="16"
                  className="w-full accent-emerald-500"
                  value={formData.daily_availability}
                  onChange={e => setFormData({...formData, daily_availability: parseInt(e.target.value)})}
                />
                <div className="text-right text-emerald-500 font-mono">{formData.daily_availability}h</div>
              </div>
              <input 
                placeholder="Sleep Pattern (e.g. 11PM - 6AM)" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-colors"
                value={formData.sleep_pattern}
                onChange={e => setFormData({...formData, sleep_pattern: e.target.value})}
              />
            </>
          )}
          {step === 3 && (
            <>
              <textarea 
                placeholder="Weak Subjects" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 h-20 focus:outline-none focus:border-emerald-500 transition-colors"
                value={formData.weak_subjects}
                onChange={e => setFormData({...formData, weak_subjects: e.target.value})}
              />
              <textarea 
                placeholder="Strong Subjects" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 h-20 focus:outline-none focus:border-emerald-500 transition-colors"
                value={formData.strong_subjects}
                onChange={e => setFormData({...formData, strong_subjects: e.target.value})}
              />
              <textarea 
                placeholder="Lifestyle Habits" 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 h-20 focus:outline-none focus:border-emerald-500 transition-colors"
                value={formData.lifestyle_habits}
                onChange={e => setFormData({...formData, lifestyle_habits: e.target.value})}
              />
              <select 
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:border-emerald-500 transition-colors"
                value={formData.emotional_baseline}
                onChange={e => setFormData({...formData, emotional_baseline: e.target.value})}
              >
                <option>Stable</option>
                <option>Anxious</option>
                <option>Stressed</option>
                <option>Highly Motivated</option>
              </select>
            </>
          )}
        </div>

        <button 
          onClick={handleNext}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          {step === steps.length - 1 ? 'ACTIVATE PROTOCOL' : 'NEXT PHASE'}
          <ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
    </div>
  );
};

const LogActivityModal = ({ onClose, onLog }: { onClose: () => void, onLog: (data: any) => void }) => {
  const [activityType, setActivityType] = useState('study_progress');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');

  const activities = [
    { id: 'study_progress', label: 'Study Progress', unit: '%', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'reading', label: 'Reading', unit: 'Pages', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'problem_solving', label: 'Problem Solving', unit: 'Problems', icon: <Target className="w-4 h-4" /> },
    { id: 'sleep', label: 'Sleep', unit: 'Hours', icon: <Activity className="w-4 h-4" /> },
    { id: 'diet', label: 'Diet', unit: 'Calories', icon: <Activity className="w-4 h-4" /> },
    { id: 'social_media', label: 'Social Media', unit: 'Minutes', icon: <Activity className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-md w-full"
      >
        <h3 className="text-xl font-bold mb-6">Log Activity</h3>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {activities.map(a => (
            <button
              key={a.id}
              onClick={() => setActivityType(a.id)}
              className={`flex items-center gap-2 p-3 rounded-xl border text-xs transition-all ${activityType === a.id ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/10'}`}
            >
              {a.icon}
              {a.label}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-[10px] text-white/40 uppercase font-bold mb-2 block">Value ({activities.find(a => a.id === activityType)?.unit})</label>
            <input 
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500"
              placeholder="Enter value..."
            />
          </div>
          <div>
            <label className="text-[10px] text-white/40 uppercase font-bold mb-2 block">Notes (Optional)</label>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-emerald-500 h-20"
              placeholder="Any extra context?"
            />
          </div>
        </div>
        <div className="flex gap-3 mt-8">
          <button onClick={onClose} className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-bold text-sm">CANCEL</button>
          <button 
            onClick={() => onLog({ activityType, value: parseFloat(value), metadata: { notes } })}
            className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-black py-3 rounded-xl font-bold text-sm"
          >
            LOG ACTIVITY
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ user, tasks, onCompleteTask, onStartFocus, onOpenMastery, onVoiceBriefing, isBriefingLoading, onSwitchGoal, userGoals, onLogActivity, activityStats }: any) => {
  const completedTasks = tasks.filter((t: any) => t.status === 'completed').length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  const [mentorInput, setMentorInput] = useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left Column: Stats & Profile */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-black shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              {user.name[0]}
            </div>
            <div>
              <h3 className="font-bold text-lg">{user.name}</h3>
              <p className="text-xs text-white/40 uppercase tracking-wider">Level {user.level} Strategist</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-4">
              <div className="flex justify-between text-xs text-white/40 mb-2">
                <span>XP PROGRESS</span>
                <span>{user.xp} / {(user.level * 1000)}</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000" 
                  style={{ width: `${(user.xp / (user.level * 1000)) * 100}%` }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                <Flame className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                <div className="text-lg font-bold">{user.streak}</div>
                <div className="text-[10px] text-white/40 uppercase">Streak</div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                <Award className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                <div className="text-lg font-bold">{user.shields || 3}</div>
                <div className="text-[10px] text-white/40 uppercase">Shields</div>
              </div>
            </div>
          </div>
        </div>

        {userGoals && userGoals.length > 1 && (
          <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Active Protocols</h4>
            <div className="space-y-2">
              {userGoals.map((g: any) => (
                <button 
                  key={g.id}
                  onClick={() => onSwitchGoal(g.id)}
                  className={`w-full text-left p-3 rounded-xl border text-xs transition-all ${g.status === 'active' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'}`}
                >
                  {g.title}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
          <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Biometric Status</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Brain className="w-4 h-4 text-purple-400" />
                <span>Focus Score</span>
              </div>
              <span className="font-mono text-emerald-400">88%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Activity className="w-4 h-4 text-blue-400" />
                <span>Energy Level</span>
              </div>
              <span className="font-mono text-yellow-400">High</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Hydration</span>
              </div>
              <span className="font-mono text-blue-400">Optimal</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Mic className="w-4 h-4 text-black" />
            </div>
            <h4 className="text-sm font-bold">Mentor Briefing</h4>
          </div>
          <p className="text-xs text-white/60 mb-4 leading-relaxed">Get your daily strategic overview and motivational boost from the ASCEND AI.</p>
          <button 
            onClick={onVoiceBriefing}
            disabled={isBriefingLoading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-500/50 text-black text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isBriefingLoading ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <Play className="w-3 h-3 fill-current" />
                INITIALIZE BRIEFING
              </>
            )}
          </button>
        </div>
      </div>

      {/* Middle Column: Schedule & Execution */}
      <div className="lg:col-span-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Execution Protocol</h2>
            <p className="text-xs text-white/40 mt-1">Protocol Progress: {Math.round(progress)}%</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onLogActivity}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              LOG ACTIVITY
            </button>
            <button 
              onClick={onStartFocus}
              className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
            >
              <Timer className="w-4 h-4" />
              START FOCUS SESSION
            </button>
          </div>
        </div>

        {activityStats && activityStats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {activityStats.map((stat: any) => (
              <div key={stat.activity_type} className="bg-[#111] border border-white/5 rounded-2xl p-4">
                <div className="text-[10px] text-white/40 uppercase font-bold mb-1">{stat.activity_type.replace('_', ' ')}</div>
                <div className="text-lg font-bold text-emerald-500">{stat.total_value}</div>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="bg-[#111] border border-white/5 rounded-2xl p-12 text-center">
              <Target className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <p className="text-white/40">No active tasks. Initialize a goal from the Store.</p>
            </div>
          ) : tasks.map((task: any) => (
            <motion.div 
              key={task.id}
              layout
              className={`group bg-[#111] border ${task.status === 'completed' ? 'border-emerald-500/20 opacity-60' : 'border-white/10'} rounded-2xl p-5 hover:border-white/20 transition-all`}
            >
              <div className="flex items-start gap-4">
                <button 
                  onClick={() => onCompleteTask(task.id)}
                  className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    task.status === 'completed' 
                    ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                    : 'border-white/20 hover:border-emerald-500'
                  }`}
                >
                  {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-black" />}
                </button>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold ${task.status === 'completed' ? 'line-through text-white/40' : ''}`}>
                        {task.title}
                      </h3>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded border ${
                        task.type === 'study' ? 'border-blue-500/30 text-blue-400' :
                        task.type === 'revision' ? 'border-purple-500/30 text-purple-400' :
                        task.type === 'mock_test' ? 'border-red-500/30 text-red-400' :
                        task.type === 'wellness' ? 'border-emerald-500/30 text-emerald-400' :
                        task.type === 'meal' ? 'border-orange-500/30 text-orange-400' :
                        'border-white/30 text-white/40'
                      } uppercase font-bold`}>
                        {task.type || 'study'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white/30 uppercase">
                      {new Date(task.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-white/50 mb-4">{task.description}</p>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => onOpenMastery(task)}
                      className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all"
                    >
                      <Brain className="w-3 h-3 text-emerald-400" />
                      {task.type === 'study' ? 'MASTER TOPIC' : 'EXECUTE TASK'}
                    </button>
                    {task.mastery_pack && (
                      <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Pack Generated
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Column: AI Mentor & Insights */}
      <div className="lg:col-span-3 space-y-6">
        <button 
          onClick={onVoiceBriefing}
          disabled={isBriefingLoading}
          className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 flex items-center justify-center gap-3 transition-all group disabled:opacity-50"
        >
          <Mic2 className={`w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform ${isBriefingLoading ? 'animate-pulse' : ''}`} />
          <span className="text-sm font-bold uppercase tracking-widest">
            {isBriefingLoading ? 'Preparing Briefing...' : 'Voice Mentor Briefing'}
          </span>
        </button>

        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 h-[400px] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <h4 className="text-xs font-bold text-white/40 uppercase tracking-widest">AI Mentor Active</h4>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 custom-scrollbar">
            <div className="bg-white/5 rounded-xl p-3 text-sm border-l-2 border-emerald-500">
              "Good morning, {user.name}. Your energy levels are optimal. I've prioritized your {user.target_exam} prep for today. Let's maintain the streak."
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-sm border-l-2 border-purple-500">
              "I've analyzed your weak subjects: {user.weak_subjects}. I'm adjusting your schedule to include more revision blocks for these."
            </div>
          </div>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (mentorInput) {
                // In a real app, this would trigger a chat interaction
                setMentorInput('');
                alert("ASCEND Mentor: 'I am processing your request. Let's stay focused on the current protocol.'");
              }
            }}
            className="relative"
          >
            <input 
              value={mentorInput}
              onChange={(e) => setMentorInput(e.target.value)}
              placeholder="Ask your mentor..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 pr-10 text-sm focus:outline-none focus:border-emerald-500"
            />
            <button type="submit" className="absolute right-3 top-3">
              <ArrowRight className="w-4 h-4 text-white/40 hover:text-emerald-500 transition-colors" />
            </button>
          </form>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6">
          <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">Readiness Prediction</h4>
          <div className="text-3xl font-bold mb-2">74%</div>
          <p className="text-xs text-white/40">Based on current mastery and consistency. You are on track for top 5% percentile.</p>
        </div>
      </div>
    </div>
  );
};

const GoalStore = ({ onActivate }: { onActivate: (goal: string) => void }) => {
  const [customGoal, setCustomGoal] = useState('');
  const exams = [
    { id: 'neet', name: 'NEET', desc: 'Medical entrance mastery path.', difficulty: 5, timeline: '12 Months' },
    { id: 'jee', name: 'JEE', desc: 'Engineering excellence roadmap.', difficulty: 5, timeline: '12 Months' },
    { id: 'upsc', name: 'UPSC', desc: 'Civil services strategic prep.', difficulty: 5, timeline: '24 Months' },
    { id: 'gate', name: 'GATE', desc: 'Technical mastery for engineers.', difficulty: 4, timeline: '8 Months' },
    { id: 'aiims', name: 'AIIMS', desc: 'Elite medical preparation.', difficulty: 5, timeline: '12 Months' },
    { id: 'gmat', name: 'GMAT', desc: 'Global management aptitude.', difficulty: 3, timeline: '4 Months' },
  ];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Goal Store</h2>
          <p className="text-white/40">Curated high-performance execution frameworks.</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-xl text-emerald-500 text-sm font-bold">
          PREMIUM ACCESS ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map(exam => (
          <div key={exam.id} className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 transition-all group flex flex-col">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 transition-all">
              <Target className="w-6 h-6 text-white/40 group-hover:text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">{exam.name} Protocol</h3>
            <p className="text-sm text-white/40 mb-6 flex-1">{exam.desc}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-white/30 uppercase">Difficulty</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-3 h-1 rounded-full ${i < exam.difficulty ? 'bg-emerald-500' : 'bg-white/10'}`} />
                  ))}
                </div>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/30 uppercase">Timeline</span>
                <span className="text-white/60 font-mono">{exam.timeline}</span>
              </div>
            </div>

            <button 
              onClick={() => onActivate(exam.name)}
              className="w-full py-3 bg-white/5 hover:bg-emerald-500 hover:text-black font-bold rounded-xl transition-all"
            >
              ACTIVATE PROTOCOL
            </button>
          </div>
        ))}
      </div>

      <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
        <h3 className="text-xl font-bold mb-2">Custom Goal Board</h3>
        <p className="text-sm text-white/40 mb-6">Define your own ambition. ASCEND will convert it into a structured execution framework.</p>
        <div className="flex gap-4">
          <input 
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
            placeholder="e.g. Master Full-Stack Development in 6 months..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500 transition-all"
          />
          <button 
            onClick={() => { if(customGoal) onActivate(customGoal); setCustomGoal(''); }}
            className="bg-emerald-500 text-black font-bold px-8 rounded-2xl hover:bg-emerald-400 transition-all"
          >
            GENERATE
          </button>
        </div>
      </div>
    </div>
  );
};

const Leaderboard = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/leaderboard').then(res => res.json()).then(setData);
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-purple-500">Global Strategists</h2>
        <p className="text-white/40">The top performers in the ASCEND ecosystem.</p>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="p-6 text-xs font-bold text-white/40 uppercase tracking-widest">Rank</th>
              <th className="p-6 text-xs font-bold text-white/40 uppercase tracking-widest">Strategist</th>
              <th className="p-6 text-xs font-bold text-white/40 uppercase tracking-widest">Cluster</th>
              <th className="p-6 text-xs font-bold text-white/40 uppercase tracking-widest">Level</th>
              <th className="p-6 text-xs font-bold text-white/40 uppercase tracking-widest">Total XP</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, i) => (
              <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-all">
                <td className="p-6 font-mono text-emerald-500">#{i + 1}</td>
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-500 font-bold">
                      {entry.name[0]}
                    </div>
                    <span className="font-bold">{entry.name}</span>
                  </div>
                </td>
                <td className="p-6 text-white/60">{entry.guild || 'Independent'}</td>
                <td className="p-6 font-mono">Lvl {entry.level}</td>
                <td className="p-6 font-mono text-emerald-400">{entry.xp.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AITutor = ({ user, onSpeak }: { user: any, onSpeak: (text: string) => void }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: `Greetings, ${user.name}. I am your ASCEND Strategist. How can I assist your execution today?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are the ASCEND AI Strategist, a high-performance mentor. 
          User Profile: ${JSON.stringify(user)}.
          Your goal is to help the user master their target exam (${user.target_exam}) through disciplined execution, cognitive clarity, and emotional resilience.
          Be concise, technical when needed, and always focus on actionable strategy.`,
        },
      });

      const response = await chat.sendMessage({ message: userMessage });
      setMessages(prev => [...prev, { role: 'ai', text: response.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Cognitive link disrupted. Please retry." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#111] border border-white/10 rounded-3xl flex flex-col h-[600px] overflow-hidden">
      <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <Brain className="text-emerald-500 w-6 h-6" />
          <h2 className="text-xl font-bold">AI Strategist</h2>
        </div>
        <div className="text-[10px] text-emerald-500 font-mono animate-pulse">COGNITIVE_LINK: ACTIVE</div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`relative group max-w-[80%] p-4 rounded-2xl text-sm ${
              m.role === 'user' ? 'bg-emerald-500 text-black font-medium' : 'bg-white/5 border border-white/10 text-white/80'
            }`}>
              {m.text}
              {m.role === 'ai' && (
                <button 
                  onClick={() => onSpeak(m.text)}
                  className="absolute -right-10 top-2 opacity-0 group-hover:opacity-100 transition-all text-white/20 hover:text-emerald-500"
                >
                  <Mic className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white/5 border-t border-white/5 flex gap-4">
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about syllabus, strategy, or concepts..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
        />
        <button 
          onClick={handleSend}
          className="bg-emerald-500 text-black p-3 rounded-xl hover:bg-emerald-400 transition-all"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const Analytics = ({ user }: { user: any }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Focus Quality" value="92%" trend="+4%" color="text-emerald-500" />
        <StatCard title="Consistency" value="88%" trend="+2%" color="text-blue-500" />
        <StatCard title="Accuracy" value="76%" trend="-1%" color="text-yellow-500" />
        <StatCard title="Readiness" value="74%" trend="+5%" color="text-purple-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
          <h3 className="text-lg font-bold mb-6">Performance Forecast</h3>
          <div className="h-64 flex items-end gap-2">
            {[40, 45, 38, 55, 62, 70, 74].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full bg-emerald-500/20 border-t-2 border-emerald-500 rounded-t-lg transition-all duration-1000" 
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-white/30 uppercase">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
          <h3 className="text-lg font-bold mb-6">Syllabus Mastery Heatmap</h3>
          <div className="grid grid-cols-5 gap-2">
            {[...Array(25)].map((_, i) => (
              <div 
                key={i} 
                className={`aspect-square rounded-lg border border-white/5 ${
                  i % 7 === 0 ? 'bg-emerald-500/60' : 
                  i % 5 === 0 ? 'bg-emerald-500/40' : 
                  i % 3 === 0 ? 'bg-emerald-500/20' : 'bg-white/5'
                }`} 
              />
            ))}
          </div>
          <div className="mt-4 flex justify-between text-[10px] text-white/30 uppercase">
            <span>Low Mastery</span>
            <span>High Mastery</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function StatCard({ title, value, trend, color }: any) {
  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
      <div className="text-xs text-white/40 uppercase tracking-widest mb-2">{title}</div>
      <div className={`text-3xl font-bold mb-1 ${color}`}>{value}</div>
      <div className="text-[10px] text-emerald-500 font-mono">{trend} FROM LAST WEEK</div>
    </div>
  );
}

const DailyCheckIn = ({ onComplete }: { onComplete: (data: any) => void }) => {
  const [mood, setMood] = useState('Stable');
  const [energy, setEnergy] = useState(70);
  const [stress, setStress] = useState(30);

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[60] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#111] border border-white/10 rounded-3xl p-10 max-w-md w-full text-center"
      >
        <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Activity className="text-emerald-500 w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Daily Biometric Sync</h2>
        <p className="text-white/40 mb-8">Synchronizing your emotional and physical state with the ASCEND protocol.</p>

        <div className="space-y-8 text-left">
          <div className="space-y-3">
            <label className="text-xs text-white/40 uppercase tracking-widest">Current Mood</label>
            <div className="grid grid-cols-2 gap-2">
              {['Stable', 'Anxious', 'Motivated', 'Exhausted'].map(m => (
                <button 
                  key={m}
                  onClick={() => setMood(m)}
                  className={`py-3 rounded-xl border text-sm transition-all ${
                    mood === m ? 'bg-emerald-500 border-emerald-500 text-black font-bold' : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs text-white/40 uppercase tracking-widest">Energy Level</label>
              <span className="text-emerald-500 font-mono text-xs">{energy}%</span>
            </div>
            <input 
              type="range" min="0" max="100" value={energy} onChange={e => setEnergy(parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <label className="text-xs text-white/40 uppercase tracking-widest">Stress Level</label>
              <span className="text-red-500 font-mono text-xs">{stress}%</span>
            </div>
            <input 
              type="range" min="0" max="100" value={stress} onChange={e => setStress(parseInt(e.target.value))}
              className="w-full accent-red-500"
            />
          </div>
        </div>

        <button 
          onClick={() => onComplete({ mood, energy, stress })}
          className="w-full mt-10 bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-2xl transition-all"
        >
          COMPLETE SYNC
        </button>
      </motion.div>
    </div>
  );
};

const Guilds = ({ user, onJoinGuild }: { user: any, onJoinGuild: (name: string) => void }) => {
  const guilds = [
    { name: 'NEET Vanguard', members: '12.4k', rank: 42, activity: 'High' },
    { name: 'JEE Titans', members: '18.9k', rank: 12, activity: 'Ultra' },
    { name: 'UPSC Sentinels', members: '8.2k', rank: 156, activity: 'Medium' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Exam Guilds</h2>
          <p className="text-white/40">Collaborative high-performance execution clusters.</p>
        </div>
        {user.guild && (
          <div className="bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-xl text-emerald-500 text-sm font-bold">
            ACTIVE CLUSTER: {user.guild}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {guilds.map(guild => (
          <div key={guild.name} className={`bg-[#111] border ${user.guild === guild.name ? 'border-emerald-500' : 'border-white/10'} rounded-2xl p-6 hover:border-emerald-500/50 transition-all group`}>
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/10 transition-all">
                <Users className="w-6 h-6 text-white/40 group-hover:text-emerald-500" />
              </div>
              <div className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded font-bold uppercase">
                {guild.activity} ACTIVITY
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1">{guild.name}</h3>
            <p className="text-xs text-white/40 mb-6">{guild.members} Strategists active</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-xs">
                <span className="text-white/30 uppercase">Global Rank</span>
                <span className="text-white/60 font-mono">#{guild.rank}</span>
              </div>
            </div>

            <button 
              onClick={() => onJoinGuild(guild.name)}
              disabled={user.guild === guild.name}
              className={`w-full py-3 ${user.guild === guild.name ? 'bg-emerald-500 text-black' : 'bg-white/5 hover:bg-emerald-500 hover:text-black'} font-bold rounded-xl transition-all disabled:cursor-default`}
            >
              {user.guild === guild.name ? 'CLUSTER ACTIVE' : 'JOIN CLUSTER'}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-3xl p-8 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">Weekly Guild Challenge</h3>
          <p className="text-sm text-white/40">Complete 50 focus hours collectively to unlock the "Focus Shield" for all members.</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-500">32.4 / 50h</div>
          <div className="text-[10px] text-white/30 uppercase">Progress</div>
        </div>
      </div>
    </div>
  );
};

const FocusMode = ({ onEnd }: { onEnd: (score: number, distractions: number) => void }) => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [distractions, setDistractions] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);

  // Audio cue function using Web Audio API
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(mode === 'work' ? 880 : 440, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } catch (e) {
      console.error("Audio cue failed", e);
    }
  };

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => setSeconds(s => s - 1), 1000);
    } else if (seconds === 0 && isActive) {
      playBeep();
      if (mode === 'work') {
        setMode('break');
        setSeconds(breakTime * 60);
        setSessionCount(s => s + 1);
      } else {
        setMode('work');
        setSeconds(workTime * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, mode, workTime, breakTime]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${rs < 10 ? '0' : ''}${rs}`;
  };

  const totalTime = mode === 'work' ? workTime * 60 : breakTime * 60;
  const progress = ((totalTime - seconds) / totalTime) * 100;

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center w-full max-w-2xl"
      >
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className={`px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border transition-all ${mode === 'work' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' : 'bg-white/5 border-white/10 text-white/20'}`}>
            Deep Work
          </div>
          <div className={`px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border transition-all ${mode === 'break' ? 'bg-blue-500/20 border-blue-500 text-blue-500' : 'bg-white/5 border-white/10 text-white/20'}`}>
            Recovery
          </div>
        </div>

        <div className="relative inline-block mb-8">
          <svg className="w-80 h-80 transform -rotate-90">
            <circle
              cx="160"
              cy="160"
              r="150"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-white/5"
            />
            <motion.circle
              cx="160"
              cy="160"
              r="150"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 150}
              animate={{ strokeDashoffset: (2 * Math.PI * 150) * (1 - progress / 100) }}
              className={mode === 'work' ? 'text-emerald-500' : 'text-blue-500'}
            />
          </svg>
          <div className={`absolute inset-0 flex items-center justify-center text-7xl font-bold font-mono tracking-tighter transition-colors ${mode === 'work' ? 'text-emerald-500' : 'text-blue-500'}`}>
            {formatTime(seconds)}
          </div>
        </div>
        
        <div className="flex flex-col gap-12 items-center">
          <div className="grid grid-cols-2 gap-8 w-full max-w-md">
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">Work (m)</label>
              <div className="flex items-center gap-4 bg-white/5 rounded-xl p-2 border border-white/10">
                <button onClick={() => {
                  const newTime = Math.max(1, workTime - 1);
                  setWorkTime(newTime);
                  if (!isActive && mode === 'work') setSeconds(newTime * 60);
                }} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg">-</button>
                <span className="flex-1 font-mono">{workTime}</span>
                <button onClick={() => {
                  const newTime = workTime + 1;
                  setWorkTime(newTime);
                  if (!isActive && mode === 'work') setSeconds(newTime * 60);
                }} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg">+</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-white/40 uppercase tracking-widest">Break (m)</label>
              <div className="flex items-center gap-4 bg-white/5 rounded-xl p-2 border border-white/10">
                <button onClick={() => {
                  const newTime = Math.max(1, breakTime - 1);
                  setBreakTime(newTime);
                  if (!isActive && mode === 'break') setSeconds(newTime * 60);
                }} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg">-</button>
                <span className="flex-1 font-mono">{breakTime}</span>
                <button onClick={() => {
                  const newTime = breakTime + 1;
                  setBreakTime(newTime);
                  if (!isActive && mode === 'break') setSeconds(newTime * 60);
                }} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg">+</button>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`px-12 py-4 rounded-2xl font-bold transition-all ${isActive ? 'bg-white/10 hover:bg-white/20' : 'bg-emerald-500 text-black hover:bg-emerald-400'}`}
            >
              {isActive ? 'PAUSE' : 'START PROTOCOL'}
            </button>
            <button 
              onClick={() => onEnd(Math.max(0, 100 - distractions * 5), distractions)}
              className="px-8 py-4 bg-red-500/20 text-red-500 hover:bg-red-500/30 rounded-2xl font-bold transition-all"
            >
              ABORT
            </button>
          </div>

          <div className="flex gap-8 items-center">
            <button 
              onClick={() => setDistractions(d => d + 1)}
              className="text-[10px] text-white/20 hover:text-white/40 uppercase tracking-widest transition-all"
            >
              Log Distraction ({distractions})
            </button>
            <div className="text-[10px] text-white/20 uppercase tracking-widest">
              Cycles: {sessionCount}
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="absolute bottom-12 text-center text-white/20 max-w-md italic text-sm">
        {mode === 'work' 
          ? '"The successful warrior is the average man, with laser-like focus."' 
          : '"Recovery is where the growth happens. Breathe and recalibrate."'}
      </div>
    </div>
  );
};

const WellnessView = ({ user }: { user: any }) => {
  const [meditations, setMeditations] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/meditations')
      .then(res => res.json())
      .then(setMeditations);
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-emerald-500">Wellness Sanctuary</h2>
          <p className="text-white/40">Biological and psychological optimization.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {meditations.map(med => (
          <div key={med.id} className="bg-[#111] border border-white/10 rounded-2xl p-6 hover:border-emerald-500/50 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/10 transition-all">
                <Activity className="w-6 h-6 text-emerald-500" />
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded font-bold uppercase tracking-widest">
                {med.category}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-2">{med.title}</h3>
            <p className="text-sm text-white/40 mb-6">{med.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-white/30">{med.duration} MIN SESSION</span>
              <button className="bg-emerald-500 text-black text-xs font-bold px-4 py-2 rounded-lg hover:bg-emerald-400 transition-all">
                BEGIN
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-white/10 rounded-3xl p-8">
        <h3 className="text-xl font-bold mb-4">Mental Health Check-in</h3>
        <p className="text-sm text-white/40 mb-6">Your emotional baseline is currently <strong>{user.emotional_baseline}</strong>. I recommend a 5-minute breathing exercise to optimize your focus before the next study block.</p>
        <div className="flex gap-4">
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-sm font-bold transition-all">
            START BREATHWORK
          </button>
          <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-xl text-sm font-bold transition-all">
            VIEW JOURNALS
          </button>
        </div>
      </div>
    </div>
  );
};

const ProgressionView = ({ user }: { user: any }) => {
  const [skills, setSkills] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/skills/${user.id}`).then(res => res.json()).then(setSkills);
    fetch(`/api/achievements/${user.id}`).then(res => res.json()).then(setAchievements);
  }, []);

  const categories = ['Cognitive', 'Physical', 'Emotional', 'Technical'];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-yellow-500">Skill Tree & Mastery</h2>
          <p className="text-white/40">Visualize your evolution as a high-performance strategist.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="text-yellow-500 w-5 h-5" />
            Skill Matrix
          </h3>
          <div className="space-y-6">
            {categories.map(cat => (
              <div key={cat} className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
                  <span>{cat}</span>
                  <span className="text-yellow-500">Level {Math.floor(Math.random() * 5) + 1}</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: `${Math.random() * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Award className="text-emerald-500 w-5 h-5" />
            Achievement Badges
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center border ${i < 3 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-white/5 border-white/5 opacity-30'}`}>
                <Award className={`w-8 h-8 ${i < 3 ? 'text-emerald-500' : 'text-white/20'}`} />
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 mt-6 text-center">Unlock badges by completing high-stakes milestones and maintaining streaks.</p>
        </div>
      </div>
    </div>
  );
};

const MasteryPackModal = ({ pack, onClose, onSpeak }: { pack: any, onClose: () => void, onSpeak: (text: string) => void }) => {
  if (!pack) return null;
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-[#0a0a0a] border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Brain className="text-emerald-500 w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{pack.topic || 'Mastery Module'}</h2>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">ASCEND High-Yield Content</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onSpeak(pack.executive_summary || pack.explanation)}
              className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-all text-white/40 hover:text-emerald-500"
              title="Read Aloud"
            >
              <Mic className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-all text-white/40 hover:text-white">✕</button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
          <section>
            <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-emerald-500 rounded-full" />
              Executive Summary
            </h3>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5 text-white/80 leading-relaxed">
              {pack.executive_summary || pack.explanation || pack["1. Executive Summary"] || pack["1. Simplified Explanation"]}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-blue-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-400 rounded-full" />
              Structured Notes & Derivations
            </h3>
            <div className="prose prose-invert max-w-none text-white/70 space-y-4 whitespace-pre-wrap">
              {pack.detailed_notes || pack.notes || pack["2. Detailed Notes"] || pack["2. Structured Notes"]}
            </div>
          </section>

          {pack.diagrams && (
            <section>
              <h3 className="text-xs font-bold text-teal-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-teal-400 rounded-full" />
                Visual Diagrams & Flowcharts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(Array.isArray(pack.diagrams) ? pack.diagrams : [pack.diagrams]).map((diag: any, i: number) => (
                  <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                    <div className="text-xs font-bold mb-2 text-teal-400 uppercase tracking-widest">Diagram {i+1}</div>
                    <p className="text-sm text-white/60 leading-relaxed">{typeof diag === 'string' ? diag : JSON.stringify(diag)}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <h3 className="text-xs font-bold text-purple-400 uppercase tracking-[0.2em] mb-4">Key Formulas</h3>
              <div className="font-mono text-emerald-400 space-y-2">
                {(pack.formulas || pack["3. Key Formulas & Derivations"] || pack["3. Key Formulas/Concepts"] || []).map((f: any, i: number) => (
                  <div key={i} className="bg-black/40 p-3 rounded-lg border border-white/5">
                    {typeof f === 'string' ? f : JSON.stringify(f)}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
              <h3 className="text-xs font-bold text-orange-400 uppercase tracking-[0.2em] mb-4">Cognitive Shortcuts</h3>
              <p className="text-sm text-white/60 italic leading-relaxed">
                {pack.shortcuts || pack.mnemonics || pack["5. Cognitive Shortcuts (Mnemonics, Visualizations)"] || pack["4. Memory Techniques (Mnemonics)"]}
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-yellow-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-yellow-500 rounded-full" />
              Solved Examples
            </h3>
            <div className="space-y-4">
              {(pack.examples || pack["4. Solved Examples (Step-by-step logic)"] || []).map((ex: any, i: number) => (
                <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <div className="text-sm font-bold mb-2">Example {i+1}</div>
                  <div className="text-white/60 text-sm whitespace-pre-wrap">{typeof ex === 'string' ? ex : JSON.stringify(ex)}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-red-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <div className="w-1 h-4 bg-red-500 rounded-full" />
              High-Yield MCQs
            </h3>
            <div className="space-y-6">
              {(pack.mcqs || pack["6. 5 High-Yield Practice MCQs with detailed explanations for each option."] || pack["5. 3 Practice MCQs with answers"] || []).map((q: any, i: number) => (
                <div key={i} className="bg-white/5 rounded-2xl p-6 border border-white/5">
                  <p className="font-medium mb-4 text-white/90">{typeof q === 'string' ? q : q.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {q.options?.map((opt: string, j: number) => (
                      <button key={j} className="text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm transition-all">
                        {opt}
                      </button>
                    ))}
                  </div>
                  {(q.explanation || q.correct_answer) && (
                    <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-400">
                      {q.correct_answer && <div className="mb-1 font-bold">Correct Answer: {q.correct_answer}</div>}
                      {q.explanation && <div><strong>Logic:</strong> {q.explanation}</div>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {pack.strategy && (
            <section>
              <h3 className="text-xs font-bold text-orange-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <div className="w-1 h-4 bg-orange-500 rounded-full" />
                Exam Strategy Insight
              </h3>
              <div className="bg-orange-500/5 rounded-2xl p-6 border border-orange-500/20 text-white/80 leading-relaxed italic">
                {pack.strategy}
              </div>
            </section>
          )}
        </div>
        
        <div className="p-6 bg-white/5 border-t border-white/10 flex justify-between items-center">
          <div className="text-[10px] text-white/30 uppercase tracking-widest">Topic Mastery: 0%</div>
          <button className="bg-emerald-500 text-black font-bold px-8 py-3 rounded-xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            MARK AS MASTERED
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const ProfileView = ({ user, onUpdate }: { user: UserProfile, onUpdate: (updates: any) => Promise<void> }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio || '',
    location: user.location || '',
    avatar_url: user.avatar_url || '',
    target_exam: user.target_exam,
    academic_level: user.academic_level
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 relative">
          <div className="absolute -bottom-16 left-10 flex items-end gap-6">
            <div className="w-32 h-32 rounded-3xl bg-[#050505] border-4 border-[#0a0a0a] overflow-hidden shadow-2xl">
              {formData.avatar_url ? (
                <img src={formData.avatar_url} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5">
                  <User className="w-12 h-12 text-white/20" />
                </div>
              )}
            </div>
            <div className="mb-4">
              <h2 className="text-3xl font-bold tracking-tight">{user.name}</h2>
              <p className="text-emerald-500 font-mono text-sm uppercase tracking-widest">Level {user.level} Strategist</p>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="absolute bottom-6 right-10 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-xl transition-all flex items-center gap-2"
          >
            {isEditing ? <X className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="pt-24 px-10 pb-10">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Display Name</label>
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Location</label>
                  <input 
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all"
                    placeholder="e.g. New Delhi, India"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Bio</label>
                <textarea 
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all h-32 resize-none"
                  placeholder="Tell us about your mission..."
                />
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Target Exam</label>
                  <input 
                    type="text"
                    value={formData.target_exam}
                    onChange={e => setFormData({ ...formData, target_exam: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Avatar URL</label>
                  <input 
                    type="text"
                    value={formData.avatar_url}
                    onChange={e => setFormData({ ...formData, avatar_url: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="bg-emerald-500 text-black font-bold px-10 py-4 rounded-2xl hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  SAVE PROTOCOL
                </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-3 gap-10">
              <div className="col-span-2 space-y-10">
                <section className="space-y-4">
                  <h3 className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Mission Statement</h3>
                  <p className="text-xl text-white/80 leading-relaxed italic">
                    {user.bio || "No bio provided. Define your mission in the settings."}
                  </p>
                </section>

                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Target Objective</p>
                    <p className="text-lg font-bold">{user.target_exam}</p>
                  </div>
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-2">
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Deployment Zone</p>
                    <p className="text-lg font-bold">{user.location || 'Unknown'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl space-y-6">
                  <div className="flex items-center justify-between">
                    <Trophy className="text-emerald-500 w-8 h-8" />
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">Global Rank</p>
                      <p className="text-2xl font-black">#1,284</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                      <span>XP Progress</span>
                      <span>{user.xp % 1000} / 1000</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${(user.xp % 1000) / 10}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Streak</p>
                      <p className="text-xl font-bold">{user.streak}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Guild</p>
                      <p className="text-xl font-bold">{user.guild || 'None'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userGoals, setUserGoals] = useState<any[]>([]);
  const [activityStats, setActivityStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLogActivity, setShowLogActivity] = useState(false);
  const [view, setView] = useState<'dashboard' | 'store' | 'progress' | 'focus' | 'tutor' | 'guilds' | 'wellness' | 'progression' | 'leaderboard' | 'profile'>('dashboard');
  const [activeMastery, setActiveMastery] = useState<any>(null);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [isBriefingLoading, setIsBriefingLoading] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = async (text: string) => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const userId = localStorage.getItem('ascend_user_id') || 'user_' + Math.random().toString(36).substring(7);
    localStorage.setItem('ascend_user_id', userId);
    
    fetch(`/api/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setUser(data);
          fetchTasks(userId);
          fetchUserGoals(userId);
          fetchActivityStats(userId);
          // Show check-in if last active was not today
          const lastActive = data.last_active ? new Date(data.last_active).toDateString() : '';
          if (lastActive !== new Date().toDateString()) {
            setShowCheckIn(true);
          }
        }
        setLoading(false);
      });
  }, []);

  const fetchUserGoals = (userId: string) => {
    fetch(`/api/goals/${userId}`)
      .then(res => res.json())
      .then(setUserGoals);
  };

  const fetchActivityStats = (userId: string) => {
    fetch(`/api/activity/stats/${userId}`)
      .then(res => res.json())
      .then(setActivityStats);
  };

  const handleDailyCheckIn = async (data: any) => {
    setShowCheckIn(false);
    try {
      const res = await fetch('/api/daily-checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user!.id, ...data })
      });
      if (!res.ok) throw new Error('Failed to save check-in');
      
      // Refresh user to get updated last_active and emotional_baseline
      const userRes = await fetch(`/api/user/${user!.id}`);
      if (userRes.ok) {
        const updatedUser = await userRes.json();
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Daily check-in failed:", error);
    }
  };

  const handleFocusEnd = async (score: number, distractions: number) => {
    setView('dashboard');
    const duration = 25 * 60; // Fixed for now
    try {
      const res = await fetch('/api/focus/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user!.id, duration, score, distractions })
      });
      if (!res.ok) throw new Error('Failed to save focus session');
      
      // Refresh user to get updated XP
      const userRes = await fetch(`/api/user/${user!.id}`);
      if (userRes.ok) {
        const updatedUser = await userRes.json();
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Focus session save failed:", error);
    }
  };

  const handleVoiceBriefing = async () => {
    if (isBriefingLoading) return;
    setIsBriefingLoading(true);
    try {
      const contextRes = await fetch(`/api/ai/context/${user!.id}`);
      if (!contextRes.ok) throw new Error('Failed to fetch user context');
      const { user: userData, tasks: todayTasks, recentActivities } = await contextRes.json();

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      
      // 1. Generate text briefing
      const textResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are the ASCEND AI Strategist. Provide a high-energy, strategic morning briefing for ${userData.name}.
        Context:
        - Target Goal: ${userData.target_exam}
        - Current Progress: ${userData.xp} XP, Level ${userData.level}, Streak ${userData.streak}
        - Today's Focus: ${todayTasks.map((t: any) => t.title).join(", ") || "No specific tasks scheduled yet."}
        - Recent Activities (Last 24h): ${JSON.stringify(recentActivities)}
        - Weak Areas: ${userData.weak_subjects}
        - Emotional State: ${userData.emotional_baseline || 'Neutral'}
        
        Your briefing should:
        1. Acknowledge their current progress and streak with discipline.
        2. Analyze their recent activities (sleep, diet, study, social media) and provide 1 optimization insight.
        3. Provide a strategic overview of today's protocol.
        4. Give 1 specific "Mastery Tip" for their weak subjects.
        5. Include a motivational "Success Anchor" to prime their mindset.
        
        Keep it under 180 words. Be disciplined, supportive, and authoritative.`,
      });

      const briefingText = textResponse.text;

      // 2. Convert to speech
      const speechResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: briefingText }] }],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Zephyr' },
            },
          },
        },
      });

      const base64Audio = speechResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
        audio.play();
      }
    } catch (error: any) {
      console.error("Briefing failed:", error);
      alert(`Briefing failed: ${error.message}`);
    } finally {
      setIsBriefingLoading(false);
    }
  };

  const fetchTasks = (userId: string) => {
    fetch(`/api/tasks/${userId}`)
      .then(res => res.json())
      .then(setTasks);
  };

  const handleOnboarding = async (formData: any) => {
    const userId = localStorage.getItem('ascend_user_id')!;
    const newUser = { id: userId, ...formData, xp: 0, level: 1, streak: 0 };
    
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      if (!res.ok) throw new Error('Failed to save user profile');

      setUser(newUser);
      
      // Generate Roadmap
      setLoading(true);
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a world-class, holistic, high-performance life execution roadmap for ${formData.target_exam}. 
        User Profile: ${JSON.stringify(newUser)}.
        The roadmap must be a COMPLETE 24-hour life optimization protocol, not just a study plan.
        Include:
        1. Milestones (Major phases of preparation)
        2. Daily Routine Blocks:
           - Deep Work (Study/Practice)
           - Revision & Active Recall
           - Wellness (Meditation, Exercise)
           - Biological Optimization (Sleep, Meals, Hydration)
           - Commute/Class integration
        3. Specific topics with difficulty ratings (1-5)
        4. Strategy insights for ${formData.target_exam}.
        
        Return a JSON object:
        {
          "title": "Protocol Title",
          "difficulty": 1-5,
          "estimated_timeline": "e.g. 6 months",
          "milestones": [
            {
              "title": "Milestone Title",
              "description": "Description",
              "timeline": "e.g. Week 1-4",
              "tasks": [
                { 
                  "title": "Task Title", 
                  "description": "Detailed actionable steps", 
                  "type": "study|revision|mock_test|exercise|wellness|meal|sleep",
                  "duration_minutes": 30-120
                }
              ]
            }
          ]
        }`,
        config: { responseMimeType: "application/json" }
      });

      const roadmapData = JSON.parse(model.text);
      
      const roadmapRes = await fetch('/api/goals/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, roadmap: roadmapData })
      });
      
      if (!roadmapRes.ok) throw new Error('Failed to save roadmap');
      
      fetchTasks(userId);
    } catch (error: any) {
      alert(`Onboarding failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteTask = async (taskId: string) => {
    const userId = user!.id;
    try {
      const res = await fetch('/api/tasks/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, userId, xpGain: 150 })
      });
      if (!res.ok) throw new Error('Failed to complete task');
      
      setUser(prev => prev ? { ...prev, xp: prev.xp + 150 } : null);
      fetchTasks(userId);
    } catch (error) {
      console.error("Task completion failed:", error);
    }
  };

  const handleOpenMastery = async (task: Task) => {
    if (task.mastery_pack) {
      setActiveMastery(task.mastery_pack);
    } else {
      // Generate on the fly
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
        const model = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: `Generate a world-class, comprehensive "Mastery Pack" for the topic: "${task.title}".
          This is for a high-stakes student preparing for ${user?.target_exam || 'competitive exams'}.
          The content must be authoritative, detailed, and pedagogically sound.
          
          Include the following sections in the JSON:
          1. "executive_summary": A high-level overview of the concept and its importance.
          2. "detailed_notes": Comprehensive, structured notes with hierarchies. Use Markdown for formatting.
          3. "diagrams": Describe 2-3 key visual diagrams or flowcharts that explain the concept. Provide detailed descriptions that a student can visualize or draw.
          4. "formulas": A list of all relevant formulas, constants, and their derivations.
          5. "examples": 3-5 solved examples ranging from basic to advanced, showing step-by-step logical execution.
          6. "shortcuts": Mnemonics, cognitive shortcuts, and "pro-tips" for quick problem solving.
          7. "mcqs": 5 high-yield practice MCQs. Each must have: "question", "options" (array of 4), "correct_answer", and "explanation" (detailed logic for why the answer is correct and others are wrong).
          8. "strategy": Specific insights on how this topic is tested in ${user?.target_exam || 'exams'}, common traps, and weightage.
          
          Return as a single structured JSON object.`,
          config: { responseMimeType: "application/json" }
        });

        const pack = JSON.parse(model.text);
        
        await fetch('/api/tasks/mastery-pack/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ taskId: task.id, pack })
        });

        setActiveMastery(pack);
        fetchTasks(user!.id);
      } catch (error: any) {
        alert(`Mastery generation failed: ${error.message}`);
      }
    }
  };

  const handleActivateGoal = async (exam: string) => {
    const userId = user!.id;
    setView('dashboard');
    setLoading(true);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const model = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a world-class, holistic, high-performance life execution roadmap for ${exam}. 
        User Profile: ${JSON.stringify(user)}.
        The roadmap must be a COMPLETE 24-hour life optimization protocol, not just a study plan.
        Include:
        1. Milestones (Major phases of preparation)
        2. Daily Routine Blocks:
           - Deep Work (Study/Practice)
           - Revision & Active Recall
           - Wellness (Meditation, Exercise)
           - Biological Optimization (Sleep, Meals, Hydration)
           - Commute/Class integration
        3. Specific topics with difficulty ratings (1-5)
        4. Strategy insights for ${exam}.
        
        Return a JSON object:
        {
          "title": "Protocol Title",
          "difficulty": 1-5,
          "estimated_timeline": "e.g. 6 months",
          "milestones": [
            {
              "title": "Milestone Title",
              "description": "Description",
              "timeline": "e.g. Week 1-4",
              "tasks": [
                { 
                  "title": "Task Title", 
                  "description": "Detailed actionable steps", 
                  "type": "study|revision|mock_test|exercise|wellness|meal|sleep",
                  "duration_minutes": 30-120
                }
              ]
            }
          ]
        }`,
        config: { responseMimeType: "application/json" }
      });

      const roadmapData = JSON.parse(model.text);
      
      const res = await fetch('/api/goals/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, roadmap: roadmapData })
      });

      if (!res.ok) throw new Error('Failed to activate goal');
      
      fetchTasks(userId);
    } catch (error: any) {
      alert(`Goal activation failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSwitchGoal = async (goalId: string) => {
    try {
      const res = await fetch('/api/goals/switch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user!.id, goalId })
      });
      if (!res.ok) throw new Error('Failed to switch goal');
      
      fetchTasks(user!.id);
      fetchUserGoals(user!.id);
    } catch (error) {
      console.error("Goal switch failed:", error);
    }
  };

  const handleJoinGuild = async (guildName: string) => {
    await fetch('/api/guild/join', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user!.id, guildName })
    });
    setUser(prev => prev ? { ...prev, guild: guildName } : null);
  };

  const handleLogActivity = async (data: any) => {
    setShowLogActivity(false);
    try {
      const res = await fetch('/api/activity/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user!.id, ...data })
      });
      if (!res.ok) throw new Error('Failed to log activity');
      
      fetchActivityStats(user!.id);
      setUser(prev => prev ? { ...prev, xp: prev.xp + 5 } : null);
    } catch (error) {
      console.error("Activity logging failed:", error);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        <div className="text-emerald-500 animate-pulse font-mono tracking-widest text-sm">INITIALIZING PROTOCOL...</div>
      </div>
    </div>
  );

  if (!user) return <Onboarding onComplete={handleOnboarding} />;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-emerald-500/30">
      {/* Navigation Rail */}
      <nav className="fixed left-0 top-0 bottom-0 w-20 bg-[#0a0a0a] border-r border-white/5 flex flex-col items-center py-8 gap-8 z-40">
        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
          <Shield className="text-black w-6 h-6" />
        </div>
        
        <div className="flex-1 flex flex-col gap-6">
          <NavIcon icon={<LayoutDashboard />} active={view === 'dashboard'} onClick={() => setView('dashboard')} label="Dashboard" />
          <NavIcon icon={<Store />} active={view === 'store'} onClick={() => setView('store')} label="Goal Store" />
          <NavIcon icon={<Activity />} active={view === 'wellness'} onClick={() => setView('wellness')} label="Wellness" />
          <NavIcon icon={<Award />} active={view === 'progression'} onClick={() => setView('progression')} label="Mastery" />
          <NavIcon icon={<BarChart3 />} active={view === 'progress'} onClick={() => setView('progress')} label="Analytics" />
          <NavIcon icon={<MessageSquare />} active={view === 'tutor'} onClick={() => setView('tutor')} label="AI Tutor" />
          <NavIcon icon={<Users />} active={view === 'guilds'} onClick={() => setView('guilds')} label="Guilds" />
          <NavIcon icon={<Award />} active={view === 'leaderboard'} onClick={() => setView('leaderboard')} label="Leaderboard" />
          <NavIcon icon={<User />} active={view === 'profile'} onClick={() => setView('profile')} label="Profile" />
        </div>

        <NavIcon icon={<Settings />} active={view === 'profile'} onClick={() => setView('profile')} label="Settings" />
      </nav>

      {/* Main Content Area */}
      <main className="pl-20 min-h-screen">
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold tracking-tight uppercase">ASCEND PROTOCOL</h1>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="text-xs text-white/40 font-mono">SYSTEM_STATUS: OPTIMAL</div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="font-mono text-sm">{user.streak} DAY STREAK</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span className="font-mono text-sm">{user.xp} XP</span>
            </div>
            <div 
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all"
              onClick={() => setView('profile')}
            >
              {user.avatar_url ? (
                <img src={user.avatar_url} alt={user.name} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <User className="w-5 h-5 text-white/40" />
              )}
            </div>
          </div>
        </header>

        <div className="p-10 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {view === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Dashboard 
                  user={user} 
                  tasks={tasks} 
                  onCompleteTask={handleCompleteTask}
                  onStartFocus={() => setView('focus')}
                  onOpenMastery={handleOpenMastery}
                  onVoiceBriefing={handleVoiceBriefing}
                  isBriefingLoading={isBriefingLoading}
                  onSwitchGoal={handleSwitchGoal}
                  userGoals={userGoals}
                  onLogActivity={() => setShowLogActivity(true)}
                  activityStats={activityStats}
                />
              </motion.div>
            )}

            {view === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ProfileView 
                  user={user} 
                  onUpdate={async (updates) => {
                    const res = await fetch(`/api/user/${user.id}`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(updates)
                    });
                    if (res.ok) {
                      setUser(prev => prev ? { ...prev, ...updates } : null);
                    }
                  }}
                />
              </motion.div>
            )}
            {view === 'store' && (
              <motion.div
                key="store"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <GoalStore onActivate={handleActivateGoal} />
              </motion.div>
            )}
            {view === 'progress' && (
              <motion.div
                key="progress"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Analytics user={user} />
              </motion.div>
            )}
            {view === 'tutor' && (
              <motion.div
                key="tutor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AITutor user={user} onSpeak={handleSpeak} />
              </motion.div>
            )}
            {view === 'guilds' && (
              <motion.div
                key="guilds"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Guilds user={user} onJoinGuild={handleJoinGuild} />
              </motion.div>
            )}
            {view === 'wellness' && (
              <motion.div
                key="wellness"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <WellnessView user={user} />
              </motion.div>
            )}
            {view === 'progression' && (
              <motion.div
                key="progression"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ProgressionView user={user} />
              </motion.div>
            )}
            {view === 'leaderboard' && (
              <motion.div
                key="leaderboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Leaderboard />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Modals & Overlays */}
      {view === 'focus' && <FocusMode onEnd={handleFocusEnd} />}
      {showCheckIn && <DailyCheckIn onComplete={handleDailyCheckIn} />}
      {showLogActivity && <LogActivityModal onClose={() => setShowLogActivity(false)} onLog={handleLogActivity} />}
      <MasteryPackModal pack={activeMastery} onClose={() => setActiveMastery(null)} onSpeak={handleSpeak} />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}

function NavIcon({ icon, active, onClick, label }: any) {
  return (
    <div className="relative group">
      <button 
        onClick={onClick}
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
          active ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'text-white/40 hover:text-white hover:bg-white/5'
        }`}
      >
        {React.cloneElement(icon, { size: 20 })}
      </button>
      <div className="absolute left-16 top-1/2 -translate-y-1/2 px-2 py-1 bg-white text-black text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap uppercase tracking-widest">
        {label}
      </div>
    </div>
  );
}
