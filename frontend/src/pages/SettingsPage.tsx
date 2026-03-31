import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import API from '@/services/api';
import {
  User, Mail, Lock, Shield, Award, Crown,
  Zap, Check, ChevronRight, AlertCircle, Eye, EyeOff
} from 'lucide-react';

const TIER_META = {
  Explorer:   { color: 'text-emerald-400',  bg: 'bg-emerald-500/10',  border: 'border-emerald-500/30', icon: <Zap  size={18} /> },
  Adventurer: { color: 'text-blue-400',     bg: 'bg-blue-500/10',     border: 'border-blue-500/30',    icon: <Shield size={18} /> },
  Voyager:    { color: 'text-amber-400',    bg: 'bg-amber-500/10',    border: 'border-amber-500/30',   icon: <Crown  size={18} /> },
};

const SettingsPage: React.FC = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  /* ── Profile form state ── */
  const [name,  setName]  = useState(user?.name  ?? '');
  const [email, setEmail] = useState(user?.email ?? '');

  /* ── Password form state ── */
  const [currentPw,  setCurrentPw]  = useState('');
  const [newPw,      setNewPw]      = useState('');
  const [confirmPw,  setConfirmPw]  = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);

  /* ── Loading states ── */
  const [savingProfile,  setSavingProfile]  = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  React.useEffect(() => {
    if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  if (loading || !user) return null;

  const tier     = (user.loyaltyTier as keyof typeof TIER_META) ?? 'Explorer';
  const tierMeta = TIER_META[tier];

  /* ── Handlers ── */
  const handleSaveProfile = async () => {
    if (!name.trim()) { toast({ title: 'Name cannot be empty', variant: 'destructive' }); return; }
    setSavingProfile(true);
    try {
      const res = await API.put('/auth/profile', { name: name.trim(), email: email.trim() });
      // Update AuthContext with fresh user data
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.location.reload(); // simplest way to refresh AuthContext
    } catch (err: any) {
      toast({ title: 'Update failed', description: err?.response?.data?.message ?? 'Something went wrong.', variant: 'destructive' });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPw || !newPw || !confirmPw) { toast({ title: 'All password fields required', variant: 'destructive' }); return; }
    if (newPw.length < 6) { toast({ title: 'New password must be at least 6 characters', variant: 'destructive' }); return; }
    if (newPw !== confirmPw) { toast({ title: 'Passwords do not match', variant: 'destructive' }); return; }
    setSavingPassword(true);
    try {
      await API.put('/auth/profile', { currentPassword: currentPw, newPassword: newPw });
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
      toast({ title: '✅ Password updated successfully!' });
    } catch (err: any) {
      toast({ title: 'Failed', description: err?.response?.data?.message ?? 'Could not update password.', variant: 'destructive' });
    } finally {
      setSavingPassword(false);
    }
  };

  const pwStrength = newPw.length === 0 ? 0 : newPw.length < 6 ? 1 : newPw.length < 10 ? 2 : 3;
  const pwColors   = ['', 'bg-red-500', 'bg-yellow-500', 'bg-green-500'];
  const pwLabels   = ['', 'Weak', 'Medium', 'Strong'];

  return (
    <Layout>
      <div className="bg-black min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* ── Page header ── */}
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-white">Account Settings</h1>
            <p className="text-zinc-400 mt-1">Manage your profile, security, and loyalty status.</p>
          </div>

          {/* ── Loyalty status card ── */}
          <div className={`mb-8 rounded-2xl border ${tierMeta.border} ${tierMeta.bg} p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl border ${tierMeta.border} ${tierMeta.color}`}>{tierMeta.icon}</div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">Loyalty Status</p>
                <h3 className={`text-xl font-extrabold ${tierMeta.color}`}>{tier}</h3>
                <p className="text-zinc-400 text-sm mt-0.5 flex items-center gap-1.5">
                  <Award size={13} />
                  <strong className="text-white">{user.wanderlustPoints?.toLocaleString()}</strong> Wanderlust Points
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate('/dashboard')}
              variant="outline"
              className={`border ${tierMeta.border} ${tierMeta.color} bg-transparent hover:bg-white/5 text-sm`}
            >
              View Dashboard <ChevronRight size={14} className="ml-1" />
            </Button>
          </div>

          {/* ── Profile info ── */}
          <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-500/10 border border-blue-500/20 p-2.5 rounded-xl text-blue-400"><User size={20} /></div>
              <div>
                <h2 className="text-lg font-bold text-white">Personal Information</h2>
                <p className="text-zinc-500 text-sm">Update your name and email address.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Name */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-black/50 border border-white/10 focus:border-blue-500 text-white rounded-xl text-sm outline-none transition"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 bg-black/50 border border-white/10 focus:border-blue-500 text-white rounded-xl text-sm outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handleSaveProfile}
              disabled={savingProfile}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 rounded-xl"
            >
              {savingProfile ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Saving…
                </span>
              ) : (
                <><Check size={16} className="mr-2" />Save Changes</>
              )}
            </Button>
          </div>

          {/* ── Change password ── */}
          <div className="bg-zinc-900/60 border border-white/5 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-500/10 border border-red-500/20 p-2.5 rounded-xl text-red-400"><Lock size={20} /></div>
              <div>
                <h2 className="text-lg font-bold text-white">Change Password</h2>
                <p className="text-zinc-500 text-sm">Use a strong password with 8+ characters.</p>
              </div>
            </div>

            <div className="space-y-4 mb-4">
              {/* Current password */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input
                    type={showCurrent ? 'text' : 'password'}
                    value={currentPw}
                    onChange={e => setCurrentPw(e.target.value)}
                    className="w-full pl-9 pr-10 py-3 bg-black/50 border border-white/10 focus:border-red-500 text-white rounded-xl text-sm outline-none transition"
                    placeholder="Your current password"
                  />
                  <button onClick={() => setShowCurrent(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition">
                    {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* New password */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input
                    type={showNew ? 'text' : 'password'}
                    value={newPw}
                    onChange={e => setNewPw(e.target.value)}
                    className="w-full pl-9 pr-10 py-3 bg-black/50 border border-white/10 focus:border-red-500 text-white rounded-xl text-sm outline-none transition"
                    placeholder="New password"
                  />
                  <button onClick={() => setShowNew(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition">
                    {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Strength bar */}
                {newPw.length > 0 && (
                  <div className="mt-1.5">
                    <div className="flex gap-1 h-1 mb-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className={`flex-1 rounded-full transition-all ${i <= pwStrength ? pwColors[pwStrength] : 'bg-zinc-700'}`} />
                      ))}
                    </div>
                    <span className={`text-[11px] font-medium ${pwColors[pwStrength].replace('bg-', 'text-')}`}>{pwLabels[pwStrength]}</span>
                  </div>
                )}
              </div>

              {/* Confirm password */}
              <div className="flex flex-col space-y-1.5">
                <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input
                    type="password"
                    value={confirmPw}
                    onChange={e => setConfirmPw(e.target.value)}
                    className={`w-full pl-9 pr-4 py-3 bg-black/50 border text-white rounded-xl text-sm outline-none transition ${
                      confirmPw && confirmPw !== newPw ? 'border-red-500' : 'border-white/10 focus:border-red-500'
                    }`}
                    placeholder="Confirm new password"
                  />
                </div>
                {confirmPw && confirmPw !== newPw && (
                  <p className="text-red-400 text-[11px] flex items-center gap-1"><AlertCircle size={11} /> Passwords do not match</p>
                )}
              </div>
            </div>

            <Button
              onClick={handleChangePassword}
              disabled={savingPassword}
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-8 rounded-xl"
            >
              {savingPassword ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" /> Updating…
                </span>
              ) : (
                <><Shield size={16} className="mr-2" />Update Password</>
              )}
            </Button>
          </div>

          {/* ── Account info (read-only) ── */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Account Info</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-zinc-600 text-xs uppercase tracking-wider mb-1">Member Since</p>
                <p className="text-white font-medium">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                    : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-zinc-600 text-xs uppercase tracking-wider mb-1">Role</p>
                <p className="text-white font-medium capitalize">{user.role ?? 'Traveller'}</p>
              </div>
              <div>
                <p className="text-zinc-600 text-xs uppercase tracking-wider mb-1">User ID</p>
                <p className="text-zinc-500 font-mono text-xs truncate">{user._id}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;
