"use client";

import React, { useState } from "react";
import { NavMenu } from "@/components/navbar/NavMenu";
import { NavMenuItem } from "@/components/navbar/NavMenuItem";
import { HoveredLink } from "./HoveredLink";
import { gradeLinks } from "@/lib/gradeLinks";
import { resourcesLinks } from "@/lib/resourcesLinks";
import { useMobileMenu } from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { extractGradeFromLabel, getGradeUrl } from "@/lib/navigation";

const NavLinks = () => {
  const [active, setActive] = useState<string | null>(null);
  const { setSelectedGrade } = useMobileMenu();
  const router = useRouter();
  
  const handleGradeClick = (gradeLabel: string) => {
    const gradeNumber = extractGradeFromLabel(gradeLabel);
    if (gradeNumber) {
      setSelectedGrade(gradeNumber);
      router.push(getGradeUrl(gradeNumber));
    }
  };

  return (
    <NavMenu setActive={setActive}>
      <NavMenuItem setActive={setActive} active={active} item="Courses">
        <div className="flex flex-col space-y-4 text-sm">
          {gradeLinks.map((link) => (
            <div 
              key={link.href} 
              onClick={() => handleGradeClick(link.label)}
              className="cursor-pointer hover:text-[#02bdfe] transition-colors"
            >
              <HoveredLink href="#">
                {link.label}
              </HoveredLink>
            </div>
          ))}
        </div>
      </NavMenuItem>
      <NavMenuItem setActive={setActive} active={active} item="Resources For Students">
        <div className="flex flex-col space-y-4 text-sm">
          {resourcesLinks.map((link) => (
            <HoveredLink key={link.href} href={link.href}>
              {link.label}
            </HoveredLink>
          ))}
        </div>
      </NavMenuItem>
    </NavMenu>
  );
};

export default NavLinks;
