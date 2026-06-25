'use client';

import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, ShieldAlert } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

interface AutoCommand {
  cmd: string;
  output: TerminalLine[];
}

export default function Terminal() {
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isUserActive, setIsUserActive] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const activeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cycleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Live autotype command registry
  const autoCommands: AutoCommand[] = [
    {
      cmd: 'whoami',
      output: [{ text: 'Sholly', type: 'output' }]
    },
    {
      cmd: 'role',
      output: [
        { text: 'Cybersecurity Engineer', type: 'output' },
        { text: 'Software Developer', type: 'output' }
      ]
    },
    {
      cmd: 'skills',
      output: [
        { text: 'Threat Hunting', type: 'output' },
        { text: 'DFIR', type: 'output' },
        { text: 'Cloud Security', type: 'output' },
        { text: 'Next.js', type: 'output' },
        { text: 'Python', type: 'output' }
      ]
    },
    {
      cmd: 'research',
      output: [
        { text: 'AI Security', type: 'output' },
        { text: 'Cyber Threat Intelligence', type: 'output' },
        { text: 'Malware Analysis', type: 'output' }
      ]
    }
  ];

  // Primary command execution mapping
  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    setHistory(prev => {
      const next = [...prev, cmd];
      setHistoryIndex(next.length);
      return next;
    });

    const inputLine: TerminalLine = { text: `sholly@cybersec:~$ ${cmd}`, type: 'input' };
    let outputLines: TerminalLine[] = [];

    if (trimmed === '') {
      setLines(prev => [...prev.filter(Boolean), inputLine]);
      return;
    }

    switch (trimmed) {
      case 'help':
        outputLines = [
          { text: 'Authorized Console Commands:', type: 'success' },
          { text: '  about     - Learn more about Sholly\'s background and target objectives', type: 'output' },
          { text: '  skills    - List core competencies in security operations & software development', type: 'output' },
          { text: '  projects  - Survey security audits and systems engineering work', type: 'output' },
          { text: '  certs     - Output verified technical credentials and academic honors', type: 'output' },
          { text: '  socials   - Retrieve secure communication links and network handles', type: 'output' },
          { text: '  decrypt   - Run threat intelligence payload decryption simulation', type: 'output' },
          { text: '  sudo      - Request superuser escalation privileges', type: 'output' },
          { text: '  clear     - Wipe display logs from console terminal', type: 'output' },
        ];
        break;
      case 'about':
        outputLines = [
          { text: 'CLASSIFICATION: CYBERSECURITY ENGINEER & SOFTWARE DEVELOPER', type: 'success' },
          { text: '--------------------------------------------------', type: 'output' },
          { text: 'Sholly operates at the nexus of secure software engineering and defensive cybersecurity.', type: 'output' },
          { text: 'Focus areas: Threat hunting, digital forensics, incident response (DFIR), and secure full-stack development.', type: 'output' },
          { text: 'Academic profile: Mentored 20+ international students and analyzed 50+ research papers to bridge theory and defense.', type: 'output' },
        ];
        break;
      case 'skills':
        outputLines = [
          { text: 'Threat Hunting', type: 'output' },
          { text: 'DFIR', type: 'output' },
          { text: 'Cloud Security', type: 'output' },
          { text: 'Next.js', type: 'output' },
          { text: 'Python', type: 'output' }
        ];
        break;
      case 'whoami':
        outputLines = [{ text: 'Sholly', type: 'output' }];
        break;
      case 'role':
        outputLines = [
          { text: 'Cybersecurity Engineer', type: 'output' },
          { text: 'Software Developer', type: 'output' }
        ];
        break;
      case 'research':
        outputLines = [
          { text: 'AI Security', type: 'output' },
          { text: 'Cyber Threat Intelligence', type: 'output' },
          { text: 'Malware Analysis', type: 'output' }
        ];
        break;
      case 'projects':
        outputLines = [
          { text: 'Active Repositories & Security Projects:', type: 'success' },
          { text: '  1. AI Malware Detection System - ML-based network and host-level binary behavior scanner', type: 'output' },
          { text: '  2. Phishing Detection Platform - Real-time email threat vector parsing & reporting tool', type: 'output' },
          { text: '  3. IoT Threat Response (SOC)   - Botnet incident response prototype analyzing packet anomalies', type: 'output' },
          { text: '  * Note: Use interactive drawers in the Projects section to review full threat models.', type: 'output' },
        ];
        break;
      case 'certs':
        outputLines = [
          { text: 'Verified Certificates & Achievements:', type: 'success' },
          { text: '  [+] CompTIA Security+ - Core infrastructure & security concepts', type: 'output' },
          { text: '  [+] AWS Cloud Practitioner - Secure cloud environments & identity policy rules', type: 'output' },
          { text: '  [+] Google Cybersecurity Professional - Practical threat analyst tools & SIEM tools', type: 'output' },
          { text: '  [+] Academic Mentor Badge - Outstanding support for international research researchers', type: 'output' },
        ];
        break;
      case 'socials':
        outputLines = [
          { text: 'Secure Channels Available:', type: 'success' },
          { text: '  GitHub   : https://github.com/JaparmySholly', type: 'output' },
          { text: '  LinkedIn : https://linkedin.com/in/japarmysholly/', type: 'output' },
          { text: '  Twitter  : https://x.com/japarmysholly', type: 'output' },
          { text: '  Email    : mailto:japarmysholly@gmail.com', type: 'output' },
        ];
        break;
      case 'clear':
        setLines([]);
        return;
      case 'sudo':
        outputLines = [
          { text: 'Permission denied: Sholly does not compromise root. Nice try!', type: 'error' },
        ];
        break;
      case 'sudo hack':
      case 'hack':
        outputLines = [
          { text: 'Initiating honeypot intrusion detection warning... ', type: 'error' },
          { text: '[ALARM] System activity logged. Access denied. Port scanner blocked.', type: 'error' },
        ];
        break;
      case 'decrypt':
        setIsDecrypting(true);
        outputLines = [
          { text: 'Downloading raw PCAP packet stream for analysis...', type: 'output' },
        ];
        break;
      default:
        outputLines = [
          { text: `Error: Command "${cmd}" unrecognized. Type "help" for a list of available parameters.`, type: 'error' },
        ];
        break;
    }

    setLines(prev => [...prev.filter(Boolean), inputLine, ...outputLines]);
  };

  // Run decryption mock animation
  useEffect(() => {
    if (!isDecrypting) return;

    let count = 0;
    const interval = setInterval(() => {
      const hashes = [
        'MD5: 5eb63bbbe01eeed093cb22bb8f5acdc3',
        'SHA256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
        'Payload: [INJECT] Port-scanning attempt intercepted',
        'Status: Processing dynamic memory analysis buffer...',
        'Threat Type: Cobalt Strike Botnet C2 Agent identified',
      ];

      const textToAppend = `[CRACKING] ${hashes[count % hashes.length]}`;
      setLines(prev => [
        ...prev.filter(Boolean),
        { text: textToAppend, type: 'output' }
      ]);

      count++;
      if (count > 5) {
        clearInterval(interval);
        setIsDecrypting(false);
        setLines(prev => [
          ...prev.filter(Boolean),
          { text: 'SUCCESS: Decrypted Threat Matrix. Host-based signatures isolated and blocked.', type: 'success' }
        ]);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isDecrypting]);

  // Main Live Autotyping sequence effect loop
  useEffect(() => {
    if (isUserActive) return;

    let cmdIdx = 0;
    
    const runSequence = () => {
      if (isUserActive) return;
      
      const current = autoCommands[cmdIdx];
      let charIdx = 0;
      setInput('');

      const typeChar = () => {
        if (isUserActive) return;
        if (charIdx < current.cmd.length) {
          setInput(prev => prev + current.cmd[charIdx]);
          charIdx++;
          typingTimerRef.current = setTimeout(typeChar, 80);
        } else {
          // Pause briefly after typing before executing
          typingTimerRef.current = setTimeout(() => {
            if (isUserActive) return;
            
            // Execute simulated console command
            const inputLine: TerminalLine = { text: `sholly@cybersec:~$ ${current.cmd}`, type: 'input' };
            setLines(prev => [...prev.filter(Boolean), inputLine, ...current.output]);
            setInput('');
            
            // Move to next sequence index
            cmdIdx++;
            if (cmdIdx < autoCommands.length) {
              cycleTimerRef.current = setTimeout(runSequence, 2000);
            } else {
              // End of registry: wait, clear screen, and loop cycle
              cycleTimerRef.current = setTimeout(() => {
                if (isUserActive) return;
                setLines([]);
                cmdIdx = 0;
                cycleTimerRef.current = setTimeout(runSequence, 300);
              }, 4000);
            }
          }, 400);
        }
      };

      typingTimerRef.current = setTimeout(typeChar, 500);
    };

    // Auto-boot logs sequence
    const bootSequence = [
      { text: 'Sholly Security Shell v1.0.2 [Loaded Securely]', type: 'success' as const },
      { text: 'Establishing link to secure database... OK', type: 'output' as const },
      { text: 'Type "help" to view a list of authorized console commands.', type: 'output' as const },
    ];

    setLines([]);
    let bootIdx = 0;

    const runBoot = () => {
      if (isUserActive) return;
      if (bootIdx < bootSequence.length) {
        setLines(prev => [...prev.filter(Boolean), bootSequence[bootIdx]]);
        bootIdx++;
        cycleTimerRef.current = setTimeout(runBoot, 200);
      } else {
        cycleTimerRef.current = setTimeout(runSequence, 1000);
      }
    };

    runBoot();

    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    };
  }, [isUserActive]);

  // Handle user activity timeouts (pause autotyper for 10 seconds of idle)
  const resetUserActivityTimer = () => {
    if (activeTimerRef.current) clearTimeout(activeTimerRef.current);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);

    setIsUserActive(true);

    activeTimerRef.current = setTimeout(() => {
      setIsUserActive(false);
    }, 10000);
  };

  const handleUserInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    resetUserActivityTimer();
  };

  const handleUserFocus = () => {
    resetUserActivityTimer();
  };

  // Auto-scroll logic
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
    resetUserActivityTimer();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(history[nextIdx]);
      } else {
        setHistoryIndex(history.length);
        setInput('');
      }
    }
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (activeTimerRef.current) clearTimeout(activeTimerRef.current);
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      if (cycleTimerRef.current) clearTimeout(cycleTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full h-full lg:absolute lg:inset-0 flex flex-col rounded-xl border border-cyber-accent/30 bg-cyber-dark/85 backdrop-blur-md overflow-hidden shadow-glow-cyan/20">
      <style>{`
        @keyframes terminal-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .terminal-cursor {
          animation: terminal-blink 1s step-end infinite;
        }
      `}</style>
      {/* Window bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-cyber-dark border-b border-cyber-accent/15 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-cyber-accent/80 font-mono font-medium">
          <TerminalIcon size={12} />
          <span>sholly@cybersec:~</span>
        </div>
        <div className="w-12"></div>
      </div>

      {/* Output Console Log (flex-1 scrolls internally within stretched parent container bounds) */}
      <div 
        ref={containerRef}
        className="flex-1 min-h-0 overflow-y-auto p-4 font-mono text-xs sm:text-sm space-y-2 text-left scrollbar-thin select-text"
      >
        {lines.filter(Boolean).map((line, i) => (
          <div 
            key={i} 
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === 'input' 
                ? 'text-white' 
                : line.type === 'error'
                ? 'text-red-400 font-semibold flex items-start gap-1'
                : line.type === 'success'
                ? 'text-cyber-accent font-semibold'
                : 'text-gray-300'
            }`}
          >
            {line.type === 'error' && <ShieldAlert size={14} className="mt-0.5 flex-shrink-0" />}
            {line.text}
          </div>
        ))}
      </div>

      {/* Terminal Input Prompt */}
      <form 
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-3 bg-cyber-dark/40 border-t border-cyber-accent/15 font-mono text-xs sm:text-sm flex-shrink-0"
      >
        <span className="text-cyber-accent-secondary font-semibold select-none">sholly@cybersec:~$</span>
        
        {/* Mirror caret overlays standard input text with UNIX block caret */}
        <div className="flex-grow flex items-center relative font-mono">
          <input
            type="text"
            value={input}
            onChange={handleUserInputChange}
            onFocus={handleUserFocus}
            onKeyDown={handleKeyDown}
            className="w-full bg-transparent text-white outline-none border-none caret-transparent focus:ring-0 p-0 font-mono"
            placeholder={isUserActive ? 'Type a command (e.g. "help")...' : ''}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          {/* Custom blinking block cursor */}
          <div className="absolute left-0 pointer-events-none flex items-center">
            <span className="text-white invisible select-none whitespace-pre">{input}</span>
            <span className="w-1.5 h-3.5 bg-cyber-accent terminal-cursor"></span>
          </div>
        </div>
      </form>
    </div>
  );
}
