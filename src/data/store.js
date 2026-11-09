import { v4 as uuidv4 } from 'uuid';

const DEFAULT_DEVICES = [
  { id: 'alliteration', name: 'Alliteration', description: 'Same starting sounds', color: '#10b981', icon: 'Type' },
  { id: 'riddle', name: 'Riddle', description: 'A guessing brain-teaser', color: '#8b5cf6', icon: 'HelpCircle' },
  { id: 'kenning', name: 'Kenning', description: 'Two-word poetic phrase', color: '#f59e0b', icon: 'Swords' }
];

const DEFAULT_CARDS = [
  // Alliteration
  { id: 'c1', text: '"Seven slithering snakes slid slowly"', deviceId: 'alliteration' },
  { id: 'c2', text: '"Peter Piper picked a peck of pickled peppers"', deviceId: 'alliteration' },
  { id: 'c7', text: '"Big brown bears bake bread"', deviceId: 'alliteration' },
  { id: 'c8', text: '"Crazy cats catch cold crabs"', deviceId: 'alliteration' },
  { id: 'c9', text: '"Dancing dogs dig deep"', deviceId: 'alliteration' },
  { id: 'c10', text: '"Fred fried frogs legs on Friday"', deviceId: 'alliteration' },
  
  // Riddles
  { id: 'c3', text: 'I have keys but no locks. What am I? (A piano)', deviceId: 'riddle' },
  { id: 'c4', text: 'I have a tail, a head, but no body. What am I? (A coin)', deviceId: 'riddle' },
  { id: 'c11', text: 'I am tall when I am young, and short when I am old. What am I? (A pencil)', deviceId: 'riddle' },
  { id: 'c12', text: 'What has hands but cannot clap? (A clock)', deviceId: 'riddle' },
  { id: 'c13', text: 'What has legs, but doesn’t walk? (A table)', deviceId: 'riddle' },
  { id: 'c14', text: 'What has to be broken before you can use it? (An egg)', deviceId: 'riddle' },

  // Kennings
  { id: 'c5', text: 'Bone-house (Meaning: A body)', deviceId: 'kenning' },
  { id: 'c6', text: 'Wave-traveler (Meaning: A boat)', deviceId: 'kenning' },
  { id: 'c15', text: 'Sky-candle (Meaning: The sun)', deviceId: 'kenning' },
  { id: 'c16', text: 'Book-worm (Meaning: A person who loves to read)', deviceId: 'kenning' },
  { id: 'c17', text: 'Sea-wood (Meaning: A ship)', deviceId: 'kenning' },
  { id: 'c18', text: 'Word-hoard (Meaning: Vocabulary/Mind)', deviceId: 'kenning' }
];

// Initialize DB
const existingDevices = JSON.parse(localStorage.getItem('edu_devices')) || [];
const mergedDevices = [...existingDevices, ...DEFAULT_DEVICES.filter(d => !existingDevices.some(e => e.id === d.id))];
localStorage.setItem('edu_devices', JSON.stringify(mergedDevices));

const existingCards = JSON.parse(localStorage.getItem('edu_cards')) || [];
const mergedCards = [...existingCards, ...DEFAULT_CARDS.filter(c => !existingCards.some(e => e.id === c.id))];
localStorage.setItem('edu_cards', JSON.stringify(mergedCards));

export const getDevices = () => JSON.parse(localStorage.getItem('edu_devices'));
export const getCards = () => JSON.parse(localStorage.getItem('edu_cards'));

export const addDevice = (device) => {
  const devices = getDevices();
  const newDevice = { ...device, id: uuidv4() };
  devices.push(newDevice);
  localStorage.setItem('edu_devices', JSON.stringify(devices));
  return newDevice;
};

export const deleteDevice = (id) => {
  const devices = getDevices().filter(d => d.id !== id);
  localStorage.setItem('edu_devices', JSON.stringify(devices));
  // cascade delete
  const cards = getCards().filter(c => c.deviceId !== id);
  localStorage.setItem('edu_cards', JSON.stringify(cards));
};

export const addCard = (card) => {
  const cards = getCards();
  const newCard = { ...card, id: uuidv4() };
  cards.push(newCard);
  localStorage.setItem('edu_cards', JSON.stringify(cards));
  return newCard;
};

export const deleteCard = (id) => {
  const cards = getCards().filter(c => c.id !== id);
  localStorage.setItem('edu_cards', JSON.stringify(cards));
};
