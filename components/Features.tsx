const features = [
  { title: "Create Tasks", desc: "Add new tasks quickly and efficiently." },
  { title: "Track Progress", desc: "Monitor task status and deadlines easily." },
  { title: "Secure Login", desc: "JWT-based authentication for safety." },
  { title: "User-Friendly UI", desc: "Intuitive and responsive interface." },
]

export default function Features() {
  return (
    <section className="py-20 bg-white text-black">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 ">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, idx) => (
            <div key={idx} className="p-6 border rounded-lg shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}