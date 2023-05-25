interface SubSidebarContainerProps {
  children: React.ReactNode;
}

const SubSidebarContainer = ({ children }: SubSidebarContainerProps) => {
  return <div className="h-full w-52 bg-slate-100 py-1 pr-4">{children}</div>;
};
export default SubSidebarContainer;
