'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // Ensure this is the correct import for your setup
import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => {
  const [liked, setLiked] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasLiked = document.cookie.split('; ').find((row) => row.startsWith('alreadyLiked='));
    if (hasLiked) {
      setLiked(true);
    }
  }, []);

  const handleLike = () => {
    if (!liked) {
      setShowPopup(true);
    }
  };

  const handleFeedbackResponse = async (giveFeedback) => {
    setShowPopup(false); // Close the popup regardless of the choice

    if (giveFeedback) {
      // If user clicks 'Yes', count the like and redirect
      try {
        const response = await fetch('https://like-count-backend-final-git-main-ak2k30.vercel.app/like', {
          method: 'POST',
        });
        if (response.ok) {
          document.cookie = 'alreadyLiked=true; path=/; max-age=31536000';
          setLiked(true);
          router.push('https://aka123.pythonanywhere.com/');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }
    // If user clicks 'No', do nothing further (like is not counted)
  };

  return (
    <>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm flex justify-center items-center z-50"
        >
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <p className="text-center mb-4">Do you want to give feedback?</p>
            <div className="flex justify-center space-x-4">
              <button type="button" onClick={() => handleFeedbackResponse(true)} className="bg-blue-500 text-white p-2 rounded">Yes</button>
              <button type="button" onClick={() => handleFeedbackResponse(false)} className="bg-gray-500 text-white p-2 rounded">No</button>
            </div>
          </div>
        </motion.div>
      )}
      <motion.nav
        animate="visible"
        variants={navVariants}
        className={`${styles.xPaddings} py-8 relative`}
      >
        <div className="absolute w-[50%] inset-0 gradient-01" />
        <div className={`${styles.innerWidth} mx-auto flex justify-between gap-8`}>
          <img src="/giveway-logo.png" alt="Giveway" className="w-[98px] h-[24px] object-contain" />
          {!liked && (
            <button
              type="button"
              className="flex items-center h-fit py-4 px-6 bg-[#25618B] rounded-[32px] gap-[12px]"
              onClick={handleLike}
            >
              <img src="/like.png" alt="Like" className="w-[24px] h-[24px] object-contain" />
              <span className="font-normal text-[16px] text-white">Click to like idea!</span>
            </button>
          )}
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
