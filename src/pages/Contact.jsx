import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-gray-800">
            Contact <span className="text-yellow-500">Artify</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto text-lg">
            We’d love to hear from you. Reach out for support, feedback,
            or collaboration.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Get in Touch
            </h3>

            <ContactItem label="Email" value="support@artify.com" />
            <ContactItem label="Phone" value="+880 1856-846615" />
            <ContactItem label="Location" value="Bangladesh" />

            <p className="text-gray-500 text-sm mt-6">
              Response time: within 24 hours
            </p>
          </div>

          <form className="bg-white rounded-3xl shadow-xl p-10 space-y-5">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Send a Message
            </h3>

            <Input label="Your Name" type="text" />
            <Input label="Your Email" type="email" />

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold py-3 rounded-xl transition shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

const ContactItem = ({ label, value }) => (
  <div className="mb-4">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-lg font-semibold text-gray-800">{value}</p>
  </div>
);

const Input = ({ label, type }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-400 outline-none"
    />
  </div>
);

export default Contact;
