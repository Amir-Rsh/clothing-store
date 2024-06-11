export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <footer>
      <div className="footerColumn">
        <h2>Contact</h2>
        <h3 className="footerButtons">Address</h3>
        <h3 className="footerButtons">email</h3>
        <h3 className="footerButtons">Number</h3>
      </div>
      <div
        id="back-top"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "crimson",
          padding: "10px",
          borderRadius: "10%",
          cursor: "pointer",
          marginRight: "auto",
        }}
        onClick={scrollToTop}
      >
        <i className="fa-solid fa-caret-up"></i>
        <h3>Back to Top</h3>
      </div>
    </footer>
  );
}
