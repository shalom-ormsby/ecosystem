export default function TetrisPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <iframe
          src="/games-html/tetris.html"
          className="w-full h-screen border-0"
          title="Tetris Game"
        />
      </div>
    </div>
  );
}
