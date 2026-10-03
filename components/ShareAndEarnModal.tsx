'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Copy, 
  Check, 
  Gift, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Lock, 
  Unlock, 
  MessageCircle, 
  Send, 
  Twitter, 
  Facebook, 
  Award
} from 'lucide-react';
import { getVisitorFingerprint } from '../services/telemetry';

interface ShareAndEarnModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareAndEarnModal = ({ isOpen, onClose }: ShareAndEarnModalProps) => {
  const [copied, setCopied] = useState(false);
  const [inviteCount] = useState(2);
  const [referralLink, setReferralLink] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const fp = getVisitorFingerprint().split('_')[1] || 'KHI77';
      const code = `KHI-${fp.toUpperCase()}`;
      setReferralLink(`${window.location.origin}?ref=${code}`);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareText = encodeURIComponent(
    '🔥 Check out imported 75km/h RC drift cars, 8x8 trucks, and cyberpunk gadgets imported direct from Shenzhen to Karachi! Same-day COD delivery:'
  );

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${shareText}%20${encodeURIComponent(referralLink)}`, '_blank');
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(referralLink)}`, '_blank');
  };

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${shareText}`, '_blank');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
  };

  const PERKS = [
    {
      invites: 1,
      name: 'Ad-Free Clean Browsing',
      description: 'Streamlined zero-ad interface with 40% faster catalog rendering.',
      icon: Zap,
      unlocked: inviteCount >= 1,
    },
    {
      invites: 3,
      name: 'VIP Early Access Drops',
      description: 'First-look reserve access on rare 75km/h brushless RC drift cars & 8x8 haulers.',
      icon: Sparkles,
      unlocked: inviteCount >= 3,
    },
    {
      invites: 5,
      name: 'Seller Pro Verified Badge',
      description: 'Golden verification checkmark on Karachi listings with priority placement.',
      icon: ShieldCheck,
      unlocked: inviteCount >= 5,
    },
    {
      invites: 10,
      name: 'Port Qasim Direct Wholesale Rates',
      description: 'Access locked wholesale China factory pricing with zero minimum order quantities.',
      icon: Award,
      unlocked: inviteCount >= 10,
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 z-10 my-8 overflow-hidden font-sans"
        >
          <div 
            aria-hidden="true" 
            className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 blur-[90px] pointer-events-none" 
          />
          <div 
            aria-hidden="true" 
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 blur-[90px] pointer-events-none" 
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Gift className="w-3.5 h-3.5 text-cyan-400" />
              <span>Viral Growth Program</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Share &amp; Unlock Premium VIP Access
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
              Invite friends in Karachi to browse China imported gadgets and RC vehicles. Every friend who joins through your link unlocks exclusive platform perks without paying a single rupee.
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400">
              Your Unique Referral Link
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-slate-950 border border-slate-800 rounded-2xl">
              <div className="flex-1 px-3 py-2 text-xs font-mono text-cyan-300 truncate">
                {referralLink || 'https://chinatokarachi.hub?ref=KHI-VIP'}
              </div>
              <button
                onClick={copyToClipboard}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-950" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-xs text-slate-400 mb-2">Share directly to your social circles:</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={shareWhatsApp}
                className="py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={shareTelegram}
                className="py-2.5 px-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 text-sky-400" />
                <span>Telegram</span>
              </button>

              <button
                onClick={shareTwitter}
                className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Twitter className="w-4 h-4 text-cyan-400" />
                <span>X / Twitter</span>
              </button>

              <button
                onClick={shareFacebook}
                className="py-2.5 px-3 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/30 text-blue-300 text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Facebook className="w-4 h-4 text-blue-400" />
                <span>Facebook</span>
              </button>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                Premium SaaS Perks Roadmap
              </h4>
              <span className="text-xs font-mono text-cyan-400">
                {inviteCount} Friends Invited
              </span>
            </div>

            <div className="space-y-2.5">
              {PERKS.map((perk, i) => {
                const IconComponent = perk.icon;
                return (
                  <div
                    key={i}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      perk.unlocked
                        ? 'bg-cyan-950/20 border-cyan-500/40 text-white'
                        : 'bg-slate-950/40 border-slate-800/80 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          perk.unlocked
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>

                      <div>
                        <div className="text-xs font-bold flex items-center gap-1.5">
                          <span>{perk.name}</span>
                          <span className="text-[10px] font-mono text-slate-500">
                            ({perk.invites} {perk.invites === 1 ? 'invite' : 'invites'})
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug">
                          {perk.description}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {perk.unlocked ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          <Unlock className="w-3 h-3" /> Unlocked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded-full">
                          <Lock className="w-3 h-3" /> {perk.invites - inviteCount} more needed
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="text-purple-300 font-medium">Zero-Cash Cost to Platform:</span>
            <span>All perks are high-perceived-value digital access, preserving 100% affiliate profit margin.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ShareAndEarnModal;
