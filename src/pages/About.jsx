import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-gray-800">
            About <span className="text-yellow-500">Artify</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg">
            A modern platform where creativity meets technology.
            Showcase, manage, and celebrate digital artwork.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <InfoCard
            title="Our Mission"
            icon="🎯"
            desc="Empowering artists with a professional platform to share creativity and manage artwork effortlessly."
          />
          <InfoCard
            title="Our Vision"
            icon="🚀"
            desc="Building a global creative ecosystem where art and innovation grow together."
          />
          <InfoCard
            title="Our Values"
            icon="💡"
            desc="Creativity, simplicity, performance, and user-centric design at our core."
          />
        </div>

        <div className="mt-20 bg-white rounded-3xl shadow-xl p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Technology Stack
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              "React & React Router",
              "Tailwind CSS",
              "Firebase Authentication",
              "Node.js & Express",
              "MongoDB",
              "REST API Architecture",
            ].map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border hover:shadow-md transition"
              >
                <span className="text-yellow-500 text-xl">✔</span>
                <p className="text-gray-700 font-medium">{tech}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

const InfoCard = ({ title, desc, icon }) => (
  <div className="bg-white rounded-3xl shadow-lg p-8 hover:shadow-2xl transition">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

export default About;
