'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  /**
   * Add seed commands here.
   *
   * Example:
   * await queryInterface.bulkInsert('People', [{
   *   name: 'John Doe',
   *   isBetaMember: false
   * }], {});
  */
  await queryInterface.bulkInsert('Books', [
    // Programming Books
    {
      isbn: '9781234567897',
      title: 'Learning JavaScript',
      description: 'A comprehensive guide to modern JavaScript development, covering ES6+, async programming, and web APIs.',
      price: 19.99,
      stock_quantity: 10,
      image_url: 'https://m.media-amazon.com/images/I/51WD-F3GobL._SY522_.jpg',
      author_id: 1,
      category_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9789876543210',
      title: 'Mastering CSS',
      description: 'Advanced CSS techniques and modern styling methods for web developers. Learn responsive design, CSS Grid, Flexbox, animations, and cutting-edge CSS features.',
      price: 25.00,
      stock_quantity: 5,
      image_url: 'https://m.media-amazon.com/images/I/51J4vzcj0RL._SY522_.jpg',
      author_id: 2,
      category_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9781111111111',
      title: 'Python for Beginners',
      description: 'Start your programming journey with Python. Learn syntax, data structures, and build real projects.',
      price: 22.50,
      stock_quantity: 15,
      image_url: 'https://m.media-amazon.com/images/I/51-0YrLQvmL._SY522_.jpg',
      author_id: 3,
      category_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9782222222222',
      title: 'React Native Development',
      description: 'Build cross-platform mobile apps with React Native. Complete guide from setup to deployment.',
      price: 28.99,
      stock_quantity: 8,
      image_url: 'https://m.media-amazon.com/images/I/51J1J1J1J1L._SY522_.jpg',
      author_id: 4,
      category_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9783333333333',
      title: 'Data Structures and Algorithms',
      description: 'Master fundamental computer science concepts with practical examples and exercises.',
      price: 35.00,
      stock_quantity: 12,
      image_url: 'https://m.media-amazon.com/images/I/51K2K2K2K2L._SY522_.jpg',
      author_id: 5,
      category_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    // Design Books
    {
      isbn: '9784444444444',
      title: 'UI/UX Design Principles',
      description: 'Learn the fundamentals of user interface and user experience design for digital products.',
      price: 24.99,
      stock_quantity: 7,
      image_url: 'https://m.media-amazon.com/images/I/51L3L3L3L3L._SY522_.jpg',
      author_id: 6,
      category_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9785555555555',
      title: 'Graphic Design Mastery',
      description: 'Complete guide to visual communication, typography, color theory, and layout design.',
      price: 26.50,
      stock_quantity: 9,
      image_url: 'https://m.media-amazon.com/images/I/51M4M4M4M4L._SY522_.jpg',
      author_id: 7,
      category_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9786666666666',
      title: 'Design Thinking Process',
      description: 'Innovation through human-centered design methodology and creative problem solving.',
      price: 23.75,
      stock_quantity: 11,
      image_url: 'https://m.media-amazon.com/images/I/51N5N5N5N5L._SY522_.jpg',
      author_id: 8,
      category_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9787777777777',
      title: 'Digital Art Fundamentals',
      description: 'Learn digital painting, illustration techniques, and digital art tools for creative expression.',
      price: 29.99,
      stock_quantity: 6,
      image_url: 'https://m.media-amazon.com/images/I/51O6O6O6O6L._SY522_.jpg',
      author_id: 9,
      category_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9788888888888',
      title: 'Brand Identity Design',
      description: 'Create memorable brand identities through logo design, visual systems, and brand guidelines.',
      price: 27.25,
      stock_quantity: 8,
      image_url: 'https://m.media-amazon.com/images/I/51P7P7P7P7L._SY522_.jpg',
      author_id: 10,
      category_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    // Science Fiction Books
    {
      isbn: '9789999999999',
      title: 'The Quantum Paradox',
      description: 'A thrilling sci-fi adventure exploring parallel universes and quantum mechanics.',
      price: 16.99,
      stock_quantity: 20,
      image_url: 'https://m.media-amazon.com/images/I/51Q8Q8Q8Q8L._SY522_.jpg',
      author_id: 1,
      category_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000001',
      title: 'Mars Colony Alpha',
      description: 'Humanity\'s first settlement on Mars faces unexpected challenges and discoveries.',
      price: 18.50,
      stock_quantity: 15,
      image_url: 'https://m.media-amazon.com/images/I/51R9R9R9R9L._SY522_.jpg',
      author_id: 2,
      category_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000002',
      title: 'Cybernetic Dreams',
      description: 'In a world where humans and AI merge, what does it mean to be conscious?',
      price: 17.75,
      stock_quantity: 18,
      image_url: 'https://m.media-amazon.com/images/I/51S0S0S0S0L._SY522_.jpg',
      author_id: 3,
      category_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000003',
      title: 'Time Traveler\'s Dilemma',
      description: 'A scientist discovers time travel but faces the consequences of altering history.',
      price: 19.25,
      stock_quantity: 12,
      image_url: 'https://m.media-amazon.com/images/I/51T1T1T1T1L._SY522_.jpg',
      author_id: 4,
      category_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000004',
      title: 'Galactic Empire',
      description: 'Epic space opera spanning multiple worlds and civilizations in conflict.',
      price: 21.00,
      stock_quantity: 14,
      image_url: 'https://m.media-amazon.com/images/I/51U2U2U2U2L._SY522_.jpg',
      author_id: 5,
      category_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    // Mystery Books
    {
      isbn: '9780000000005',
      title: 'The Silent Witness',
      description: 'A detective must solve a murder case where the only witness cannot speak.',
      price: 15.99,
      stock_quantity: 22,
      image_url: 'https://m.media-amazon.com/images/I/51V3V3V3V3L._SY522_.jpg',
      author_id: 6,
      category_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000006',
      title: 'Murder at Midnight',
      description: 'A locked-room mystery that challenges everything you think you know about crime.',
      price: 14.75,
      stock_quantity: 19,
      image_url: 'https://m.media-amazon.com/images/I/51W4W4W4W4L._SY522_.jpg',
      author_id: 7,
      category_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000007',
      title: 'The Vanishing Act',
      description: 'People are disappearing without a trace. Can the detective find the pattern?',
      price: 16.50,
      stock_quantity: 17,
      image_url: 'https://m.media-amazon.com/images/I/51X5X5X5X5L._SY522_.jpg',
      author_id: 8,
      category_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000008',
      title: 'Cold Case Revival',
      description: 'A decades-old murder case is reopened when new evidence comes to light.',
      price: 17.25,
      stock_quantity: 13,
      image_url: 'https://m.media-amazon.com/images/I/51Y6Y6Y6Y6L._SY522_.jpg',
      author_id: 9,
      category_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000009',
      title: 'The Art Thief',
      description: 'A master thief targets the world\'s most famous paintings, but leaves mysterious clues.',
      price: 18.99,
      stock_quantity: 16,
      image_url: 'https://m.media-amazon.com/images/I/51Z7Z7Z7Z7L._SY522_.jpg',
      author_id: 10,
      category_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    // Romance Books
    {
      isbn: '9780000000010',
      title: 'Summer Romance',
      description: 'A chance encounter on a beach vacation leads to unexpected love.',
      price: 13.99,
      stock_quantity: 25,
      image_url: 'https://m.media-amazon.com/images/I/51A8A8A8A8L._SY522_.jpg',
      author_id: 1,
      category_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000011',
      title: 'The Wedding Planner',
      description: 'A wedding planner falls for the groom, but will she follow her heart?',
      price: 14.50,
      stock_quantity: 21,
      image_url: 'https://m.media-amazon.com/images/I/51B9B9B9B9L._SY522_.jpg',
      author_id: 2,
      category_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000012',
      title: 'Second Chances',
      description: 'High school sweethearts reunite after twenty years apart.',
      price: 15.25,
      stock_quantity: 18,
      image_url: 'https://m.media-amazon.com/images/I/51C0C0C0C0L._SY522_.jpg',
      author_id: 3,
      category_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000013',
      title: 'Love in the City',
      description: 'A small-town girl navigates love and career in the big city.',
      price: 16.75,
      stock_quantity: 23,
      image_url: 'https://m.media-amazon.com/images/I/51D1D1D1D1L._SY522_.jpg',
      author_id: 4,
      category_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000014',
      title: 'The Matchmaker\'s Heart',
      description: 'A professional matchmaker struggles to find love for herself.',
      price: 14.99,
      stock_quantity: 19,
      image_url: 'https://m.media-amazon.com/images/I/51E2E2E2E2L._SY522_.jpg',
      author_id: 5,
      category_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    // Fantasy Books
    {
      isbn: '9780000000015',
      title: 'Dragon\'s Legacy',
      description: 'A young dragon rider must save the kingdom from an ancient evil.',
      price: 20.99,
      stock_quantity: 16,
      image_url: 'https://m.media-amazon.com/images/I/51F3F3F3F3L._SY522_.jpg',
      author_id: 6,
      category_id: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000016',
      title: 'The Mage\'s Quest',
      description: 'A powerful mage searches for the lost artifacts of creation.',
      price: 22.50,
      stock_quantity: 14,
      image_url: 'https://m.media-amazon.com/images/I/51G4G4G4G4L._SY522_.jpg',
      author_id: 7,
      category_id: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000017',
      title: 'Realm of Shadows',
      description: 'Heroes venture into a dark realm to rescue the captured princess.',
      price: 19.75,
      stock_quantity: 17,
      image_url: 'https://m.media-amazon.com/images/I/51H5H5H5H5L._SY522_.jpg',
      author_id: 8,
      category_id: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000018',
      title: 'The Enchanted Forest',
      description: 'Magical creatures unite to protect their forest home from destruction.',
      price: 18.25,
      stock_quantity: 20,
      image_url: 'https://m.media-amazon.com/images/I/51I6I6I6I6L._SY522_.jpg',
      author_id: 9,
      category_id: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000019',
      title: 'Sword of Destiny',
      description: 'A legendary sword chooses its wielder to fulfill an ancient prophecy.',
      price: 21.75,
      stock_quantity: 12,
      image_url: 'https://m.media-amazon.com/images/I/51J7J7J7J7L._SY522_.jpg',
      author_id: 10,
      category_id: 6,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    // Biography Books
    {
      isbn: '9780000000020',
      title: 'Steve Jobs: The Visionary',
      description: 'The life and legacy of Apple\'s co-founder and his impact on technology.',
      price: 24.99,
      stock_quantity: 15,
      image_url: 'https://m.media-amazon.com/images/I/51K8K8K8K8L._SY522_.jpg',
      author_id: 1,
      category_id: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000021',
      title: 'Marie Curie: Pioneer of Science',
      description: 'The inspiring story of the first woman to win a Nobel Prize.',
      price: 23.50,
      stock_quantity: 18,
      image_url: 'https://m.media-amazon.com/images/I/51L9L9L9L9L._SY522_.jpg',
      author_id: 2,
      category_id: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000022',
      title: 'Nelson Mandela: Long Walk to Freedom',
      description: 'The autobiography of South Africa\'s first Black president.',
      price: 22.25,
      stock_quantity: 20,
      image_url: 'https://m.media-amazon.com/images/I/51M0M0M0M0L._SY522_.jpg',
      author_id: 3,
      category_id: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000023',
      title: 'Leonardo da Vinci: Renaissance Genius',
      description: 'Exploring the life and works of history\'s greatest polymath.',
      price: 26.75,
      stock_quantity: 13,
      image_url: 'https://m.media-amazon.com/images/I/51N1N1N1N1L._SY522_.jpg',
      author_id: 4,
      category_id: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000024',
      title: 'Oprah Winfrey: Media Mogul',
      description: 'From poverty to becoming one of the most influential women in media.',
      price: 21.99,
      stock_quantity: 16,
      image_url: 'https://m.media-amazon.com/images/I/51O2O2O2O2L._SY522_.jpg',
      author_id: 5,
      category_id: 7,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    // History Books
    {
      isbn: '9780000000025',
      title: 'World War II Chronicles',
      description: 'A comprehensive look at the events that shaped the modern world.',
      price: 28.99,
      stock_quantity: 12,
      image_url: 'https://m.media-amazon.com/images/I/51P3P3P3P3L._SY522_.jpg',
      author_id: 6,
      category_id: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000026',
      title: 'Ancient Rome: Rise and Fall',
      description: 'The complete history of the Roman Empire from republic to collapse.',
      price: 31.50,
      stock_quantity: 10,
      image_url: 'https://m.media-amazon.com/images/I/51Q4Q4Q4Q4L._SY522_.jpg',
      author_id: 7,
      category_id: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000027',
      title: 'The Industrial Revolution',
      description: 'How steam, steel, and technology transformed human civilization.',
      price: 27.25,
      stock_quantity: 14,
      image_url: 'https://m.media-amazon.com/images/I/51R5R5R5R5L._SY522_.jpg',
      author_id: 8,
      category_id: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000028',
      title: 'Medieval Europe',
      description: 'Life, culture, and politics in the Middle Ages.',
      price: 25.75,
      stock_quantity: 11,
      image_url: 'https://m.media-amazon.com/images/I/51S6S6S6S6L._SY522_.jpg',
      author_id: 9,
      category_id: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000029',
      title: 'The Cold War Era',
      description: 'Tensions, conflicts, and politics that defined the latter half of the 20th century.',
      price: 29.99,
      stock_quantity: 9,
      image_url: 'https://m.media-amazon.com/images/I/51T7T7T7T7L._SY522_.jpg',
      author_id: 10,
      category_id: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    // Self Help Books
    {
      isbn: '9780000000030',
      title: 'The Power of Mindfulness',
      description: 'Transform your life through meditation and present-moment awareness.',
      price: 18.99,
      stock_quantity: 24,
      image_url: 'https://m.media-amazon.com/images/I/51U8U8U8U8L._SY522_.jpg',
      author_id: 1,
      category_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000031',
      title: 'Habits for Success',
      description: 'Build daily routines that lead to extraordinary results.',
      price: 17.50,
      stock_quantity: 22,
      image_url: 'https://m.media-amazon.com/images/I/51V9V9V9V9L._SY522_.jpg',
      author_id: 2,
      category_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000032',
      title: 'Emotional Intelligence Mastery',
      description: 'Develop your EQ to improve relationships and achieve your goals.',
      price: 20.25,
      stock_quantity: 19,
      image_url: 'https://m.media-amazon.com/images/I/51W0W0W0W0L._SY522_.jpg',
      author_id: 3,
      category_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000033',
      title: 'Financial Freedom Blueprint',
      description: 'A step-by-step guide to building wealth and achieving financial independence.',
      price: 22.75,
      stock_quantity: 17,
      image_url: 'https://m.media-amazon.com/images/I/51X1X1X1X1L._SY522_.jpg',
      author_id: 4,
      category_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000034',
      title: 'Confidence Revolution',
      description: 'Overcome self-doubt and unlock your true potential.',
      price: 19.99,
      stock_quantity: 21,
      image_url: 'https://m.media-amazon.com/images/I/51Y2Y2Y2Y2L._SY522_.jpg',
      author_id: 5,
      category_id: 9,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    // Business Books
    {
      isbn: '9780000000035',
      title: 'Startup Success Secrets',
      description: 'Essential strategies for building and scaling a successful startup.',
      price: 26.99,
      stock_quantity: 15,
      image_url: 'https://m.media-amazon.com/images/I/51Z3Z3Z3Z3L._SY522_.jpg',
      author_id: 6,
      category_id: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000036',
      title: 'Leadership Excellence',
      description: 'Develop the skills and mindset of exceptional leaders.',
      price: 24.50,
      stock_quantity: 18,
      image_url: 'https://m.media-amazon.com/images/I/51A4A4A4A4L._SY522_.jpg',
      author_id: 7,
      category_id: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000037',
      title: 'Digital Marketing Mastery',
      description: 'Complete guide to online marketing, social media, and customer acquisition.',
      price: 28.25,
      stock_quantity: 13,
      image_url: 'https://m.media-amazon.com/images/I/51B5B5B5B5L._SY522_.jpg',
      author_id: 8,
      category_id: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000038',
      title: 'Strategic Planning Guide',
      description: 'Framework for developing and executing winning business strategies.',
      price: 31.75,
      stock_quantity: 11,
      image_url: 'https://m.media-amazon.com/images/I/51C6C6C6C6L._SY522_.jpg',
      author_id: 9,
      category_id: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000039',
      title: 'The Entrepreneur\'s Handbook',
      description: 'From idea to IPO: a comprehensive guide to building a business empire.',
      price: 29.50,
      stock_quantity: 14,
      image_url: 'https://m.media-amazon.com/images/I/51D7D7D7D7L._SY522_.jpg',
      author_id: 10,
      category_id: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    
    // Additional Mixed Books
    {
      isbn: '0195153448',
      title: 'Classical Mythology',
      description: 'An comprehensive exploration of ancient Greek and Roman myths, legends, and their enduring influence on Western literature and culture. Perfect for students and mythology enthusiasts.',
      price: 25.00,
      stock_quantity: 5,
      image_url: 'http://images.amazon.com/images/P/0195153448.01.LZZZZZZZ.jpg',
      author_id: 2,
      category_id: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '0002005018',
      title: 'Clara Callan',
      description: 'A poignant novel about two sisters in 1930s Canada, exploring themes of family, love, and personal growth during the Great Depression. Winner of multiple literary awards.',
      price: 25.00,
      stock_quantity: 5,
      image_url: 'http://images.amazon.com/images/P/0002005018.01.LZZZZZZZ.jpg',
      author_id: 3,
      category_id: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000040',
      title: 'Advanced Machine Learning',
      description: 'Deep dive into neural networks, deep learning, and AI algorithms for data scientists.',
      price: 45.99,
      stock_quantity: 8,
      image_url: 'https://m.media-amazon.com/images/I/51E8E8E8E8L._SY522_.jpg',
      author_id: 1,
      category_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000041',
      title: 'Space Exploration History',
      description: 'From Sputnik to Mars rovers: the complete story of humanity\'s journey to the stars.',
      price: 32.50,
      stock_quantity: 12,
      image_url: 'https://m.media-amazon.com/images/I/51F9F9F9F9L._SY522_.jpg',
      author_id: 5,
      category_id: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      isbn: '9780000000042',
      title: 'The Art of Negotiation',
      description: 'Master the skills of persuasion and deal-making in business and life.',
      price: 23.99,
      stock_quantity: 16,
      image_url: 'https://m.media-amazon.com/images/I/51G0G0G0G0L._SY522_.jpg',
      author_id: 7,
      category_id: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
}
export async function down(queryInterface, Sequelize) {
  /**
   * Add commands to revert seed here.
   *
   * Example:
   * await queryInterface.bulkDelete('People', null, {});
   */
  await queryInterface.bulkDelete('Books', null, {});
}
