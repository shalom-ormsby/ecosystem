export default function KaleidoscopePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <iframe
          src="/games-html/kaleidoscope.html"
          className="w-full h-screen border-0"
          title="Kaleidoscope Animation"
        />
      </div>
    </div>
  );
}
