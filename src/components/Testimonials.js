import React from "react";

const Testimonials = () => {
  return (
    <section style={styles.testimonials}>
      <h2 style={styles.title}>Testimonials</h2>
      <div style={styles.testimonialList}>
        <div style={styles.testimonial}>"Great products!" - Customer 1</div>
        <div style={styles.testimonial}>"Amazing service!" - Customer 2</div>
      </div>
    </section>
  );
};

const styles = {
  testimonials: {
    padding: "50px 20px",
    textAlign: "center",
    backgroundColor: "#f4f4f4",
    color: "#000",
  },
  title: {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  testimonialList: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  testimonial: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default Testimonials;
