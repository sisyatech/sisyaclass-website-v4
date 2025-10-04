"use client";

import React from "react";

const Impact = () => {
  const statistics = [
    {
      number: "2.1+",
      unit: "crore",
      description: "hours of LIVE learning",
      numberColor: "#575CFB",
      descriptionColor: "#556A8E"
    },
    {
      number: "25+", 
      unit: "lakh",
      description: "doubts resolved on the app",
      numberColor: "#41AC7D",
      descriptionColor: "#556A8E"
    },
    {
      number: "10+",
      unit: "thousand",
      description: "success stories across India", 
      numberColor: "#1BA8EF",
      descriptionColor: "#556A8E"
    },
    {
      number: "57+",
      unit: "cities",
      description: "Trusted by parents",
      numberColor: "#E78F8E",
      descriptionColor: "#556A8E"
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Section - Statistics */}
          <div className="space-y-8 ml-18">
            <div className="space-y-2">
              <h2 className="font-montserrat font-extrabold text-3xl leading-none text-gray-900">
                SISYA's Impact:
              </h2>
              <p className="font-montserrat font-normal text-2xl leading-tight text-gray-900">
                Explore What You Can Learn
              </p>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-6">
              {statistics.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <div className="space-y-0">
                    <div 
                      className="font-montserrat font-bold text-3xl leading-none"
                      style={{
                        color: stat.numberColor
                      }}
                    >
                      {stat.number}
                    </div>
                    <div 
                      className="font-montserrat font-bold text-3xl leading-none"
                      style={{
                        color: stat.numberColor
                      }}
                    >
                      {stat.unit}
                    </div>
                  </div>
                  <div 
                    className="font-roboto font-medium text-lg leading-8 tracking-wide"
                    style={{
                      color: stat.descriptionColor
                    }}
                  >
                    {stat.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Map */}
          <div 
            className="relative flex justify-center items-center ml-30"
            style={{
              width: '500px',
              height: '550px'
            }}
          >
            {/* Map */}
            <img 
              src="/map.svg" 
              alt="India Map" 
              className="w-full h-full object-contain"
            />
            
            {/* Student Images positioned on the map */}
            <div className="absolute inset-0">
              {/* Student 1 - Jammu & Kashmir */}
              <div className="absolute" style={{ top: '350px', left: '174px' }}>
                <img 
                  src="/student1.svg" 
                  alt="Student 1" 
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>
              
              {/* Student 2 - Assam */}
              <div className="absolute" style={{ top: '80px', right: '120px' }}>
                <img 
                  src="/student2.svg" 
                  alt="Student 2" 
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>
              
              {/* Student 3 - Gujarat */}
              <div className="absolute" style={{ top: '220px', left: '80px' }}>
                <img 
                  src="/student3.svg" 
                  alt="Student 3" 
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>
              
              {/* Student 4 - Maharashtra */}
              <div className="absolute" style={{ top: '200px', right: '100px' }}>
                <img 
                  src="/student4.svg" 
                  alt="Student 4" 
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>
              
              {/* Student 5 - Karnataka */}
              <div className="absolute" style={{ bottom: '160px', left: '160px' }}>
                <img 
                  src="/student5.svg" 
                  alt="Student 5" 
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>
              
              {/* Student 6 - Tamil Nadu */}
              <div className="absolute" style={{ bottom: '80px', right: '140px' }}>
                <img 
                  src="/student6.svg" 
                  alt="Student 6" 
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>
              
              {/* Student 7 - Odisha */}
              <div className="absolute" style={{ bottom: '140px', right: '80px' }}>
                <img 
                  src="/student7.svg" 
                  alt="Student 7" 
                  className="w-12 h-12 object-contain rounded-full"
                />
              </div>
              
              {/* Text Bubble 1 - Unlimited doubt solving (near Gujarat) */}
              <div 
                className="absolute flex items-center justify-center"
                style={{
                  top: '200px',
                  left: '80px',
                  width: '149.25px',
                  height: '23.22px',
                  borderRadius: '11.61px',
                  background: '#FFF9F9',
                  boxShadow: '0px 0px 5.46px 0px #00000040'
                }}
              >
                <span 
                  className="font-montserrat font-normal text-center"
                  style={{
                    fontSize: '9.86px',
                    lineHeight: '17.75px',
                    color: '#1A2439'
                  }}
                >
                  Unlimited <span className="font-bold">doubt</span> solving
                </span>
              </div>
              
              {/* Text Bubble 2 - Daily LIVE classes (near Odisha) */}
              <div 
                className="absolute flex items-center justify-center"
                style={{
                  bottom: '80px',
                  right: '80px',
                  width: '149.25px',
                  height: '23.22px',
                  borderRadius: '11.61px',
                  background: '#FFF9F9',
                  boxShadow: '0px 0px 5.46px 0px #00000040'
                }}
              >
                <span 
                  className="font-montserrat font-normal text-center"
                  style={{
                    fontSize: '9.86px',
                    lineHeight: '17.75px',
                    color: '#1A2439'
                  }}
                >
                  Daily <span className="font-bold">LIVE</span> classes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impact;
