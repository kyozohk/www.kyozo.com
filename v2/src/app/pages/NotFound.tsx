import { Link } from "react-router";

export function NotFound() {
  return (
    <main className="max-w-[900px] mx-auto px-6 pt-20 pb-20 text-center">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="font-bold text-6xl text-[#4f4949] mb-4">404</h1>
        <h2 className="font-bold text-3xl text-[#4f4949] mb-6">Page Not Found</h2>
        <p className="text-xl text-[#6b6b6b] mb-8">
          The page you're looking for doesn't exist or is still being built.
        </p>
        <Link
          to="/"
          className="px-8 py-4 bg-[#3A3630] text-white rounded-full font-semibold hover:bg-[#4f4949] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
