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

 useEffect(() => {
   setPageUrl(window.location.href);
 }, []);

 const copyLink = async () => {
   await navigator.clipboard.writeText(pageUrl);
   alert("Link copied!");
 };

 const encodedTitle = encodeURIComponent(title);
 const encodedDesc = encodeURIComponent(description || "");
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

 return (
   <div className="fixed top-1/2 left-4 -translate-y-1/2 flex flex-col gap-3 z-50">

     <Link
       href={share.whatsapp}
       target="_blank"
       className="bg-green-600 text-white px-4 py-2 rounded-full"
     >
       <FaWhatsapp />
     </Link>

     <Link
       href={share.twitter}
       target="_blank"
       className="bg-black text-white px-4 py-2 rounded-full"
     >
       <FaTwitter />
     </Link>

     <Link
       href={share.facebook}
       target="_blank"
       className="bg-blue-600 text-white px-4 py-2 rounded-full"
     >
       <FaFacebook />
     </Link>

     <Link
       href={share.linkedin}
       target="_blank"
       className="bg-blue-700 text-white px-4 py-2 rounded-full"
     >
       <FaLinkedin />
     </Link>

     <Link
       href={share.telegram}
       target="_blank"
       className="bg-sky-500 text-white px-4 py-2 rounded-full"
     >
       <FaTelegram />
     </Link>

     <button
       onClick={copyLink}
       className="bg-gray-700 text-white px-4 py-2 rounded-full"
     >
       <FaCopy />
     </button>

   </div>
 );
}