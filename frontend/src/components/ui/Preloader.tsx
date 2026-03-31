import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane } from 'lucide-react';

const Preloader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial loading sequence
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center"
                    >
                        <motion.div
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <Plane size={48} className="text-white mb-6 transform -rotate-45" />
                        </motion.div>

                        <motion.div className="overflow-hidden">
                            <motion.h1
                                initial={{ y: 40 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                                className="text-3xl md:text-5xl font-bold tracking-tighter text-white"
                            >
                                Wanderlust<span className="text-zinc-500">Adventures</span>
                            </motion.h1>
                        </motion.div>

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 240 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="h-0.5 bg-white/10 mt-8 rounded-full overflow-hidden relative"
                        >
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="absolute top-0 left-0 h-full w-1/2 bg-white"
                            />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;
