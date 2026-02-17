import { motion } from "framer-motion";

function BookCard({ book }) {

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find(item => item._id === book._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        _id: book._id,
        title: book.title,
        price: book.price,
        image: book.image,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to Cart ✅");
  };

  return (
    <motion.div
      className="card shadow-lg h-100"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={book.image}
        alt={book.title}
        style={{ height: "280px", objectFit: "cover" }}
      />

      <div className="card-body text-dark">
        <h6>{book.title}</h6>
        <p className="text-muted">{book.author}</p>
        <h6 className="text-success">₹{book.price}</h6>

        <button
          className="btn btn-dark w-100"
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

export default BookCard;
