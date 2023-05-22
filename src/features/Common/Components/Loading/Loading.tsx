const Loading = () => {
  return (
    <div className="fixed top-0 z-[500] flex h-screen w-full content-center items-center justify-between justify-items-center bg-white">
      <div
        className="m-auto h-10 w-10 animate-spin rounded-full border-4
             border-primary-700 border-t-transparent"
      />
    </div>
  );
};
export default Loading;
