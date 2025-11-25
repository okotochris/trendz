import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'photos.hotelbeds.com', // existing
      'via.placeholder.com',  // added for placeholder logos
      "ichef.bbci.co.uk",
      "static.reuters.com",
      "media.cnn.com",
      "via.placeholder.com",
      'photos.hotelbeds.com',
      'assets2.cbsnewsstatic.com',  // <- add your news image domain here
      'ichef.bbci.co.uk',  
       "photos.hotelbeds.com",
      "via.placeholder.com",
      "platform.theverge.com", // add all news domains you use
      "ichef.bbci.co.uk",
      "assets2.cbsnewsstatic.com",  
    ],
  },
};

export default nextConfig;
