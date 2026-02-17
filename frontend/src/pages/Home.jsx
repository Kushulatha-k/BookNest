import Navbar from "../components/Navbar";
import PageWrapper from "../components/PageWrapper";

function Home() {
  return (
    <PageWrapper bg="https://images.unsplash.com/photo-1512820790803-83ca734da794">
      <Navbar />

      <div className="container text-center mt-5">
        <h1 className="display-4 fw-bold">📚 Welcome to BookNest</h1>
        <p className="lead">Discover Your Next Favorite Book</p>
      </div>
    </PageWrapper>
  );
}

export default Home;
