import Link from "next/link";

const SIPBreadcrumb = () => {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-4 pt-6 md:px-12 lg:px-16">
      <nav className="flex items-center gap-2 text-sm font-medium text-[#1A2439]/80" aria-label="Breadcrumb">
        <Link href="/" className="transition-colors hover:text-[#0E90DA]">Home</Link>
        <span className="text-xs text-[#0E90DA]">›</span>
        <span className="text-[#0E90DA]">School Integration Program</span>
      </nav>
    </div>
  );
};

export default SIPBreadcrumb;
