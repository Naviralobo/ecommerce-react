import { motion } from "framer-motion";
import type React from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      
      {children}
    </motion.div>
  );
};

export default PageWrapper;

// Just for git to confirm this page