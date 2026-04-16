import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LogEntry {
  id: string;
  text: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
}

interface TerminalProps {
  logs: LogEntry[];
}

export default function Terminal({ logs }: TerminalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getTypeColor = (type: LogEntry['type']) => {
    switch (type) {
      case 'info': return 'text-cyber-cyan';
      case 'warning': return 'text-cyber-orange';
      case 'error': return 'text-cyber-red';
      case 'success': return 'text-cyber-green';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/60 border border-cyber-cyan/20 rounded-lg overflow-hidden font-mono text-xs relative">
      <div className="grid-pattern absolute inset-0 pointer-events-none opacity-50" />
      <div className="flex items-center justify-between px-3 py-2 bg-cyber-panel border-b border-cyber-cyan/30 shadow-glow relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyber-red" />
          <div className="w-2 h-2 rounded-full bg-cyber-orange" />
          <div className="w-2 h-2 rounded-full bg-cyber-green" />
          <span className="ml-2 text-[10px] uppercase tracking-widest text-cyber-cyan font-bold">Main Terminal</span>
        </div>
        <div className="text-[10px] text-cyber-cyan/60">0x44A12 // AES-256</div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto scrollbar-hide space-y-1 relative z-10"
      >
        <AnimatePresence initial={false}>
          {logs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex gap-3"
            >
              <span className="text-gray-600 shrink-0">[{log.timestamp}]</span>
              <span className={`${getTypeColor(log.type)} break-all`}>
                {log.type === 'error' && '> ERROR: '}
                {log.type === 'warning' && '> WARN: '}
                {log.type === 'success' && '> OK: '}
                {log.text}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        {logs.length === 0 && (
          <div className="text-gray-700 italic">Waiting for system input...</div>
        )}
      </div>
      
      <div className="px-3 py-1 bg-black/20 border-t border-cyber-border flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-cyber-green animate-pulse">●</span>
          <span className="text-[10px] text-gray-500 uppercase">Live Stream Active</span>
        </div>
        <div className="text-[10px] text-gray-500">UTF-8</div>
      </div>
    </div>
  );
}
