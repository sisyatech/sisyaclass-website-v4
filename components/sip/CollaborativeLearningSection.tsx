import Image from "next/image";

const featureCards = [
    {
        title: "Expert Faculty",
        subtitle: "(98% IIT/NIT-qualified)",
        image: "/sippics/1.svg",
        accent: "#FEF7DA",
    },
    {
        title: "Board + Competitive",
        subtitle: "Exam Preparation",
        image: "/sippics/2.svg",
        accent: "#FBD1D2",
    },
    {
        title: "AI-Powered Learning",
        subtitle: "Support",
        image: "/sippics/3.svg",
        accent: "#F3FFF5",
    },
    {
        title: "Structured Study",
        subtitle: "Material & Assessments",
        image: "/sippics/4.svg",
        accent: "#F3F1FE",
    },
];

const CollaborativeLearningSection = () => {
    return (
        <section className="w-full bg-white">
<div className="mx-auto flex w-full max-w-6xl flex-col items-stretch gap-10 px-6 pt-5 pb-16 md:px-12 lg:px-0">
<div className="space-y-3">
                    <h2 className="text-[28px] font-bold text-[#1A2439] sm:text-[32px] md:text-[40px] text-center md:text-left">
                        Collaborative Learning Center
                    </h2>
                    <p className="text-sm font-semibold text-[#0E90DA] sm:text-base md:text-lg text-center md:text-left">
                        SISYA School Integration Program for JEE/NEET Foundation Grade 6 Onwards
                    </p>
                    <p className="text-sm text-[#1A2439]/80 sm:text-[15px] md:text-base text-center md:text-left">
                        At SISYA CLASS, we believe that every child deserves more than just a classroom...
                    </p>
                </div>


                <div className="rounded-[30px] bg-[#CFE6FA] px-6 py-10 md:px-10">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {featureCards.map((card) => (
                            <div
                                key={card.title}
                                className="flex h-full flex-col overflow-hidden rounded-[22px] bg-white text-center shadow-[0px_10px_30px_rgba(16,43,64,0.08)]"
                            >
                                <div
                                    className="flex h-[153px] w-full items-center justify-center"
                                    style={{ backgroundColor: card.accent }}
                                >
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        width={130}
                                        height={130}
                                        className="h-[110px] w-[130px] object-contain"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col items-center px-6 pb-8 pt-6">
                                    <p className="text-[17px] font-medium leading-[24px] text-black">
                                        {card.title}
                                    </p>
                                    <p className="mt-1 text-sm font-medium text-[#1A2439] md:text-[15px]">
                                        {card.subtitle}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mx-auto flex h-[75px] w-full max-w-7xl items-center justify-center  bg-[#0595CE] px-4 text-center text-xs font-medium leading-[16px] text-white sm:h-[78px]  sm:px-6 sm:text-[14px] md:h-[88px]  md:text-base">
                With SISYA SIP, your school becomes a one-stop destination for parents seeking the best academic and competitive coaching for their children.
            </div>

        </section>
    );
};

export default CollaborativeLearningSection;
