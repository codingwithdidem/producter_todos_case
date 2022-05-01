import React from "react";
import { motion } from "framer-motion";

const Layout = ({ children }) => {
  return (
    <>
      <div className="antialiased relative min-h-full h-screen w-full overflow-hidden flex items-center justify-center bg-brand-black">
        <motion.div
          drag
          className="absolute top-10 right-24 w-80 h-80 blur-3xl rounded-full bg-gradient-to-br from-red-400 via-blue-600 to-purple-300"
        />
        <motion.div
          drag
          className="absolute bottom-10 left-14 w-80 h-80 blur-3xl rounded-full bg-gradient-to-br from-pink-400 via-purple-600 to-yellow-300"
        />

        <div className="container w-full md:max-w-3xl mx-auto">{children}</div>
      </div>
    </>
  );
};

export default Layout;
