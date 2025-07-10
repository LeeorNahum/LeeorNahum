"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";


export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true); // Always start with dark mode for SSR consistency
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration effect - runs only on client after hydration
  useEffect(() => {
    // Get the actual theme preference from localStorage or system
    const stored = localStorage.getItem('theme');
    let actualTheme;
    
    if (stored) {
      actualTheme = stored === 'dark';
    } else {
      actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    
    setIsDarkMode(actualTheme);
    setIsHydrated(true);
    
    // Apply theme styles
    const root = document.documentElement;
    const body = document.body;
    
    // Store theme preference
    localStorage.setItem('theme', actualTheme ? 'dark' : 'light');
    
    if (actualTheme) {
      root.style.setProperty('--scrollbar-thumb', '#373743');
      body.style.backgroundColor = '#09090b';
      body.style.color = '#ffffff';
    } else {
      root.style.setProperty('--scrollbar-thumb', '#BCBCC8');
      body.style.backgroundColor = '#f4f4f6';
      body.style.color = '#0b0b0f';
    }
  }, []);

  // Apply theme styles whenever isDarkMode changes (after hydration)
  useEffect(() => {
    if (!isHydrated) return;
    
    const root = document.documentElement;
    const body = document.body;
    
    // Store theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    if (isDarkMode) {
      root.style.setProperty('--scrollbar-thumb', '#373743');
      body.style.backgroundColor = '#09090b';
      body.style.color = '#ffffff';
    } else {
      root.style.setProperty('--scrollbar-thumb', '#BCBCC8');
      body.style.backgroundColor = '#f4f4f6';
      body.style.color = '#0b0b0f';
    }
  }, [isDarkMode, isHydrated]);

  // Listen for system theme changes (only if no stored preference)
  useEffect(() => {
    if (!isHydrated) return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only follow system changes if user hasn't manually set a preference
      const stored = localStorage.getItem('theme');
      if (!stored) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isHydrated]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handleShare = async () => {
    const shareData = {
      title: 'Share LeeorNahum.com',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Simple fallback: copy URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  return (
    <div className={`${isDarkMode ? 'bg-[#09090b]' : 'bg-[#f4f4f6]'} relative min-h-screen w-full`}>
             {/* Top Navigation Bar */}
       <div
         className={`backdrop-blur-[5px] backdrop-filter ${isDarkMode ? 'bg-[#09090b80]' : 'bg-[#f4f4f680]'} h-[72px] sm:h-20 w-full sticky top-0 z-50`}
         data-name="Top Bar"
         id="node-58_209"
       >
         <div className={`absolute ${isDarkMode ? 'border-b-[#3b3b3f]' : 'border-b-[#C0C0C4]'} border-b border-solid inset-x-0 bottom-0 h-px pointer-events-none`} />
         <div className="flex flex-row items-center relative size-full">
           <div className="box-border content-stretch flex flex-row items-center justify-between px-3 sm:px-3.5 py-3 sm:py-4 relative size-full">
             <Link
               href="/"
               className="relative shrink-0 size-11 sm:size-12 cursor-pointer hover:opacity-80 transition-opacity duration-200"
               data-name="Logo"
               id="node-6_10"
               aria-label="Go to homepage"
             >
               <div
                 className="absolute aspect-[36/36] left-0 right-0 top-1/2 translate-y-[-50%]"
                 data-name="Circle"
                 id="node-6_6"
               >
                 <div className={`w-full h-full ${isDarkMode ? 'bg-[#000000]' : 'bg-[#ffffff]'} rounded-full`} />
               </div>
               <div
                 className={`absolute flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] left-1/2 not-italic size-8 sm:size-9 ${isDarkMode ? 'text-[#ffffff]' : 'text-[#0b0b0f]'} text-[22px] sm:text-[24px] text-center top-1/2 translate-x-[-50%] translate-y-[-50%]`}
                 id="node-6_8"
               >
                 <p className="block leading-[normal]">LN</p>
               </div>
             </Link>
             <div
               className="box-border content-stretch flex flex-row gap-3 sm:gap-5 items-center justify-end p-0 relative shrink-0"
               data-name="Right"
               id="node-59_256"
             >
               <button
                 onClick={toggleTheme}
                 className="block cursor-pointer relative shrink-0 size-12"
                 data-name="Theme Mode"
                 id="node-59_247"
                 aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
               >
                 {isDarkMode ? (
                   <div
                     className="absolute aspect-[24/24] left-0 overflow-clip right-0 top-0"
                     data-name="material-symbols:light-mode"
                     id="node-59_210"
                   >
                     <div
                       className="absolute inset-[4.167%]"
                       data-name="Vector"
                       id="node-59_211"
                     >
                       <Image 
                         src="/icons/LightMode.svg" 
                         alt="Light Mode" 
                         width={24} 
                         height={24} 
                         className="w-full h-full object-contain brightness-0 invert" 
                       />
                     </div>
                   </div>
                 ) : (
                   <div
                     className="absolute left-0 size-12 top-0"
                     data-name="material-symbols:dark-mode"
                     id="node-59_228"
                   >
                     <Image 
                       src="/icons/DarkMode.svg" 
                       alt="Dark Mode" 
                       width={48} 
                       height={48} 
                       className="w-full h-full object-contain brightness-0" 
                     />
                   </div>
                 )}
               </button>
               <button
                 onClick={handleShare}
                 className="relative shrink-0 size-12 cursor-pointer"
                 data-name="Share"
                 id="node-25_101"
                 aria-label="Share this page"
               >
                 <div
                   className="absolute inset-0"
                   data-name="Circle"
                   id="node-25_102"
                 >
                   <div className={`w-full h-full ${isDarkMode ? 'bg-[#ffffff]' : 'bg-[#000000]'} rounded-full`} />
                 </div>
                 <div
                   className="absolute aspect-[24/24] bottom-[19.658%] left-1/2 overflow-clip top-[8.12%] translate-x-[-50%]"
                   data-name="weui:share-outlined"
                   id="node-25_105"
                 >
                   <div
                     className="absolute bottom-[8.333%] left-[16.667%] right-[16.667%] top-[9.913%]"
                     data-name="Vector"
                     id="node-25_122"
                   >
                     <Image 
                       src="/icons/Share.svg" 
                       alt="Share" 
                       width={24} 
                       height={24} 
                       className={`w-full h-full object-contain ${isDarkMode ? 'brightness-0' : 'brightness-0 invert'}`}
                     />
                   </div>
                 </div>
               </button>
             </div>
           </div>
         </div>
       </div>

             {/* Main Content */}
       <div className="flex flex-col gap-6 md:gap-10 items-center justify-start px-4 md:px-0 py-10 mt-0">
         {/* Hero Section */}
         <div className="flex flex-col items-center gap-6 md:gap-10">
           <h1 className={`${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-5xl md:text-7xl lg:text-[88px] font-bold font-['Inter'] text-center leading-none`}>
             Leeor Nahum
           </h1>
           
           <p className={`${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364a]'} text-lg md:text-xl lg:text-2xl font-bold font-['Inter'] text-center leading-snug md:leading-normal`}>
             Electrical and Computer Engineer | Software Developer | Entrepreneur
           </p>
         </div>

                 {/* Contact Cards */}
         <div className="[flex-flow:wrap] box-border content-center flex gap-[15px] items-center justify-center px-4 md:px-[15px] py-0 relative w-full">
           {/* Gmail Card */}
           <a 
             href="mailto:leeornahum@gmail.com"
             className="h-[100px] relative w-[85%] sm:w-full max-w-[267px] shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200" 
             data-name="Gmail" 
             id="node-22_695"
             aria-label="Send email to leeornahum@gmail.com"
           >
             <div
               className="absolute inset-0 rounded-[10px]"
               data-name="Background"
               id="node-I22_695-21_159"
               style={{
                 backgroundImage:
                   "linear-gradient(90deg, rgb(66, 133, 244) 0%, rgb(197, 34, 31) 25%, rgb(234, 67, 53) 50%, rgb(251, 188, 4) 75%, rgb(52, 168, 83) 100%)",
               }}
             />
             <div
               className="absolute inset-0 rounded-[10px]"
               data-name="Background 2"
               id="node-I22_695-22_632"
             />
             <div
               className={`absolute ${isDarkMode ? 'bg-[#000000]' : 'bg-[#ffffff]'} inset-0 opacity-[0.65] rounded-[10px]`}
               data-name="Darken Background"
               id="node-I22_695-21_160"
             >
               <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-0 pointer-events-none rounded-[10px]`} />
             </div>
             <div
               className="absolute inset-0 rounded-[10px]"
               data-name="Card Border"
               id="node-I22_695-22_30"
             >
               <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-0 pointer-events-none rounded-[10px]`} />
             </div>
             <div
               className={`absolute flex flex-col font-mono font-bold justify-center leading-[0] right-5 ${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-[18px] text-nowrap text-right top-[25px] tracking-[-0.36px] translate-y-[-50%]`}
               id="node-I22_695-21_164"
             >
               <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                 Gmail
               </p>
             </div>
             <div
               className="absolute box-border content-stretch flex flex-col gap-2.5 items-center justify-center left-5 overflow-clip p-0 size-9 top-[7px]"
               data-name="ContactLinkCardIcon"
               id="node-I22_695-22_634"
             >
               <div
                 className="aspect-[256/193] overflow-clip relative shrink-0 w-full"
                 data-name="logos:google-gmail"
                 id="node-22_35"
               >
                 <Image src="/icons/Gmail.svg" alt="Gmail" width={36} height={36} className="w-full h-full object-contain" />
               </div>
             </div>
             <div
               className="absolute contents left-[8.9px] top-[50px]"
               data-name="Button"
               id="node-I22_695-22_631"
             >
                                <div
                   className={`absolute ${isDarkMode ? 'bg-[#ffffff]' : 'bg-[#000000]'} bottom-[10%] left-[3.333%] mix-blend-overlay opacity-75 right-[3.333%] rounded-[10px] top-1/2`}
                   data-name="Button"
                   id="node-I22_695-21_162"
                 >
                   <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-[-1px] pointer-events-none rounded-[11px]`} />
                 </div>
                 <div
                   className="absolute bottom-[10%] left-[3.333%] right-[3.333%] rounded-[10px] top-1/2"
                   data-name="Button Border"
                   id="node-I22_695-22_32"
                 >
                   <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-[-1px] pointer-events-none rounded-[11px]`} />
                 </div>
                                <div
                   className={`absolute bottom-[19%] flex flex-col font-mono font-bold justify-center leading-[0] ${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-[18px] text-center text-nowrap top-[57%] tracking-[-0.36px] translate-x-[-50%]`}
                   id="node-I22_695-21_163"
                   style={{ left: "calc(50% - 0.500002px)" }}
                 >
                 <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                   Send Email
                 </p>
               </div>
             </div>
           </a>

                     {/* Instagram Card */}
           <a 
             href="https://www.instagram.com/leeor_nahum/"
             target="_blank"
             rel="noopener noreferrer"
             className="h-[100px] relative w-[85%] sm:w-full max-w-[267px] shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200" 
             data-name="Instagram" 
             id="node-22_713"
             aria-label="Visit Instagram profile"
           >
             <div
               className="absolute inset-0 rounded-[10px]"
               data-name="Background"
               id="node-I22_713-21_159"
               style={{
                 backgroundImage:
                   "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 267 100\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -9.9107 24.611 0 70.922 107.7)\\\'><stop stop-color=\\\'rgba(255,221,85,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(255,221,85,1)\\\' offset=\\\'0.1\\\'/><stop stop-color=\\\'rgba(255,153,74,1)\\\' offset=\\\'0.3\\\'/><stop stop-color=\\\'rgba(255,118,68,1)\\\' offset=\\\'0.4\\\'/><stop stop-color=\\\'rgba(255,84,62,1)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(241,77,89,1)\\\' offset=\\\'0.625\\\'/><stop stop-color=\\\'rgba(228,70,117,1)\\\' offset=\\\'0.75\\\'/><stop stop-color=\\\'rgba(200,55,171,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')",
               }}
             />
             <div
               className="absolute inset-0 rounded-[10px]"
               data-name="Background 2"
               id="node-I22_713-22_632"
               style={{
                 backgroundImage:
                   "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 267 100\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(2.3216 4.344 -47.809 3.5842 -44.724 7.2035)\\\'><stop stop-color=\\\'rgba(55,113,200,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(55,113,200,1)\\\' offset=\\\'0.128\\\'/><stop stop-color=\\\'rgba(79,57,228,0.5)\\\' offset=\\\'0.564\\\'/><stop stop-color=\\\'rgba(102,0,255,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')",
               }}
             />
             <div
               className={`absolute ${isDarkMode ? 'bg-[#000000]' : 'bg-[#ffffff]'} inset-0 opacity-[0.65] rounded-[10px]`}
               data-name="Darken Background"
               id="node-I22_713-21_160"
             >
               <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-0 pointer-events-none rounded-[10px]`} />
             </div>
             <div
               className="absolute inset-0 rounded-[10px]"
               data-name="Card Border"
               id="node-I22_713-22_30"
             >
               <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-0 pointer-events-none rounded-[10px]`} />
             </div>
             <div
               className={`absolute flex flex-col font-mono font-bold justify-center leading-[0] right-5 ${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-[18px] text-nowrap text-right top-[25px] tracking-[-0.36px] translate-y-[-50%]`}
               id="node-I22_713-21_164"
             >
               <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                 Instagram
               </p>
             </div>
             <div
               className="absolute box-border content-stretch flex flex-col gap-2.5 items-center justify-center left-5 overflow-clip p-0 size-9 top-[7px]"
               data-name="ContactLinkCardIcon"
               id="node-I22_713-22_634"
             >
               <div
                 className="overflow-clip relative shrink-0 size-9"
                 data-name="skill-icons:instagram"
                 id="node-22_739"
               >
                 <Image src="/icons/Instagram.svg" alt="Instagram" width={36} height={36} className="w-full h-full object-contain" />
               </div>
             </div>
             <div
               className="absolute contents left-[8.9px] top-[50px]"
               data-name="Button"
               id="node-I22_713-22_631"
             >
               <div
                 className={`absolute ${isDarkMode ? 'bg-[#ffffff]' : 'bg-[#000000]'} bottom-[10%] left-[3.333%] mix-blend-overlay opacity-75 right-[3.333%] rounded-[10px] top-1/2`}
                 data-name="Button"
                 id="node-I22_713-21_162"
               >
                 <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-[-1px] pointer-events-none rounded-[11px]`} />
               </div>
               <div
                 className="absolute bottom-[10%] left-[3.333%] right-[3.333%] rounded-[10px] top-1/2"
                 data-name="Button Border"
                 id="node-I22_713-22_32"
               >
                 <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-[-1px] pointer-events-none rounded-[11px]`} />
               </div>
               <div
                 className={`absolute bottom-[19%] flex flex-col font-mono font-bold justify-center leading-[0] ${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-[18px] text-center text-nowrap top-[57%] tracking-[-0.36px] translate-x-[-50%]`}
                 id="node-I22_713-21_163"
                 style={{ left: "calc(50% - 0.500002px)" }}
               >
                 <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                   Visit
                 </p>
               </div>
             </div>
           </a>

                     {/* GitHub Card */}
           <a 
             href="https://github.com/LeeorNahum"
             target="_blank"
             rel="noopener noreferrer"
             className="h-[100px] relative w-[85%] sm:w-full max-w-[267px] shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200" 
             data-name="GitHub" 
             id="node-22_749"
             aria-label="Visit GitHub profile"
           >
             <div
               className={`absolute ${isDarkMode ? 'bg-[#010409]' : 'bg-[#f6f8fa]'} inset-0 rounded-[10px]`}
               data-name="Background"
               id="node-I22_749-21_159"
             />
             <div
               className="absolute inset-0 rounded-[10px]"
               data-name="Background 2"
               id="node-I22_749-22_632"
             />
             <div
               className="absolute inset-0 rounded-[10px]"
               data-name="Card Border"
               id="node-I22_749-22_30"
             >
               <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-0 pointer-events-none rounded-[10px]`} />
             </div>
             <div
               className={`absolute flex flex-col font-mono font-bold justify-center leading-[0] right-5 ${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-[18px] text-nowrap text-right top-[25px] tracking-[-0.36px] translate-y-[-50%]`}
               id="node-I22_749-21_164"
             >
               <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                 GitHub
               </p>
             </div>
             <div
               className="absolute box-border content-stretch flex flex-col gap-2.5 items-center justify-center left-5 overflow-clip p-0 size-9 top-[7px]"
               data-name="ContactLinkCardIcon"
               id="node-I22_749-22_634"
             >
               <div
                 className="relative shrink-0 size-[36px]"
                 data-name="mdi:github"
                 id="node-20_228"
               >
                 <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <g clipPath="url(#clip0_50_470)">
                     <path d="M12 0.333374C10.4679 0.333374 8.9508 0.635141 7.53534 1.22145C6.11987 1.80775 4.83375 2.66711 3.7504 3.75046C1.56248 5.93839 0.333313 8.90585 0.333313 12C0.333313 17.1567 3.68165 21.5317 8.31331 23.0834C8.89665 23.1767 9.08331 22.815 9.08331 22.5V20.5284C5.85165 21.2284 5.16331 18.965 5.16331 18.965C4.62665 17.6117 3.86831 17.25 3.86831 17.25C2.80665 16.5267 3.94998 16.55 3.94998 16.55C5.11665 16.6317 5.73498 17.7517 5.73498 17.7517C6.74998 19.525 8.46498 19 9.12998 18.72C9.23498 17.9617 9.53831 17.4484 9.86498 17.1567C7.27498 16.865 4.55665 15.8617 4.55665 11.4167C4.55665 10.1217 4.99998 9.08337 5.75831 8.25504C5.64165 7.96337 5.23331 6.75004 5.87498 5.17504C5.87498 5.17504 6.85498 4.86004 9.08331 6.36504C10.005 6.10837 11.0083 5.98004 12 5.98004C12.9916 5.98004 13.995 6.10837 14.9166 6.36504C17.145 4.86004 18.125 5.17504 18.125 5.17504C18.7666 6.75004 18.3583 7.96337 18.2416 8.25504C19 9.08337 19.4433 10.1217 19.4433 11.4167C19.4433 15.8734 16.7133 16.8534 14.1116 17.145C14.5316 17.5067 14.9166 18.2184 14.9166 19.3034V22.5C14.9166 22.815 15.1033 23.1884 15.6983 23.0834C20.33 21.52 23.6666 17.1567 23.6666 12C23.6666 10.468 23.3649 8.95086 22.7786 7.5354C22.1923 6.11994 21.3329 4.83381 20.2496 3.75046C19.1662 2.66711 17.8801 1.80775 16.4646 1.22145C15.0492 0.635141 13.5321 0.333374 12 0.333374Z" fill={isDarkMode ? '#F0F6FC' : '#1F2328'}/>
                   </g>
                   <defs>
                     <clipPath id="clip0_50_470">
                       <rect width="36" height="36" fill="white"/>
                     </clipPath>
                   </defs>
                 </svg>
               </div>
             </div>
             <div
               className="absolute contents left-[8.9px] top-[50px]"
               data-name="Button"
               id="node-I22_749-22_631"
             >
               <div
                 className={`absolute ${isDarkMode ? 'bg-[#ffffff]' : 'bg-[#000000]'} bottom-[10%] left-[3.333%] mix-blend-overlay opacity-75 right-[3.333%] rounded-[10px] top-1/2`}
                 data-name="Button"
                 id="node-I22_749-21_162"
               >
                 <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-[-1px] pointer-events-none rounded-[11px]`} />
               </div>
               <div
                 className="absolute bottom-[10%] left-[3.333%] right-[3.333%] rounded-[10px] top-1/2"
                 data-name="Button Border"
                 id="node-I22_749-22_32"
               >
                 <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-[-1px] pointer-events-none rounded-[11px]`} />
               </div>
               <div
                 className={`absolute bottom-[19%] flex flex-col font-mono font-bold justify-center leading-[0] ${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-[18px] text-center text-nowrap top-[57%] tracking-[-0.36px] translate-x-[-50%]`}
                 id="node-I22_749-21_163"
                 style={{ left: "calc(50% - 0.500002px)" }}
               >
                 <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                   Visit
                 </p>
               </div>
             </div>
           </a>

           {/* LinkedIn Card */}
           <a 
             href="https://www.linkedin.com/in/leeornahumdotcom"
             target="_blank"
             rel="noopener noreferrer"
             className="h-[100px] relative w-[85%] sm:w-full max-w-[267px] shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200" 
             data-name="LinkedIn" 
             id="node-22_777"
             aria-label="Visit LinkedIn profile"
           >
             <div
               className={`absolute ${isDarkMode ? 'bg-[#1d2226]' : 'bg-[#ffffff]'} inset-0 rounded-[10px]`}
               data-name="Background"
               id="node-I22_777-21_159"
             />
             <div
               className="absolute inset-0 rounded-[10px]"
               data-name="Background 2"
               id="node-I22_777-22_632"
             />
             <div
               className="absolute inset-0 rounded-[10px]"
               data-name="Card Border"
               id="node-I22_777-22_30"
             >
               <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-0 pointer-events-none rounded-[10px]`} />
             </div>
             <div
               className={`absolute flex flex-col font-mono font-bold justify-center leading-[0] right-5 ${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-[18px] text-nowrap text-right top-[25px] tracking-[-0.36px] translate-y-[-50%]`}
               id="node-I22_777-21_164"
             >
               <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                 LinkedIn
               </p>
             </div>
             <div
               className="absolute box-border content-stretch flex flex-col gap-2.5 items-center justify-center left-5 overflow-clip p-0 size-9 top-[7px]"
               data-name="ContactLinkCardIcon"
               id="node-I22_777-22_634"
             >
               <div
                 className="relative shrink-0 size-9"
                 data-name="logos:linkedin-icon"
                 id="node-22_847"
               >
                 <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <g clipPath="url(#clip0_22_114)">
                     <g clipPath="url(#clip1_22_114)">
                       <path d="M30.6736 30.6742H25.3396V22.3207C25.3396 20.3287 25.304 17.7644 22.5653 17.7644C19.7871 17.7644 19.362 19.9348 19.362 22.1757V30.6736H14.0281V13.4954H19.1487V15.843H19.2204C19.7329 14.9668 20.4734 14.246 21.3631 13.7574C22.2528 13.2687 23.2584 13.0305 24.2728 13.0681C29.6791 13.0681 30.6759 16.6242 30.6759 21.2505L30.6736 30.6742ZM8.00937 11.1474C6.2998 11.1477 4.91366 9.762 4.91337 8.05242C4.91309 6.34284 6.29867 4.9567 8.00825 4.95642C9.71783 4.956 11.104 6.34171 11.1042 8.05129C11.1044 8.87227 10.7784 9.65968 10.198 10.2403C9.61763 10.8209 8.83035 11.1472 8.00937 11.1474ZM10.6765 30.6743H5.3368V13.4954H10.6763L10.6765 30.6743ZM33.3328 0.00262011H2.65648C1.20664 -0.0136924 0.0176558 1.14773 -6.29425e-05 2.59757V33.4019C0.0170933 34.8524 1.20594 36.015 2.65634 35.9998H33.3328C34.7863 36.0178 35.9798 34.8553 35.9999 33.4019V2.59518C35.9793 1.14253 34.7856 -0.0187549 33.3328 0.000229485" fill={isDarkMode ? '#FFFFFF' : '#0A66C2'}/>
                     </g>
                   </g>
                   <defs>
                     <clipPath id="clip0_22_114">
                       <rect width="36" height="36" fill="white"/>
                     </clipPath>
                     <clipPath id="clip1_22_114">
                       <rect width="36" height="36" fill="white"/>
                     </clipPath>
                   </defs>
                 </svg>
               </div>
             </div>
             <div
               className="absolute contents left-[8.9px] top-[50px]"
               data-name="Button"
               id="node-I22_777-22_631"
             >
               <div
                 className={`absolute ${isDarkMode ? 'bg-[#ffffff]' : 'bg-[#000000]'} bottom-[10%] left-[3.333%] mix-blend-overlay opacity-75 right-[3.333%] rounded-[10px] top-1/2`}
                 data-name="Button"
                 id="node-I22_777-21_162"
               >
                 <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-[-1px] pointer-events-none rounded-[11px]`} />
               </div>
               <div
                 className="absolute bottom-[10%] left-[3.333%] right-[3.333%] rounded-[10px] top-1/2"
                 data-name="Button Border"
                 id="node-I22_777-22_32"
               >
                 <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-[-1px] pointer-events-none rounded-[11px]`} />
               </div>
               <div
                 className={`absolute bottom-[19%] flex flex-col font-mono font-bold justify-center leading-[0] ${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-[18px] text-center text-nowrap top-[57%] tracking-[-0.36px] translate-x-[-50%]`}
                 id="node-I22_777-21_163"
                 style={{ left: "calc(50% - 0.500002px)" }}
               >
                 <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                   Visit
                 </p>
               </div>
             </div>
           </a>

           {/* Isometrics Fitness Card */}
           <a 
             href="https://isometricsfitness.com/"
             target="_blank"
             rel="noopener noreferrer"
             className="h-[100px] relative w-[85%] sm:w-full max-w-[267px] shrink-0 cursor-pointer hover:scale-105 transition-transform duration-200" 
             data-name="Isometrics Fitness" 
             id="node-22_906"
             aria-label="Visit Isometrics Fitness website"
           >
             <div
               className={`absolute ${isDarkMode ? 'bg-[#111417]' : 'bg-[#ffffff]'} inset-0 rounded-[10px]`}
               data-name="Background"
               id="node-I22_906-21_159"
             />
             <div
               className="absolute inset-0 rounded-[10px]"
               data-name="Background 2"
               id="node-I22_906-22_632"
             />
             <div
               className="absolute inset-0 rounded-[10px]"
               data-name="Card Border"
               id="node-I22_906-22_30"
             >
               <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-0 pointer-events-none rounded-[10px]`} />
             </div>
             <div
               className={`absolute flex flex-col font-mono font-bold justify-center leading-[0] right-5 ${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-[18px] text-nowrap text-right top-[25px] tracking-[-0.36px] translate-y-[-50%]`}
               id="node-I22_906-21_164"
             >
               <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                 Isometrics Fitness
               </p>
             </div>
             <div
               className="absolute bg-center bg-contain bg-no-repeat left-5 size-9 top-[7px]"
               data-name="ContactLinkCardIcon"
               id="node-I22_906-22_634"
               style={{ 
                 backgroundImage: "url('/icons/Isometrics Fitness.png')",
                 filter: isDarkMode ? 'brightness(1)' : 'brightness(0) invert(1) sepia(1) saturate(0) hue-rotate(0deg) brightness(0.17) contrast(1.2)'
               }}
             />
             <div
               className="absolute contents left-[8.9px] top-[50px]"
               data-name="Button"
               id="node-I22_906-22_631"
             >
               <div
                 className={`absolute ${isDarkMode ? 'bg-[#ffffff]' : 'bg-[#000000]'} bottom-[10%] left-[3.333%] mix-blend-overlay opacity-75 right-[3.333%] rounded-[10px] top-1/2`}
                 data-name="Button"
                 id="node-I22_906-21_162"
               >
                 <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-[-1px] pointer-events-none rounded-[11px]`} />
               </div>
               <div
                 className="absolute bottom-[10%] left-[3.333%] right-[3.333%] rounded-[10px] top-1/2"
                 data-name="Button Border"
                 id="node-I22_906-22_32"
               >
                 <div className={`absolute border ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#c0c0c4]'} border-solid inset-[-1px] pointer-events-none rounded-[11px]`} />
               </div>
               <div
                 className={`absolute bottom-[19%] flex flex-col font-mono font-bold justify-center leading-[0] ${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-[18px] text-center text-nowrap top-[57%] tracking-[-0.36px] translate-x-[-50%]`}
                 id="node-I22_906-21_163"
                 style={{ left: "calc(50% - 0.500002px)" }}
               >
                 <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                   Visit
                 </p>
               </div>
             </div>
           </a>
        </div>

        {/* Separator */}
        <div className="w-full h-px relative">
          <div className={`w-full h-full ${isDarkMode ? 'bg-gradient-to-r from-transparent via-[#3b3b3f] to-transparent' : 'bg-gradient-to-r from-transparent via-[#C0C0C4] to-transparent'}`} />
        </div>

                 {/* Areas of Expertise */}
         <div
           className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative w-full"
           data-name="Type=Text"
           id="node-102_207"
         >
           <div
             className={`flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 ${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-3xl md:text-4xl lg:text-[36px] text-center`}
             id="node-102_205"
           >
             <p className="block leading-[normal]">
               Areas of Expertise
             </p>
           </div>
         </div>

         {/* Skills Container */}
         <div
           className="[flex-flow:wrap] box-border content-start flex gap-8 md:gap-[50px] items-start justify-center p-4 md:p-0 relative w-full"
           data-name="Skill Container"
           id="node-53_502"
         >
                     {/* Skills Card */}
           <div
             className={`${isDarkMode ? 'bg-[#202027]' : 'bg-[#d8d8df]'} box-border content-stretch flex flex-col gap-2.5 items-start justify-start min-h-[278px] p-[15px] relative rounded-[10px] w-full max-w-lg shrink-0`}
             data-name="Skill Card"
             id="node-50_143"
           >
             <div className={`absolute ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#C0C0C4]'} border border-solid inset-0 pointer-events-none rounded-[10px]`} />
             <div
               className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[24px] text-left tracking-[-0.48px]`}
               id="node-50_122"
             >
               <p className="adjustLetterSpacing block leading-[normal]">
                 Skills
               </p>
             </div>
             <div
               className="[flex-flow:wrap] box-border content-start flex gap-2.5 items-start justify-start max-w-[450px] overflow-clip p-0 relative shrink-0"
               data-name="Skill Container"
               id="node-50_121"
             >
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=No Icon"
                 id="node-50_158"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left tracking-[-0.36px]`}
                       id="node-I50_158-53_534"
                     >
                       <p className="adjustLetterSpacing block leading-[normal]">
                         Circuit Board Design and Manufacturing
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=No Icon"
                 id="node-50_144"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left tracking-[-0.36px]`}
                       id="node-I50_144-53_534"
                     >
                       <p className="adjustLetterSpacing block leading-[normal]">
                         Embedded Firmware Programming
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=No Icon"
                 id="node-53_88"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left tracking-[-0.36px]`}
                       id="node-I53_88-53_534"
                     >
                       <p className="adjustLetterSpacing block leading-[normal]">
                         3D Printed Hardware Design
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=No Icon"
                 id="node-53_113"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left tracking-[-0.36px]`}
                       id="node-I53_113-53_534"
                     >
                       <p className="adjustLetterSpacing block leading-[normal]">
                         Web App Development
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>

                     {/* Programming & Scripting Card */}
           <div
             className={`${isDarkMode ? 'bg-[#202027]' : 'bg-[#d8d8df]'} box-border content-stretch flex flex-col gap-2.5 items-start justify-start min-h-[278px] p-[15px] relative rounded-[10px] w-full max-w-lg shrink-0`}
             data-name="Skill Card"
             id="node-53_310"
           >
             <div className={`absolute ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#C0C0C4]'} border border-solid inset-0 pointer-events-none rounded-[10px]`} />
             <div
               className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[24px] text-left tracking-[-0.48px]`}
               id="node-53_311"
             >
               <p className="adjustLetterSpacing block leading-[normal]">{`Programming & Scripting`}</p>
             </div>
             <div
               className="[flex-flow:wrap] box-border content-start flex gap-2.5 items-start justify-start max-w-[450px] p-0 relative shrink-0"
               data-name="Skill Container"
               id="node-53_312"
             >
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_313"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_313-50_346"
                     >
                       <Image src="/icons/Cpp.svg" alt="C++" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_313-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         C/C++
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_314"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_314-50_346"
                     >
                       <Image src="/icons/TypeScript.svg" alt="TypeScript" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_314-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         TypeScript
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_315"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_315-50_346"
                     >
                       <Image src="/icons/HTML.svg" alt="HTML/CSS" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_315-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         HTML/CSS
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_316"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_316-50_346"
                     >
                       <Image src="/icons/Python.svg" alt="Python" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_316-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         Python
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_317"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_317-50_346"
                     >
                       <Image src="/icons/Java.svg" alt="Java" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_317-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         Java
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_318"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_318-50_346"
                     >
                       <Image src="/icons/AutoHotkey.svg" alt="AutoHotkey" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_318-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         AutoHotkey
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>

                     {/* Dev Tools and Programs Card */}
           <div
             className={`${isDarkMode ? 'bg-[#202027]' : 'bg-[#d8d8df]'} box-border content-stretch flex flex-col gap-2.5 items-start justify-start min-h-[278px] p-[15px] relative rounded-[10px] w-full max-w-lg shrink-0`}
             data-name="Skill Card"
             id="node-53_406"
           >
             <div className={`absolute ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#C0C0C4]'} border border-solid inset-0 pointer-events-none rounded-[10px]`} />
             <div
               className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[24px] text-left text-nowrap tracking-[-0.48px]`}
               id="node-53_407"
             >
               <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                 Dev Tools and Programs
               </p>
             </div>
             <div
               className="[flex-flow:wrap] box-border content-start flex gap-2.5 items-start justify-start max-w-[450px] overflow-clip p-0 relative shrink-0"
               data-name="Skill Container"
               id="node-53_408"
             >
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_409"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_409-50_346"
                     >
                       <Image src="/icons/VSCode.svg" alt="VS Code" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_409-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         VS Code
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_410"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_410-50_346"
                     >
                       <Image src="/icons/KiCad.svg" alt="KiCad" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_410-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         KiCad
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_411"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_411-50_346"
                     >
                       <Image src="/icons/Fusion360.svg" alt="Fusion 360" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_411-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         Fusion 360
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_412"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_412-50_346"
                     >
                       <Image src="/icons/PlatformIO.svg" alt="PlatformIO" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_412-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         PlatformIO
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_413"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_413-50_346"
                     >
                       <Image src="/icons/Arduino.svg" alt="Arduino" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_413-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         Arduino
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_414"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_414-50_346"
                     >
                       <Image src="/icons/Cursor.svg" alt="Cursor" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_414-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         Cursor
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_416"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_416-50_346"
                     >
                       <Image src="/icons/Notion.svg" alt="Notion" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_416-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         Notion
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_415"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_415-50_346"
                     >
                       <Image src="/icons/Figma.svg" alt="Figma" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_415-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         Figma
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_417"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_417-50_346"
                     >
                       <Image src="/icons/Blender.svg" alt="Blender" width={24} height={24} className="w-full h-full object-contain" />
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_417-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         Blender
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#373743]' : 'bg-[#BCBCC8]'} relative rounded-[10px] shrink-0`}
                 data-name="Type=Icon"
                 id="node-53_418"
               >
                 <div className="flex flex-row items-center justify-center relative size-full">
                   <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative size-full">
                     <div
                       className="bg-center bg-cover bg-no-repeat shrink-0 size-6"
                       data-name="Skill Icons"
                       id="node-I53_418-50_346"
                     >
                       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                         <g clipPath="url(#clip0_50_470_skill)">
                           <path d="M12 0.333374C10.4679 0.333374 8.9508 0.635141 7.53534 1.22145C6.11987 1.80775 4.83375 2.66711 3.7504 3.75046C1.56248 5.93839 0.333313 8.90585 0.333313 12C0.333313 17.1567 3.68165 21.5317 8.31331 23.0834C8.89665 23.1767 9.08331 22.815 9.08331 22.5V20.5284C5.85165 21.2284 5.16331 18.965 5.16331 18.965C4.62665 17.6117 3.86831 17.25 3.86831 17.25C2.80665 16.5267 3.94998 16.55 3.94998 16.55C5.11665 16.6317 5.73498 17.7517 5.73498 17.7517C6.74998 19.525 8.46498 19 9.12998 18.72C9.23498 17.9617 9.53831 17.4484 9.86498 17.1567C7.27498 16.865 4.55665 15.8617 4.55665 11.4167C4.55665 10.1217 4.99998 9.08337 5.75831 8.25504C5.64165 7.96337 5.23331 6.75004 5.87498 5.17504C5.87498 5.17504 6.85498 4.86004 9.08331 6.36504C10.005 6.10837 11.0083 5.98004 12 5.98004C12.9916 5.98004 13.995 6.10837 14.9166 6.36504C17.145 4.86004 18.125 5.17504 18.125 5.17504C18.7666 6.75004 18.3583 7.96337 18.2416 8.25504C19 9.08337 19.4433 10.1217 19.4433 11.4167C19.4433 15.8734 16.7133 16.8534 14.1116 17.145C14.5316 17.5067 14.9166 18.2184 14.9166 19.3034V22.5C14.9166 22.815 15.1033 23.1884 15.6983 23.0834C20.33 21.52 23.6666 17.1567 23.6666 12C23.6666 10.468 23.3649 8.95086 22.7786 7.5354C22.1923 6.11994 21.3329 4.83381 20.2496 3.75046C19.1662 2.66711 17.8801 1.80775 16.4646 1.22145C15.0492 0.635141 13.5321 0.333374 12 0.333374Z" fill={isDarkMode ? '#F0F6FC' : '#1F2328'}/>
                         </g>
                         <defs>
                           <clipPath id="clip0_50_470_skill">
                             <rect width="24" height="24" fill="white"/>
                           </clipPath>
                         </defs>
                       </svg>
                     </div>
                     <div
                       className={`flex flex-col font-mono font-bold justify-center leading-[0] relative shrink-0 ${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-[18px] text-left text-nowrap tracking-[-0.36px]`}
                       id="node-I53_418-50_104"
                     >
                       <p className="adjustLetterSpacing block leading-[normal] whitespace-pre">
                         GitHub
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
                 </div>

        {/* Separator */}
        <div className="w-full h-px relative">
          <div className={`w-full h-full ${isDarkMode ? 'bg-gradient-to-r from-transparent via-[#3b3b3f] to-transparent' : 'bg-gradient-to-r from-transparent via-[#C0C0C4] to-transparent'}`} />
        </div>

                 {/* Project Portfolio Button */}
         <div
           className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative w-full"
           data-name="Type=Button"
           id="node-102_213"
         >
           <a
             href="https://possible-baroness-8d5.notion.site/ee0e4ab0544b40c5a8c8d388481c26a2"
             target="_blank"
             rel="noopener noreferrer"
             className={`${isDarkMode ? 'bg-[#202027] hover:bg-[#2a2a31]' : 'bg-[#d8d8df] hover:bg-[#c8c8cf]'} box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative rounded-[10px] shrink-0 transition-colors duration-200 cursor-pointer`}
             data-name="Button"
             id="node-102_216"
           >
             <div className={`absolute ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#C0C0C4]'} border border-solid inset-0 pointer-events-none rounded-[10px]`} />
             <div
               className={`flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 ${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-2xl md:text-3xl lg:text-[36px] text-center`}
               id="node-102_214"
             >
               <p className="block leading-[normal]">
                 Project Portfolio
               </p>
             </div>
             <div
               className="relative shrink-0 size-9"
               data-name="majesticons:open"
               id="node-102_238"
             >
               <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                 <g clipPath="url(#clip0_102_238_portfolio)">
                   <path d="M14.1137 2.45459H6.34095C5.31023 2.45459 4.32171 2.86404 3.59288 3.59288C2.86404 4.32171 2.45459 5.31023 2.45459 6.34095V29.6591C2.45459 30.6899 2.86404 31.6784 3.59288 32.4072C4.32171 33.136 5.31023 33.5455 6.34095 33.5455H29.6591C30.6899 33.5455 31.6784 33.136 32.4072 32.4072C33.136 31.6784 33.5455 30.6899 33.5455 29.6591V21.8864M18 18L33.5455 2.45459M33.5455 2.45459V12.1705M33.5455 2.45459H23.8296" stroke={isDarkMode ? '#ffffff' : '#000000'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                 </g>
                 <defs>
                   <clipPath id="clip0_102_238_portfolio">
                     <rect width="36" height="36" fill="white"/>
                   </clipPath>
                 </defs>
               </svg>
             </div>
           </a>
         </div>

         {/* Project Description */}
                  <p className={`${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-lg md:text-xl lg:text-2xl font-bold font-['Inter'] text-center max-w-4xl px-4 leading-snug md:leading-normal`}>
           Explore my complete portfolio of projects, including detailed descriptions, technologies used, and outcomes achieved.
         </p>

                 {/* Completed Projects Image */}
         <div
           className="relative w-full px-4"
           data-name="Completed Projects"
           id="node-90_209"
         >
           <div className="flex flex-row justify-center relative w-full">
             <div className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center p-0 md:p-[15px] relative w-full">
               <div
                 className="bg-center bg-cover bg-no-repeat rounded-[10px] w-full max-w-[1136px] aspect-[1136/438]"
                 data-name="Completed Projects"
                 id="node-102_204"
                 style={{ backgroundImage: "url('/completed-projects.png')" }}
               />
             </div>
           </div>
         </div>

        {/* Separator */}
        <div className="w-full h-px relative">
          <div className={`w-full h-full ${isDarkMode ? 'bg-gradient-to-r from-transparent via-[#3b3b3f] to-transparent' : 'bg-gradient-to-r from-transparent via-[#C0C0C4] to-transparent'}`} />
        </div>

                 {/* GitHub Activity Button */}
         <div
           className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-0 relative w-full"
           data-name="Type=Button"
           id="node-102_213"
         >
           <a
             href="https://github.com/LeeorNahum?tab=repositories"
             target="_blank"
             rel="noopener noreferrer"
             className={`${isDarkMode ? 'bg-[#202027] hover:bg-[#2a2a31]' : 'bg-[#d8d8df] hover:bg-[#c8c8cf]'} box-border content-stretch flex flex-row gap-2.5 items-center justify-center p-[10px] relative rounded-[10px] shrink-0 transition-colors duration-200 cursor-pointer`}
             data-name="Button"
             id="node-102_216"
           >
             <div className={`absolute ${isDarkMode ? 'border-[#3b3b3f]' : 'border-[#C0C0C4]'} border border-solid inset-0 pointer-events-none rounded-[10px]`} />
             <div
               className={`flex flex-col font-['Inter:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 ${isDarkMode ? 'text-[#f0f0f4]' : 'text-[#0b0b0f]'} text-2xl md:text-3xl lg:text-[36px] text-center`}
               id="node-102_214"
             >
               <p className="block leading-[normal]">
                 GitHub Activity
               </p>
             </div>
             <div
               className="relative shrink-0 size-9"
               data-name="majesticons:open"
               id="node-102_238"
             >
               <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                 <g clipPath="url(#clip0_102_238_github)">
                   <path d="M14.1137 2.45459H6.34095C5.31023 2.45459 4.32171 2.86404 3.59288 3.59288C2.86404 4.32171 2.45459 5.31023 2.45459 6.34095V29.6591C2.45459 30.6899 2.86404 31.6784 3.59288 32.4072C4.32171 33.136 5.31023 33.5455 6.34095 33.5455H29.6591C30.6899 33.5455 31.6784 33.136 32.4072 32.4072C33.136 31.6784 33.5455 30.6899 33.5455 29.6591V21.8864M18 18L33.5455 2.45459M33.5455 2.45459V12.1705M33.5455 2.45459H23.8296" stroke={isDarkMode ? '#ffffff' : '#000000'} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                 </g>
                 <defs>
                   <clipPath id="clip0_102_238_github">
                     <rect width="36" height="36" fill="white"/>
                   </clipPath>
                 </defs>
               </svg>
             </div>
           </a>
         </div>

         {/* GitHub Description */}
                  <p className={`${isDarkMode ? 'text-[#b5b5c9]' : 'text-[#36364A]'} text-lg md:text-xl lg:text-2xl font-bold font-['Inter'] text-center px-4 leading-snug md:leading-normal`}>
           View my code and contributions in software development
         </p>

                 {/* GitHub Metrics */}
         <div
           className="relative rounded-[10px] w-full"
           data-name="GitHub Metrics"
           id="node-84_201"
         >
           <div className="flex flex-row items-center justify-center relative w-full">
             <div className="[flex-flow:wrap] box-border content-center flex gap-10 items-center justify-center p-4 md:p-[15px] relative w-full">
               <div
                 className={`${isDarkMode ? 'bg-[#202027]' : 'bg-[#d8d8df]'} h-auto md:h-[255px] rounded-[10px] shrink-0 w-full max-w-[613px]`}
                 data-name="metrics.classic"
                 id="node-84_199"
               >
                 <Image 
                   src="https://raw.githubusercontent.com/LeeorNahum/Metrics/main/metrics.classic.svg" 
                   alt="GitHub Stats"
                   width={613}
                   height={255}
                   className="w-full h-full object-cover rounded-[10px]"
                   unoptimized
                 />
               </div>
               <div
                 className={`${isDarkMode ? 'bg-[#202027]' : 'bg-[#d8d8df]'} box-border content-stretch flex flex-col gap-2.5 h-auto md:h-[238px] items-center justify-center p-0 relative rounded-[10px] shrink-0 w-full max-w-[613px]`}
                 data-name="Languages"
                 id="node-84_203"
               >
                 <div
                   className="bg-center bg-cover bg-no-repeat h-[131px] rounded-[10px] shrink-0 w-full"
                   data-name="metrics.plugin.languages"
                   id="node-84_200"
                 >
                   <Image 
                     src="https://raw.githubusercontent.com/LeeorNahum/Metrics/main/metrics.plugin.languages.svg" 
                     alt="Languages Stats"
                     width={613}
                     height={131}
                     className="w-full h-full object-cover rounded-[10px]"
                     unoptimized
                   />
                 </div>
               </div>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}
