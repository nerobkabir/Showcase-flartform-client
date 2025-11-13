import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-yellow-400">Artify</h2>
          <p className="text-sm text-gray-400 mt-1">
            A Creative Artwork Showcase Platform
          </p>
          <p className="text-sm text-gray-500 mt-1">
            © 2025 Artify. All rights reserved.
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-yellow-400 font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-400">📧 support@artify.com</p>
          <p className="text-sm text-gray-400">📞 +880 1856846615</p>
        </div>

        <div className="flex space-x-5">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 text-xl"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 text-xl"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 text-xl"
          >
            <FaXTwitter /> 
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 text-xl"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
