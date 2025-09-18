import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import bubble from '../assets/bubble.png'

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-50 p-4">
      <motion.img
        src={bubble}
        alt="Bubble"
        className="w-48 h-48 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      />

      <motion.h1
        className="text-5xl font-bold text-cyan-500 mb-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Добро пожаловать!
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 mb-8 text-center max-w-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Нажмите "Далее", чтобы отправить сообщение.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <Link
          to="/form"
          className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-2 shadow-xl rounded-md text-lg transition"
        >
          Далее
        </Link>
      </motion.div>
    </div>
  );
}