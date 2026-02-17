const express = require("express");
const Book = require("../models/Book");

const router = express.Router();


// ============================================
// GET ALL BOOKS + SEARCH
// ============================================
router.get("/", async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { title: { $regex: req.query.search, $options: "i" } },
            { author: { $regex: req.query.search, $options: "i" } },
            { genre: { $regex: req.query.search, $options: "i" } }
          ]
        }
      : {};

    const books = await Book.find({ ...keyword });

    res.json(books);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ============================================
// ADD BOOK
// ============================================
router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ============================================
// 100 REAL BOOKS SEED
// ============================================
router.get("/seed", async (req, res) => {
  try {
    await Book.deleteMany();

    const realBooks = [
      "The Alchemist",
      "Atomic Habits",
      "Rich Dad Poor Dad",
      "Ikigai",
      "The Psychology of Money",
      "The Hobbit",
      "Harry Potter and the Sorcerer's Stone",
      "1984",
      "The Power of Now",
      "The Great Gatsby",
      "To Kill a Mockingbird",
      "The Catcher in the Rye",
      "Sapiens",
      "The Da Vinci Code",
      "Think and Grow Rich",
      "The 7 Habits of Highly Effective People",
      "The Subtle Art of Not Giving a F*ck",
      "The Silent Patient",
      "The Book Thief",
      "The Kite Runner",
      "Gone Girl",
      "The Hunger Games",
      "Pride and Prejudice",
      "Dune",
      "The Martian",
      "Life of Pi",
      "The Midnight Library",
      "Educated",
      "Becoming",
      "The Art of War",
      "Deep Work",
      "Zero to One",
      "The 48 Laws of Power",
      "Thinking Fast and Slow",
      "The Intelligent Investor",
      "Steve Jobs",
      "Elon Musk",
      "The Code Breaker",
      "The Night Circus",
      "The Handmaid's Tale",
      "The Little Prince",
      "The Brothers Karamazov",
      "Crime and Punishment",
      "The Divine Comedy",
      "Dracula",
      "Frankenstein",
      "The Odyssey",
      "The Iliad",
      "Moby Dick",
      "War and Peace",
      "The Shining",
      "The Road",
      "The Stand",
      "The Name of the Wind",
      "The Help",
      "The Green Mile",
      "The White Tiger",
      "The Shadow of the Wind",
      "The Girl with the Dragon Tattoo",
      "The House of the Spirits",
      "The Snow Queen",
      "The Golden Compass",
      "The Black Swan",
      "The Ocean at the End of the Lane",
      "The Book of Secrets",
      "The Awakening",
      "The Alchemist's Daughter",
      "The Last Kingdom",
      "The Final Empire",
      "The Iron Throne",
      "The Silver Chair",
      "The Forgotten Realm",
      "The Hidden Truth",
      "The Lost World",
      "The Silent Sea",
      "The Broken Empire",
      "The Immortal Life",
      "The Dark Tower",
      "The Secret Garden",
      "The Alchemist Code",
      "The Eternal Flame",
      "The Girl on the Train",
      "The Maze Runner",
      "The Fault in Our Stars",
      "The Chronicles of Narnia",
      "The Lord of the Rings",
      "The Time Traveler's Wife",
      "The Great Alone",
      "The Giver",
      "The Innovators",
      "The Lean Startup",
      "The Monk Who Sold His Ferrari",
      "The Power of Habit",
      "The Secret",
      "The Richest Man in Babylon"
    ];

    const books = realBooks.map((title, index) => ({
      title,
      author: "Various Authors",
      genre: "Fiction",
      description: `A popular book titled ${title}.`,
      price: 300 + index * 10,
      stock: 20,
      image: `https://picsum.photos/seed/book${index}/400/600`
    }));

    await Book.insertMany(books);

    res.json({
      message: "100 Real Books Inserted",
      total: books.length
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;