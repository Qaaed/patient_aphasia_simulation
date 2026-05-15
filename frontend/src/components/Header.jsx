export default function Header() {
  return (
    <header className="bg-slate-950 p-4 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">
          Aphasia Patient Simulator
        </h1>
        <span className="rounded bg-teal-500/20 px-2 py-1 text-xs font-bold uppercase tracking-wide text-teal-100">
          Training v2
        </span>
      </div>
    </header>
  );
}
