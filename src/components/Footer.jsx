import {FaFacebookF, FaInstagram, FaLinkedinIn,} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-3 items-center">

        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-yellow-400">Artify</h2>
          <p className="text-sm text-gray-400 mt-2">
            A Creative Artwork Showcase Platform
          </p>
          <p className="text-xs text-gray-500 mt-1">
            © {new Date().getFullYear()} Artify. All rights reserved.
          </p>
        </div>

        <div className="text-center">
          <h3 className="text-yellow-400 font-semibold mb-3">
            Contact Us
          </h3>

          <p className="text-sm text-gray-400">
            📧{" "}
            <a
              href="mailto:support@artify.com"
              className="hover:text-yellow-400 transition"
            >
              support@artify.com
            </a>
          </p>

          <p className="text-sm text-gray-400 mt-1">
            📞{" "}
            <a
              href="tel:+8801856846615"
              className="hover:text-yellow-400 transition"
            >
              +880 1856-846615
            </a>
          </p>
        </div>

        <div className="flex justify-center md:justify-end gap-5">
          <SocialIcon
            href="https://www.facebook.com/"
            label="Facebook"
          >
            <FaFacebookF />
          </SocialIcon>

          <SocialIcon
            href="https://www.instagram.com/"
            label="Instagram"
          >
            <FaInstagram />
          </SocialIcon>

          <SocialIcon
            href="https://x.com/"
            label="X"
          >
            <FaXTwitter />
          </SocialIcon>

          <SocialIcon
            href="https://www.linkedin.com/"
            label="LinkedIn"
          >
            <FaLinkedinIn />
          </SocialIcon>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, children, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="text-gray-400 hover:text-yellow-400 text-xl transition transform hover:scale-110"
  >
    {children}
  </a>
);

export default Footer;
