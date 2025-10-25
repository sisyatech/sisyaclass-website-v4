

import React from "react";
import Image from "next/image";

const NewsSideImage = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <div className="relative w-full h-auto">
        <Image
          src="/blogs/blogsidepic.svg"
          alt="News Side Image"
          width={400}
          height={300}
          className="w-full h-auto rounded-lg object-cover"
          priority={false}
        />
      </div>
    </div>
  );
};

export default NewsSideImage;
