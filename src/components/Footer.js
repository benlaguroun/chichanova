import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© 2023 ZANEROBE. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: "#000",
    color: "#fff",
    padding: "20px",
    textAlign: "center",
  },
  text: {
    margin: "0",
  },
};

export default Footer;
