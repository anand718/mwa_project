import React, { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Skull, AlertTriangle, Wifi, Shield, Activity, Cpu, Database, Terminal as TerminalIcon } from 'lucide-react';
import Terminal from './components/Terminal';
import SimulationOverlay, { SimulationType } from './components/SimulationOverlay';

interface LogEntry {
  id: string;
  text: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
}

export default function App() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [activeSimulation, setActiveSimulation] = useState<SimulationType>(null);

  const addLog = useCallback((text: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      text,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour12: false }),
    };
    setLogs(prev => [...prev, newLog].slice(-50));
  }, []);

  const handleExecute = (type: SimulationType) => {
    if (!type) return;
    
    addLog(`INITIATING PAYLOAD: ${type.toUpperCase()}`, 'warning');
    addLog(`Loading exploit modules...`, 'info');
    
    setTimeout(() => {
      addLog(`Exploit modules loaded. Bypassing local security...`, 'info');
    }, 500);

    setTimeout(() => {
      addLog(`Security bypassed. Executing payload...`, 'success');
      setActiveSimulation(type);
    }, 1500);
  };

  return (
    <div className="h-screen w-screen dashboard-bg grid grid-cols-[280px_1fr] grid-rows-[80px_1fr_180px] gap-4 p-5 relative overflow-hidden">
      <div className="scanline" />
      
      {/* Header */}
      <header className="col-span-2 flex items-center justify-between px-5 bg-cyber-panel border-b border-cyber-cyan shadow-glow relative z-10">
        <div className="text-2xl font-extrabold tracking-[4px] text-cyber-cyan uppercase">
          CyberLab Simulator
        </div>
        <div className="font-mono text-sm text-cyber-green flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-green shadow-[0_0_5px_#39ff14]" />
          NODE_READY // SESSION: 0x44A12 // ENCRYPTION: AES-256
        </div>
      </header>

      {/* Sidebar */}
      <aside className="row-start-2 bg-cyber-panel border border-cyber-cyan/20 p-5 flex flex-col gap-6 relative z-10">
        <div>
          <div className="text-[12px] uppercase tracking-[2px] text-cyber-cyan mb-3 border-l-3 border-cyber-cyan pl-3">
            Target Parameters
          </div>
          <div className="bg-white/5 p-4 rounded">
            <p className="text-[11px] text-gray-500 uppercase">Virtual Host:</p>
            <p className="font-mono text-cyber-cyan">LAB-VIRTUAL-01</p>
            <p className="text-[11px] text-gray-500 uppercase mt-2">IP Address:</p>
            <p className="font-mono text-cyber-cyan">192.168.1.104</p>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="text-[12px] uppercase tracking-[2px] text-cyber-cyan mb-3 border-l-3 border-cyber-cyan pl-3">
            Resource Load
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                <div className="h-full bg-cyber-cyan w-[45%]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span>CPU: 45%</span>
                <span>RAM: 1.2GB</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="h-1 bg-black/40 rounded-full overflow-hidden">
                <div className="h-full bg-cyber-green w-[22%]" />
              </div>
              <div className="flex justify-between text-[10px] font-mono">
                <span>NET: 22%</span>
                <span>LAT: 12ms</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-[12px] uppercase tracking-[2px] text-cyber-cyan mb-3 border-l-3 border-cyber-cyan pl-3">
            Network Topology
          </div>
          <div className="bg-white/5 p-4 rounded aspect-square flex items-center justify-center relative">
            <div className="w-2 h-2 rounded-full bg-cyber-cyan shadow-[0_0_10px_#00f2ff] z-10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 border border-cyber-cyan/20 rounded-full animate-[ping_3s_linear_infinite]" />
              <div className="w-32 h-32 border border-cyber-cyan/10 rounded-full animate-[ping_5s_linear_infinite]" />
            </div>
            <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-cyber-green" />
            <div className="absolute bottom-6 right-8 w-1.5 h-1.5 rounded-full bg-cyber-red" />
            <div className="absolute top-1/2 right-4 w-1.5 h-1.5 rounded-full bg-cyber-orange" />
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-cyber-cyan/10 text-[10px] text-gray-500 font-mono">
          SYSTEM_USER: {process.env.USER || 'ANON_LAB_USER'}
        </div>
      </aside>

      {/* Main Terminal Area */}
      <main className="row-start-2 bg-black/60 border border-cyber-cyan/20 relative overflow-hidden z-10">
        <Terminal logs={logs} />
      </main>

      {/* Control Panel (Footer) */}
      <footer className="col-span-2 bg-cyber-panel border border-cyber-cyan/20 flex justify-around items-center px-10 relative z-10">
        {/* Ransomware Button */}
        <motion.button 
          whileHover={{ scale: 1.02, rotateX: 5, rotateY: -5, z: 20 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleExecute('ransomware')}
          className="w-[280px] h-[100px] bg-transparent border-2 border-cyber-orange text-cyber-orange flex flex-col justify-center items-center cursor-pointer transition-all hover:bg-cyber-orange/10 hover:shadow-[0_0_30px_rgba(255,140,0,0.5)] perspective-1000"
        >
          <span className="text-lg font-bold uppercase tracking-[2px]">Ransomware</span>
          <span className="text-[10px] mt-1 opacity-70">Simulate AES Data Locking</span>
        </motion.button>

        {/* Virus Button */}
        <motion.button 
          whileHover={{ scale: 1.02, rotateX: 5, rotateY: 0, z: 20 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleExecute('virus')}
          className="w-[280px] h-[100px] bg-transparent border-2 border-cyber-red text-cyber-red flex flex-col justify-center items-center cursor-pointer transition-all hover:bg-cyber-red/10 hover:shadow-[0_0_30px_rgba(255,62,62,0.5)] perspective-1000"
        >
          <span className="text-lg font-bold uppercase tracking-[2px]">Virus</span>
          <span className="text-[10px] mt-1 opacity-70">Inject Polymorphic Code</span>
        </motion.button>

        {/* RAC Button */}
        <motion.button 
          whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5, z: 20 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleExecute('rac')}
          className="w-[280px] h-[100px] bg-transparent border-2 border-cyber-green text-cyber-green flex flex-col justify-center items-center cursor-pointer transition-all hover:bg-cyber-green/10 hover:shadow-[0_0_30px_rgba(57,255,20,0.5)] perspective-1000"
        >
          <span className="text-lg font-bold uppercase tracking-[2px]">RAC (Remote)</span>
          <span className="text-[10px] mt-1 opacity-70">Establish Persistence Link</span>
        </motion.button>
      </footer>

      <SimulationOverlay 
        type={activeSimulation} 
        onClose={() => {
          setActiveSimulation(null);
          addLog(`Simulation terminated. Cleaning up traces...`, 'info');
        }} 
      />
    </div>
  );
}

