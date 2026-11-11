import React, { createContext, useContext, useState, useEffect } from 'react';

export const DEFAULT_SQUADS = [
  {
    id: 'brainy',
    name: 'Team Brainy',
    title: 'The Thinkers & Logic Masters',
    mascot: 'Brainy Smurf',
    image: '/smurf/brainy_smurf.jpg',
    accentColor: '#EF4444',
    bgLight: '#FEE2E2',
    bgDark: '#2A0A10',
    ribbonColor: '#F5C0A1',
    borderLight: '#F87171',
    chant: "Who's got the brains? BRAINY! Think it, solve it, smurf it, done!",
    specialty: 'Grammar Evidence, Deep Analytical Logic & Vocabulary Precision',
    berries: 0,
    members: [
      { id: 'b1', name: 'Alawia Abdelgader', role: 'Squad Anchor', badge: '★ ANCHOR' },
      { id: 'b2', name: 'Hamid Tilal', role: 'Grammar Scout', badge: '✦ SCOUT' },
      { id: 'b3', name: 'Dania Khalid', role: 'Logic Master', badge: '★ LOGIC MASTER' },
      { id: 'b4', name: 'Maram Badr', role: 'Creative Scribe (w/ Shadow)', badge: '✦ SCRIBE' }
    ]
  },
  {
    id: 'dreamy',
    name: 'Team Dreamy',
    title: 'The Imaginers & Creative Storytellers',
    mascot: 'Dreamy Smurf',
    image: '/smurf/dreamy_smurf.jpg',
    accentColor: '#A855F7',
    bgLight: '#F3E8FF',
    bgDark: '#1D0C38',
    ribbonColor: '#F1DFFE',
    borderLight: '#C084FC',
    chant: "Close your eyes and dream it true, Dreamy, Dreamy, we’re coming through!",
    specialty: 'Vivid Adjectives, Rich Imagination & Expressive World-Building',
    berries: 0,
    members: [
      { id: 'd1', name: 'Raghad Taha', role: 'Squad Anchor', badge: '★ ANCHOR' },
      { id: 'd2', name: 'Dan Yazeid', role: 'Idea Spark', badge: '✦ IDEA SPARK' },
      { id: 'd3', name: 'Khalid Motaz', role: 'Story Scribe', badge: '✦ SCRIBE' },
      { id: 'd4', name: 'Nadine Tarig', role: 'Focus Anchor', badge: '✦ FOCUS' },
      { id: 'd5', name: 'Yuanna Mamdoh', role: 'Team Builder', badge: '✦ BUILDER' }
    ]
  },
  {
    id: 'harmony',
    name: 'Team Harmony',
    title: 'The Team Players & Voice Masters',
    mascot: 'Harmony Smurf',
    image: '/smurf/harmony_smurf.jpg',
    accentColor: '#10B981',
    bgLight: '#D1FAE5',
    bgDark: '#07291B',
    ribbonColor: '#C7E0CD',
    borderLight: '#34D399',
    chant: "Many voices, one big sound, Harmony, Harmony, best around!",
    specialty: 'Oracy, Poetry, Rhythm & 100% Collaborative Squad Power',
    berries: 0,
    members: [
      { id: 'h1', name: 'Mennalla Ahmed (Menna)', role: 'Smurfette & Anchor', badge: '👑 CAPTAIN' },
      { id: 'h2', name: 'Ibrahim Ahmed', role: 'Calm Anchor', badge: '★ ANCHOR' },
      { id: 'h3', name: 'Layan Gurashi', role: 'Word Finder', badge: '✦ WORD FINDER' },
      { id: 'h4', name: 'Nagi Mohamed', role: 'Energy Dynamo', badge: '✦ DYNAMO' },
      { id: 'h5', name: 'Taleen Naser (Talin)', role: 'Poetry Lead', badge: '✦ POETRY LEAD' }
    ]
  },
  {
    id: 'lucky',
    name: 'Team Lucky',
    title: 'The Never-Give-Uppers & Comeback Kings',
    mascot: 'Lucky Smurf',
    image: null,
    accentColor: '#F97316',
    bgLight: '#FFEDD5',
    bgDark: '#2E1306',
    ribbonColor: '#FCE3A1',
    borderLight: '#FB923C',
    chant: "When the road is rough and the going gets tricky, who saves the day? It’s TEAM LUCKY!",
    specialty: 'Resilience, Bounce-Back & Turning Mistakes Into Gold!',
    berries: 0,
    members: [
      { id: 'l1', name: 'Yousif Waleed (Youssef)', role: 'Papa Smurf & Anchor', badge: '👑 CAPTAIN' },
      { id: 'l2', name: 'Bader Altahir', role: 'Co-Anchor', badge: '★ CO-ANCHOR' },
      { id: 'l3', name: 'Hala Fwaz', role: 'Energy Spark', badge: '✦ ENERGY SPARK' },
      { id: 'l4', name: 'Yazan Musab', role: 'Discussion Star', badge: '✦ STAR' },
      { id: 'l5', name: 'Tala Naser', role: 'Careful Writer', badge: '✦ WRITER' }
    ]
  }
];

export const CLASS_CAPTAINS = [
  {
    roleId: 'papa',
    title: '👑 Papa Smurf (Boy Captain)',
    name: 'Yousif Waleed Mustafa',
    traits: 'Respected, exceptionally calm, wise, and grounded. The anchor who keeps the whole village steady during intense classroom challenges.'
  },
  {
    roleId: 'smurfette',
    title: '👑 Smurfette (Girl Captain)',
    name: 'Mennalla Ahmed Hassan (Menna)',
    traits: 'Enthusiastic, brilliant, jolly, and proactive. The energetic spark who rallies every squad to do their best and never leave a friend behind.'
  }
];

