/**
 * Cambridge Primary English Grade 4 - Unit 4: Unlock Your Imagination
 * Week 1: Harry's Mad by Dick King-Smith (Sessions 4.1 - 4.4)
 * Curated from Learner's Book pp. 95-108 & Teacher Scheme of Work
 */

export const BOOK_ANATOMY = {
  title: "Harry's Mad",
  author: "Dick King-Smith",
  illustrator: "Colin McNaughton",
  genre: "Humorous Realistic Fiction",
  frontCover: {
    title: "Harry's Mad",
    authorTag: "By the author of The Sheep-Pig (Babe)",
    illustrationDesc: "A bright green African Grey parrot perched proudly next to a Monopoly board and a crossword puzzle.",
    keyPoints: [
      { id: 'fc-title', label: 'Title', clue: 'Gives the name of the book. Notice the pun: "Mad" is short for Madison the parrot, but also means crazy!' },
      { id: 'fc-author', label: 'Author', clue: 'Dick King-Smith — world-famous writer known for funny animal stories.' },
      { id: 'fc-art', label: 'Cover Illustration', clue: 'Shows the main character (the parrot) and gives clues about the funny, eccentric mood.' }
    ]
  },
  spine: {
    text: "HARRY'S MAD  •  DICK KING-SMITH  •  PUFFIN",
    clue: "The spine holds the pages together and lets you find the book easily when standing on a library shelf!"
  },
  backCover: {
    blurb: `When Great Uncle George dies, he leaves Harry a legacy. Harry is hoping for a fortune, or at least a computer, but all he gets is an African Grey parrot named Madison.

Harry is disgusted — until Madison opens his beak and says, "Pleased to meet you, Harry!"

Madison is no ordinary bird. He is articulate, plays Monopoly, helps with crossword puzzles, and has a ripping sense of humor. But when a cat burglar spots Madison's unique talent, can Harry protect his most cherished feathered friend?`,
    reviewQuote: '"A hilarious, heart-warming story... pure comic genius!" — The Times',
    barcodeInfo: 'ISBN 978-0-141-33230-7 • Ages 7–10 • Fiction',
    keyPoints: [
      { id: 'bc-blurb', label: 'The Blurb', clue: 'A short summary printed on the back cover. It hooks the reader by revealing the hook (a talking parrot) WITHOUT giving away the ending!' },
      { id: 'bc-quote', label: 'Reviewer Quote', clue: 'Quotes from newspapers or other authors (like The Times) praising the book to build reader trust.' },
      { id: 'bc-barcode', label: 'Barcode & Age Guide', clue: 'Contains the ISBN catalog number and helps parents & teachers pick the right age bracket.' }
    ]
  }
};

