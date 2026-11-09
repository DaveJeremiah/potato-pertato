// Complete data for Potato Pertato: End-of-Term 1 Exam Revision & Writing Lab

export const THEME_CARDS = [
  {
    id: 'orange',
    name: 'Orange',
    bg: '#F5C0A1',
    ribbon: '#EA9E70',
    accent: '#D95D1E',
    darkText: '#2A1810',
    badgeBg: '#D95D1E'
  },
  {
    id: 'purple',
    name: 'Purple',
    bg: '#F1DFFE',
    ribbon: '#DCBDF8',
    accent: '#7C3AED',
    darkText: '#221436',
    badgeBg: '#6D28D9'
  },
  {
    id: 'green',
    name: 'Green',
    bg: '#C7E0CD',
    ribbon: '#A8CCB1',
    accent: '#15803D',
    darkText: '#112A19',
    badgeBg: '#166534'
  },
  {
    id: 'yellow',
    name: 'Yellow',
    bg: '#FCE3A1',
    ribbon: '#F4CE71',
    accent: '#B45309',
    darkText: '#2D1E08',
    badgeBg: '#D97706'
  },
  {
    id: 'blue',
    name: 'Blue',
    bg: '#92C5E3',
    ribbon: '#6FB0D6',
    accent: '#1D4ED8',
    darkText: '#0F2438',
    badgeBg: '#1E40AF'
  },
  {
    id: 'pink',
    name: 'Pink',
    bg: '#F9BDD5',
    ribbon: '#EE9BB9',
    accent: '#BE185D',
    darkText: '#331020',
    badgeBg: '#DB2777'
  }
];

