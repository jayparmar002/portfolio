import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import Header from "./components/header";
import Home from "./components/screens/home page/home";
import GradualBlur from "./components/ui/gradualBlur";

function Loader() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 100) {
      const timer = setTimeout(() => setCount(count + 1), 20); // slow counter
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <motion.div
      className="h-screen w-screen z-[999999] flex flex-col p-10 justify-between bg-black text-white absolute top-0 left-0"
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }} // 👈 slide up + fade out
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      <div className="text-7xl font-bold ">Atralick is loading...</div>
      <h1 className="text-5xl font-bold self-end">{count}%</h1>
    </motion.div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // hide loader after 100 count (~5s = 100*50ms)
    const timer = setTimeout(() => setLoading(false), 2100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} // fade in
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </main>
          </motion.div>
        )}
        <GradualBlur
          target="parent"
          position="top"
          height="6rem"
          strength={2}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={1}
        />
      </AnimatePresence>
    </div>
  );
}
