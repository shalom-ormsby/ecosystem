export default function GalagaPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1">
        <iframe
          src="/games-html/galaga.html"
          className="w-full h-screen border-0"
          title="Galaga Game"
        />
      </div>
    </div>
  );
}