export const EXAM_PAPERS = {
  nonfiction: {
    id: 'nonfiction',
    title: 'Paper 1: Non-Fiction Revision',
    subtitle: '🌍 Welcome to Our Wonderful World: Amazing Animals of the Earth',
    theme: 'orange',
    badge: '30 MARKS • PAPER 1',
    passageLines: [
      { line: 1, text: 'Have you ever wondered how wild animals survive in the most extreme places on Earth?', chapter: 'Introduction' },
      { line: 2, text: 'Welcome to this book, your ultimate guide to the most incredible creatures on our planet.', chapter: 'Introduction' },
      { line: 3, text: 'From burning hot deserts to freezing polar ice caps, animals have built homes everywhere.', chapter: 'Introduction' },
      { line: 4, text: 'A natural environment where an animal lives and finds food is called its habitat.', chapter: 'Introduction' },
      { line: 5, text: 'In this handbook, you will explore four astonishing habitats and discover amazing animal secrets.', chapter: 'Introduction' },
      { line: 6, text: 'First, step into the golden sands of the Sahara Desert, where water is extremely scarce.', chapter: 'Chapter 1' },
      { line: 7, text: 'The Arabian camel is a desert survivor that can travel for days without drinking water.', chapter: 'Chapter 1' },
      { line: 8, text: 'Camels do not store water in their humps; they store rich fat that gives them energy.', chapter: 'Chapter 1' },
      { line: 9, text: 'They also have long, thick eyelashes to protect their eyes from blowing sandstorms.', chapter: 'Chapter 1' },
      { line: 10, text: 'Next, journey deep into the tropical rainforests near the Equator.', chapter: 'Chapter 2' },
      { line: 11, text: 'The rainforest is home to more than half of all the plant and animal species on Earth.', chapter: 'Chapter 2' },
      { line: 12, text: 'High up in the emerald green tree canopy lives the colourful red-eyed tree frog.', chapter: 'Chapter 2' },
      { line: 13, text: 'This tiny amphibian sleeps underneath broad leaves during the day to hide from hungry birds.', chapter: 'Chapter 2' },
      { line: 14, text: 'If a predator attacks, the frog flashes its huge red eyes to startle the enemy and escape.', chapter: 'Chapter 2' },
      { line: 15, text: 'After the jungle, travel north to the frozen Arctic tundra where biting winds blow.', chapter: 'Chapter 3' },
      { line: 16, text: 'The polar bear is the largest land hunter in the cold northern region.', chapter: 'Chapter 3' },
      { line: 17, text: 'Beneath its thick white fur, the polar bear has black skin that absorbs warmth from the sun.', chapter: 'Chapter 3' },
      { line: 18, text: 'Polar bears are powerful swimmers that use their giant front paws like paddles in icy waters.', chapter: 'Chapter 3' },
      { line: 19, text: 'Finally, dive beneath the rolling waves of the deep, dark ocean.', chapter: 'Chapter 4' },
      { line: 20, text: 'In the pitch-black waters of the sea, the anglerfish uses a glowing light on its head to attract prey.', chapter: 'Chapter 4' },
      { line: 21, text: 'Every animal in this book has developed special features to stay alive in its environment.', chapter: 'Chapter 4' },
      { line: 22, text: 'Scientists call these special physical features adaptations.', chapter: 'Chapter 4' },
      { line: 23, text: "Open this book with curiosity, study the collector's cards, and protect our wild world!", chapter: 'Chapter 4' },
      { line: 24, text: 'What an astonishing adventure awaits you inside these pages!', chapter: 'Chapter 4' }
    ],
    glossary: [
      { word: 'predator', def: 'an animal that hunts and eats other animals.' },
      { word: 'prey', def: 'an animal that is hunted and killed for food by another animal.' },
      { word: 'adaptation', def: 'a special body part or behavior that helps an animal survive.' }
    ],
    comprehension: [
      {
        id: 'nf-q1',
        number: 'Q1',
        marks: '1 mark',
        question: 'According to line 4, what is a habitat?',
        focusLines: [3, 4, 5],
        cluePhrase: 'A natural environment where an animal lives and finds food',
        supportTip: 'Look at the start of Line 4 right before the words "is called its habitat".',
        pqaChunks: [
          { id: 'c1', text: 'A habitat is', role: 'Sentence Stem (P.Q.A.)' },
          { id: 'c2', text: 'a natural environment', role: 'Key Definition' },
          { id: 'c3', text: 'where an animal lives and finds food.', role: 'Complete Detail + Full Stop' }
        ],
        distractorChunks: [
          { id: 'd1', text: 'Burning hot deserts.' },
          { id: 'd2', text: 'Because animals live there' }
        ],
        modelAnswer: 'A habitat is a natural environment where an animal lives and finds food.'
      },
      {
        id: 'nf-q2',
        number: 'Q2',
        marks: '1 mark',
        question: 'How many chapters does the book have?',
        focusLines: [5, 6, 10, 15, 19],
        cluePhrase: 'four astonishing habitats / Chapter 1 ... Chapter 4',
        supportTip: 'Count the chapter headings in the passage (or look at line 5: "four astonishing habitats")!',
        pqaChunks: [
          { id: 'c1', text: 'The book has', role: 'Sentence Stem (P.Q.A.)' },
          { id: 'c2', text: 'four chapters.', role: 'Answer + Full Stop' }
        ],
        distractorChunks: [
          { id: 'd1', text: '4' },
          { id: 'd2', text: 'Three chapters' }
        ],
        modelAnswer: 'The book has four chapters.'
      },
      {
        id: 'nf-q3',
        number: 'Q3',
        marks: '1 mark',
        question: 'Look at line 8. What do camels actually store in their humps?',
        focusLines: [7, 8, 9],
        cluePhrase: 'they store rich fat that gives them energy',
        supportTip: 'Careful! Many people think camels store water, but Line 8 says "Camels do not store water... they store..."',
        pqaChunks: [
          { id: 'c1', text: 'In their humps, camels actually store', role: 'Sentence Stem (P.Q.A.)' },
          { id: 'c2', text: 'rich fat', role: 'Core Fact' },
          { id: 'c3', text: 'that gives them energy.', role: 'Purpose + Full Stop' }
        ],
        distractorChunks: [
          { id: 'd1', text: 'cold drinking water.' },
          { id: 'd2', text: 'Thick eyelashes' }
        ],
        modelAnswer: 'In their humps, camels actually store rich fat that gives them energy.'
      },
      {
        id: 'nf-q4',
        number: 'Q4',
        marks: '1 mark',
        question: 'Which animal will be explored in Chapter 3? (Hint: Begin with "The animal that will...")',
        focusLines: [15, 16, 17],
        cluePhrase: 'The polar bear is the largest land hunter',
        supportTip: 'Find the heading "Chapter 3" and look at the animal named in Line 16!',
        pqaChunks: [
          { id: 'c1', text: 'The animal that will be explored in Chapter 3', role: 'Hint Stem (P.Q.A.)' },
          { id: 'c2', text: 'is the polar bear.', role: 'Animal + Full Stop' }
        ],
        distractorChunks: [
          { id: 'd1', text: 'Polar bear' },
          { id: 'd2', text: 'is the red-eyed tree frog.' }
        ],
        modelAnswer: 'The animal that will be explored in Chapter 3 is the polar bear.'
      },
      {
        id: 'nf-q5',
        number: 'Q5',
        marks: '1 mark',
        question: 'Look at line 17. Why does the polar bear have black skin beneath its thick white fur?',
        focusLines: [16, 17, 18],
        cluePhrase: 'absorbs warmth from the sun',
        supportTip: 'Look at the second half of Line 17 after the words "black skin that..."',
        pqaChunks: [
          { id: 'c1', text: 'The polar bear has black skin', role: 'Sentence Stem (P.Q.A.)' },
          { id: 'c2', text: 'because it absorbs warmth', role: 'Reason Connective' },
          { id: 'c3', text: 'from the sun.', role: 'Detail + Full Stop' }
        ],
        distractorChunks: [
          { id: 'd1', text: 'to hide in the dark.' },
          { id: 'd2', text: 'to swim like paddles.' }
        ],
        modelAnswer: 'The polar bear has black skin because it absorbs warmth from the sun.'
      },
      {
        id: 'nf-q6',
        number: 'Q6',
        marks: '1 mark',
        question: 'How does the deep-sea anglerfish attract its prey in the pitch-black water?',
        focusLines: [19, 20, 21],
        cluePhrase: 'uses a glowing light on its head to attract prey',
        supportTip: 'Look at Line 20: What special feature is on the anglerfish’s head?',
        pqaChunks: [
          { id: 'c1', text: 'The deep-sea anglerfish attracts its prey', role: 'Sentence Stem (P.Q.A.)' },
          { id: 'c2', text: 'by using a glowing light', role: 'How / Method' },
          { id: 'c3', text: 'on its head.', role: 'Location + Full Stop' }
        ],
        distractorChunks: [
          { id: 'd1', text: 'flashing huge red eyes.' },
          { id: 'd2', text: 'Glowing light' }
        ],
        modelAnswer: 'The deep-sea anglerfish attracts its prey by using a glowing light on its head.'
      },
      {
        id: 'nf-q7',
        number: 'Q7',
        marks: '2 marks',
        question: 'Fact vs. Opinion — Look at Line 7 ("The Arabian camel is a desert survivor...") and Line 24 ("What an astonishing adventure awaits you inside these pages!"). Which line is an OPINION?',
        focusLines: [7, 24],
        cluePhrase: 'What an astonishing adventure awaits you inside these pages!',
        supportTip: 'A FACT can be proven true by science. An OPINION shows someone’s feelings or excitement (like "astonishing!").',
        pqaChunks: [
          { id: 'c1', text: 'Line 24 is an opinion:', role: 'Sentence Stem (P.Q.A.)' },
          { id: 'c2', text: '"What an astonishing adventure', role: 'Quote Part 1' },
          { id: 'c3', text: 'awaits you inside these pages!"', role: 'Quote Part 2' }
        ],
        distractorChunks: [
          { id: 'd1', text: 'Line 7 is an opinion.' },
          { id: 'd2', text: 'Camels travel for days.' }
        ],
        modelAnswer: 'Line 24 ("What an astonishing adventure awaits you inside these pages!") is an opinion.'
      }
    ],
    vocabAndGrammar: [
      {
        id: 'nf-vg8',
        category: 'Vocabulary Detective',
        number: 'Q8',
        marks: '1 mark',
        sentence: 'Look at line 3: "...From burning hot deserts to freezing polar ice caps..."',
        highlightWord: 'freezing',
        question: 'What does the word FREEZING mean in this sentence?',
        hint: 'Notice the contrast! "Burning hot deserts" is the opposite of "freezing polar ice caps".',
        options: [
          { text: 'Annoying and unlikable', isCorrect: false, feedback: 'Not quite! Ice caps are about temperature, not feelings.' },
          { text: 'Hard to find or very rare', isCorrect: false, feedback: 'That is the meaning of "scarce" in Line 6!' },
          { text: 'Very cold', isCorrect: true, feedback: 'Spot on! Freezing polar ice caps are extremely cold!' }
        ]
      },
      {
        id: 'nf-vg9',
        category: 'Context Clues',
        number: 'Q9',
        marks: '1 mark',
        sentence: 'Look at line 22: "Scientists call these special physical features adaptations."',
        highlightWord: 'adaptations',
        question: 'Which single word from this sentence means A SPECIAL FEATURE OR BEHAVIOUR THAT HELPS AN ANIMAL SURVIVE?',
        hint: 'What word do "Scientists call" those special physical features? Check the Glossary too!',
        options: [
          { text: 'adaptations', isCorrect: true, feedback: 'Brilliant Word Detective! Scientists call them "adaptations".' },
          { text: 'scientists', isCorrect: false, feedback: 'Scientists are the people who study animals!' },
          { text: 'curiosity', isCorrect: false, feedback: 'Curiosity means wanting to learn or know something.' }
        ]
      },
      {
        id: 'nf-vg11',
        category: '4 Sentence Types',
        number: 'Q11',
        marks: '1 mark',
        sentence: '"Have you ever wondered how wild animals survive in the most extreme places on Earth?"',
        highlightWord: '?',
        question: 'What type of sentence is this? Is it a Statement, Command, or a Question?',
        hint: 'Look at how it starts ("Have you ever...") and the punctuation mark at the very end (?)!',
        options: [
          { text: 'Question', isCorrect: true, feedback: 'Correct! It asks the reader something and ends with a question mark (?).' },
          { text: 'Statement', isCorrect: false, feedback: 'A statement gives a fact and ends with a full stop (.).' },
          { text: 'Command', isCorrect: false, feedback: 'A command tells someone to do an action (like "Open this book!").' }
        ]
      },
      {
        id: 'nf-vg12',
        category: 'Synonym Hunt',
        number: 'Q12',
        marks: '1 mark',
        sentence: '"If a predator attacks, the frog flashes its huge red eyes to startle the enemy and escape."',
        highlightWord: 'huge',
        question: 'Which word in the sentence above is a synonym (means the same) for BIG?',
        hint: 'Look at the word describing the frog’s "red eyes"!',
        options: [
          { text: 'huge', isCorrect: true, feedback: 'Yes! "Huge" is a powerful synonym for "big"!' },
          { text: 'red', isCorrect: false, feedback: '"Red" is a colour adjective, not size.' },
          { text: 'startle', isCorrect: false, feedback: '"Startle" is a verb meaning to surprise or frighten.' }
        ]
      },
      {
        id: 'nf-vg14',
        category: 'Subject-Verb Agreement',
        number: 'Q14',
        marks: '2 marks',
        sentence: 'The thick fur of the polar bear ( is / are ) white, but its eyes ( is / are ) black.',
        highlightWord: 'fur ... eyes',
        question: 'Choose the correct verb for BOTH blanks:',
        hint: '"Thick fur" is singular (one thing -> is), while "eyes" is plural (two things -> are)!',
        options: [
          { text: 'is ... are', isCorrect: true, feedback: '100% Correct! Fur IS white (singular), but its eyes ARE black (plural)!' },
          { text: 'are ... is', isCorrect: false, feedback: 'Careful! "Fur" is uncountable/singular (is), and "eyes" has an -s for plural (are).' },
          { text: 'is ... is', isCorrect: false, feedback: 'First one is right, but "eyes" is plural (two eyes -> are)!' }
        ]
      },
      {
        id: 'nf-vg15',
        category: 'Connective Bridge',
        number: 'Q15',
        marks: '1 mark',
        sentence: 'Sentence 1: Camels can live in the burning hot desert. + Sentence 2: They store rich fat that gives them energy.',
        highlightWord: 'because',
        question: 'Join these two sentences into ONE sentence using BECAUSE or FOR:',
        hint: 'Remember: When joining two sentences in the middle, drop the first full stop and make "They" lowercase ("they")!',
        options: [
          { text: 'Camels can live in the burning hot desert because they store rich fat that gives them energy.', isCorrect: true, feedback: 'Perfect! You joined both ideas smoothly with "because" and fixed the punctuation!' },
          { text: 'Camels can live in the burning hot desert. Because they store rich fat.', isCorrect: false, feedback: 'Watch out! Do not put a full stop before "because" when joining two sentences.' },
          { text: 'Camels can live in the burning hot desert, they store rich fat.', isCorrect: false, feedback: 'You forgot the connective word ("because" or "for")!' }
        ]
      }
    ]
  },

  fiction: {
    id: 'fiction',
    title: 'Paper 2: Fiction Revision',
    subtitle: '📖 The Secret of the Mountain Dragon (Silver Peak Village)',
    theme: 'purple',
    badge: '30 MARKS • PAPER 2',
    passageLines: [
      { line: 2, text: 'Inside a small stone hut in Silver Peak Village, young Meilin sat beside the warm fireplace with her grandmother, LaoLao.', chapter: 'Opening' },
      { line: 4, text: 'Her grandmother was a wise storyteller whom all the villagers loved dearly.', chapter: 'Opening' },
      { line: 5, text: 'Meilin was a quiet girl who rarely spoke, but she loved listening to ancient legends beside the fire.', chapter: 'Opening' },
      { line: 6, text: "Around Meilin's wrist was a smooth green jade bracelet that had belonged to her family for years.", chapter: 'Opening' },
      { line: 7, text: 'Suddenly, a loud knock banged against the heavy wooden door of the stone hut.', chapter: 'The Problem' },
      { line: 8, text: "A frightened neighbour stepped inside and whispered that the Emperor's fierce soldiers were in the valley.", chapter: 'The Problem' },
      { line: 9, text: 'The greedy Emperor had captured and trapped the great Silver Dragon in a deep mountain cavern.', chapter: 'The Problem' },
      { line: 10, text: 'Without the magical dragon, winter lingered on and on, and spring refused to return to the kingdom.', chapter: 'The Problem' },
      { line: 11, text: 'The rivers were frozen solid, and the people of Silver Peak Village were devastated because no crops could grow.', chapter: 'The Problem' },
      { line: 13, text: "Grandmother LaoLao looked into Meilin's dark eyes and smiled gently.", chapter: 'The Quest' },
      { line: 14, text: '"Do not be afraid, little bird," Grandmother said softly.', chapter: 'The Quest' },
      { line: 15, text: '"The ancient stories say that only a pure, brave heart can melt the dragon\'s iron chains."', chapter: 'The Quest' },
      { line: 16, text: 'Meilin felt terrified inside, but she stood tall and made a solemn vow to save her village.', chapter: 'The Quest' },
      { line: 17, text: 'She packed a warm coat, two rice buns, and a small bottle of hot ginger tea.', chapter: 'The Quest' },
      { line: 18, text: 'In her pouch, she placed a luminous pearl that shone brightly in the pitch-black night.', chapter: 'The Quest' },
      { line: 19, text: 'Stepping out into the freezing cold, Meilin climbed the narrow, icy trail that led to the mountain top.', chapter: 'The Climb' },
      { line: 20, text: 'Strong winds blew across her face, yet her green jade bracelet felt warm on her skin.', chapter: 'The Climb' },
      { line: 21, text: 'After hours of walking, Meilin reached the shadowy entrance of the Whispering Cavern.', chapter: 'The Rescue' },
      { line: 22, text: 'Deep inside the dark cave, she found the mighty Silver Dragon tied up with heavy iron chains.', chapter: 'The Rescue' },
      { line: 23, text: 'His scales were dull and frosty, but his large golden eyes looked upon Meilin with gentle hope.', chapter: 'The Rescue' },
      { line: 25, text: 'Meilin held up her luminous pearl, and its warm, bright light melted the chains.', chapter: 'The Rescue' },
      { line: 26, text: 'The Silver Dragon began to soar high into the clouds, and the warm promise of spring returned to the land.', chapter: 'Resolution' }
    ],
    glossary: [
      { word: 'ancient', def: 'from a very, very long time ago (very old).' },
      { word: 'cavern', def: 'a large, dark cave.' },
      { word: 'soar', def: 'to fly high up in the sky.' },
      { word: 'solemn', def: 'very serious; without joking.' }
    ],
    comprehension: [
      {
        id: 'f-q1',
        number: 'Q1',
        marks: '1 mark',
        question: 'What is the title of the story?',
        focusLines: [2, 4],
        cluePhrase: 'The Secret of the Mountain Dragon',
        supportTip: 'Look at the big bold heading at the very top of the reading box!',
        pqaChunks: [
          { id: 'c1', text: 'The title of the story is', role: 'Sentence Stem (P.Q.A.)' },
          { id: 'c2', text: '"The Secret of the Mountain Dragon."', role: 'Title + Capitals + Full Stop' }
        ],
        distractorChunks: [
          { id: 'd1', text: 'Silver Peak Village' },
          { id: 'd2', text: 'Mountain Dragon' }
        ],
        modelAnswer: 'The title of the story is "The Secret of the Mountain Dragon."'
      },
      {
        id: 'f-q2',
        number: 'Q2',
        marks: '1 mark',
        question: 'Look at line 2. What is the name of the village where Meilin and her grandmother live?',
        focusLines: [2, 4, 5],
        cluePhrase: 'Silver Peak Village',
        supportTip: 'Look right after "Inside a small stone hut in..." on Line 2!',
        pqaChunks: [
          { id: 'c1', text: 'Meilin and her grandmother live in', role: 'Sentence Stem (P.Q.A.)' },
          { id: 'c2', text: 'Silver Peak Village.', role: 'Proper Noun + Full Stop' }
        ],
        distractorChunks: [
          { id: 'd1', text: 'a small stone hut.' },
          { id: 'd2', text: 'Whispering Cavern.' }
        ],
        modelAnswer: 'Meilin and her grandmother live in Silver Peak Village.'
      },
      {
        id: 'f-q3',
        number: 'Q3',
        marks: '1 mark',
        question: 'What did the Emperor do to the Silver Dragon?',
        focusLines: [8, 9, 10],
        cluePhrase: 'captured and trapped the great Silver Dragon in a deep mountain cavern',
        supportTip: 'Look at Line 9: What two action verbs tell us what the greedy Emperor did?',
        pqaChunks: [
          { id: 'c1', text: 'The greedy Emperor', role: 'Sentence Stem (P.Q.A.)' },
          { id: 'c2', text: 'captured and trapped the Silver Dragon', role: 'Action' },
          { id: 'c3', text: 'in a deep mountain cavern.', role: 'Where + Full Stop' }
        ],
        distractorChunks: [
          { id: 'd1', text: 'Trapped him' },
          { id: 'd2', text: 'melted the iron chains.' }
        ],
        modelAnswer: 'The greedy Emperor captured and trapped the Silver Dragon in a deep mountain cavern.'
      },
      {
        id: 'f-q4',
        number: 'Q4',
        marks: '1 mark',
        question: 'Look at lines 11–12. Why were the people of Silver Peak Village devastated?',
        focusLines: [10, 11],
        cluePhrase: 'the rivers were frozen solid ... because no crops could grow',
        supportTip: 'Look for the word "because" in Line 11!',
        pqaChunks: [
          { id: 'c1', text: 'The people of Silver Peak Village were devastated', role: 'Sentence Stem (P.Q.A.)' },
          { id: 'c2', text: 'because the rivers were frozen solid', role: 'Reason 1' },
          { id: 'c3', text: 'and no crops could grow.', role: 'Reason 2 + Full Stop' }
        ],
        distractorChunks: [
          { id: 'd1', text: 'No crops' },
          { id: 'd2', text: 'because they loved stories.' }
        ],
        modelAnswer: 'The people of Silver Peak Village were devastated because the rivers were frozen solid and no crops could grow.'
      },
      {
        id: 'f-q5',
        number: 'Q5',
        marks: '1 mark',
        question: 'What solemn vow did Meilin make after talking to her grandmother?',
        focusLines: [14, 15, 16],
        cluePhrase: 'made a solemn vow to save her village',
        supportTip: 'Look at the end of Line 16 right after "made a solemn vow..."',
        pqaChunks: [
          { id: 'c1', text: 'After talking to her grandmother,', role: 'Fronted Opener' },
          { id: 'c2', text: 'Meilin made a solemn vow', role: 'Sentence Stem (P.Q.A.)' },
          { id: 'c3', text: 'to save her village.', role: 'Promise + Full Stop' }
        ],
        distractorChunks: [
          { id: 'd1', text: 'Save village' },
          { id: 'd2', text: 'to pack two rice buns.' }
        ],
        modelAnswer: 'After talking to her grandmother, Meilin made a solemn vow to save her village.'
      },
      {
        id: 'f-q6',
        number: 'Q6',
        marks: '2 marks',
        question: 'Look at lines 18 and 25. What magical object did Meilin carry in her pouch to light her way, AND what did she use it for? [2 marks]',
        focusLines: [18, 25],
        cluePhrase: 'a luminous pearl ... melted the chains',
        supportTip: 'This is a 2-MARK question with two parts! Part 1: Name the object (Line 18). Part 2: Explain how it freed the dragon (Line 25).',
        pqaChunks: [
          { id: 'c1', text: 'Meilin carried a luminous pearl in her pouch,', role: 'Part 1: Magical Object [1m]' },
          { id: 'c2', text: 'and she used its warm, bright light', role: 'Connective + How' },
          { id: 'c3', text: 'to melt the dragon\'s heavy iron chains.', role: 'Part 2: What she used it for [1m]' }
        ],
        distractorChunks: [
          { id: 'd1', text: 'A green jade bracelet.' },
          { id: 'd2', text: 'Hot ginger tea.' }
        ],
        modelAnswer: "Meilin carried a luminous pearl in her pouch, and she used its warm, bright light to melt the dragon's heavy iron chains."
      }
    ],
    vocabAndGrammar: [
      {
        id: 'f-vg7',
        category: 'Vocabulary in Context',
        number: 'Q7 (Vocab 1)',
        marks: '1 mark',
        sentence: 'Look at line 16: "...Meilin felt terrified inside, but she stood tall..."',
        highlightWord: 'terrified',
        question: 'What does the word TERRIFIED mean in this sentence?',
        hint: 'Grandmother just told her "Do not be afraid", and inside Meilin felt terrified, BUT she stood tall and brave!',
        options: [
          { text: 'frozen into huge, solid rocks', isCorrect: false, feedback: 'The river was frozen, not Meilin’s feelings!' },
          { text: 'very scared or afraid', isCorrect: true, feedback: 'Spot on! "Terrified" means feeling extreme fear or being very afraid.' },
          { text: 'painted with bright green colours', isCorrect: false, feedback: 'That describes her green jade bracelet!' }
        ]
      },
      {
        id: 'f-vg8',
        category: 'Word Detective',
        number: 'Q8 (Vocab 2)',
        marks: '1 mark',
        sentence: 'Look at line 18: "In her pouch, she placed a luminous pearl that shone brightly..."',
        highlightWord: 'luminous / shone',
        question: 'Which word in this sentence tells you that the pearl was glowing or shining with light in the dark?',
        hint: 'Look for the adjective before "pearl" or the verb right after "that"!',
        options: [
          { text: 'luminous (or shone / brightly)', isCorrect: true, feedback: 'Awesome! "Luminous" and "shone brightly" both prove it glowed with light!' },
          { text: 'pouch', isCorrect: false, feedback: 'A pouch is the small bag she carried it in.' },
          { text: 'placed', isCorrect: false, feedback: '"Placed" just means she put it inside.' }
        ]
      },
      {
        id: 'f-vg9',
        category: 'Word Meaning',
        number: 'Q9 (Vocab 3)',
        marks: '1 mark',
        sentence: 'Look at line 10: "Without the magical dragon, winter lingered on and on..."',
        highlightWord: 'lingered',
        question: 'What does the word LINGERED mean?',
        hint: 'Notice the words "on and on, and spring refused to return". Did winter leave quickly, or stay for a long time?',
        options: [
          { text: 'It stayed for a long time and refused to leave.', isCorrect: true, feedback: 'Exactly right! To "linger" means to stay around for a long time.' },
          { text: 'It melted quickly in the hot sun.', isCorrect: false, feedback: 'Opposite! Winter stayed freezing cold.' },
          { text: 'It flew high into the clouds.', isCorrect: false, feedback: 'That is the meaning of "soar"!' }
        ]
      },
      {
        id: 'f-vg10',
        category: '4 Sentence Types',
        number: 'Q10 (Grammar 1)',
        marks: '1 mark',
        sentence: '"Do not be afraid, little bird."',
        highlightWord: 'Do not be',
        question: 'What type of sentence is this? Note: Look carefully at how Grandmother gently instructs/tells Meilin what to do!',
        hint: 'It starts with an imperative verb phrase ("Do not be...") telling someone what to do!',
        options: [
          { text: 'Command (or Statement on simplified sheet)', isCorrect: true, feedback: 'Great thinking! "Do not be afraid" is a gentle Command (imperative), and if "Command" wasn’t listed on the tick-box, "Statement" was accepted!' },
          { text: 'Question', isCorrect: false, feedback: 'It does not ask anything or end with a question mark (?).' },
          { text: 'Exclamation', isCorrect: false, feedback: 'It is spoken softly and ends with a full stop, not an exclamation mark (!).' }
        ]
      },
      {
        id: 'f-vg11',
        category: '4 Sentence Types',
        number: 'Q11 (Grammar 2)',
        marks: '1 mark',
        sentence: '"It was an extremely cold night at the mountain peak!"',
        highlightWord: '!',
        question: 'What type of sentence is this?',
        hint: 'Look at the strong emotion ("extremely cold") and the exclamation mark (!) at the end!',
        options: [
          { text: 'Exclamation', isCorrect: true, feedback: 'Bingo! It expresses strong feeling and ends with an exclamation mark (!).' },
          { text: 'Command', isCorrect: false, feedback: 'It is not bossy or telling anyone to do an action.' },
          { text: 'Question', isCorrect: false, feedback: 'It is not asking a question.' }
        ]
      },
      {
        id: 'f-vg12',
        category: 'The Verb "to be"',
        number: 'Q12 & Q13',
        marks: '2 marks',
        sentence: '12) Meilin and LaoLao ( was / were ) sitting beside the warm fireplace.\n13) The silver dragon ( was / were ) devastated inside the dark cave.',
        highlightWord: 'were ... was',
        question: 'Pick the right past-tense verb ("was" for 1 person/thing, "were" for 2+ people/things):',
        hint: 'Meilin AND LaoLao = 2 people (Plural -> were). The silver dragon = 1 dragon (Singular -> was)!',
        options: [
          { text: '12) were   |   13) was', isCorrect: true, feedback: 'Champion! Two people = WERE sitting; One dragon = WAS devastated!' },
          { text: '12) was    |   13) were', isCorrect: false, feedback: 'Backwards! Remember: 1 = WAS, more than 1 = WERE.' },
          { text: '12) were   |   13) were', isCorrect: false, feedback: 'Q12 is right, but in Q13 there is only ONE silver dragon (was)!' }
        ]
      },
      {
        id: 'f-vg15',
        category: 'Connective Bridge',
        number: 'Q15',
        marks: '1 mark',
        sentence: 'Sentence 1: Meilin was afraid. + Sentence 2: She had promised to save her village.',
        highlightWord: 'but',
        question: 'Join these two contrasting sentences into ONE sentence using SO, FOR, or BUT:',
        hint: 'Being afraid and still keeping a brave promise are contrasting/opposite ideas! Which connective shows contrast?',
        options: [
          { text: 'Meilin was afraid, but she had promised to save her village.', isCorrect: true, feedback: 'Spot on! "but" connects two contrasting ideas!' },
          { text: 'Meilin was afraid, so she had promised to save her village.', isCorrect: false, feedback: 'Being afraid didn’t CAUSE her to promise—she promised DESPITE being afraid ("but").' },
          { text: 'Meilin was afraid. But she had promised.', isCorrect: false, feedback: 'Remember to join them into ONE sentence without a full stop in the middle!' }
        ]
      }
    ]
  }
};

