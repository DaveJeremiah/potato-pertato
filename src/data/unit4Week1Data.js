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
  // 1. Core Book Choosing Terms (Session 4.1 / LB p. 95) - Simple & Direct
  {
    id: 'sv-1',
    category: 'definitions',
    question: 'What is the short summary on the back cover of a book called?',
    correct: 'Blurb',
    options: ['Plot', 'Blurb', 'Spine', 'Glossary'],
    explanation: 'A blurb tells what the book is about without spoiling the ending!',
    lbRef: 'LB p. 95 Key Word'
  },
  {
    id: 'sv-2',
    category: 'definitions',
    question: 'What do we call what happens in a story from start to finish?',
    correct: 'Plot',
    options: ['Genre', 'Setting', 'Plot', 'Dialogue'],
    explanation: 'The plot is the sequence of events (the story recipe)!',
    lbRef: 'LB p. 101 Getting Started'
  },
  {
    id: 'sv-3',
    category: 'definitions',
    question: 'What is the category or type of story called (like comedy or fantasy)?',
    correct: 'Genre',
    options: ['Author', 'Genre', 'Publisher', 'Blurb'],
    explanation: 'Genre means the type or kind of story.',
    lbRef: 'LB p. 95'
  },
  {
    id: 'sv-4',
    category: 'definitions',
    question: 'Where and when a story takes place is the...',
    correct: 'Setting',
    options: ['Plot', 'Character', 'Setting', 'Theme'],
    explanation: 'The setting tells us where and when the story happens.',
    lbRef: 'LB p. 95'
  },
  {
    id: 'sv-5',
    category: 'definitions',
    question: 'The people or animals in a story are the...',
    correct: 'Characters',
    options: ['Characters', 'Settings', 'Authors', 'Narrators'],
    explanation: 'Characters are the people or animals in the action!',
    lbRef: 'LB p. 95'
  },
  {
    id: 'sv-6',
    category: 'definitions',
    question: 'Which punctuation marks go around spoken words?',
    correct: 'Speech Marks (" ")',
    options: ['Commas (,)', 'Speech Marks (" ")', 'Full Stops (.)', 'Question Marks (?)'],
    explanation: 'Speech marks (inverted commas) hug the words a character says out loud.',
    lbRef: 'LB p. 98 Language Focus'
  },
  {
    id: 'sv-7',
    category: 'definitions',
    question: 'Uncle George left Harry a "legacy". What is a legacy?',
    correct: 'A gift left to someone in a will',
    options: [
      'A noisy bird cage',
      'A gift left to someone in a will',
      'A secret treasure map',
      'A difficult riddle'
    ],
    explanation: 'A legacy is something given to you when an older relative passes away.',
    lbRef: 'LB p. 97 Glossary'
  },
  {
    id: 'sv-8',
    category: 'definitions',
    question: 'Where do you find the blurb on a book?',
    correct: 'On the back cover',
    options: ['On the front cover', 'On the spine', 'On the back cover', 'Inside the glossary'],
    explanation: 'Blurbs are printed on the back cover so shoppers can read them quickly!',
    lbRef: 'LB p. 95'
  },
  {
    id: 'sv-9',
    category: 'definitions',
    question: 'Who writes the words in a book?',
    correct: 'The Author',
    options: ['The Illustrator', 'The Author', 'The Publisher', 'The Reader'],
    explanation: 'Dick King-Smith is the author who wrote Harry’s Mad.',
    lbRef: 'LB p. 95'
  },
  {
    id: 'sv-10',
    category: 'definitions',
    question: 'Who draws the pictures on the book cover and pages?',
    correct: 'The Illustrator',
    options: ['The Character', 'The Author', 'The Illustrator', 'The Narrator'],
    explanation: 'Colin McNaughton is the illustrator who drew the parrot pictures.',
    lbRef: 'LB p. 95'
  },

  // 2. Genre Detective (Clues to Genres) - Simple & Fun
  {
    id: 'gd-1',
    category: 'genres',
    question: 'A boy gets a funny talking parrot that plays Monopoly. What genre is this?',
    correct: 'Humorous Fiction',
    options: ['Science Fiction', 'Humorous Fiction', 'Non-Fiction Report', 'Fairy Tale'],
    explanation: 'It is a funny, comedy adventure set in real life!',
    lbRef: 'LB p. 96 Activity 1d'
  },
  {
    id: 'gd-2',
    category: 'genres',
    question: 'A book with true facts and real photos about emperor penguins is...',
    correct: 'Non-Fiction',
    options: ['Fantasy', 'Non-Fiction', 'Fable', 'Poem'],
    explanation: 'Non-fiction gives real factual information.',
    lbRef: 'Term 1 Connection'
  },
  {
    id: 'gd-3',
    category: 'genres',
    question: 'A short animal story that teaches a life lesson (moral) is a...',
    correct: 'Fable',
    options: ['Fable', 'Mystery', 'Biography', 'News Report'],
    explanation: 'Fables (like The Scorpion and the Frog) teach moral lessons.',
    lbRef: 'LB p. 124 Preview'
  },
  {
    id: 'gd-4',
    category: 'genres',
    question: 'A story with flying dragons, wizards, and magic ice spells is...',
    correct: 'Fantasy Fiction',
    options: ['Realistic Fiction', 'Recipe', 'Fantasy Fiction', 'News Report'],
    explanation: 'Fantasy stories have magic and mythical creatures.',
    lbRef: 'Paper 2 Connection'
  },

  // 3. 5 Plot Mountain Stages (Session 4.3 / LB pp. 101-105)
  {
    id: 'pm-1',
    category: 'plot',
    question: 'What is the FIRST stage of a story called?',
    correct: 'Introduction',
    options: ['Climax', 'Ending', 'Resolution', 'Introduction'],
    explanation: 'The introduction introduces the characters and setting.',
    lbRef: 'LB p. 102 Story Mountain'
  },
  {
    id: 'pm-2',
    category: 'plot',
    question: 'What is the peak problem or most exciting part of a story called?',
    correct: 'Climax (Problem)',
    options: ['Climax (Problem)', 'Introduction', 'Resolution', 'Title'],
    explanation: 'The climax is the biggest problem or most exciting moment.',
    lbRef: 'LB p. 102 Story Mountain'
  },
  {
    id: 'pm-3',
    category: 'plot',
    question: 'What happens in the "Resolution" stage of a story?',
    correct: 'The problem is solved',
    options: ['The story begins', 'The problem is solved', 'We meet the author', 'A character leaves'],
    explanation: 'Resolution means finding a solution to the problem.',
    lbRef: 'LB p. 102'
  },
  {
    id: 'pm-4',
    category: 'plot',
    question: 'Which order is correct for a story mountain?',
    correct: 'Introduction → Climax → Resolution',
    options: [
      'Climax → Introduction → Resolution',
      'Resolution → Climax → Introduction',
      'Introduction → Climax → Resolution',
      'Resolution → Introduction → Climax'
    ],
    explanation: 'First Introduction, then the peak Climax, followed by the Resolution!',
    lbRef: 'Thursday Checkpoint Q1'
  },

  // 4. Vocabulary & Traps: Shades of Meaning & Homophones (Sessions 4.2 & 4.4)
  {
    id: 'voc-1',
    category: 'glossary',
    question: 'Which word is the STRONGEST on the Funny Scale?',
    correct: 'Hysterical (crying with laughter)',
    options: [
      'Amusing (mild smile)',
      'Funny',
      'Hysterical (crying with laughter)',
      'Polite'
    ],
    explanation: 'Hysterical is uncontrollably funny — level 3 on the scale!',
    lbRef: 'LB p. 99 Shades of Meaning'
  },
  {
    id: 'voc-2',
    category: 'glossary',
    question: 'Madison spoke in a rough, raspy voice. Which spelling is correct?',
    correct: 'hoarse (rough voice)',
    options: ['horse (the farm animal)', 'hoarse (rough voice)'],
    explanation: 'Hoarse with "oa" means a scratchy voice. Horse is an animal!',
    lbRef: 'LB p. 106 Writing Tip'
  },
  {
    id: 'voc-3',
    category: 'glossary',
    question: 'Madison calls Harry "buddy". What does "buddy" mean in British English?',
    correct: 'Friend',
    options: ['Uncle', 'Teacher', 'Doctor', 'Friend'],
    explanation: 'Buddy is American slang for friend, pal, or mate.',
    lbRef: 'LB p. 106 Activity 2'
  },
  {
    id: 'voc-4',
    category: 'glossary',
    question: 'Harry "cherished" his pet parrot. What does "cherished" mean?',
    correct: 'Deeply loved and valued',
    options: [
      'Very cheap and old',
      'Deeply loved and valued',
      'Loud and annoying',
      'Lost in the woods'
    ],
    explanation: 'Cherished means held dear and cared for with love.',
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
