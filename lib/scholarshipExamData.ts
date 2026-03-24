export type ScholarshipQuestion = {
  id: string;
  subject: string;
  question: string;
  options: string[];
  answerIndex: number;
};

export type ScholarshipExamGrade = {
  grade: number;
  title: string;
  description: string;
  questions: ScholarshipQuestion[];
};

export const scholarshipExamData: Record<number, ScholarshipExamGrade> = {
  1: {
    grade: 1,
    title: "Grade 1 Scholarship Mock Test",
    description: "A playful aptitude round with basic maths, language, EVS, Hindi, and general awareness.",
    questions: [
      { id: "g1-q1", subject: "Mathematics", question: "What is 4 + 3?", options: ["5", "6", "7", "8"], answerIndex: 2 },
      { id: "g1-q2", subject: "English", question: "Which word names an animal?", options: ["Run", "Cat", "Blue", "Jump"], answerIndex: 1 },
      { id: "g1-q3", subject: "EVS", question: "Which one do we drink?", options: ["Sand", "Water", "Stone", "Leaf"], answerIndex: 1 },
      { id: "g1-q4", subject: "Hindi", question: "'कमल' किसका नाम है?", options: ["फल", "फूल", "पक्षी", "रंग"], answerIndex: 1 },
      { id: "g1-q5", subject: "General Knowledge", question: "How many days are there in one week?", options: ["5", "6", "7", "8"], answerIndex: 2 },
      { id: "g1-q6", subject: "Mathematics", question: "Which number is bigger?", options: ["2", "9", "1", "4"], answerIndex: 1 },
      { id: "g1-q7", subject: "English", question: "Choose the first letter of Apple.", options: ["A", "E", "P", "L"], answerIndex: 0 },
      { id: "g1-q8", subject: "EVS", question: "Which body part helps you see?", options: ["Eyes", "Hands", "Legs", "Ears"], answerIndex: 0 },
      { id: "g1-q9", subject: "Hindi", question: "'आम' क्या है?", options: ["फल", "खेल", "जानवर", "वाहन"], answerIndex: 0 },
      { id: "g1-q10", subject: "General Knowledge", question: "What shines in the day?", options: ["Moon", "Star", "Sun", "Lamp"], answerIndex: 2 },
    ],
  },
  2: {
    grade: 2,
    title: "Grade 2 Scholarship Mock Test",
    description: "A balanced paper with foundational questions from all key subjects.",
    questions: [
      { id: "g2-q1", subject: "Mathematics", question: "What is 12 - 5?", options: ["5", "6", "7", "8"], answerIndex: 2 },
      { id: "g2-q2", subject: "English", question: "Choose the opposite of 'hot'.", options: ["Warm", "Cold", "Big", "Fast"], answerIndex: 1 },
      { id: "g2-q3", subject: "EVS", question: "Which plant part is usually green?", options: ["Root", "Leaf", "Seed", "Fruit"], answerIndex: 1 },
      { id: "g2-q4", subject: "Hindi", question: "'सफेद' का अर्थ क्या है?", options: ["काला", "लाल", "हरा", "श्वेत"], answerIndex: 3 },
      { id: "g2-q5", subject: "General Knowledge", question: "Which festival is known as the festival of lights?", options: ["Holi", "Diwali", "Eid", "Christmas"], answerIndex: 1 },
      { id: "g2-q6", subject: "Mathematics", question: "How many corners does a square have?", options: ["2", "3", "4", "5"], answerIndex: 2 },
      { id: "g2-q7", subject: "English", question: "Pick the naming word.", options: ["Quickly", "Boy", "Jump", "Softly"], answerIndex: 1 },
      { id: "g2-q8", subject: "EVS", question: "Which animal gives us milk?", options: ["Cow", "Lion", "Fox", "Crow"], answerIndex: 0 },
      { id: "g2-q9", subject: "Hindi", question: "'पुस्तक' किसे कहते हैं?", options: ["किताब", "कपड़ा", "जगह", "मिठाई"], answerIndex: 0 },
      { id: "g2-q10", subject: "General Knowledge", question: "Our country is called", options: ["India", "Japan", "Brazil", "Nepal"], answerIndex: 0 },
    ],
  },
  3: {
    grade: 3,
    title: "Grade 3 Scholarship Mock Test",
    description: "Concept checks across numbers, language, environment, and awareness.",
    questions: [
      { id: "g3-q1", subject: "Mathematics", question: "What is 6 x 3?", options: ["9", "12", "18", "21"], answerIndex: 2 },
      { id: "g3-q2", subject: "English", question: "Choose the correct plural of 'child'.", options: ["Childs", "Children", "Childes", "Childer"], answerIndex: 1 },
      { id: "g3-q3", subject: "EVS", question: "Which source gives us heat and light?", options: ["Moon", "Sun", "Star", "Cloud"], answerIndex: 1 },
      { id: "g3-q4", subject: "Hindi", question: "'जल' का समानार्थी शब्द क्या है?", options: ["आग", "पानी", "धरती", "वायु"], answerIndex: 1 },
      { id: "g3-q5", subject: "General Knowledge", question: "How many months are there in a year?", options: ["10", "11", "12", "13"], answerIndex: 2 },
      { id: "g3-q6", subject: "Mathematics", question: "Which fraction is equal to half?", options: ["1/2", "1/3", "2/3", "3/4"], answerIndex: 0 },
      { id: "g3-q7", subject: "English", question: "Select the sentence with correct punctuation.", options: ["what is your name", "What is your name?", "What is your name", "what is your name?"], answerIndex: 1 },
      { id: "g3-q8", subject: "EVS", question: "Which gas do we breathe in for life?", options: ["Oxygen", "Helium", "Nitrogen", "Smoke"], answerIndex: 0 },
      { id: "g3-q9", subject: "Hindi", question: "'मीठा' का विलोम शब्द चुनिए।", options: ["खट्टा", "नमकीन", "कड़वा", "तीखा"], answerIndex: 2 },
      { id: "g3-q10", subject: "General Knowledge", question: "Who is known as the Father of the Nation in India?", options: ["Mahatma Gandhi", "A. P. J. Abdul Kalam", "Jawaharlal Nehru", "Sardar Patel"], answerIndex: 0 },
    ],
  },
  4: {
    grade: 4,
    title: "Grade 4 Scholarship Mock Test",
    description: "A sharper problem-solving round covering maths, science, languages, and social awareness.",
    questions: [
      { id: "g4-q1", subject: "Mathematics", question: "What is the place value of 5 in 352?", options: ["5", "50", "500", "25"], answerIndex: 1 },
      { id: "g4-q2", subject: "English", question: "Choose the adjective in the sentence: 'The tall tree moved gently.'", options: ["tree", "moved", "tall", "gently"], answerIndex: 2 },
      { id: "g4-q3", subject: "Science", question: "Which organ pumps blood in our body?", options: ["Brain", "Lungs", "Heart", "Stomach"], answerIndex: 2 },
      { id: "g4-q4", subject: "Hindi", question: "'विद्यालय' का अर्थ क्या है?", options: ["अस्पताल", "विद्यालय", "बाजार", "कार्यालय"], answerIndex: 1 },
      { id: "g4-q5", subject: "Social Studies", question: "Which direction does the sun rise from?", options: ["North", "South", "East", "West"], answerIndex: 2 },
      { id: "g4-q6", subject: "Mathematics", question: "How many millimetres are there in 1 centimetre?", options: ["5", "10", "50", "100"], answerIndex: 1 },
      { id: "g4-q7", subject: "English", question: "Pick the correct past tense of 'go'.", options: ["Goed", "Went", "Gone", "Going"], answerIndex: 1 },
      { id: "g4-q8", subject: "Science", question: "Plants make food in their", options: ["Roots", "Leaves", "Flowers", "Stems"], answerIndex: 1 },
      { id: "g4-q9", subject: "Hindi", question: "'साहसी' शब्द का सही अर्थ चुनिए।", options: ["डरपोक", "बहादुर", "चुप", "धीमा"], answerIndex: 1 },
      { id: "g4-q10", subject: "Social Studies", question: "Which is our national capital?", options: ["Mumbai", "Chennai", "New Delhi", "Kolkata"], answerIndex: 2 },
    ],
  },
  5: {
    grade: 5,
    title: "Grade 5 Scholarship Mock Test",
    description: "A preparatory scholarship round designed to test reasoning and class-level mastery.",
    questions: [
      { id: "g5-q1", subject: "Mathematics", question: "What is 245 + 189?", options: ["424", "434", "444", "454"], answerIndex: 1 },
      { id: "g5-q2", subject: "English", question: "Which sentence is in the future tense?", options: ["I play every day.", "I played football.", "I will play football.", "I am playing football."], answerIndex: 2 },
      { id: "g5-q3", subject: "Science", question: "Which of these is soluble in water?", options: ["Sand", "Salt", "Stone", "Plastic"], answerIndex: 1 },
      { id: "g5-q4", subject: "Hindi", question: "'उज्ज्वल' शब्द का विलोम शब्द चुनिए।", options: ["चमकीला", "अंधकारमय", "सुंदर", "मधुर"], answerIndex: 1 },
      { id: "g5-q5", subject: "Social Studies", question: "A map helps us to understand", options: ["Music", "Places", "Food", "Games"], answerIndex: 1 },
      { id: "g5-q6", subject: "Mathematics", question: "Which of these is a prime number?", options: ["9", "15", "17", "21"], answerIndex: 2 },
      { id: "g5-q7", subject: "English", question: "Choose the correct synonym of 'happy'.", options: ["Sad", "Joyful", "Weak", "Angry"], answerIndex: 1 },
      { id: "g5-q8", subject: "Science", question: "The process by which water changes into vapour is called", options: ["Condensation", "Evaporation", "Freezing", "Melting"], answerIndex: 1 },
      { id: "g5-q9", subject: "Hindi", question: "'परिश्रम' का अर्थ क्या है?", options: ["मेहनत", "आराम", "क्रोध", "खेल"], answerIndex: 0 },
      { id: "g5-q10", subject: "Social Studies", question: "Who is the head of a village panchayat?", options: ["Mayor", "Sarpanch", "Collector", "Governor"], answerIndex: 1 },
    ],
  },
  6: {
    grade: 6,
    title: "Grade 6 Scholarship Mock Test",
    description: "A mixed-subject paper that checks speed, clarity, and conceptual understanding.",
    questions: [
      { id: "g6-q1", subject: "Mathematics", question: "What is the HCF of 12 and 18?", options: ["3", "4", "6", "9"], answerIndex: 2 },
      { id: "g6-q2", subject: "English", question: "Identify the adverb in: 'She sings beautifully.'", options: ["She", "Sings", "Beautifully", "Song"], answerIndex: 2 },
      { id: "g6-q3", subject: "Science", question: "Which part of the plant absorbs water from the soil?", options: ["Leaf", "Root", "Flower", "Stem"], answerIndex: 1 },
      { id: "g6-q4", subject: "Hindi", question: "'निडर' शब्द का सही अर्थ क्या है?", options: ["डरने वाला", "बहुत बोलने वाला", "निर्भय", "धीरे चलने वाला"], answerIndex: 2 },
      { id: "g6-q5", subject: "Social Studies", question: "The Tropic of Cancer passes through the", options: ["Northern Hemisphere", "Southern Hemisphere", "South Pole", "Atlantic Ocean only"], answerIndex: 0 },
      { id: "g6-q6", subject: "Mathematics", question: "What is 3/4 of 20?", options: ["10", "12", "15", "16"], answerIndex: 2 },
      { id: "g6-q7", subject: "English", question: "Choose the correct indirect article.", options: ["an university", "a honest man", "an hour", "a elephant"], answerIndex: 2 },
      { id: "g6-q8", subject: "Science", question: "Which type of motion does a pendulum show?", options: ["Circular", "Rectilinear", "Periodic", "Random"], answerIndex: 2 },
      { id: "g6-q9", subject: "Hindi", question: "'जल्दी' शब्द किस प्रकार का क्रिया-विशेषण है?", options: ["रीतिवाचक", "कालवाचक", "स्थानवाचक", "परिमाणवाचक"], answerIndex: 0 },
      { id: "g6-q10", subject: "Social Studies", question: "Which of these is a renewable resource?", options: ["Coal", "Petroleum", "Solar energy", "Natural gas"], answerIndex: 2 },
    ],
  },
  7: {
    grade: 7,
    title: "Grade 7 Scholarship Mock Test",
    description: "A competitive practice set with stronger analytical and subject integration demands.",
    questions: [
      { id: "g7-q1", subject: "Mathematics", question: "What is the value of 2^4?", options: ["8", "12", "16", "24"], answerIndex: 2 },
      { id: "g7-q2", subject: "English", question: "Choose the sentence in passive voice.", options: ["The chef cooked dinner.", "Dinner was cooked by the chef.", "The chef is cooking dinner.", "Cook the dinner now."], answerIndex: 1 },
      { id: "g7-q3", subject: "Science", question: "The process of taking in food by organisms is called", options: ["Respiration", "Excretion", "Nutrition", "Circulation"], answerIndex: 2 },
      { id: "g7-q4", subject: "Hindi", question: "'साहस' शब्द का पर्यायवाची चुनिए।", options: ["वीरता", "कमजोरी", "आलस", "मौन"], answerIndex: 0 },
      { id: "g7-q5", subject: "Social Studies", question: "The layer of air around the Earth is called", options: ["Lithosphere", "Hydrosphere", "Atmosphere", "Biosphere"], answerIndex: 2 },
      { id: "g7-q6", subject: "Mathematics", question: "If x = 7, what is 3x + 2?", options: ["20", "21", "23", "24"], answerIndex: 2 },
      { id: "g7-q7", subject: "English", question: "Choose the correct reported speech: He said, 'I am tired.'", options: ["He said that he is tired.", "He said that I was tired.", "He said that he was tired.", "He said he tired."], answerIndex: 2 },
      { id: "g7-q8", subject: "Science", question: "Which blood vessel carries blood away from the heart?", options: ["Vein", "Artery", "Capillary", "Neuron"], answerIndex: 1 },
      { id: "g7-q9", subject: "Hindi", question: "'यदि' शब्द किस प्रकार का शब्द है?", options: ["संज्ञा", "क्रिया", "समुच्चयबोधक", "विशेषण"], answerIndex: 2 },
      { id: "g7-q10", subject: "Social Studies", question: "Who appoints the Chief Minister of a state?", options: ["President", "Prime Minister", "Governor", "Speaker"], answerIndex: 2 },
    ],
  },
  8: {
    grade: 8,
    title: "Grade 8 Scholarship Mock Test",
    description: "A sharper scholarship round built around reasoning, accuracy, and subject command.",
    questions: [
      { id: "g8-q1", subject: "Mathematics", question: "What is the square root of 144?", options: ["10", "11", "12", "14"], answerIndex: 2 },
      { id: "g8-q2", subject: "English", question: "Which word is a conjunction?", options: ["Quickly", "And", "Happy", "Teacher"], answerIndex: 1 },
      { id: "g8-q3", subject: "Science", question: "Which metal is liquid at room temperature?", options: ["Iron", "Mercury", "Copper", "Aluminium"], answerIndex: 1 },
      { id: "g8-q4", subject: "Hindi", question: "'कृपया' शब्द किस भाव को प्रकट करता है?", options: ["आज्ञा", "विनम्रता", "क्रोध", "विरोध"], answerIndex: 1 },
      { id: "g8-q5", subject: "Social Studies", question: "The revolt of 1857 started from", options: ["Delhi", "Meerut", "Kanpur", "Jhansi"], answerIndex: 1 },
      { id: "g8-q6", subject: "Mathematics", question: "Solve: 15% of 200", options: ["20", "25", "30", "35"], answerIndex: 2 },
      { id: "g8-q7", subject: "English", question: "Choose the correctly spelt word.", options: ["Accomodate", "Acommodate", "Accommodate", "Acomodate"], answerIndex: 2 },
      { id: "g8-q8", subject: "Science", question: "What is the SI unit of force?", options: ["Joule", "Watt", "Newton", "Pascal"], answerIndex: 2 },
      { id: "g8-q9", subject: "Hindi", question: "'विपरीत' का पर्यायवाची चुनिए।", options: ["उल्टा", "सीधा", "समान", "मध्यम"], answerIndex: 0 },
      { id: "g8-q10", subject: "Social Studies", question: "The parliamentary form of government in India is borrowed from", options: ["USA", "France", "Britain", "Russia"], answerIndex: 2 },
    ],
  },
  9: {
    grade: 9,
    title: "Grade 9 Scholarship Mock Test",
    description: "A rigorous mock paper for scholarship aspirants with multi-subject class 9 level questions.",
    questions: [
      { id: "g9-q1", subject: "Mathematics", question: "If the angles of a triangle are 50°, 60°, and x, then x equals", options: ["60°", "70°", "80°", "90°"], answerIndex: 1 },
      { id: "g9-q2", subject: "English", question: "Choose the correct reported speech: She said, 'I have finished my work.'", options: ["She said that she has finished her work.", "She said that she had finished her work.", "She said that I had finished my work.", "She said she finished work now."], answerIndex: 1 },
      { id: "g9-q3", subject: "Science", question: "Which cell organelle is known as the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Vacuole"], answerIndex: 2 },
      { id: "g9-q4", subject: "Hindi", question: "'अभिनव' शब्द का सही अर्थ चुनिए।", options: ["पुराना", "नया", "कठिन", "कमज़ोर"], answerIndex: 1 },
      { id: "g9-q5", subject: "Social Studies", question: "The Indian Constitution came into effect on", options: ["15 August 1947", "26 January 1950", "2 October 1949", "26 November 1948"], answerIndex: 1 },
      { id: "g9-q6", subject: "Mathematics", question: "What is the value of (a + b)^2?", options: ["a^2 + b^2", "a^2 + 2ab + b^2", "a^2 - 2ab + b^2", "2a + 2b"], answerIndex: 1 },
      { id: "g9-q7", subject: "English", question: "Which literary device is used in 'The wind whispered softly'?", options: ["Simile", "Personification", "Hyperbole", "Irony"], answerIndex: 1 },
      { id: "g9-q8", subject: "Science", question: "The pH value below 7 indicates a substance is", options: ["Basic", "Neutral", "Acidic", "Metallic"], answerIndex: 2 },
      { id: "g9-q9", subject: "Hindi", question: "'मनोयोग' शब्द का अर्थ क्या है?", options: ["उदासी", "ध्यानपूर्वक लगन", "बहस", "आराम"], answerIndex: 1 },
      { id: "g9-q10", subject: "Social Studies", question: "Which of the following is a fundamental right?", options: ["Right to Property", "Right to Constitutional Remedies", "Right to Vote", "Right to Work"], answerIndex: 1 },
    ],
  },
};

export const scholarshipGrades = Object.keys(scholarshipExamData)
  .map(Number)
  .sort((left, right) => left - right);