export default function SoccerPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <iframe
          src="/games-html/soccer-v1.html"
          className="w-full h-screen border-0"
          title="2v2 Soccer Game"
        />
      </div>
    </div>
  );
}