// All 10 Exact Punctuation Sentences from Paper 1 & Paper 2
export const PUNCTUATION_SURGERY_ITEMS = [
  // PAPER 1 (NON-FICTION)
  {
    id: 'p1-a',
    paper: 'Paper 1 (Non-Fiction)',
    label: 'Paper 1 • Question a)',
    marks: '0.5 marks',
    targetCount: 2,
    rawSentence: 'how do camels survive in the hot dry desert',
    correctSentence: 'How do camels survive in the hot, dry desert?',
    clueList: [
      '1. Capital letter "H" at the start of the sentence ("How")',
      '2. Question mark "?" at the end (because it asks "How do...")',
      '(Bonus star if you also spotted the comma between adjectives "hot, dry"!)'
    ],
    tokens: [
      { id: 't1', raw: 'how', fixed: 'How', needsFix: true, fixType: 'Capital H', explain: 'Every sentence must start with a capital letter!' },
      { id: 't2', raw: 'do', fixed: 'do', needsFix: false },
      { id: 't3', raw: 'camels', fixed: 'camels', needsFix: false },
      { id: 't4', raw: 'survive', fixed: 'survive', needsFix: false },
      { id: 't5', raw: 'in', fixed: 'in', needsFix: false },
      { id: 't6', raw: 'the', fixed: 'the', needsFix: false },
      { id: 't7', raw: 'hot', fixed: 'hot', needsFix: false },
      { id: 't8', raw: 'dry', fixed: 'dry', needsFix: false },
      { id: 't9', raw: 'desert', fixed: 'desert?', needsFix: true, fixType: 'Question Mark ?', explain: '"How do camels..." is a question, so it ends with a (?)!' }
    ]
  },
  {
    id: 'p1-b',
    paper: 'Paper 1 (Non-Fiction)',
    label: 'Paper 1 • Question b)',
    marks: '1.5 marks',
    targetCount: 6,
    rawSentence: 'alawia said the picnic basket is on the bench',
    correctSentence: 'Alawia said, "The picnic basket is on the bench."',
    clueList: [
      '1. Capital "A" for the proper noun / start "Alawia"',
      '2. Comma (,) after the reporting verb "said,"',
      '3. Opening speech marks (") before the spoken words',
      '4. Capital "T" at the start of the speech ("The)',
      '5. Full stop (.) at the end of the spoken sentence',
      '6. Closing speech marks (") after the full stop'
    ],
    tokens: [
      { id: 't1', raw: 'alawia', fixed: 'Alawia', needsFix: true, fixType: 'Capital A (Proper Noun)', explain: 'Alawia is a person’s name and starts the sentence!' },
      { id: 't2', raw: 'said', fixed: 'said,', needsFix: true, fixType: 'Comma after reporting verb (,)', explain: 'Always put a comma after "said" before opening speech marks!' },
      { id: 't3', raw: 'the', fixed: '"The', needsFix: true, fixType: 'Open Speech Marks " + Capital T', explain: 'Open speech marks (") and start the spoken sentence with a capital "T"!' },
      { id: 't4', raw: 'picnic', fixed: 'picnic', needsFix: false },
      { id: 't5', raw: 'basket', fixed: 'basket', needsFix: false },
      { id: 't6', raw: 'is', fixed: 'is', needsFix: false },
      { id: 't7', raw: 'on', fixed: 'on', needsFix: false },
      { id: 't8', raw: 'the', fixed: 'the', needsFix: false },
      { id: 't9', raw: 'bench', fixed: 'bench."', needsFix: true, fixType: 'Full Stop . + Close Speech Marks "', explain: 'Put a full stop (.) inside the closing speech marks (")!' }
    ]
  },
  {
    id: 'p1-c',
    paper: 'Paper 1 (Non-Fiction)',
    label: 'Paper 1 • Question c)',
    marks: '1 mark',
    targetCount: 4,
    rawSentence: 'where did hamid leave his sisters blue umbrella',
    correctSentence: "Where did Hamid leave his sister's blue umbrella?",
    clueList: [
      '1. Capital "W" at the start ("Where")',
      '2. Capital "H" for the person’s name ("Hamid")',
      '3. Apostrophe for possession in "sister\'s" (the umbrella belongs to his sister)',
      '4. Question mark (?) at the end of the question'
    ],
    tokens: [
      { id: 't1', raw: 'where', fixed: 'Where', needsFix: true, fixType: 'Capital W', explain: 'Start of the question needs a capital W!' },
      { id: 't2', raw: 'did', fixed: 'did', needsFix: false },
      { id: 't3', raw: 'hamid', fixed: 'Hamid', needsFix: true, fixType: 'Capital H (Proper Noun)', explain: 'Hamid is a proper noun (a boy’s name)!' },
      { id: 't4', raw: 'leave', fixed: 'leave', needsFix: false },
      { id: 't5', raw: 'his', fixed: 'his', needsFix: false },
      { id: 't6', raw: 'sisters', fixed: "sister's", needsFix: true, fixType: "Possessive Apostrophe ('s)", explain: "The blue umbrella belongs to his sister -> sister's!" },
      { id: 't7', raw: 'blue', fixed: 'blue', needsFix: false },
      { id: 't8', raw: 'umbrella', fixed: 'umbrella?', needsFix: true, fixType: 'Question Mark ?', explain: '"Where did..." asks a question, so end with (?)!' }
    ]
  },
  {
    id: 'p1-d',
    paper: 'Paper 1 (Non-Fiction)',
    label: 'Paper 1 • Question d)',
    marks: '1 mark',
    targetCount: 4,
    rawSentence: 'in the morning dan ate pancakes and strawberries',
    correctSentence: 'In the morning, Dan ate pancakes and strawberries.',
    clueList: [
      '1. Capital "I" at the start ("In")',
      '2. Comma (,) after the fronted time adverbial ("In the morning,")',
      '3. Capital "D" for the proper noun ("Dan")',
      '4. Full stop (.) at the end of the statement'
    ],
    tokens: [
      { id: 't1', raw: 'in', fixed: 'In', needsFix: true, fixType: 'Capital I', explain: 'Start the sentence with a capital I!' },
      { id: 't2', raw: 'the', fixed: 'the', needsFix: false },
      { id: 't3', raw: 'morning', fixed: 'morning,', needsFix: true, fixType: 'Fronted Adverbial Comma (,)', explain: '"In the morning," tells us WHEN at the start of the sentence, so put a comma after it!' },
      { id: 't4', raw: 'dan', fixed: 'Dan', needsFix: true, fixType: 'Capital D (Proper Noun)', explain: 'Dan is a person’s name!' },
      { id: 't5', raw: 'ate', fixed: 'ate', needsFix: false },
      { id: 't6', raw: 'pancakes', fixed: 'pancakes', needsFix: false },
      { id: 't7', raw: 'and', fixed: 'and', needsFix: false },
      { id: 't8', raw: 'strawberries', fixed: 'strawberries.', needsFix: true, fixType: 'Full Stop (.)', explain: 'End this statement with a full stop (.)!' }
    ]
  },
  {
    id: 'p1-e',
    paper: 'Paper 1 (Non-Fiction)',
    label: 'Paper 1 • Question e)',
    marks: '1 mark',
    targetCount: 4,
    rawSentence: 'facts are statements that everyone believes to be true arent they',
    correctSentence: "Facts are statements that everyone believes to be true, aren't they?",
    clueList: [
      '1. Capital "F" at the start ("Facts")',
      '2. Comma (,) before the question tag (", aren\'t they?")',
      '3. Contraction apostrophe in "aren\'t" (are not -> aren\'t)',
      '4. Question mark (?) at the end'
    ],
    tokens: [
      { id: 't1', raw: 'facts', fixed: 'Facts', needsFix: true, fixType: 'Capital F', explain: 'Start the sentence with a capital F!' },
      { id: 't2', raw: 'are', fixed: 'are', needsFix: false },
      { id: 't3', raw: 'statements', fixed: 'statements', needsFix: false },
      { id: 't4', raw: 'that', fixed: 'that', needsFix: false },
      { id: 't5', raw: 'everyone', fixed: 'everyone', needsFix: false },
      { id: 't6', raw: 'believes', fixed: 'believes', needsFix: false },
      { id: 't7', raw: 'to', fixed: 'to', needsFix: false },
      { id: 't8', raw: 'be', fixed: 'be', needsFix: false },
      { id: 't9', raw: 'true', fixed: 'true,', needsFix: true, fixType: 'Comma before Question Tag (,)', explain: 'Separate the main statement from "aren\'t they?" with a comma!' },
      { id: 't10', raw: 'arent', fixed: "aren't", needsFix: true, fixType: "Apostrophe for Contraction (n't)", explain: '"aren\'t" is short for "are not" — the apostrophe replaces the missing "o"!' },
      { id: 't11', raw: 'they', fixed: 'they?', needsFix: true, fixType: 'Question Mark (?)', explain: '"...aren\'t they?" turns the end into a question!' }
    ]
  },

  // PAPER 2 (FICTION)
  {
    id: 'p2-a',
    paper: 'Paper 2 (Fiction)',
    label: 'Paper 2 • Question 16a)',
    marks: '1 mark',
    targetCount: 4,
    rawSentence: 'wow the trip to the park was exceptional',
    correctSentence: 'Wow! The trip to the park was exceptional.',
    clueList: [
      '1. Capital "W" for "Wow"',
      '2. Exclamation mark (!) or comma after the interjection "Wow!"',
      '3. Capital "T" for "The" (or exclamation mark at the very end!)',
      '4. End punctuation mark (. or !)'
    ],
    tokens: [
      { id: 't1', raw: 'wow', fixed: 'Wow!', needsFix: true, fixType: 'Capital W + Exclamation/Comma (!)', explain: '"Wow!" is a strong interjection at the start!' },
      { id: 't2', raw: 'the', fixed: 'The', needsFix: true, fixType: 'Capital T after !', explain: 'Start the new sentence after "Wow!" with a capital T (or use "Wow, the...!")' },
      { id: 't3', raw: 'trip', fixed: 'trip', needsFix: false },
      { id: 't4', raw: 'to', fixed: 'to', needsFix: false },
      { id: 't5', raw: 'the', fixed: 'the', needsFix: false },
      { id: 't6', raw: 'park', fixed: 'park', needsFix: false },
      { id: 't7', raw: 'was', fixed: 'was', needsFix: false },
      { id: 't8', raw: 'exceptional', fixed: 'exceptional!', needsFix: true, fixType: 'Exclamation / Full Stop (!)', explain: 'Finish the exciting sentence with an exclamation mark or full stop!' }
    ]
  },
  {
    id: 'p2-b',
    paper: 'Paper 2 (Fiction)',
    label: 'Paper 2 • Question 16b)',
    marks: '0.5 marks',
    targetCount: 2,
    rawSentence: 'what an enormous animal the elephant is',
    correctSentence: 'What an enormous animal the elephant is!',
    clueList: [
      '1. Capital "W" at the start ("What")',
      '2. Exclamation mark (!) at the end (Sentences starting with "What a/an..." that don\'t ask a question are Exclamations!)'
    ],
    tokens: [
      { id: 't1', raw: 'what', fixed: 'What', needsFix: true, fixType: 'Capital W', explain: 'Start the sentence with a capital W!' },
      { id: 't2', raw: 'an', fixed: 'an', needsFix: false },
      { id: 't3', raw: 'enormous', fixed: 'enormous', needsFix: false },
      { id: 't4', raw: 'animal', fixed: 'animal', needsFix: false },
      { id: 't5', raw: 'the', fixed: 'the', needsFix: false },
      { id: 't6', raw: 'elephant', fixed: 'elephant', needsFix: false },
      { id: 't7', raw: 'is', fixed: 'is!', needsFix: true, fixType: 'Exclamation Mark (!)', explain: 'Careful! "What an enormous animal the elephant is!" is an EXCLAMATION, not a question!' }
    ]
  },
  {
    id: 'p2-c',
    paper: 'Paper 2 (Fiction)',
    label: 'Paper 2 • Question 16c)',
    marks: '1.5 marks',
    targetCount: 6,
    rawSentence: 'will you be brave on the icy mountain asked the grandmother',
    correctSentence: '"Will you be brave on the icy mountain?" asked the grandmother.',
    clueList: [
      '1. Opening speech marks (") at the very beginning',
      '2. Capital "W" for "Will"',
      '3. Question mark (?) after "mountain?" (inside the speech marks!)',
      '4. Closing speech marks (") after the question mark',
      '5. Lowercase "asked" (even after a question mark in speech!)',
      '6. Full stop (.) after "grandmother."'
    ],
    tokens: [
      { id: 't1', raw: 'will', fixed: '"Will', needsFix: true, fixType: 'Open Speech Marks " + Capital W', explain: 'Grandmother’s spoken words start right away: open speech marks (") + capital W!' },
      { id: 't2', raw: 'you', fixed: 'you', needsFix: false },
      { id: 't3', raw: 'be', fixed: 'be', needsFix: false },
      { id: 't4', raw: 'brave', fixed: 'brave', needsFix: false },
      { id: 't5', raw: 'on', fixed: 'on', needsFix: false },
      { id: 't6', raw: 'the', fixed: 'the', needsFix: false },
      { id: 't7', raw: 'icy', fixed: 'icy', needsFix: false },
      { id: 't8', raw: 'mountain', fixed: 'mountain?"', needsFix: true, fixType: 'Question Mark ? + Close Speech "', explain: 'She is asking a question, so put (?) INSIDE the closing speech marks (")!' },
      { id: 't9', raw: 'asked', fixed: 'asked', needsFix: false },
      { id: 't10', raw: 'the', fixed: 'the', needsFix: false },
      { id: 't11', raw: 'grandmother', fixed: 'grandmother.', needsFix: true, fixType: 'Full Stop (.) at end', explain: 'Finish the whole sentence with a full stop after "grandmother."' }
    ]
  },
  {
    id: 'p2-d',
    paper: 'Paper 2 (Fiction)',
    label: 'Paper 2 • Question 16d)',
    marks: '1 mark',
    targetCount: 4,
    rawSentence: 'why did the emperor trap the dragon in silver peak',
    correctSentence: 'Why did the Emperor trap the dragon in Silver Peak?',
    clueList: [
      '1. Capital "W" at the start ("Why")',
      '2. Capital "S" for the place name "Silver"',
      '3. Capital "P" for the place name "Peak"',
      '4. Question mark (?) at the end'
    ],
    tokens: [
      { id: 't1', raw: 'why', fixed: 'Why', needsFix: true, fixType: 'Capital W', explain: 'Start the question with a capital W!' },
      { id: 't2', raw: 'did', fixed: 'did', needsFix: false },
      { id: 't3', raw: 'the', fixed: 'the', needsFix: false },
      { id: 't4', raw: 'emperor', fixed: 'Emperor', needsFix: false },
      { id: 't5', raw: 'trap', fixed: 'trap', needsFix: false },
      { id: 't6', raw: 'the', fixed: 'the', needsFix: false },
      { id: 't7', raw: 'dragon', fixed: 'dragon', needsFix: false },
      { id: 't8', raw: 'in', fixed: 'in', needsFix: false },
      { id: 't9', raw: 'silver', fixed: 'Silver', needsFix: true, fixType: 'Capital S (Proper Noun)', explain: 'Silver Peak is the special name of the village/mountain!' },
      { id: 't10', raw: 'peak', fixed: 'Peak?', needsFix: true, fixType: 'Capital P + Question Mark ?', explain: 'Capital P for Peak, and a question mark (?) because it asks "Why did..."!' }
    ]
  },
  {
    id: 'p2-e',
    paper: 'Paper 2 (Fiction)',
    label: 'Paper 2 • Question 16e)',
    marks: '1 mark',
    targetCount: 4,
    rawSentence: 'why didnt ali bring his football to school today',
    correctSentence: "Why didn't Ali bring his football to school today?",
    clueList: [
      '1. Capital "W" at the start ("Why")',
      '2. Apostrophe for contraction in "didn\'t" (did not -> didn\'t)',
      '3. Capital "A" for the proper noun "Ali"',
      '4. Question mark (?) at the end'
    ],
    tokens: [
      { id: 't1', raw: 'why', fixed: 'Why', needsFix: true, fixType: 'Capital W', explain: 'Start the question with a capital W!' },
      { id: 't2', raw: 'didnt', fixed: "didn't", needsFix: true, fixType: "Contraction Apostrophe (n't)", explain: '"didn\'t" is short for "did not" — put an apostrophe where the "o" was!' },
      { id: 't3', raw: 'ali', fixed: 'Ali', needsFix: true, fixType: 'Capital A (Proper Noun)', explain: 'Ali is a boy’s name, so it must start with a capital A!' },
      { id: 't4', raw: 'bring', fixed: 'bring', needsFix: false },
      { id: 't5', raw: 'his', fixed: 'his', needsFix: false },
      { id: 't6', raw: 'football', fixed: 'football', needsFix: false },
      { id: 't7', raw: 'to', fixed: 'to', needsFix: false },
      { id: 't8', raw: 'school', fixed: 'school', needsFix: false },
      { id: 't9', raw: 'today', fixed: 'today?', needsFix: true, fixType: 'Question Mark (?)', explain: 'End the "Why..." question with a question mark (?)!' }
    ]
  }
];

