"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
 FaWhatsapp,
 FaFacebook,
 FaTwitter,
 FaCopy
} from "react-icons/fa";

import {
 FaLinkedin,
 FaTelegram
} from "react-icons/fa6";

export default function NewsDetailClient({
 title,
 description,
}: {
 title: string;
 description?: string;
}) {

 const [pageUrl, setPageUrl] = useState("");
 const [copied, setCopied] = useState(false);

 useEffect(() => {
   setPageUrl(window.location.href);
 }, []);

 const copyLink = async () => {
   await navigator.clipboard.writeText(pageUrl);
   setCopied(true);

   setTimeout(() => {
     setCopied(false);
   }, 2000);
 };

 const encodedTitle = encodeURIComponent(title);
 const encodedUrl = encodeURIComponent(pageUrl);

 const share = {
   whatsapp: `https://wa.me/?text=${encodeURIComponent(
     `${title}\n\n${description || ""}\n\n${pageUrl}`
   )}`,

   twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,

   facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,

   linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,

   telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
 };

 const socialButton =
   "w-12 h-12 flex items-center justify-center rounded-full backdrop-blur-xl shadow-lg border border-white/20 transition hover:scale-110";

 return (
   <>
     <div
       className="
       fixed
       bottom-5 left-1/2 -translate-x-1/2
       md:left-6 md:top-1/2 md:-translate-y-1/2 md:translate-x-0
       flex flex-row md:flex-col gap-3
       bg-white/80 backdrop-blur-2xl
       rounded-2xl p-3 shadow-2xl
       z-50
       "
     >

       <Link
         href={share.whatsapp}
         target="_blank"
         className={`${socialButton} bg-green-600 text-white`}
       >
         <FaWhatsapp size={18} />
       </Link>

       <Link
         href={share.twitter}
         target="_blank"
         className={`${socialButton} bg-black text-white`}
       >
         <FaTwitter size={18} />
       </Link>

       <Link
         href={share.facebook}
         target="_blank"
         className={`${socialButton} bg-blue-600 text-white`}
       >
         <FaFacebook size={18} />
       </Link>

       <Link
         href={share.linkedin}
         target="_blank"
         className={`${socialButton} bg-blue-700 text-white`}
       >
         <FaLinkedin size={18} />
       </Link>

       <Link
         href={share.telegram}
         target="_blank"
         className={`${socialButton} bg-sky-500 text-white`}
       >
         <FaTelegram size={18} />
       </Link>

       <button
         onClick={copyLink}
         className={`${socialButton} bg-gray-800 text-white`}
       >
         <FaCopy size={18} />
       </button>

     </div>

     {copied && (
       <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full shadow-lg z-[60]">
         Link copied
       </div>
     )}
   </>
 );
}