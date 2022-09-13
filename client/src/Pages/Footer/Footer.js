import React from "react";
import Logo from "../../Source/img/evangadi-logo-footer.png";
import { BsFacebook, BsYoutube, BsInstagram } from "react-icons/bs";

function Footer() {
  return (
    <div className='items-center'>
    <footer className="p-6 bg-[#3b455a]">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <div>
            <a href="/" className="flex items-center color:white mb-4 sm:mb-0 self-center">
              <img src={Logo} className="mr-3 h-8" alt="Evangadi Logo" />
            </a>
          </div>
          <div>
            <ul className="flex flex-row justify-evenly">
              <li className="cursor-pointer">
                <a className = 'text-white' href="https://www.facebook.com/EthiopiansNetwork" target='_blank'>
                  {" "}
                  <BsFacebook size={40} />
                </a>
              </li>
              <li className="cursor-pointer">
                <a className = 'text-white' href="https://www.instagram.com/accounts/login/" target='_blank'>
                  {" "}
                  <BsInstagram size={40} />
                </a>
              </li>
              <li className="cursor-pointer focus">
                <a className = 'text-white' href="https://www.youtube.com/c/EvangadiTech" target='_blank'>
                  {" "}
                  <BsYoutube size={40} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className=" m-7 p-4 flex flex-col justify-double ">
          <ul className="items-center mb-6 text-sm  sm:mb-0 dark:text-orange-400">
            <h2 className=' text-white'>Useful Link</h2>
            <a className = 'text-gray-400' href="https://www.evangadi.com/explained/" target='_blank'>
              <li className='py-1 text-2xl'>How it works</li>
            </a>
            <a className = 'text-gray-400' href="https://www.evangadi.com/legal/terms/" target='_blank'>
              <li className='py-1 text-2xl'>Terms of Service</li>
            </a>
            <a className = 'text-gray-400' href="https://www.evangadi.com/legal/privacy/" target='_blank'>
              <li className='py-1 text-2xl'>Privacy policy</li>
            </a>
          </ul>
        </div>
        <div className=" m-7 p-4 flex flex-col justify-double ">
          <ul className="items-center mb-6 text-sm text-gray-400 sm:mb-0 dark:text-orange-400">
            <h2 className=' text-white'>Contact Info</h2>
            <a>
              <li className='py-1 text-2xl'>Evangadi Networks</li>
            </a>
            <a>
              <li className='py-1 text-2xl'>support@evangadi.com</li>
            </a>
            <a>
              <li className='py-1 text-2xl'>+1-202-386-2702</li>
            </a>
          </ul>
        </div>
      </div>
      
    </footer>
    </div>
  );
}

export default Footer;
