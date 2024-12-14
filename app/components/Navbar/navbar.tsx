'use client';
import { useState } from 'react';
import styled from 'styled-components';// Import the useAuth hook
import { useAuth } from '@/app/lib/context/AuthContext';
import { useWallet } from '@/app/lib/context/WalletContext';

// Reusable styles for NavItems and Buttons
const commonStyles = `
  font-family: 'Josefin Sans', sans-serif;
  color: white;
  line-height: 1.5;
  text-align: center;
  padding: 9px 17px;
  border-radius: 50px;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const NavItem = styled.div`
  ${commonStyles};
  font-size: 13px;
  width: 100%;
  margin: 0;
  padding: 5px 10px;

  @media (min-width: 640px) {
    font-size: 13px;
    padding: 0px;
    margin-left: 20px;
  }
  @media (min-width: 768px) {
    font-size: 16px;
    margin-left: 35px;
  }
  @media (min-width: 1024px) {
    font-size: 18px;
    margin-left: 40px;
  }
  @media (min-width: 1280px) {
    font-size: 21px;
    margin-left: 50px;
  }
`;

const ButtonBase = styled.div`
  ${commonStyles};
  width: 100%;
  text-align: left;
  white-space: nowrap;
  font-size: 13px;
  cursor: pointer;

  @media (min-width: 640px) {
    text-align: center;
    padding: 9px 27px;
  }
  @media (min-width: 768px) {
    font-size: 16px;
    margin-left: 10px;
  }
  @media (min-width: 1024px) {
    font-size: 18px;
    margin-left: 15px;
  }
  @media (min-width: 1280px) {
    font-size: 21px;
    margin-left: 20px;
  }
`;

const Gbutton = styled(ButtonBase)`
  background-color: #05F292;
  color: dark;
  font-weight: 700;
  border-radius: 50px;
  width: auto;
  margin-left: 5px;
  width: 100%;
  text-align: center;
`;

export default function Navbar() {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const { isConnected } = useAuth();
  const { showWallet } = useWallet();
  const { toggleWallet } = useWallet();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center sm:pb-[25px] sm:border-[#616161] sm:border-b-[1px] sm:font-bold">
        {/* Logo */}
        <div className="text-white text-[18px] md:text-[24px] lg:text-[28px]">
          MEMO Protocol
        </div>

        {/* Hamburger Button */}
        <button
          className="block text-white sm:hidden focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Nav Items for Larger Screens */}
        <div className="hidden sm:flex justify-between items-center gap-12">
          <div className="flex">
            <NavItem>DOCS</NavItem>
            <NavItem>Airdrop</NavItem>
          </div>
          <div className="flex gap-1 ml-[20px]">
            <div></div>
            {isConnected ? ( // Conditional rendering based on the login state
              <>
                <Gbutton onClick={showWallet}>0xb189...1Bb10</Gbutton> {/* Log out button */}
              </>
            ) : (
              <Gbutton onClick={toggleWallet}>Connect Wallet</Gbutton> // Log in button
            )}
          </div>
        </div>
      </div>

      {/* Nav Items for Small Screens */}
      <div
        className={`${
          menuOpen ? 'block' : 'hidden'
        } flex flex-col items-start gap-2 sm:hidden mt-2`}
      >
        <NavItem>Docs</NavItem>
        <NavItem>Airdrop</NavItem>
        {isConnected ? (
          <Gbutton onClick={showWallet}>0xb189...1Bb10</Gbutton>
        ) : (
          <Gbutton onClick={toggleWallet}>Connect Wallet</Gbutton>
        )}
      </div>
    </div>
  );
}