export const STORY_VOCABULARY_QUESTIONS = [
  // Core Book Choosing Terms (Session 4.1 / LB p. 95)
  {
    id: 'sv-1',
    category: 'definitions',
    question: 'What is the special name for the short summary printed on the back cover that tempts you to read a book?',
    correct: 'Blurb',
    options: ['Blurb', 'Plot', 'Spine', 'Glossary'],
    explanation: 'A blurb tells what the book is about without spoiling the ending!',
    lbRef: 'LB p. 95 Key Word'
  },
  {
    id: 'sv-2',
    category: 'definitions',
    question: 'Which word describes the sequence, chain of events, or "recipe" of what happens from the start of a story to the end?',
    correct: 'Plot',
    options: ['Plot', 'Genre', 'Setting', 'Dialogue'],
    explanation: 'The plot is the storyline: Introduction → Build-up → Climax → Resolution → Ending.',
    lbRef: 'LB p. 101 Getting Started'
  },
  {
    id: 'sv-3',
    category: 'definitions',
    question: 'Which term refers to the style, category, or type of story (e.g. fantasy, mystery, humorous fiction)?',
    correct: 'Genre',
    options: ['Genre', 'Publisher', 'Author', 'Theme'],
    explanation: 'Genre comes from the French word for "kind" or "type".',
    lbRef: 'LB p. 95'
  },
  {
    id: 'sv-4',
    category: 'definitions',
    question: 'Where and when a story takes place is called the...',
    correct: 'Setting',
    options: ['Setting', 'Plot', 'Blurb', 'Resolution'],
    explanation: 'The setting includes the location, time period, and atmospheric weather.',
    lbRef: 'LB p. 95'
  },
  {
    id: 'sv-5',
    category: 'definitions',
    question: 'The people, animals, or creatures who take part in the action of a story are the...',
    correct: 'Characters',
    options: ['Characters', 'Narrators', 'Reviewers', 'Publishers'],
    explanation: 'Characters drive the action — like Harry Holdsworth and Madison the parrot!',
    lbRef: 'LB p. 95'
  },
  {
    id: 'sv-6',
    category: 'definitions',
    question: 'What punctuation marks must go around the exact words spoken out loud by a character?',
    correct: 'Speech Marks (" " or \' \')',
    options: ['Speech Marks (" " or \' \')', 'Exclamation Marks (!)', 'Brackets ( )', 'Commas (,)'],
    explanation: 'Speech marks (also called inverted commas) hug direct spoken words!',
    lbRef: 'LB p. 98 Language Focus'
  },
  {
    id: 'sv-7',
    category: 'definitions',
    question: 'What is a "Legacy" in a story (like the one Great Uncle George left Harry)?',
    correct: 'Money or property left to someone in a will',
    options: [
      'Money or property left to someone in a will',
      'A very rare, expensive bird cage',
      'A secret map drawn on parchment',
      'A magical riddle that cannot be solved'
    ],
    explanation: 'Uncle George died and left Harry a legacy — which turned out to be Mad the parrot!',
    lbRef: 'LB p. 97 Glossary'
  },

  // Genre Detective (Matching clues to genres)
  {
    id: 'gd-1',
    category: 'genres',
    question: 'A story where a regular schoolboy inherits a talking African Grey parrot that cheats at Monopoly and tells jokes belongs to which genre?',
    correct: 'Humorous Realistic Fiction',
    options: ['Humorous Realistic Fiction', 'Science Fiction', 'Non-Fiction Report', 'Fairy Tale'],
    explanation: 'It is set in the real modern world with funny, comedic twists!',
    lbRef: 'LB p. 96 Activity 1d'
  },
  {
    id: 'gd-2',
    category: 'genres',
    question: 'A text that contains diagrams, bullet points, and verified scientific facts about Antarctic emperor penguins belongs to which genre?',
    correct: 'Non-Fiction Information Text',
    options: ['Non-Fiction Information Text', 'Historical Fiction', 'Fantasy Story', 'Fable'],
    explanation: 'Non-fiction presents real facts and information without fictional plot.',
    lbRef: 'Term 1 Revision Connection'
  },
  {
    id: 'gd-3',
    category: 'genres',
    question: 'A short animal tale where a Scorpion asks a Frog for a ride across a river, ending with a life lesson (moral), is a...',
    correct: 'Fable',
    options: ['Fable', 'Biography', 'Mystery', 'Play Script'],
    explanation: 'Fables use animal characters to teach a moral lesson (like Aesop).',
    lbRef: 'LB p. 124 Preview'
  },
  {
    id: 'gd-4',
    category: 'genres',
    question: 'A tale featuring a young girl climbing foggy mountain peaks to ask an ancient Silver Ice Dragon for snow is...',
    correct: 'Fantasy Fiction',
    options: ['Fantasy Fiction', 'Realistic Fiction', 'News Report', 'Recipe'],
    explanation: 'Fantasy includes magical creatures, mythical worlds, and impossible powers.',
    lbRef: 'Paper 2 Mountain Dragon'
  },

  // 5 Plot Mountain Stages (Session 4.3 / LB pp. 101-105)
  {
    id: 'pm-1',
    category: 'plot',
    question: 'In the Story Mountain recipe, what is the VERY FIRST stage called where we meet Harry and learn about Uncle George?',
    correct: 'Introduction (Exposition)',
    options: ['Introduction (Exposition)', 'Climax', 'Resolution', 'Build-Up'],
    explanation: 'The introduction sets the scene and introduces the main characters.',
    lbRef: 'LB p. 102 Story Mountain'
  },
  {
    id: 'pm-2',
    category: 'plot',
    question: 'Which stage of the plot comes right in the middle, where the biggest problem or exciting turning point happens?',
    correct: 'Complication / Climax',
    options: ['Complication / Climax', 'Introduction', 'Resolution', 'Ending'],
    explanation: 'The climax is the peak of excitement or maximum trouble in the story!',
    lbRef: 'LB p. 102 Story Mountain'
  },
  {
    id: 'pm-3',
    category: 'plot',
    question: 'What is the "Resolution" stage of a story?',
    correct: 'How the problem or crisis is solved',
    options: [
      'How the problem or crisis is solved',
      'The opening sentence of the blurb',
      'The list of words at the back of the book',
      'The time and place where the characters live'
    ],
    explanation: 'Resolution means finding a solution to the complication.',
    lbRef: 'LB p. 102'
  },
  {
    id: 'pm-4',
    category: 'plot',
    question: 'Put these 3 plot stages in chronological order: [A] Resolution, [B] Introduction, [C] Climax',
    correct: 'Introduction → Climax → Resolution',
    options: [
      'Introduction → Climax → Resolution',
      'Climax → Introduction → Resolution',
      'Resolution → Climax → Introduction',
      'Introduction → Resolution → Climax'
    ],
    explanation: 'First Introduction, then the peak Climax, followed by the Resolution!',
    lbRef: 'Thursday Checkpoint Q1'
  },

  // Vocabulary Detective: Shades of Meaning & Homophones (Sessions 4.2 & 4.4)
  {
    id: 'voc-1',
    category: 'glossary',
    question: 'Order these words on the "Funny Scale" from weakest to strongest intensity: hilarious, amusing, hysterical',
    correct: '1. Amusing → 2. Hilarious → 3. Hysterical',
    options: [
      '1. Amusing → 2. Hilarious → 3. Hysterical',
      '1. Hysterical → 2. Hilarious → 3. Amusing',
      '1. Hilarious → 2. Amusing → 3. Hysterical',
      '1. Amusing → 2. Hysterical → 3. Hilarious'
    ],
    explanation: 'Amusing = mildly funny; Hilarious = very funny; Hysterical = uncontrollably funny!',
    lbRef: 'LB p. 99 Shades of Meaning'
  },
  {
    id: 'voc-2',
    category: 'glossary',
    question: 'Choose the correct homophone: "Madison the parrot spoke in a low, _________ whisper so the burglar wouldn\'t hear."',
    correct: 'hoarse (rough voice)',
    options: ['hoarse (rough voice)', 'horse (the four-legged animal)'],
    explanation: 'Hoarse with an "oa" means raspy or rough sounding voice. Horse is an animal!',
    lbRef: 'LB p. 106 Writing Tip'
  },
  {
    id: 'voc-3',
    category: 'glossary',
    question: 'In the blurb, Madison says, "Pleased to meet you, buddy!" What is the British English equivalent for the American slang word "buddy"?',
    correct: 'Friend / Pal / Mate',
    options: ['Friend / Pal / Mate', 'Uncle', 'Teacher', 'Doctor'],
    explanation: 'Buddy is informal American slang for friend or pal.',
    lbRef: 'LB p. 106 Activity 2'
  },
  {
    id: 'voc-4',
    category: 'glossary',
    question: 'If something is described as "cherished" (like Harry\'s pet parrot), what does it mean?',
    correct: 'Deeply loved, protected, and valued',
    options: ['Deeply loved, protected, and valued', 'Very cheap and broken', 'Loud and annoying', 'Hidden in the attic'],
    explanation: 'Cherished means held dear and cared for with great affection.',
    lbRef: 'LB p. 97 Glossary'
  }
];

