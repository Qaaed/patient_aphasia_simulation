export default function Header() {
  return (
    <header className="bg-slate-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">
          Aphasia Patient Simulator
        </h1>
        <span className="text-sm text-slate-400">v1</span>
      </div>
    </header>
  );
}
