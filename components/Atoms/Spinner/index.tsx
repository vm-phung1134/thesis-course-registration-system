export const Spinner = () => {
  return (
    <div className="w-full h-screen bg-white flex justify-center items-center gap-5">
      <div className="three-body">
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
        <div className="three-body__dot"></div>
      </div>
      <p className="text-lg font-bold text-green-700 uppercase">TCR System</p>
    </div>
  );
};
