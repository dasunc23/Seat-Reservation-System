import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-6 mt-auto">
      <div className="w-full px-2 md:px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 order-1 md:order-1">
            <h3 className="text-xl font-bold">SeatReserve System</h3>
            <p className="text-gray-400 mt-1">Intern Seat Management Solution</p>
          </div>

          <div className="flex space-x-6 order-2 md:order-2 mt-4 md:mt-0">
            <div>
              <h4 className="font-semibold mb-2">Resources</h4>
              <ul className="text-gray-400 space-y-1">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Legal</h4>
              <ul className="text-gray-400 space-y-1">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} SeatReserve. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;