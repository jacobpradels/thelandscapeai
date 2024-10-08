const ColorSpin = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="animate-[spin_5000ms_linear_infinite]">
      {children}
    </div>
  );
}

export default ColorSpin;