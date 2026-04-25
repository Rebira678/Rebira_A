import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'Architecture', path: '/architecture' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-brand-black/90 backdrop-blur-sm border-b border-neutral-900 px-6 py-6 h-20 flex items-center justify-between">
        <Link to="/" onClick={closeMenu} className="text-xl font-bold tracking-tighter uppercase group">
          <span className="text-white group-hover:text-neutral-400 transition-colors">Rebira</span>
          <span className="text-neutral-500 group-hover:text-white transition-colors"> Adugna</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="relative text-[10px] font-mono tracking-widest uppercase transition-colors"
            >
              <span className={location.pathname === item.path ? 'text-white' : 'text-neutral-500 hover:text-white'}>
                {item.name}
              </span>
              {location.pathname === item.path && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-[1px] bg-white"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-brand-black flex flex-col pt-20 px-8 md:hidden"
          >
            <nav className="flex flex-col gap-8 mt-16">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMenu}
                  className="relative text-2xl font-bold tracking-tighter uppercase transition-colors flex items-center justify-between border-b border-neutral-900 pb-6"
                >
                  <span className={location.pathname === item.path ? 'text-white' : 'text-neutral-500'}>
                    {item.name}
                  </span>
                  {location.pathname === item.path && (
                    <span className="w-2 h-2 bg-white rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pb-16">
              <p className="text-[10px] font-mono text-neutral-700 uppercase tracking-widest">
                Rebira Adugna // Scale &amp; Velocity
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
