import Link from "next/link";
import Image from "next/image";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { HiOutlinePhone, HiOutlineMail } from "react-icons/hi";
export default function Footer() {
  return (
    <div className="px-8 font-poppins py-8 border-t-2 border-gray-100 transition-all">
      <div className="grid grid-cols-2">
        <div className="py-4">
          <h3 className="font-semibold text-2xl text-greeny-700">
            Get to know us
          </h3>
          <ul className="text-xl space-y-2 mt-4">
            <li className="hover:text-greeny-400 cursor-pointer">Company</li>
            <li className="hover:text-greeny-400 cursor-pointer">About</li>
            <li className="hover:text-greeny-400 cursor-pointer">Blog</li>
            <li className="hover:text-greeny-400 cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-greeny-400 cursor-pointer">Our Value</li>
          </ul>
        </div>
        <div className="py-4">
          <h3 className="font-semibold text-2xl text-greeny-700">
            Be Our Partner
          </h3>
          <ul className="text-xl space-y-2 mt-4">
            <li className="hover:text-greeny-400 cursor-pointer">
              Local Farms
            </li>
            <li className="hover:text-greeny-400 cursor-pointer">Reseller</li>
            <li className="hover:text-greeny-400 cursor-pointer">
              Local Markets
            </li>
            <li className="hover:text-greeny-400 cursor-pointer">
              Content Creators
            </li>
            <li className="hover:text-greeny-400 cursor-pointer">Press</li>
          </ul>
        </div>
      </div>
      <div className="bg-white py-8 flex gap-8 ">
        <h3 className="font-semibold text-2xl text-greeny-700 mb-4">
          Payment Partners
        </h3>
        <ul className="flex gap-4">
          <Image
            src="/logos/paypal.svg"
            width={30}
            height={30}
            alt="paypal"
            loading="lazy"
          />
          <Image
            src="/logos/Mastercard_Logo_1996.svg"
            width={40}
            height={40}
            alt="paypal"
            loading="lazy"
          />
          <Image
            src="/logos/Visa_Logo_2014.svg"
            width={40}
            height={40}
            alt="paypal"
            loading="lazy"
          />
        </ul>
      </div>
      <div className=" py-8 border-t-2 border-gray-100 text-xl">
        <h3 className="font-semibold text-2xl text-greeny-700 mb-4">
          Get in touch
        </h3>
        <ul className="text-xl space-y-2 mt-4">
          <li className="flex items-center gap-4 hover:text-greeny-400 cursor-pointer">
            <HiOutlinePhone size={16} />
            <p className="hover:text-greeny-400 cursor-pointer">
              +63 9xx xxx xxxx
            </p>
          </li>
          <li className="flex items-center gap-4 hover:text-greeny-400 cursor-pointer">
            <HiOutlineMail size={16} />
            <p className="hover:text-greeny-400 cursor-pointer">
              freshta.business@gmail.com
            </p>
          </li>
        </ul>
      </div>

      <div className="pb-8 text-xl">
        <h3 className="font-semibold text-2xl text-greeny-700 mb-4">
          Follow us on
        </h3>
        <ul className="text-xl mt-4 flex gap-4 text-greeny-700 pb-4">
          <li className="flex items-center hover:text-greeny-400 cursor-pointer">
            <BsFacebook size={16} />
          </li>
          <li className="flex items-center hover:text-greeny-400 cursor-pointer">
            <BsTwitter size={16} />
          </li>
          <li className="flex items-center hover:text-greeny-400 cursor-pointer">
            <BsInstagram size={16} />
          </li>
        </ul>
      </div>
      <div>
        <p className="text-gray-500">
          &copy; 2022 Freshta by <Link href="#">Alrho</Link>. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}
