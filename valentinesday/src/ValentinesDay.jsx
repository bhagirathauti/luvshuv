import React, { useState, useEffect } from "react";
import {
    Heart,
    Gift,
    MessageCircleHeart,
    Music,
    X,
} from "lucide-react";
import { useRef } from "react";

const ValentinesDay = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [showPromiseMessage, setShowPromiseMessage] = useState(false);
    const [hearts, setHearts] = useState([]);
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef(null); // Ref for audio element
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.muted = false; // Start muted
            audioRef.current.volume = 0.1; // Set desired volume
            audioRef.current.play().then(() => {
                audioRef.current.muted = false ; // Unmute after playing
            }).catch(() => {
                console.log("Autoplay prevented, user interaction required.");
            });
        }
    }, []);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setHearts((prevHearts) => {
                const newHeart = {
                    id: Date.now(),
                    left: Math.random() * 100,
                    size: 8 + Math.random() * 16,
                    duration: 3 + Math.random() * 2,
                };
                return [...prevHearts, newHeart].slice(-20);
            });
        }, 800);
        return () => clearInterval(interval);
    }, []);

    const toggleMusic = () => {
        if (audioRef.current) {
            if (audioRef.current.paused) {
                audioRef.current.muted = false; // Unmute when playing
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-purple-200 relative overflow-hidden">
            {/* Floating Hearts */}
            <audio ref={audioRef} playsInline muted preload="auto" src="love-song.mp3" />

            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                {hearts.map((heart) => (
                    <div
                        key={heart.id}
                        className="absolute animate-float"
                        style={{
                            left: `${heart.left}%`,
                            width: `${heart.size}px`,
                            height: `${heart.size}px`,
                            animation: `float ${heart.duration}s ease-out infinite`,
                        }}
                    >
                        <Heart className="w-full h-full text-red-400/40" fill="currentColor" />
                    </div>
                ))}
            </div>

            {/* Music Button */}
            <button
    onClick={toggleMusic}
    className="fixed cursor-pointer top-6 right-6 bg-red-500 p-3 rounded-full text-white shadow-lg hover:bg-red-600 transition-all z-1">
    {isPlaying ? <X className="w-6 h-6" /> : <Music className="w-6 h-6" />}
</button>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 relative text-center">
                <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-gradient">
                    Happy Valentine's Day ❤️
                </h1>
                <p className="text-2xl text-gray-700 mt-4">To my forever love, you are my everything! 💖</p>

                {/* Cards */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                    <button
                        onClick={() => setShowMessage(true)}
                        className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <MessageCircleHeart className="w-16 h-16 mx-auto text-red-500 group-hover:scale-110 transition-transform mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">Love Letter</h2>
                        <p className="text-gray-600">A message from my heart 💌</p>
                    </button>

                    <button
                        onClick={() => setShowPromiseMessage(true)}
                        className="group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-sm p-8 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Gift className="w-16 h-16 mx-auto text-pink-500 group-hover:scale-110 transition-transform mb-4" />
                        <h2 className="text-2xl font-semibold mb-2">A Special Promise</h2>
                        <p className="text-gray-600">My vow to you forever 💞</p>
                    </button>
                </div>
            </div>

            {/* Love Letter Modal */}
            {showMessage && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-out">
        <div
            className={`w-[50vw] bg-white/95 rounded-2xl p-8 relative shadow-lg transform transition-all duration-500 ease-in-out ${
                showMessage ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            style={{
                backgroundImage: "url('/assets/20250213_233407.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
                maxWidth: "100%",
            }}
        >
            <button
                onClick={() => setShowMessage(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-opacity duration-200"
            >
                <X className="w-6 h-6" />
            </button>
            <div className="text-center space-y-6">
                <h3 className="text-3xl font-bold text-red-600">My Dearest Love 💖</h3>
                <p className="text-lg text-white bg-black/40 p-4 rounded-lg">
                Pari, my love, my everything—this Valentine’s Day, I just want to thank you for the magic you’ve brought into my life. From the moment we met on Instagram on September 15, 2024, my world changed in the most beautiful way. Our first special kiss on September 19, the day we made it official on September 21, and all our crazy fights in between—every moment with you has been unforgettable. Hadke Food Court and Seasons Mall became our little world, our safe haven, where we laughed, shared secrets, and made memories. Watching Kal Ho Naa Ho with you, feeling every emotion together, was just another reminder of how deeply I love you. December 21 was a night I’ll cherish forever—our first night together, our first dance on Malang Sajna, and the feeling of being truly one. And then came February 6—my birthday, but you made it our day. You planned every moment so perfectly, made me feel special in ways I never imagined, and reminded me once again why I’m the luckiest man to have you. Pari, you are my home, my heart, and my forever. I love you beyond words, today and always. ❤️
                </p>
            </div>
        </div>
    </div>
)}

{showPromiseMessage && (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 transition-opacity duration-300 ease-out">
        <div
            className={`w-[50vw] bg-white/95 rounded-2xl p-8 relative shadow-lg transform transition-all duration-500 ease-in-out ${
                showPromiseMessage ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            style={{
                backgroundImage: "url('/assets/20250213_233407.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                whiteSpace: "normal",
                maxWidth: "100%",
            }}
        >
            <button
                onClick={() => setShowPromiseMessage(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-opacity duration-200"
            >
                <X className="w-6 h-6" />
            </button>
            <div className="text-center space-y-6">
                <h3 className="text-3xl font-bold text-red-600">A Promise Forever 💍</h3>
                <p className="text-lg text-white bg-black/40 p-4 rounded-lg">
                Pari, I know there will be times when I might get upset, feel overwhelmed, or struggle with my own thoughts. But no matter what happens, I promise you—I am never truly going away. No fight, no misunderstanding, no rough day will ever make me leave you. I may need a moment to clear my head, but my heart will always belong to you. No matter how hard things get, I will always hold on to us, to our love, and to the beautiful life we are building together. You are my home, my safest place, and my forever. I promise you, Pari, I am here to stay—through every fight, every tear, every storm. Because my love for you is stronger than anything that could ever come between us. ❤️
                </p>
            </div>
        </div>
    </div>
)}


            {/* CSS Animations */}
            <style>{`
        @keyframes float {
          0% { transform: translateY(100vh) scale(1); opacity: 0.6; }
          100% { transform: translateY(-100px) scale(0); opacity: 0; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
        </div>
    );
};

export default ValentinesDay;