export const PLOT_MOUNTAIN_STAGES = [
  {
    stage: 1,
    name: 'Introduction (Beginning)',
    color: '#3B82F6',
    harrysMadEvent: 'Great Uncle George passes away in America and leaves Harry Holdsworth a mystery legacy in his will.',
    definition: 'Introduces the characters, setting, and ordinary world before the adventure starts.'
  },
  {
    stage: 2,
    name: 'Build-Up (Development)',
    color: '#8B5CF6',
    harrysMadEvent: 'A heavy wooden crate arrives at Harry’s house in England. Harry expects gold or a computer, but finds an African Grey parrot.',
    definition: 'Events start moving; excitement and curiosity build up as the characters face new surprises.'
  },
  {
    stage: 3,
    name: 'Complication / Climax (Peak)',
    color: '#EF4444',
    harrysMadEvent: 'Madison opens his beak and speaks fluent English! He plays Monopoly, does crosswords, but attracts the attention of a thief.',
    definition: 'The highest point of tension, drama, or biggest problem that the characters must overcome.'
  },
  {
    stage: 4,
    name: 'Resolution (Solution)',
    color: '#F59E0B',
    harrysMadEvent: 'Harry and Mad work together using Mad’s human-like voice and wits to outsmart trouble and keep the family safe.',
    definition: 'The problem is tackled and solved; loose ends start coming together.'
  },
  {
    stage: 5,
    name: 'Ending (Wrap-Up)',
    color: '#10B981',
    harrysMadEvent: 'Mad is officially part of the Holdsworth family — a cherished companion worth far more than any gold fortune.',
    definition: 'Shows how the characters have changed and where their lives stand now.'
  }
];
