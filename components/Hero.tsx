export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-100 to-blue-50 py-20">
      <div className="container mx-auto text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Manage Your Tasks Effortlessly
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          Organize, track, and complete your tasks seamlessly.
        </p>
        <a
          href="/register"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  )
}