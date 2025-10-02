import React from 'react'

const Navbar = () => (
    <header className="bg-slate-900/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-slate-700">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-white">
                NidhiBook
            </a>
            <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-slate-300 hover:text-white transition-colors">Features</a>
                <a href="#ai-power" className="text-slate-300 hover:text-white transition-colors">AI Power</a>
                <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">Testimonials</a>
            </nav>
            <div className="flex items-center space-x-4">
                <a href="/login" className="text-slate-300 hover:text-white transition-colors">Log In</a>
                <a href="/signup" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Sign Up Free
                </a>
            </div>
        </div>
    </header>
);

export default Navbar
