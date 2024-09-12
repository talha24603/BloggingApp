import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for mobile menu
import services from '../appWrite/config';
import blankProfile from "../assets/blank-profile.webp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu open/close
  const [openDropDown, setOpenDropDown] = useState(false); // State for dropdown
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.auth.userData);
  const [profile, setProfile] = useState(null);
  const dropDownRef = useRef(null);

  const navitems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    // { name: 'Add Post', slug: '/addpost', active: authStatus },
    // { name: 'All Posts', slug: '/allposts', active: authStatus },
  ];

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const response = await services.getProfiles();
          if (response) {
            const requiredProfile = response.documents.find(profile => profile.userId === user.$id);
            if (requiredProfile) {
              setProfile(requiredProfile);
            }
          }
        } catch (error) {
          console.log('Error fetching profile:', error);
        }
      };
      fetchProfile();
    }
  }, [user]); // Dependency array should include `user`

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setOpenDropDown(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <header className="bg-white sticky top-0 z-50">
      <nav className="flex justify-between items-center px-2 py-4">
        {/* Logo Section */}
        <Link to={'/'}>
          <div className="text-3xl font-bold text-[#0CA7FF] tracking-wide transition-colors">
            MyBlogSite
          </div>
        </Link>

        {/* Hamburger Menu for Mobile */}
        <div
          className="md:hidden text-gray-800 text-2xl cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation Links for Desktop */}
        <ul className={`hidden md:flex gap-6 items-center`}>
          {navitems.map((item, i) =>
            item.active ? (
              <li
                key={i}
                onClick={() => navigate(item.slug)}
                className="text-gray-700 font-bold hover:underline cursor-pointer transition-all duration-200"
              >
                {item.name}
              </li>
            ) : null
          )}

          {authStatus && (
            <>
              <li ref={dropDownRef} className="mt-2 relative">
                <img
                  onClick={() => setOpenDropDown(!openDropDown)}
                  style={{ objectFit: 'cover' }}
                  className="rounded-full border hover:shadow-lg cursor-pointer border-gray-800 w-9 h-9"
                  src={profile ? services.getFilePreview(profile.featuredImage) : blankProfile}
                  alt="profileImage"
                />
                {openDropDown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    <Link
                      to={`/profile/${user.$id}`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setOpenDropDown(false)}
                    >
                      Profile
                    </Link>
                    <div
                      className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setOpenDropDown(false)}
                    >
                      <LogoutButton />
                    </div>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <ul className="md:hidden flex flex-col items-center absolute top-16 left-0 w-full bg-white shadow-lg">
            {navitems.map((item, i) =>
              item.active ? (
                <li
                  className="text-gray-700 font-semibold hover:text-indigo-600 cursor-pointer transition-all duration-200"
                  key={i}
                  onClick={() => {
                    navigate(item.slug);
                    setIsOpen(false); // Close menu after clicking
                  }}
                >
                  {item.name}
                </li>
              ) : null
            )}

            {authStatus && (
              <>
                {/* Show Logout Button and Profile Image on Small Screens */}
                <li>
                  <LogoutButton />
                </li>
                <li>
                  <Link to={`/profile/${user.$id}`}>
                    {profile ? (
                      <img
                        className="rounded-full w-9 h-9 border border-gray-500 hover:shadow-lg"
                        src={services.getFilePreview(profile.featuredImage)}
                        alt="profileImage"
                      />
                    ) : (
                      <span>{user.name}</span>
                    )}
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;
