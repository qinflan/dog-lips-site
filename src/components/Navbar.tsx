import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence, easeInOut, circIn, circOut, circInOut, backIn, backInOut, backOut, anticipate } from "motion/react"
import "./Navbar.css"
import { IoClose } from "react-icons/io5";
import { NavLink } from 'react-router'
import { DynamicLogo } from './theme/DynamicLogo'
import { MdOutlineMenu } from "react-icons/md";


const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const menuRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!menuRef.current?.contains(e.target as Node)) {
                setIsMobileMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, []);

    const dropdownVariants = {
        hidden: { scaleY: 0 },
        visible: { scaleY: 1, transition: { duration: 0.6, ease: circOut } },
        exit: { scaleY: 0, transition: { delay: 0.2, duration: 0.6, ease: circOut } }
    };

    const mobileLinkVars = {
        hidden: {
            y: 50,
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: circOut
            }
        },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.75,
                ease: anticipate
            }
        },
        hover: { opacity: 0.6 }
    };

    const containerVars = {
        hidden: {
            transition: {
                staggerChildren: 0.02,
                staggerDirection: -1
            }
        },

        visible: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: 1
            }
        }
    }

  return (
    <div>
        <div className="navbar-container">
            <div className="logo-container">
                <DynamicLogo />
            </div>
              <div className="nav-menu-container">
                <NavLink className="nav-link" to="/">
                    <span>HOME</span>
                </NavLink>

                <NavLink className="nav-link" to="/shows">
                    <span>SHOWS</span>
                </NavLink>

                <NavLink className="nav-link" to="/shop">
                    <span>SHOP</span>
                </NavLink>

                <NavLink className="nav-link" to="/contact">
                    <span>CONTACT</span>
                </NavLink>
              </div>

            {/* Mobile Menu Button */}
            <div className="mobile-nav-container" ref={menuRef}>
                <button className="mobile-nav-btn" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <IoClose size={30} /> : <MdOutlineMenu  size={30} />}
                </button>
                <AnimatePresence>
                  {isMobileMenuOpen && (
                    <motion.div
                      className="mobile-menu-dropdown"
                      initial="hidden"  
                      animate="visible"
                      exit="exit"
                      variants={dropdownVariants}
                    >
                      <motion.div
                        variants={containerVars}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="mobile-nav-link-container"
                      >
                        <motion.div className="overflow-hidden">
                          <motion.div variants={mobileLinkVars}>
                            <NavLink className="mobile-nav-link" to="/" onClick={toggleMobileMenu}>HOME</NavLink>
                          </motion.div>
                        </motion.div>
                        <motion.div className="overflow-hidden">
                          <motion.div variants={mobileLinkVars}>
                            <NavLink className="mobile-nav-link" to="/shows" onClick={toggleMobileMenu}>SHOWS</NavLink>
                          </motion.div>
                        </motion.div>
                        <motion.div className="overflow-hidden">
                          <motion.div variants={mobileLinkVars}>
                            <NavLink className="mobile-nav-link" to="/shop" onClick={toggleMobileMenu}>SHOP</NavLink>
                          </motion.div>
                        </motion.div>
                        <motion.div className="overflow-hidden">
                          <motion.div variants={mobileLinkVars}>
                            <NavLink className="mobile-nav-link" to="/contact" onClick={toggleMobileMenu}>CONTACT</NavLink>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
            </div>
        </div>
    </div>
  )
}

export default Navbar