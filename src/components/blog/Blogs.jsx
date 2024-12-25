import React, { useState } from "react";
import { Link } from "react-router-dom";
const Blogs = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 5 Must-Have Mobile Accessories in 2024",
      description:
        "Upgrade your smartphone experience with these essential accessories.",
      image: "https://i.ibb.co.com/4VmVNpQ/mobile-accessories.jpg",
      content:
        "Mobile accessories are more than just add-ons; they enhance your daily life. In 2024, must-haves include fast wireless chargers, Bluetooth earphones, camera lens kits, rugged phone cases, and pop sockets. Discover how these accessories can make your smartphone smarter...",
    },
    {
      id: 2,
      title: "Best Laptop Accessories for Productivity",
      description:
        "Boost your productivity with these game-changing laptop accessories.",
      image: "https://i.ibb.co.com/MMS24Kn/laptop-accessories.jpg",
      content:
        "A well-equipped laptop setup can significantly improve your workflow. Top recommendations include ergonomic laptop stands, external monitors, wireless keyboards and mice, USB-C hubs, and noise-canceling headphones. Find out which accessories suit your needs...",
    },
    {
      id: 3,
      title: "Portable Power Banks: Why You Need One",
      description: "Stay charged on the go with these top-rated power banks.",
      image: "https://i.ibb.co.com/W3r33HD/pic-6.webp",
      content:
        "Power banks are a lifesaver in today's connected world. Learn about the best portable chargers with high-capacity batteries, fast charging capabilities, and compact designs. Whether you're traveling or working remotely, these power banks ensure you never run out of power...",
    },
  ];

  const [modalData, setModalData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal with the specific blog details
  const openModal = (blog) => {
    setModalData(blog);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-11/12 mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            data-aos="fade-down"
            key={blog.id}
            className="card bg-base-100 shadow-lg"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p>{blog.description}</p>
              <button
                onClick={() => openModal(blog)}
                className="btn btn-primary mt-4"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && modalData && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-lg w-1/2"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside
          >
            <img src={modalData.image} alt="" />
            <h2 className="text-2xl font-bold mb-4">{modalData.title}</h2>
            <p>{modalData.content}</p>
            <button onClick={closeModal} className="btn btn-secondary mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
