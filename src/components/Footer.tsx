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
        <h3 className="footerButtons">
          Address{" "}
          <span style={{ marginLeft: "20px", fontWeight: "normal" }}>
            clothing store project avenue
          </span>
        </h3>
        <h3 className="footerButtons">
          email{" "}
          <span style={{ marginLeft: "20px", fontWeight: "normal" }}>
            clothing@project.test
          </span>
        </h3>
        <h3 className="footerButtons">
          Number{" "}
          <span style={{ marginLeft: "20px", fontWeight: "normal" }}>
            0123456789
          </span>
        </h3>
      </div>
      <div
        id="back-top"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "palevioletred",
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
