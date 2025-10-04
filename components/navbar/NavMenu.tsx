export const NavMenu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      onMouseLeave={() => setActive(null)}
      className="relative flex justify-center space-x-4 bg-transparent px-2 py-6"
    >
      {children}
    </div>
  );
};
