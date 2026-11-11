import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BrandSeal } from "@/components/Brand";
import { CONTACT } from "@/lib/contact";
import {
  WorkItem,
  getWorkItems,
} from "@/lib/workStorage";
import {
  Camera,
  Film,
  ExternalLink,
  Play,
  X,
  Sparkles,
  Calendar,
  MapPin,
} from "lucide-react";

type MediaTypeFilter = "all" | "photo" | "video";

export function OurWork() {
  const [items, setItems] = useState<WorkItem[]>([]);
  const [typeFilter, setTypeFilter] = useState<MediaTypeFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeLightbox, setActiveLightbox] = useState<WorkItem | null>(null);

  // Load items on mount and listen for real-time updates from admin panel
  useEffect(() => {
    setItems(getWorkItems());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<WorkItem[]>;
      if (customEvent.detail) {
        setItems(customEvent.detail);
      } else {
        setItems(getWorkItems());
      }
    };

    window.addEventListener("rannabati_work_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("rannabati_work_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Filter items
  const filteredItems = items.filter((item) => {
    if (typeFilter !== "all" && item.type !== typeFilter) return false;
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    return true;
  });

  const categories = [
    "all",
    "Wedding",
    "Reception",
    "Corporate",
    "Puja",
    "Live Counter",
  ];

  const photoCount = items.filter((i) => i.type === "photo").length;
  const videoCount = items.filter((i) => i.type === "video").length;

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800">
      <Navbar />

      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-primary pt-36 pb-20 text-center text-primary-foreground">
        {/* Subtle decorative background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-transparent to-transparent pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-5">
          <p className="font-semibold uppercase tracking-[0.3em] text-gold text-xs sm:text-sm">
            Portfolio & Celebrations
          </p>
          <h1 className="mt-4 font-cormorant text-4xl font-bold sm:text-5xl md:text-6xl tracking-tight text-white">
            Our Work
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg text-primary-foreground/85 leading-relaxed">
            A visual showcase of grand wedding feasts, royal banquet setups, and
            curated Bengali delicacies handcrafted across Kolkata and beyond.
          </p>

          {/* Counters */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur font-medium text-white/90 border border-white/15">
              <Camera className="h-3.5 w-3.5 text-gold" />
              {photoCount} Event Photos
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 backdrop-blur font-medium text-white/90 border border-white/15">
              <Film className="h-3.5 w-3.5 text-red-400" />
              {videoCount} YouTube Videos
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Navigation Bar */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between border-b border-slate-200/80 pb-6 mb-10">
          {/* Media Type Tabs (All / Photos / Videos) */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-200/70 border border-slate-300/60 self-start">
            <button
              type="button"
              onClick={() => setTypeFilter("all")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${typeFilter === "all"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
                }`}
            >
              <Sparkles className="h-4 w-4" />
              All Projects ({items.length})
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("photo")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${typeFilter === "photo"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
                }`}
            >
              <Camera className="h-4 w-4 text-gold" />
              Photos ({photoCount})
            </button>
            <button
              type="button"
              onClick={() => setTypeFilter("video")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-bold transition-all cursor-pointer ${typeFilter === "video"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
                }`}
            >
              <Film className="h-4 w-4 text-red-500" />
              Videos ({videoCount})
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
              Occasion:
            </span>
            {categories.map((cat) => {
              const active = categoryFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition-all cursor-pointer ${active
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                >
                  {cat === "all" ? "All Occasions" : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Work Grid */}
        {filteredItems.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center my-10">
            <Camera className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No projects found in this category
            </h3>
            <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
              Try selecting another filter or visit the Admin Panel to upload your
              latest wedding photos and YouTube event videos.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setTypeFilter("all");
                  setCategoryFilter("all");
                }}
                className="rounded-full bg-primary hover:bg-primary/90 px-6 py-2.5 text-xs font-bold text-white transition-colors cursor-pointer shadow"
              >
                Reset Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => {
              const isVideo = item.type === "video";

              return (
                <article
                  key={item.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                >
                  {/* Media Thumbnail Container */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                    <img
                      src={
                        isVideo
                          ? item.thumbnailUrl ||
                          (item.youtubeId
                            ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
                            : "")
                          : item.imageUrl
                      }
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                    {/* Category & Type Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                      <span className="rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-primary shadow-sm">
                        {item.category}
                      </span>
                      {isVideo && (
                        <span className="flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                          <Film className="h-3 w-3" />
                          YouTube
                        </span>
                      )}
                    </div>

                    {/* Video Center Play Button - Click opens YouTube directly */}
                    {isVideo ? (
                      <a
                        href={item.youtubeUrl || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center cursor-pointer group/play"
                        aria-label={`Watch ${item.title} on YouTube`}
                      >
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 text-white shadow-2xl transition-all duration-300 group-hover/play:scale-115 group-hover/play:bg-red-600">
                          <Play className="h-6 w-6 fill-white ml-0.5" />
                        </div>
                      </a>
                    ) : (
                      /* Photo Click opens Lightbox */
                      <button
                        type="button"
                        onClick={() => setActiveLightbox(item)}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 cursor-zoom-in"
                        aria-label="View full image"
                      >
                        <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-slate-800 shadow-lg">
                          <Camera className="h-3.5 w-3.5 text-primary" />
                          View Photo
                        </div>
                      </button>
                    )}

                    {/* Bottom Metadata inside thumbnail */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] text-white/90">
                      {item.location && (
                        <span className="flex items-center gap-1 truncate font-medium">
                          <MapPin className="h-3 w-3 text-gold shrink-0" />
                          {item.location}
                        </span>
                      )}
                      {item.date && (
                        <span className="flex items-center gap-1 shrink-0 font-medium ml-auto">
                          <Calendar className="h-3 w-3 text-white/70" />
                          {item.date}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-cormorant text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>

                    {item.description && (
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {/* Bottom Action */}
                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                      {isVideo ? (
                        <a
                          href={item.youtubeUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors"
                        >
                          <span>Watch on YouTube</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setActiveLightbox(item)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                        >
                          <span>Expand Full Photo</span>
                          <Camera className="h-3.5 w-3.5" />
                        </button>
                      )}

                      <span className="text-[11px] font-semibold text-slate-400 capitalize">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Planning a Feast Call-To-Action Banner */}
        <section className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-[#991b1b] to-primary p-8 sm:p-12 text-center text-white shadow-xl relative">
          <div className="relative z-10 mx-auto max-w-2xl">
            <span className="inline-block rounded-full bg-gold/20 border border-gold/40 px-4 py-1 text-xs font-bold uppercase tracking-widest text-gold mb-3">
              Book Your Date
            </span>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Planning a Grand Wedding or Celebration?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed">
              From traditional brass-degh cooking to luxury buffet counters, let
              Rannabati Catering craft an authentic Bengali culinary experience
              your guests will cherish.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/menu"
                className="rounded-full bg-gold hover:bg-gold/90 px-6 py-3 text-sm font-bold text-accent-foreground shadow-lg transition-transform hover:scale-105"
              >
                Build Your Own Menu
              </Link>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-white/10 hover:bg-white/20 border border-white/30 px-6 py-3 text-sm font-bold text-white transition-all backdrop-blur"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal for Photo expansion */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-slate-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors"
              aria-label="Close photo preview"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={activeLightbox.imageUrl}
              alt={activeLightbox.title}
              className="max-h-[75vh] w-full object-contain"
            />

            <div className="p-5 text-white bg-slate-900 border-t border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="rounded-full bg-primary/40 border border-primary/60 px-3 py-0.5 text-xs font-bold text-amber-300">
                  {activeLightbox.category}
                </span>
                <span className="text-xs text-slate-400">
                  {activeLightbox.date} {activeLightbox.location && `· ${activeLightbox.location}`}
                </span>
              </div>
              <h4 className="mt-2 text-lg font-bold text-white">
                {activeLightbox.title}
              </h4>
              {activeLightbox.description && (
                <p className="mt-1 text-xs sm:text-sm text-slate-300">
                  {activeLightbox.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 py-12 text-center bg-white">
        <BrandSeal />
        <p className="mt-5 text-sm text-muted-foreground">
          © {new Date().getFullYear()} Rannabati Catering · Kolkata
        </p>
      </footer>
    </div>
  );
}

