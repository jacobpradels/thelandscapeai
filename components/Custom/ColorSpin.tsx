const ColorSpin = ({ children }: { children: any }) => {
  return (
    <div className="animate-[spin_5000ms_linear_infinite]">
      {children}
    </div>
  );
}

export default ColorSpin;