const GeometricBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Subtle top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
    </div>
  );
};

export default GeometricBackground;
