// frontend/src/pages/RoadmapPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  ThumbsUp,
  Star,
  Share2,
  Send,
  BookOpen,
} from "lucide-react";

function RoadmapPage() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/roadmaps");
        const data = await res.json();
        setRoadmaps(data);
        if (data.length > 0) setSelected(data[0]);
      } catch (error) {
        console.error("Error fetching roadmaps:", error);
      }
    };
    fetchRoadmaps();
  }, []);

  // search
  const filtered = roadmaps.filter((rm) =>
    rm.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full relative text-[#2F3E46] font-poppins overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-white">
        <div className="absolute top-20 left-32 w-72 h-72 bg-[#00FF7C]/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-32 w-80 h-80 bg-[#007755]/30 rounded-full blur-3xl"></div>
      </div>

      {/* Main Wrapper */}
      <div className="relative z-10 pt-28 px-6 pb-20 max-w-7xl mx-auto">
        {/* Page Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold mb-16 text-center tracking-tight"
        >
          <span className="bg-gradient-to-r from-[#00FF7C] to-[#007755] bg-clip-text text-transparent">
            ROADMAPS
          </span>
        </motion.h1>

        {roadmaps.length === 0 ? (
          <p className="text-center text-gray-500">No roadmaps found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1 space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search roadmap..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E7E7E3] focus:outline-none focus:border-[#00FF7C] bg-white/70 backdrop-blur-md text-sm"
                />
              </div>

              {/* Titles */}
              <div className="space-y-3">
                {filtered.map((rm) => (
                  <button
                    key={rm._id}
                    onClick={() => setSelected(rm)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition flex items-center gap-2 ${selected?._id === rm._id
                        ? "bg-[#00FF7C]/20 text-[#007755] border border-[#00FF7C]"
                        : "bg-white/60 hover:bg-white border border-[#E7E7E3]"
                      }`}
                  >
                    <BookOpen size={16} /> {rm.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Detail Section */}
            <div className="md:col-span-3">
              {selected && (
                <motion.div
                  key={selected._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="backdrop-blur-xl bg-white/40 border border-[#E7E7E3] rounded-2xl p-8 shadow-lg"
                >
                  {/* Roadmap Title */}
                  <h2 className="text-3xl font-bold text-[#09332C] mb-2 text-center">
                    {selected.title}
                  </h2>
                  <p className="text-center text-[#2F3E46] mb-4">
                    {selected.description}
                  </p>
                  <p className="text-xs text-center text-[#007755] font-medium mb-8">
                    <b className="text-[#09332C]">Category:</b>{" "}
                    {selected.category}
                  </p>

                  {/* Timeline */}
                  <div className="relative border-l-4 border-[#00FF7C] pl-6">
                    {["beginner", "intermediate", "advanced"].map(
                      (level) =>
                        selected.levels[level]?.length > 0 && (
                          <div key={level} className="mb-8">
                            <div className="flex items-center mb-4">
                              <span className="w-3 h-3 bg-[#00FF7C] rounded-full border-4 border-white shadow-md" />
                              <h3 className="ml-3 font-semibold text-[#007755] capitalize text-base">
                                {level}
                              </h3>
                            </div>

                            <ul className="space-y-3">
                              {selected.levels[level].map((step, index) => (
                                <li
                                  key={step._id || step.title}
                                  className="bg-white/60 backdrop-blur-md border border-[#E7E7E3] rounded-xl p-4 shadow-sm hover:shadow-md hover:border-[#00FF7C] transition"
                                >
                                  <div className="flex justify-between items-center">
                                    <a
                                      href={step.articleLink}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="text-[#09332C] font-medium hover:text-[#007755] transition"
                                    >
                                      {index + 1}. {step.title}
                                    </a>
                                    <span className="text-xs text-[#007755] font-medium">
                                      {level}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                    )}
                  </div>

                  {/* Engagement Section */}
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#E7E7E3]">
                    {/* <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1 text-[#007755] hover:text-[#09332C] transition text-sm font-medium">
                        <ThumbsUp size={16} /> Like
                      </button>
                      <button className="flex items-center gap-1 text-[#007755] hover:text-[#09332C] transition text-sm font-medium">
                        <Star size={16} /> Save
                      </button>
                      <button className="flex items-center gap-1 text-[#007755] hover:text-[#09332C] transition text-sm font-medium">
                        <Share2 size={16} /> Share
                      </button>
                    </div> */}
                    <button
                      onClick={() => navigate("/contact")}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#00FF7C] to-[#007755] text-white text-sm font-semibold shadow-md hover:scale-105 transition"
                    >
                      <Send size={16} /> Suggest a Roadmap
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoadmapPage;
