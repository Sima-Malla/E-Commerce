import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/contactus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(data.error || "Something went wrong");
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Image Section */}
        <div className="md:w-1/2 flex items-center object-cover justify-center bg-gray-50 p-2">
          <img
            src="https://img.freepik.com/free-photo/portrait-woman-dark-green-tshirt_176420-28826.jpg?semt=ais_hybrid&w=740" // Replace with your image path
            alt="Contact Us"
            className="rounded-lg object-cover max-h-[500px]"
          />
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 p-8">
          <h2 className="text-2xl font-semibold text-center text-orange-500 mb-2">
            Get in Touch with Our Experts Team
          </h2>
          <p className="text-center text-gray-700 italic mb-6">
            Share some details here.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium text-gray-800 mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-800 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div>
              <label className="block font-medium text-gray-800 mb-1">
                Comment or Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
            >
              SUBMIT
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 text-gray-800">
            <p>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:9865896532"
                className="text-blue-600 hover:underline"
              >
                9865896532
              </a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:sima.malla2004@gmail.com"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                sima.malla2004@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
