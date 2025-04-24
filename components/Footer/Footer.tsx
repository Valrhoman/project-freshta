import Link from "next/link";
import Image from "next/image";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
export default function Footer() {
  return (
    <div className="border-t-2 border-gray-100">
      <div className="px-8 font-poppins py-8 md:py-16 transition-all sm:px-16 w-full max-w-[120rem] sm:mx-auto">
        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 mb-8 md:mb-16">
          <div>
            <h3 className="footer-header">Get to know us</h3>
            <ul className="footer-list">
              <li className="footer-li">Company</li>
              <li className="footer-li">About</li>
              <li className="footer-li">Blog</li>
              <li className="footer-li">Help Center</li>
              <li className="footer-li">Our Value</li>
            </ul>
          </div>
          <div>
            <h3 className="footer-header">Be Our Partner</h3>
            <ul className="footer-list">
              <li className="footer-li">Local Farms</li>
              <li className="footer-li">Reseller</li>
              <li className="footer-li">Local Markets</li>
              <li className="footer-li">Content Creators</li>
              <li className="footer-li">Press</li>
            </ul>
          </div>
          <div className="sm:items-start col-span-2 sm:col-span-1">
            <h3 className="footer-header">Payment Partners</h3>
            <ul className="flex gap-4 w-48 sm:w-56 md:w-64 lg:w-80 h-16 sm:h-20 md:h-24 lg:h- mt-4 sm:mt-6 md:mt-8">
              <div className="relative w-1/3">
                <Image
                  src="/logos/paypal.svg"
                  alt="paypal"
                  loading="lazy"
                  fill
                />
              </div>
              <div className="relative w-1/3">
                <Image
                  src="/logos/Mastercard_Logo_1996.svg"
                  alt="paypal"
                  loading="lazy"
                  fill
                />
              </div>

              <div className="relative w-1/3">
                <Image
                  src="/logos/Visa_Logo_2014.svg"
                  alt="paypal"
                  loading="lazy"
                  fill
                />
              </div>
            </ul>
          </div>
        </div>

        <div className="py-8 md:py-16 grid gap-8 sm:grid-cols-2 w-full border-t-2 border-gray-100">
          <div className=" text-xl sm:text-2xl lg:text-3xl bg-blue-3">
            <h3 className="footer-header ">Get in touch</h3>
            <ul className="footer-list">
              <li className="footer-li flex items-center gap-4 ">
                <HiOutlinePhone size={16} />
                <p>+63 9xx xxx xxxx</p>
              </li>
              <li className="footer-li flex items-center gap-4">
                <HiOutlineMail size={16} />
                <p>freshta.business@gmail.com</p>
              </li>
            </ul>
          </div>

          <div className="text-xl sm:text-2xl lg:text-3xl bg-red-3">
            <h3 className="footer-header">Follow us on</h3>
            <ul className="text-2xl sm:text-3xl lg:text-4xl mt-4 md:mt-6 lg:mt-8 flex gap-4 text-greeny-700 pb-4">
              <li className="footer-follow-li">
                <BsFacebook className="icon" />
              </li>
              <li className="footer-follow-li">
                <BsTwitter className="icon" />
              </li>
              <li className="footer-follow-li">
                <BsInstagram className="icon" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 md:mt-12">
          <p className="text-gray-500 text-lg sm:text-xl lg:text-2xl">
            &copy; 2022 Freshta by <Link href="#">Alrho</Link>. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
