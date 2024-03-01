'use client';

import React from 'react';
import { motion } from 'framer-motion';

const ThankYouPage = () => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, x: '-100vw' },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', delay: 0.5 } },
    exit: { x: '100vw', transition: { ease: 'easeInOut' } },
  };

  // Animation variants for the text
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { delay: 1.0, duration: 1.0 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex justify-center items-center h-screen"
    >
      <motion.div variants={textVariants}>
        <h1 className="text-4xl font-bold text-center">Thank You for Joining!</h1>
        <p className="text-xl text-center mt-4">We're excited to have you on board.</p>
        <p className="text-xl text-center mt-4">We will send notification to you when our product will be ready.</p>
      </motion.div>
    </motion.div>
  );
};

export default ThankYouPage;
