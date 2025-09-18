import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function FormPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    if (formData.name.trim().length < 2) errs.name = 'Имя должно содержать минимум 2 символа';
    if (!/^(\+375|80)(\d{9})$/.test(formData.phone)) errs.phone = 'Некорректный номер телефона';
    if (formData.message.trim().length < 2) errs.message = 'Сообщение должно содержать минимум 2 символа';
    return errs;
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', message: '' });
      } else {
        alert('Ошибка при отправке');
      }
    } catch (err) {
      console.error('Ошибка:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
  if (success) {
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 3000);

    return () => clearTimeout(timer);
        }
    }, [success]);

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className="text-2xl font-semibold text-gray-800 mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Отправить сообщение
        </motion.h2>

        <AnimatePresence>
          {success && (
            <motion.div
              key="success-message"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <p className="bg-green-100 text-green-700 text-sm text-center px-4 py-2 mb-4 rounded-md border border-green-300">
                Сообщение успешно отправлено!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Ваше имя
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`mt-1 w-full p-2 border-0 border-b-2 focus:outline-none focus:border-cyan-500 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Ваш мобильный телефон
            </label>
            <input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`mt-1 w-full p-2 border-0 border-b-2 focus:outline-none focus:border-cyan-500 ${
                errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Сообщение
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleInputChange}
              className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${
                errors.message ? "border-red-500" : "border-gray-300"
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </motion.div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 shadow-xl rounded-md transition disabled:bg-gray-400"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            {isSubmitting ? "Отправка..." : "Отправить"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}