export const ANCIENT_VILLAGE_CODE = [
  {
    law: 'LAW 01',
    title: 'The "Oops Rule"',
    subtitle: 'Mistakes are Superpowers!',
    desc: 'In this village, we celebrate trying! If your squad makes a mistake and spots how to fix it, you earn an OOPS BONUS BERRY! Never be afraid of getting things wrong.'
  },
  {
    law: 'LAW 02',
    title: 'Permanent Points',
    subtitle: 'Berries Are Never Taken Away',
    desc: 'Points earned belong to your squad forever. We NEVER subtract berries for errors or slip-ups. In this village, we only climb forward together!'
  },
  {
    law: 'LAW 03',
    title: 'Shared Village Reward',
    subtitle: 'When The Village Wins, All Win!',
    desc: 'The squad with the highest berries earns the weekly Crown, but when the 20-berry meter is full, the ENTIRE class celebrates Friday together!'
  }
];

const LOCAL_STORAGE_KEY = 'pertato_smurf_village_data_v1';

// Synthesizes a quick retro 8-bit coin sound via Web Audio API
function playBerrySound(isOops = false) {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = isOops ? 'triangle' : 'sine';
    const now = ctx.currentTime;

    if (isOops) {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(1320, now + 0.28);
    } else {
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880, now + 0.08); // A5
    }

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isOops ? 0.32 : 0.22));

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + (isOops ? 0.32 : 0.22));
  } catch {
    // AudioContext blocked or not supported
  }
}

const VillageContext = createContext(null);

export function VillageProvider({ children }) {
  const [squads, setSquads] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Ignore error
    }
    return DEFAULT_SQUADS;
  });

  const [history, setHistory] = useState([]);
  const [activeCurseAlert, setActiveCurseAlert] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(squads));
    } catch {
      // Ignore write errors
    }
  }, [squads]);

  // Total berries toward the 20-berry meter
  const totalBerries = squads.reduce((sum, s) => sum + (s.berries || 0), 0);
  const targetBerries = 20;
  const isCurseBroken = totalBerries >= targetBerries;

  // Award berries (strictly positive, following Law 02)
  const awardBerries = (squadId, amount = 1, reason = 'Quest Solved') => {
    if (amount <= 0) return; // Law 02: Never subtract points

    playBerrySound(reason.toLowerCase().includes('oops'));

    setSquads((prev) =>
      prev.map((sq) => {
        if (sq.id === squadId) {
          const newTotal = (sq.berries || 0) + amount;
          return { ...sq, berries: newTotal };
        }
        return sq;
      })
    );

    const targetSquad = squads.find((s) => s.id === squadId);
    const entry = {
      id: Date.now() + Math.random(),
      squadId,
      squadName: targetSquad ? targetSquad.name : squadId,
      amount,
      reason,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setHistory((prev) => [entry, ...prev.slice(0, 19)]);

    // Check if Gargamel curse was just broken
    if (totalBerries + amount >= targetBerries && totalBerries < targetBerries) {
      setActiveCurseAlert('🎉 VICTORY! GARGAMEL’S CURSE IS BROKEN! Friday Movie & Story Picnic Unlocked!');
    }
  };

  // Reset weekly berries
  const resetWeeklyBerries = () => {
    setSquads((prev) => prev.map((sq) => ({ ...sq, berries: 0 })));
    setHistory([]);
    setActiveCurseAlert(null);
  };

  // Update squad roster
  const updateSquadRoster = (squadId, newMembers) => {
    setSquads((prev) =>
      prev.map((sq) => (sq.id === squadId ? { ...sq, members: newMembers } : sq))
    );
  };

  // Add a member
  const addMember = (squadId, name, role = 'Member', badge = '✦ SQUAD') => {
    if (!name.trim()) return;
    setSquads((prev) =>
      prev.map((sq) => {
        if (sq.id === squadId) {
          const newMember = {
            id: `m_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
            name: name.trim(),
            role,
            badge
          };
          return { ...sq, members: [...sq.members, newMember] };
        }
        return sq;
      })
    );
  };

  // Remove a member
  const removeMember = (squadId, memberId) => {
    setSquads((prev) =>
      prev.map((sq) => {
        if (sq.id === squadId) {
          return { ...sq, members: sq.members.filter((m) => m.id !== memberId) };
        }
        return sq;
      })
    );
  };

  // Reset all squads and rosters to original defaults
  const resetToDefaultRoster = () => {
    setSquads(DEFAULT_SQUADS);
    setHistory([]);
  };

  return (
    <VillageContext.Provider
      value={{
        squads,
        totalBerries,
        targetBerries,
        isCurseBroken,
        history,
        activeCurseAlert,
        setActiveCurseAlert,
        awardBerries,
        resetWeeklyBerries,
        updateSquadRoster,
        addMember,
        removeMember,
        resetToDefaultRoster,
        captains: CLASS_CAPTAINS,
        ancientCode: ANCIENT_VILLAGE_CODE
      }}
    >
      {children}
    </VillageContext.Provider>
  );
}

export function useVillage() {
  const context = useContext(VillageContext);
  if (!context) {
    throw new Error('useVillage must be used within a VillageProvider');
  }
  return context;
}

