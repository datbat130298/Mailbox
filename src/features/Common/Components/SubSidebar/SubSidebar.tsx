interface SubSidebarContainerProps {
  children: React.ReactNode;
}

const SubSidebarContainer = ({ children }: SubSidebarContainerProps) => {
  return <div className="h-full w-52 bg-slate-100 pr-4 pt-0.5">{children}</div>;
};
export default SubSidebarContainer;
