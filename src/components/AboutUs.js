import React from "react";

const AboutUs = () => {
  return (
    <section style={styles.about}>
      <h2 style={styles.title}>About Us</h2>
      <p style={styles.text}>
        ZANEROBE is a leading fashion brand known for its innovative designs and
        high-quality products.
      </p>
    </section>
  );
};

const styles = {
  about: {
    padding: "50px 20px",
    textAlign: "center",
    backgroundColor: "#000",
    color: "#fff",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    maxWidth: "600px",
    margin: "0 auto",
  },
};

export default AboutUs;
