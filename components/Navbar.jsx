'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // Correct the import for useRouter
import styles from '../styles';
import { navVariants } from '../utils/motion';

const Navbar = () => {
  const [liked, setLiked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const router = useRouter();

  useEffect(() => {
    const hasLiked = document.cookie.split('; ').find((row) => row.startsWith('alreadyLiked='));
    if (hasLiked) {
      setLiked(true);
    }
  }, []);

  const handleLike = () => {
    if (!liked) {
      setShowForm(true); // Immediately show form on like click
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    if (inputValue.trim() !== '') {
      try {
        const response = await fetch('https://like-count-backend-final-git-main-ak2k30.vercel.app/like', {
          method: 'POST',
        });
        if (response.ok) {
          document.cookie = 'alreadyLiked=true; path=/; max-age=31536000';
          setLiked(true);
          setShowForm(false); // Hide form after submission
          router.push('/thankyou'); // Redirect to the like page
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    } else {
      setShowForm(false); // Hide form if input is empty
    }
  };

  const handleCancel = () => {
    setShowForm(false); // Hide form without counting like
  };

  return (
    <>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="input bg-gray-100 p-2 rounded border border-gray-300 w-full"
                placeholder="Please give your feedback here..."
                required
              />
              <div className="flex space-x-2">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">OK</button>
                <button type="button" className="bg-red-500 text-white p-2 rounded" onClick={handleCancel}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      <motion.nav
        variants={navVariants}
        initial="hidden"
        whileInView="show"
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
              <span className="font-normal text-[16px] text-white">Click to like idea</span>
            </button>
          )}
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
