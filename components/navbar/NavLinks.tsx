"use client";

import React, { useState } from "react";
import { NavMenu } from "@/components/navbar/NavMenu";
import { NavMenuItem } from "@/components/navbar/NavMenuItem";
import { HoveredLink } from "./HoveredLink";
import { gradeLinks } from "@/lib/gradeLinks";
import { resourcesLinks } from "@/lib/resourcesLinks";

const NavLinks = () => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <NavMenu setActive={setActive}>
      <NavMenuItem setActive={setActive} active={active} item="Courses">
        <div className="flex flex-col space-y-4 text-sm">
          {gradeLinks.map((link) => (
            <HoveredLink key={link.href} href={link.href}>
              {link.label}
            </HoveredLink>
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
