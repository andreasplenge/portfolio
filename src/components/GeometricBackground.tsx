const GeometricBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Clean gradient wash - professional, minimal */}
      <div 
        className="absolute top-0 right-0 w-1/2 h-1/2 opacity-[0.03]"
        style={{
          background: 'radial-gradient(ellipse at top right, hsl(220 70% 50%) 0%, transparent 60%)'
        }}
      />
      
      <div 
        className="absolute bottom-0 left-0 w-1/3 h-1/3 opacity-[0.02]"
        style={{
          background: 'radial-gradient(ellipse at bottom left, hsl(220 70% 50%) 0%, transparent 60%)'
        }}
      />
    </div>
  );
};

export default GeometricBackground;
