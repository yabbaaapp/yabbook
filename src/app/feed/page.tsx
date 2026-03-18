import Header from '@/components/layout/Header';

export default function Feed() {
  return (
    <>
      <Header title="Feed" />
      <main className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4 py-6">
        <div className="flex flex-col items-center justify-center h-full text-slate-500 gap-4 mt-20">
          <i className="fa-solid fa-house text-4xl mb-2 text-slate-700"></i>
          <h2 className="text-xl font-semibold text-slate-300">Your Feed</h2>
          <p className="text-sm text-center max-w-[250px]">
            Follow friends and communities to see their latest updates here.
          </p>
          <button className="mt-4 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full text-sm font-medium transition">
            Find Creators
          </button>
        </div>
      </main>
    </>
  );
}