// Writing Block Architect Data (Story Builder + Non-Fiction Card Builder + Weak Sentence Upgrader)
export const WRITING_ARCHITECT_DATA = {
  fantasyQuest: {
    title: '🐉 Fantasy Quest Story Architect (Paper 2 • 4 Paragraphs)',
    subtitle: 'Tap blocks to build each paragraph on the Smartboard, then switch to Skeleton Mode so students write their own adventure in their notebooks!',
    paragraphs: [
      {
        id: 'para-1',
        number: 'Paragraph 1',
        name: 'Setting the Scene & Atmosphere',
        color: '#F1DFFE',
        accent: '#6D28D9',
        goal: 'Where does the adventure begin, and what is the weather like?',
        slots: [
          {
            id: 's1',
            label: '1. Fronted Where/When Opener',
            skeletonHint: '[High on the... / Deep inside the... / Across the...],',
            options: [
              'High on the icy peaks of Frost Mountain,',
              'Deep inside the glowing Whispering Forest,',
              'Across the golden dunes of Sunstone Desert,'
            ]
          },
          {
            id: 's2',
            label: '2. Weather & Sensory Detail',
            skeletonHint: 'the [adjective] wind [verb] and [detail].',
            options: [
              'the freezing wind howled like a hungry wolf and snow covered the rocky trail.',
              'ancient emerald trees swayed gently under a blanket of silver mist.',
              'blazing sunlight shimmered over the quiet mud-brick village.'
            ]
          }
        ]
      },
      {
        id: 'para-2',
        number: 'Paragraph 2',
        name: 'Meet the Hero (Character Description)',
        color: '#92C5E3',
        accent: '#1E40AF',
        goal: 'Who is the brave young character, what do they look like, and what special item do they carry?',
        slots: [
          {
            id: 's1',
            label: '1. Character Name & Trait',
            skeletonHint: '[Name] was a [adjective], [adjective] child with [appearance detail].',
            options: [
              'Young Tariq was a quiet, courageous boy with bright dark eyes and a warm woollen cloak.',
              'Brave Amira was a clever, determined girl with braided black hair and quick footsteps.',
              'Little Kaito was a gentle, fearless explorer wearing a heavy leather satchel.'
            ]
          },
          {
            id: 's2',
            label: '2. The Special Object',
            skeletonHint: 'Around his/her [wrist/neck/pouch], he/she carried a [magical item] that [what it did].',
            options: [
              'In his leather pouch, he carried a luminous crystal stone that glowed in the dark.',
              'Around her neck hung an ancient silver compass that pointed toward hidden magic.',
              'Tightly in his hand, he held a golden phoenix feather given to him by his grandfather.'
            ]
          }
        ]
      },
      {
        id: 'para-3',
        number: 'Paragraph 3',
        name: 'The Problem & Mysterious Encounter',
        color: '#FCE3A1',
        accent: '#B45309',
        goal: 'What problem or trapped creature did the hero find on the way? Include 1 line of speech!',
        slots: [
          {
            id: 's1',
            label: '1. Sudden Problem / Discovery',
            skeletonHint: 'Suddenly, [character] discovered [what was trapped/wrong] because [reason].',
            options: [
              'Suddenly, he reached a dark cavern where a baby Snow Falcon was trapped inside a cage of thick ice!',
              'Without warning, a giant fallen boulder blocked the crystal river, leaving the village dry and thirsty.',
              'Deep in the cave, she found the legendary Moon Stag tangled in heavy iron chains.'
            ]
          },
          {
            id: 's2',
            label: '2. Brave Dialogue (Speech Marks!)',
            skeletonHint: '"[Spoken promise!]" [character] whispered [adverb].',
            options: [
              '"Do not be afraid, I will set you free!" the young hero whispered bravely.',
              '"Stay calm, my friend, this magic light will break your chains!" she promised softly.',
              '"I must be brave and save my village before nightfall!" he declared loudly.'
            ]
          }
        ]
      },
      {
        id: 'para-4',
        number: 'Paragraph 4',
        name: 'The Clever Rescue & Happy Resolution',
        color: '#C7E0CD',
        accent: '#15803D',
        goal: 'How did the hero solve the problem, and how did the story end happily?',
        slots: [
          {
            id: 's1',
            label: '1. Action to Solve the Problem',
            skeletonHint: 'Holding up the [special item], a [adjective] beam of light [how it solved the problem].',
            options: [
              'Holding up the glowing crystal, a warm golden beam melted the heavy locks in seconds.',
              'Touching the ancient feather to the stone, a burst of bright magic shattered the icy trap.',
              'Using the silver compass and a sturdy rope, the clever hero pulled the heavy gate wide open.'
            ]
          },
          {
            id: 's2',
            label: '2. Satisfying Ending',
            skeletonHint: 'Finally, [creature/water] soared free, and [happy result for the village]!',
            options: [
              'Finally, the magnificent creature soared high into the clouds, and warm spring sunshine returned to the village!',
              'With a joyful cry, the rescued animal bounded into the forest, and the villagers celebrated their brave hero!',
              'At last, sparkling water rushed back into the valley, and peace returned to the kingdom forever.'
            ]
          }
        ]
      }
    ]
  },

  animalCard: {
    title: "🌍 Animal Collector's Card Architect (Paper 1 • Non-Fiction)",
    subtitle: 'Build a complete 10-mark informative Collector’s Card using accurate present tense verbs, habitat details, and adaptations!',
    paragraphs: [
      {
        id: 'nf-1',
        number: 'Section 1',
        name: 'Animal Name & Extreme Habitat',
        color: '#F5C0A1',
        accent: '#D95D1E',
        goal: 'Introduce your wild animal with an engaging question or statement about its habitat.',
        slots: [
          {
            id: 's1',
            label: '1. Engaging Hook Question',
            skeletonHint: 'Have you ever wondered how the [animal] survives in the [adjective] [habitat]?',
            options: [
              'Have you ever wondered how the Arabian camel survives in the burning hot Sahara Desert?',
              'Have you ever seen a giant polar bear hunting across the freezing Arctic ice caps?',
              'Did you know that the colourful red-eyed tree frog lives high in the emerald rainforest canopy?'
            ]
          },
          {
            id: 's2',
            label: '2. Habitat Fact Statement',
            skeletonHint: 'This incredible [mammal/amphibian] makes its natural habitat in [location] where [condition].',
            options: [
              'This incredible desert mammal lives in dry, sandy regions where water is extremely scarce.',
              'This powerful Arctic hunter makes its home in the icy northern tundra where freezing winds blow.',
              'This tiny, vibrant amphibian lives in steaming tropical jungles near the Equator.'
            ]
          }
        ]
      },
      {
        id: 'nf-2',
        number: 'Section 2',
        name: 'Physical Features & Adaptations',
        color: '#FCE3A1',
        accent: '#B45309',
        goal: 'Explain what its body looks like and HOW those adaptations help it stay alive (use "because" or "to").',
        slots: [
          {
            id: 's1',
            label: '1. Body Feature & Adaptation',
            skeletonHint: 'To survive in its environment, the [animal] has [feature 1], [feature 2], and [feature 3].',
            options: [
              'To survive in the sandy desert, the camel has long eyelashes, wide padded feet, and a large hump.',
              'Beneath its thick white fur, the polar bear has black skin, a layer of fat, and giant front paws.',
              'The tree frog has bright green skin, sticky toe pads, and huge ruby-red eyes.'
            ]
          },
          {
            id: 's2',
            label: '2. How the Adaptation Works ("because")',
            skeletonHint: 'These adaptations are vital because [how the body part helps it survive].',
            options: [
              'Its thick eyelashes protect its eyes from blowing sandstorms, while its hump stores rich fat for energy.',
              'Its black skin absorbs warmth from the sun, and its giant paws work like paddles in icy water.',
              'It sleeps under broad green leaves to hide from birds and flashes its red eyes to startle predators.'
            ]
          }
        ]
      },
      {
        id: 'nf-3',
        number: 'Section 3',
        name: 'Diet & Fascinating Finale!',
        color: '#C7E0CD',
        accent: '#15803D',
        goal: 'Tell the reader what the animal eats and finish with an amazing exclamation!',
        slots: [
          {
            id: 's1',
            label: '1. Diet & Feeding (Commas in a List!)',
            skeletonHint: 'When hungry, this animal feeds on [food 1], [food 2], and [food 3].',
            options: [
              'In the dry desert, camels eat thorny plants, dry grass, and salty bushes that other animals cannot chew.',
              'Polar bears are skilled carnivores that hunt seals, fish, and seabirds along the edge of the sea ice.',
              'At night, this agile frog hunts crickets, moths, flies, and smaller insects in the treetops.'
            ]
          },
          {
            id: 's2',
            label: '2. Fascinating Fact & Exclamation (!)',
            skeletonHint: 'Amazingly, [surprising fact]! What an astonishing creature the [animal] is!',
            options: [
              'Amazingly, a thirsty camel can drink over 100 litres of water in just ten minutes! What a champion survivor!',
              'Surprisingly, polar bears can smell a seal from more than a kilometre away! What an astonishing hunter!',
              'Unbelievably, this tiny frog can leap twenty times its own body length! Protect our wild rainforests!'
            ]
          }
        ]
      }
    ]
  },

  sentenceUpgrader: [
    {
      id: 'up-1',
      title: 'Fix #1: The "Broken Tense & Fragment" Cure (Paper 2 Quest)',
      weakProblem: 'Common Student Mistake: Missing verbs, wrong tense ("go/see"), and tiny choppy fragments.',
      stages: [
        {
          level: 'Lv 1: Weak Student Draft ❌',
          text: 'the boy go to mountain. it cold. he see big dragon in cave.',
          notes: 'No capital letters, present tense "go/see" instead of past tense, missing "was" ("it cold").'
        },
        {
          level: 'Lv 2: Grammar & Punctuation Fixed ✅',
          text: 'The boy went to the mountain. It was very cold. He saw a big dragon in the cave.',
          notes: 'Fixed capitals, changed "go -> went" and "see -> saw", added the verb "was"!'
        },
        {
          level: 'Lv 3: Grade 4 Superstar Upgrade 🌟',
          text: 'Stepping into the freezing wind, the brave boy climbed the icy mountain until he discovered a mighty silver dragon deep inside the dark cavern!',
          notes: 'Added a fronted opener ("Stepping into..."), vivid adjectives ("freezing, brave, icy, mighty"), and a connective ("until")!'
        }
      ]
    },
    {
      id: 'up-2',
      title: 'Fix #2: Adding Dialogue & Emotion (Paper 2 Quest)',
      weakProblem: 'Common Student Mistake: Forgetting speech marks or writing "he said I help you".',
      stages: [
        {
          level: 'Lv 1: Weak Student Draft ❌',
          text: 'dragon was sad in chains. tariq said dont worry i free you with magic stone',
          notes: 'No speech marks, no comma after "said", missing apostrophe in "don\'t", no capital letters.'
        },
        {
          level: 'Lv 2: Grammar & Punctuation Fixed ✅',
          text: 'The dragon was sad in the chains. Tariq said, "Don\'t worry, I will free you with my magic stone."',
          notes: 'Added comma after "said,", opening & closing speech marks ("..."), capital "D" and "I", and apostrophe in "Don\'t"!'
        },
        {
          level: 'Lv 3: Grade 4 Superstar Upgrade 🌟',
          text: 'The mighty dragon looked at Tariq with hopeful golden eyes as heavy iron chains held him down. "Do not be afraid, noble friend," Tariq whispered softly, holding up his glowing crystal.',
          notes: 'Upgraded "said" to "whispered softly" and showed the dragon’s feelings ("hopeful golden eyes")!'
        }
      ]
    },
    {
      id: 'up-3',
      title: 'Fix #3: Non-Fiction Collector’s Card Upgrade (Paper 1 Animals)',
      weakProblem: 'Common Student Mistake: Writing one-word answers or forgetting list commas & "because".',
      stages: [
        {
          level: 'Lv 1: Weak Student Draft ❌',
          text: 'polar bear live in arctic. it eat fish seals birds. it have white fur and black skin',
          notes: 'Wrong verb agreement ("polar bear live/eat/have"), no commas in the list of foods, no capital "A" for Arctic.'
        },
        {
          level: 'Lv 2: Grammar & Punctuation Fixed ✅',
          text: 'The polar bear lives in the Arctic. It eats fish, seals, and birds. It has white fur and black skin.',
          notes: 'Fixed singular present verbs ("lives, eats, has"), capitalized "Arctic", and added list commas ("fish, seals, and birds")!'
        },
        {
          level: 'Lv 3: Grade 4 Superstar Upgrade 🌟',
          text: 'The giant polar bear lives in the freezing Arctic tundra, where it hunts fish, seals, and seabirds. Beneath its thick white fur, it has black skin because black skin absorbs warmth from the sun!',
          notes: 'Joined ideas with "where" and "because" to explain HOW the adaptation works!'
        }
      ]
    }
  ]
};

