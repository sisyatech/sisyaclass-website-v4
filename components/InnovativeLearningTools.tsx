"use client";

import React from "react";

const InnovativeLearningTools = () => {
  return (
    <div className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div 
          className="relative mx-auto rounded-[50px] border p-12"
          style={{
            width: '1176px',
            height: '1022px',
            background: '#B9D9EB4D',
            border: '1px solid #EBEBEB',
            boxShadow: '4px 4px 4px 0px #00000040'
          }}
        >
          {/* Top Headlines */}
          <div className="text-center mb-12">
            <h3 
              className="mb-2"
              style={{
                fontFamily: 'Montserrat',
                fontWeight: 400,
                fontSize: '25px',
                lineHeight: '45px',
                letterSpacing: '0%',
                textAlign: 'center',
                color: '#1A2439'
              }}
            >
              Empowering Students
            </h3>
            <h2 
              style={{
                fontFamily: 'Montserrat',
                fontWeight: 700,
                fontSize: '50px',
                lineHeight: '45px',
                letterSpacing: '0%',
                textAlign: 'center',
                textTransform: 'capitalize',
                color: '#1A2439'
              }}
            >
              With <span style={{ color: '#0595CE' }}>SISYA's</span> Innovative Learning Tools
            </h2>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-center space-y-12">
            
            {/* Laptop with Video */}
            <div className="relative w-full max-w-3xl">
              <img 
                src="/session4/pc.svg" 
                alt="Laptop" 
                className="w-full h-auto"
              />
              
              {/* Video Content Overlay */}
              <div 
                className="absolute top-8 left-1/2 transform -translate-x-1/2"
                style={{
                  width: '400px',
                  height: '250px',
                  background: '#1A2439',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div className="text-center">
                  <h4 className="text-white text-2xl font-bold mb-4">WHY SISYA CLASS ?</h4>
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                    <div className="w-0 h-0 border-l-8 border-l-blue-500 border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                  </div>
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm">
                  <div className="flex items-center gap-2">
                    <button className="w-6 h-6 bg-white rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-600 rounded"></div>
                    </button>
                    <span>0:02 / 1:39</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1 bg-gray-600 rounded">
                      <div className="w-2 h-1 bg-white rounded"></div>
                    </div>
                    <button className="w-4 h-4">🔊</button>
                    <button className="w-4 h-4">⚙️</button>
                    <button className="w-4 h-4">⛶</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Features - Two Column Layout Below PC */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8 max-w-6xl">
              
              {/* Left Column - Features 1, 2, 3 */}
              <div className="space-y-6">
              
              {/* Feature 1 - Personalized Feedback */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img 
                    src="/session4/pic1.svg" 
                    alt="Personalized Feedback" 
                    style={{ width: '73px', height: '73px' }}
                  />
                </div>
                <div>
                  <h4 
                    className="mb-1"
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 500,
                      fontSize: '24px',
                      lineHeight: '23.69px',
                      letterSpacing: '3%',
                      color: '#1A2439'
                    }}
                  >
                    Personalized Feedback:
                  </h4>
                  <p 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#1A2439'
                    }}
                  >
                    Receive tailored insights based on your child's learning progress to boost improvement.
                  </p>
                </div>
              </div>

              {/* Feature 2 - AI Study Buddy */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img 
                    src="/session4/pic2.svg" 
                    alt="AI Study Buddy" 
                    style={{ width: '73px', height: '73px' }}
                  />
                </div>
                <div>
                  <h4 
                    className="mb-1"
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 500,
                      fontSize: '24px',
                      lineHeight: '23.69px',
                      letterSpacing: '3%',
                      color: '#1A2439'
                    }}
                  >
                    AI Study Buddy:
                  </h4>
                  <p 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#1A2439'
                    }}
                  >
                    Available round-the-clock to explain concepts and guide your child through challenging problems.
                  </p>
                </div>
              </div>

              {/* Feature 3 - Skill Booster Challenges */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img 
                    src="/session4/pic3.svg" 
                    alt="Skill Booster Challenges" 
                    style={{ width: '73px', height: '73px' }}
                  />
                </div>
                <div>
                  <h4 
                    className="mb-1"
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 500,
                      fontSize: '24px',
                      lineHeight: '23.69px',
                      letterSpacing: '3%',
                      color: '#1A2439'
                    }}
                  >
                    Skill Booster Challenges:
                  </h4>
                  <p 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#1A2439'
                    }}
                  >
                    Interactive quizzes and activities that adapt to your child's learning style and reward their efforts.
                  </p>
                </div>
              </div>
              </div>

              {/* Right Column - Features 4, 5, 6 */}
              <div className="space-y-6">

              {/* Feature 4 - Performance Insights */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img 
                    src="/session4/pic4.svg" 
                    alt="Performance Insights" 
                    style={{ width: '73px', height: '73px' }}
                  />
                </div>
                <div>
                  <h4 
                    className="mb-1"
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 500,
                      fontSize: '24px',
                      lineHeight: '23.69px',
                      letterSpacing: '3%',
                      color: '#1A2439'
                    }}
                  >
                    Performance Insights:
                  </h4>
                  <p 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#1A2439'
                    }}
                  >
                    Comprehensive reports to monitor accuracy, speed, and improvements across subjects.
                  </p>
                </div>
              </div>

              {/* Feature 5 - SISYA Play */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img 
                    src="/session4/pic5.svg" 
                    alt="SISYA Play" 
                    style={{ width: '73px', height: '73px' }}
                  />
                </div>
                <div>
                  <h4 
                    className="mb-1"
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 500,
                      fontSize: '24px',
                      lineHeight: '23.69px',
                      letterSpacing: '3%',
                      color: '#1A2439'
                    }}
                  >
                    SISYA Play:
                  </h4>
                  <p 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#1A2439'
                    }}
                  >
                    Fun, educational games with stats and rankings to make practice exciting and motivating.
                  </p>
                </div>
              </div>

              {/* Feature 6 - Parent Dashboard */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <img 
                    src="/session4/pic6.svg" 
                    alt="Parent Dashboard" 
                    style={{ width: '73px', height: '73px' }}
                  />
                </div>
                <div>
                  <h4 
                    className="mb-1"
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 500,
                      fontSize: '24px',
                      lineHeight: '23.69px',
                      letterSpacing: '3%',
                      color: '#1A2439'
                    }}
                  >
                    Parent Dashboard:
                  </h4>
                  <p 
                    style={{
                      fontFamily: 'Roboto',
                      fontWeight: 400,
                      fontSize: '18px',
                      lineHeight: '20px',
                      letterSpacing: '3%',
                      color: '#1A2439'
                    }}
                  >
                    Get real-time updates on attendance, teacher feedback, and overall learning progress.
                  </p>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovativeLearningTools;
