import React from 'react'

const Footer = () => (
    <footer className="bg-slate-900 text-slate-400">
        <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">NidhiBook</h3>
                    <p className="text-sm">The smartest way to manage your personal finances.</p>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Product</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#features" className="hover:text-white">Features</a></li>
                        <li><a href="#" className="hover:text-white">Pricing</a></li>
                        <li><a href="#" className="hover:text-white">Security</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Company</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">About Us</a></li>
                        <li><a href="#" className="hover:text-white">Contact</a></li>
                        <li><a href="#" className="hover:text-white">Careers</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold text-white mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} NidhiBook. All rights reserved.</p>
            </div>
        </div>
    </footer>
);

export default Footer
