import Navbar from '../../components/Navbar/Navbar.jsx';
import Section from '../../components/Section/Section.jsx';

const HomePage = () => {
  return (
    <>
      <Navbar />

      <Section
        id="browse"
        title="Browse Available Books"
        description="Explore all books in our library. No account needed."
        buttonText= "Browse Books"
        navigateTo="/all-books"
      >
        {/* Later, you can map book cards here */}
        <p>📚 Book list will go here...</p>
      </Section>

      <Section
        id="request"
        title="Request a Library Card"
        description="Sign in to request your own library card."
        buttonText= "Request Card"
      >
        <p>🔐 Requires login</p>
      </Section>

      <Section
        id="borrowed"
        title="Your Borrowed Books"
        description="View your current loans and due dates."
        buttonText= "View Borrowed"
      >
        <p>📅 Login to see borrowed books</p>
      </Section>
    </>
  );
};

export default HomePage;
