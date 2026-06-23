import React from "react";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Image Section */}
        <div className="md:w-1/3">
          <img
            src="https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg"
            alt="Shoes Hub"
            className="rounded-lg shadow-md w-full object-cover"
          />
        </div>

        {/* Text Section */}
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            About Shoes Hub
          </h2>
          <p className="text-gray-600 mb-4">
            Welcome to <strong>Shoes Hub</strong>, your one-stop destination for
            the latest and trendiest footwear. We are passionate about helping
            you find the perfect pair of shoes that combines style, comfort, and
            quality.
          </p>
          <p className="text-gray-600 mb-4">
            Since our inception, we have been committed to offering premium
            shoes for men, women, and kids. Whether you're looking for sports
            shoes, casual sneakers, or formal footwear, Shoes Hub has it all.
          </p>
          <p className="text-gray-600 mb-4 justify-normal">
            <strong>Our Story</strong>
            <br></br>
            Founded with a vision to make stylish, high-quality footwear
            accessible to everyone, Shoes Hub began as a small local store with
            a big dream. We started by listening to our customers -
            understanding their needs for durable, affordable, and fashionable
            footwear. Over time, our love for shoes turned into a full-fledged
            brand trusted by thousands across Nepal and beyond. Our journey is
            powered by dedication, hard work, and an unwavering commitment to
            customer satisfaction.{" "}
          </p>
          <p className="text-gray-600">
            Thank you for choosing Shoes Hub. Step into style with us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
