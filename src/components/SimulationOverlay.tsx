import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Skull, Lock, Wifi, AlertTriangle, X } from 'lucide-react';

export type SimulationType = 'ransomware' | 'virus' | 'rac' | null;

interface SimulationOverlayProps {
  type: SimulationType;
  onClose: () => void;
}

export default function SimulationOverlay({ type, onClose }: SimulationOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!type) {
      setProgress(0);
      setStage(0);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [type]);

  useEffect(() => {
    if (progress > 30) setStage(1);
    if (progress > 60) setStage(2);
    if (progress > 90) setStage(3);
  }, [progress]);

  if (!type) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
        >
          <X size={32} />
        </button>

        <div className="max-w-2xl w-full space-y-8 text-center">
          {type === 'ransomware' && (
            <div className="space-y-6">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="flex justify-center"
              >
                <div className="p-6 rounded-full bg-cyber-orange/20 border-2 border-cyber-orange shadow-[0_0_30px_rgba(255,140,0,0.4)]">
                  <Lock size={64} className="text-cyber-orange" />
                </div>
              </motion.div>
              <h2 className="text-4xl font-bold text-cyber-orange uppercase tracking-tighter">Ransomware Simulation</h2>
              <p className="text-gray-400 font-mono">Simulating file encryption process...</p>
              
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-900 rounded-full overflow-hidden border border-cyber-orange/30">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-cyber-orange shadow-[0_0_15px_rgba(255,140,0,0.8)]"
                  />
                </div>
                <div className="flex justify-between font-mono text-xs text-cyber-orange">
                  <span>ENCRYPTING_FS...</span>
                  <span>{Math.floor(progress)}%</span>
                </div>
              </div>

              {progress === 100 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-cyber-orange/10 border border-cyber-orange rounded-lg text-left space-y-4"
                >
                  <div className="flex items-center gap-3 text-cyber-orange font-bold">
                    <Skull size={24} />
                    <span className="text-xl">YOUR FILES ARE ENCRYPTED</span>
                  </div>
                  <p className="text-sm text-gray-300 font-mono leading-relaxed">
                    This is a simulation. In a real ransomware attack, your data would be inaccessible without a decryption key. 
                    <br /><br />
                    <span className="text-cyber-orange font-bold underline">Prevention:</span> Always keep offline backups and never open suspicious email attachments.
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {type === 'virus' && (
            <div className="space-y-6">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="flex justify-center"
              >
                <div className="p-6 rounded-full bg-cyber-red/20 border-2 border-cyber-red shadow-[0_0_30px_rgba(255,62,62,0.4)]">
                  <AlertTriangle size={64} className="text-cyber-red" />
                </div>
              </motion.div>
              <h2 className="text-4xl font-bold text-cyber-red uppercase tracking-tighter">Virus Simulation</h2>
              <p className="text-gray-400 font-mono">Simulating self-replicating infection...</p>

              <div className="grid grid-cols-8 gap-2 max-w-md mx-auto">
                {Array.from({ length: 64 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0.1 }}
                    animate={{ 
                      opacity: i < (progress / 100) * 64 ? 1 : 0.1,
                      backgroundColor: i < (progress / 100) * 64 ? '#ff3e3e' : '#1f2937',
                      scale: i < (progress / 100) * 64 ? [1, 1.2, 1] : 1
                    }}
                    className="aspect-square rounded-sm"
                  />
                ))}
              </div>

              {progress === 100 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-cyber-red/10 border border-cyber-red rounded-lg text-left space-y-4"
                >
                  <div className="flex items-center gap-3 text-cyber-red font-bold">
                    <ShieldAlert size={24} />
                    <span className="text-xl">SYSTEM INTEGRITY COMPROMISED</span>
                  </div>
                  <p className="text-sm text-gray-300 font-mono leading-relaxed">
                    Viruses spread by attaching to clean files. This simulation shows how quickly a single infection can compromise an entire system.
                    <br /><br />
                    <span className="text-cyber-red font-bold underline">Prevention:</span> Use reputable antivirus software and keep your OS updated.
                  </p>
                </motion.div>
              )}
            </div>
          )}

          {type === 'rac' && (
            <div className="space-y-6">
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="flex justify-center"
              >
                <div className="p-6 rounded-full bg-cyber-green/20 border-2 border-cyber-green shadow-[0_0_30px_rgba(0,255,65,0.4)]">
                  <Wifi size={64} className="text-cyber-green" />
                </div>
              </motion.div>
              <h2 className="text-4xl font-bold text-cyber-green uppercase tracking-tighter">RAC Simulation</h2>
              <p className="text-gray-400 font-mono">Establishing remote tunnel...</p>

              <div className="bg-black border border-cyber-green/30 rounded-lg p-4 font-mono text-left text-xs text-cyber-green h-48 overflow-hidden relative">
                <div className="space-y-1">
                  <p>{">"} ssh admin@remote-host -p 2222</p>
                  <p>{">"} Connecting to 192.168.1.105...</p>
                  {stage >= 1 && <p className="text-cyber-cyan">{">"} Handshake successful. AES-256 encrypted.</p>}
                  {stage >= 2 && <p>{">"} Accessing /home/user/documents...</p>}
                  {stage >= 2 && <p className="text-cyber-orange">{">"} WARNING: Unauthorized access detected.</p>}
                  {stage >= 3 && <p className="text-white">{">"} root@remote:~# ls -la</p>}
                  {stage >= 3 && <p className="text-white opacity-60">drwxr-xr-x  2 root root 4096 Apr 16 05:15 .</p>}
                  {stage >= 3 && <p className="text-white opacity-60">-rw-r--r--  1 root root  123 Apr 16 05:15 secrets.txt</p>}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent" />
              </div>

              {progress === 100 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-cyber-green/10 border border-cyber-green rounded-lg text-left space-y-4"
                >
                  <div className="flex items-center gap-3 text-cyber-green font-bold">
                    <Wifi size={24} />
                    <span className="text-xl">REMOTE SESSION ESTABLISHED</span>
                  </div>
                  <p className="text-sm text-gray-300 font-mono leading-relaxed">
                    Remote Access Control (RAC) tools allow attackers to control your computer from anywhere. 
                    <br /><br />
                    <span className="text-cyber-green font-bold underline">Prevention:</span> Disable remote desktop if not needed and use strong, multi-factor authentication.
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
