export const categories = [
  'All', 'Romance', 'Mystery', 'Science Fiction', 'Fantasy', 'Historical', 'Biography',
  'Self-help', 'Memoir', 'Travel', 'Cooking', "Children's", 'Young Adult',
  'Comics & Graphic Novels', 'Poetry', 'Drama', 'Science', 'Philosophy', 'Religion',
  'Language Learning',
];

export const languages = ['All', 'English', 'Hindi', 'Spanish'];
export const formats = ['All', 'Paperback', 'Hard Cover', 'eBook'];
export const priceRanges = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under ₹150', min: 0, max: 150 },
  { label: '₹150 - ₹300', min: 150, max: 300 },
  { label: '₹300 - ₹400', min: 300, max: 400 },
  { label: 'Above ₹400', min: 400, max: Infinity },
];
export const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
];

const authorBio = (name, text) => ({ name, bio: text });

// section: which shelf of the landing page the book appears in
export const books = [
  {
    id: 'b1', title: 'The Art of Focus', author: 'Arjun Patel', section: 'Recommended for You',
    description: 'Practical guide to mastering focus & boosting productivity every day.',
    format: 'Paperback', tags: ['Non-fiction', 'Self Help'], category: 'Self-help',
    price: 399, delivery: 'Mon, 21 Jul', language: 'English', rating: 4.5, sold: 312,
    publisher: 'ABC Publishers', cover: { bg: '#f4f1ea', fg: '#1b1b1b', accent: '#d9482b', style: 'target' },
    writer: authorBio('Arjun Patel', 'Arjun Patel is a productivity researcher and speaker who helps teams prioritise what matters most.'),
  },
  {
    id: 'b2', title: 'The Art of Learning', author: 'Raj Patel', section: 'Recommended for You',
    description: 'Master the mindset and methods for effective lifelong learning.',
    format: 'Paperback', tags: ['Non-fiction', 'Self Help'], category: 'Self-help',
    price: 259, delivery: 'Mon, 21 Jul', language: 'English', rating: 4.2, sold: 188,
    publisher: 'ABC Publishers', cover: { bg: '#d73a31', fg: '#ffffff', accent: '#ffd23f', style: 'bulb' },
    writer: authorBio('Raj Patel', 'Raj Patel is an educator and author exploring how adults learn faster and retain more.'),
  },
  {
    id: 'b3', title: 'The Path to Success', author: 'James Wright', section: 'Recommended for You',
    description: 'A practical guide to achieving goals with clarity and confidence.',
    format: 'Paperback', tags: ['Non-fiction', 'Self Help'], category: 'Self-help',
    price: 359, delivery: 'Mon, 21 Jul', language: 'English', rating: 4.0, sold: 240,
    publisher: 'Summit Press', cover: { bg: '#0f8b8d', fg: '#ffd23f', accent: '#ffd23f', style: 'arrow' },
    writer: authorBio('James Wright', 'James Wright is a business coach and bestselling author on career growth and personal leadership.'),
  },
  {
    id: 'b4', title: 'The Midnight Hour', author: 'James Adams', section: 'Bestsellers this Month',
    description: "Haunting tale of a man's journey & the shadows of a forgotten past.",
    format: 'Paperback', tags: ['Fiction', 'Thriller', 'Horror'], category: 'Mystery',
    price: 299, delivery: 'Mon, 21 Jul', language: 'English', rating: 4.6, sold: 905,
    publisher: 'Nightfall Books', cover: { bg: '#10282a', fg: '#f5d76e', accent: '#f5d76e', style: 'moon' },
    writer: authorBio('James Adams', 'James Adams writes atmospheric thrillers set in small towns with big secrets.'),
  },
  {
    id: 'b5', title: 'Beneath the Stars', author: 'Jessica Martin', section: 'Bestsellers this Month',
    description: 'A heartwarming tale, where two souls discover who you need.',
    format: 'Hard Cover', tags: ['Fiction', 'Love', 'Drama'], category: 'Romance',
    price: 499, delivery: 'Mon, 21 Jul', language: 'English', rating: 4.8, sold: 1240,
    publisher: 'Rosewood', cover: { bg: '#8a3b2b', fg: '#f2c14e', accent: '#f2c14e', style: 'stars' },
    writer: authorBio('Jessica Martin', 'Jessica Martin is a romance novelist whose stories have been translated into 14 languages.'),
  },
  {
    id: 'b6', title: 'The Final Frontier', author: 'Laura Mitchell', section: 'Bestsellers this Month',
    description: 'A mission to space secrets to change humanity forever.',
    format: 'Paperback', tags: ['Fiction', 'Thriller'], category: 'Science Fiction',
    price: 359, delivery: 'Mon, 21 Jul', language: 'English', rating: 4.3, sold: 610,
    publisher: 'Orbit House', cover: { bg: '#123b5c', fg: '#ffffff', accent: '#ff7a59', style: 'rocket' },
    writer: authorBio('Laura Mitchell', 'Laura Mitchell is a former aerospace engineer turned science fiction author.'),
  },
  {
    id: 'b7', title: 'Joy of Minimalism', author: 'Daniel Reed', section: 'New Launches',
    description: 'Declutter your life to uncover peace, clarity, and joy.',
    format: 'Paperback', tags: ['Non-fiction', 'Self Help'], category: 'Self-help',
    price: 149, delivery: 'Mon, 21 Jul', language: 'English', rating: 5.0, sold: 145,
    publisher: 'ABC Publishers', cover: { bg: '#fcd116', fg: '#1b1b1b', accent: '#1b1b1b', style: 'arch' },
    writer: authorBio('Daniel Reed', 'Daniel Reed is a writer, minimalist, and productivity coach based in San Francisco. With a passion for intentional living, Daniel has dedicated his career to helping individuals simplify their lives — one habit, one space, and one thought at a time. He is the author of The Joy of Minimalism, an acclaimed guide to decluttering both physically and mentally.'),
  },
  {
    id: 'b8', title: 'The Vanishing House', author: 'Clara Nelson', section: 'New Launches',
    description: 'A chilling mystery unfolds within a house that disappears.',
    format: 'eBook', tags: ['Fiction', 'Horror'], category: 'Mystery',
    price: 99, delivery: 'Mon, 21 Jul', language: 'English', rating: 3.9, sold: 77,
    publisher: 'Nightfall Books', cover: { bg: '#1f3a3d', fg: '#e8e0c8', accent: '#e8e0c8', style: 'moon' },
    writer: authorBio('Clara Nelson', 'Clara Nelson writes gothic mysteries and ghost stories.'),
  },
  {
    id: 'b9', title: 'The Lost Kitten', author: 'Emily Parker', section: 'New Launches',
    description: 'A heartwarming tale of courage, friendship, and feline adventure.',
    format: 'Hard Cover', tags: ['Fiction', 'Children'], category: "Children's",
    price: 339, delivery: 'Mon, 21 Jul', language: 'English', rating: 4.7, sold: 530,
    publisher: 'Little Leaf', cover: { bg: '#f58220', fg: '#ffffff', accent: '#fff3d6', style: 'paw' },
    writer: authorBio('Emily Parker', 'Emily Parker is an award-winning children’s author and illustrator.'),
  },
];

export const getBook = (id) => books.find((b) => b.id === id);

export const writers = Object.values(
  books.reduce((acc, b) => {
    if (!acc[b.author]) acc[b.author] = { ...b.writer, books: [] };
    acc[b.author].books.push(b.id);
    return acc;
  }, {})
);

export const shelves = ['Recommended for You', 'Bestsellers this Month', 'New Launches'];

export const paymentMethods = ['Credit Card', 'Debit card', 'UPI', 'Wallet'];

export const coupons = { SAVE100: 100, BOOKS50: 50 };

export const TAX_RATE = 0.122; // approx, matches mock (₹62 on ₹508)
export const GIFT_POINT_VALUE = 1; // ₹ per point
