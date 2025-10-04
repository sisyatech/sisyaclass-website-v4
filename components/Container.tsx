import { cn } from "@/lib/utils";
import React from "react";

const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("mx-auto h-screen max-w-7xl overflow-hidden", className)}>{children}</div>
  );
};

export default Container;
