import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Seat Management', href: '/admin/seats', icon: '💺' },
    { name: 'Reservations', href: '/admin/reservations', icon: '📅' },
    { name: 'Reports', href: '/admin/reports', icon: '📈' },
    { name: 'Profile', href: '/profile', icon: '👤' },
  ];

  return (
    <div className="hidden md:flex md:w-64 bg-gray-800 text-white flex-col">
      <div className="p-4 text-xl font-bold flex items-center">
        <span className="mr-2"></span>
        SeatReserve Admin
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === '/admin'}
            className={({ isActive }) => 
              `flex items-center px-4 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-indigo-800 text-white' 
                  : 'text-indigo-200 hover:bg-indigo-600'
              }`
            }
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-indigo-600">
        <div className="text-sm text-indigo-200">SeatReserve v1.0</div>
      </div>
    </div>
  );
};

export default Sidebar;