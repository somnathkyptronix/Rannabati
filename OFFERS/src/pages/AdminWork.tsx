import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BrandLockup } from "@/components/Brand";
import {
  WorkItem,
  getWorkItems,
  addWorkItem,
  deleteWorkItem,
  resetWorkItems,
  extractYouTubeId,
  getYouTubeThumbnail,
  compressImageFile,
} from "@/lib/workStorage";
import {
  Camera,
  Film,
  Upload,
  Trash2,
  ExternalLink,
  Plus,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Link as LinkIcon,
  Lock,
  LogOut,
  ShieldCheck,
} from "lucide-react";

type UploadMode = "photo" | "video";

export function AdminWork() {
  // Authentication state - persisted for current browser session
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("rannabati_admin_auth") === "true";
    }
    return false;
  });
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [items, setItems] = useState<WorkItem[]>([]);
  const [mode, setMode] = useState<UploadMode>("photo");
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form states for Photo Upload
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoCategory, setPhotoCategory] = useState<WorkItem["category"]>("Wedding");
  const [photoLocation, setPhotoLocation] = useState("");
  const [photoDate, setPhotoDate] = useState("");
  const [photoDesc, setPhotoDesc] = useState("");
  const [photoDataUrl, setPhotoDataUrl] = useState<string>("");
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states for YouTube Video
  const [videoUrl, setVideoUrl] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoCategory, setVideoCategory] = useState<WorkItem["category"]>("Wedding");
  const [videoLocation, setVideoLocation] = useState("");
  const [videoDate, setVideoDate] = useState("");
  const [videoDesc, setVideoDesc] = useState("");

  // Extracted YouTube Info
  const detectedYouTubeId = extractYouTubeId(videoUrl);
  const detectedYouTubeThumb = detectedYouTubeId
    ? getYouTubeThumbnail(detectedYouTubeId)
    : null;

  useEffect(() => {
    if (!isAuthenticated) return;
    setItems(getWorkItems());

    const handleUpdate = () => {
      setItems(getWorkItems());
    };
    window.addEventListener("rannabati_work_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("rannabati_work_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [isAuthenticated]);

  // Handle Login Authentication
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginUsername === "Admin" && loginPassword === "Admin@123") {
      setIsAuthenticated(true);
      sessionStorage.setItem("rannabati_admin_auth", "true");
      setLoginError("");
    } else {
      setLoginError("Invalid username or password. Please verify your credentials.");
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("rannabati_admin_auth");
    setLoginUsername("");
    setLoginPassword("");
    setLoginError("");
  };

  // Show temporary toast message
  const showToast = (text: string, type: "success" | "error" = "success") => {
    setStatusMessage({ text, type });
    setTimeout(() => {
      setStatusMessage(null);
    }, 4500);
  };

  // Handle Photo selection & compression
  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file (JPEG, PNG, WebP)", "error");
      return;
    }

    try {
      setIsProcessingPhoto(true);
      const compressed = await compressImageFile(file, 1200, 0.85);
      setPhotoDataUrl(compressed);
      if (!photoTitle) {
        const cleanName = file.name
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ");
        setPhotoTitle(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
      showToast("Photo processed and ready to upload!");
    } catch (err) {
      console.error(err);
      showToast("Error processing photo file. Try another image.", "error");
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  // Submit Photo
  const handlePhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoTitle.trim()) {
      showToast("Please enter a title for the photo project", "error");
      return;
    }
    if (!photoDataUrl) {
      showToast("Please choose or upload a photo image", "error");
      return;
    }

    addWorkItem({
      title: photoTitle.trim(),
      category: photoCategory,
      type: "photo",
      imageUrl: photoDataUrl,
      location: photoLocation.trim() || "Kolkata",
      date: photoDate.trim() || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      description: photoDesc.trim(),
    });

    // Reset Form
    setPhotoTitle("");
    setPhotoLocation("");
    setPhotoDate("");
    setPhotoDesc("");
    setPhotoDataUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";

    showToast("🎉 Photo successfully published to Our Work page!");
  };

  // Submit YouTube Video
  const handleVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) {
      showToast("Please paste a valid YouTube video link", "error");
      return;
    }

    const ytid = extractYouTubeId(videoUrl);
    if (!ytid) {
      showToast(
        "Could not detect YouTube video ID. Please ensure the link is a valid YouTube URL (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...)",
        "error"
      );
      return;
    }

    if (!videoTitle.trim()) {
      showToast("Please enter a title for this video project", "error");
      return;
    }

    addWorkItem({
      title: videoTitle.trim(),
      category: videoCategory,
      type: "video",
      youtubeUrl: videoUrl.trim(),
      youtubeId: ytid,
      thumbnailUrl: getYouTubeThumbnail(ytid),
      location: videoLocation.trim() || "Kolkata",
      date: videoDate.trim() || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      description: videoDesc.trim(),
    });

    // Reset Form
    setVideoUrl("");
    setVideoTitle("");
    setVideoLocation("");
    setVideoDate("");
    setVideoDesc("");

    showToast("🎉 YouTube video successfully published to Our Work page!");
  };

  // Delete an item
  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteWorkItem(id);
      showToast(`Removed "${title}" from portfolio.`);
    }
  };

  // Reset to default sample items
  const handleReset = () => {
    if (
      window.confirm(
        "Reset all projects to default sample catering portfolio? Any custom uploads will be replaced."
      )
    ) {
      resetWorkItems();
      showToast("Reset to default showcase portfolio.");
    }
  };

  // ==========================================
  // VIEW 1: LOGIN GATE IF NOT AUTHENTICATED
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Brand Logo Lockup */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <BrandLockup className="h-14 mx-auto" />
            </Link>
            <h1 className="mt-4 text-2xl font-extrabold text-slate-900 tracking-tight">
              Admin Portal Sign In
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Enter administrator credentials to manage portfolio projects
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xl">
            {loginError && (
              <div className="mb-5 flex items-center gap-2.5 rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs font-semibold text-red-800 animate-in fade-in duration-150">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Admin Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-slate-300 bg-white pl-4 pr-11 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-primary hover:bg-primary/95 text-white font-bold py-3.5 px-6 shadow-md transition-all hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <Lock className="h-4 w-4" />
                <span>Sign In to Admin Portal</span>
              </button>
            </form>

            <div className="mt-6 border-t border-slate-100 pt-5 text-center">
              <Link
                to="/"
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Return to public website
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: AUTHENTICATED ADMIN DASHBOARD
  // ==========================================
  const photoItems = items.filter((i) => i.type === "photo");
  const videoItems = items.filter((i) => i.type === "video");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <BrandLockup className="h-9 sm:h-10 flex items-center" />
            </Link>
            <div className="h-6 w-px bg-slate-200 hidden sm:block" />
            <div className="flex items-center gap-1.5 rounded-md bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 text-xs font-bold text-emerald-800 hidden sm:inline-flex">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <span>Admin Logged In</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/work"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary hover:bg-primary/90 px-4 py-2 text-xs sm:text-sm font-bold text-white shadow transition-all hover:scale-[1.02]"
            >
              <span>View "Our Work"</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-600 border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              title="Log out of Admin Portal"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Container */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Toast Alert */}
        {statusMessage && (
          <div
            className={`mb-6 flex items-center justify-between rounded-2xl p-4 shadow-lg text-sm font-semibold animate-in fade-in duration-200 ${
              statusMessage.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-red-50 text-red-900 border border-red-200"
            }`}
          >
            <div className="flex items-center gap-2.5">
              {statusMessage.type === "success" ? (
                <Check className="h-5 w-5 text-emerald-600" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600" />
              )}
              <span>{statusMessage.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setStatusMessage(null)}
              className="text-xs uppercase font-bold opacity-60 hover:opacity-100"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Dashboard Title & Stats Bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-6 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Project & Media Manager
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Upload wedding photos or paste YouTube video links. Any project you
              add here immediately displays on the public{" "}
              <Link to="/work" className="text-primary font-bold hover:underline">
                Our Work
              </Link>{" "}
              page.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
              <Camera className="h-3.5 w-3.5 text-gold" />
              {photoItems.length} Photos
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-white border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
              <Film className="h-3.5 w-3.5 text-red-500" />
              {videoItems.length} Videos
            </span>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 transition-colors cursor-pointer"
              title="Reset sample portfolio data"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          </div>
        </div>

        {/* Upload Action Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Upload Form Card (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm">
            {/* Mode Switcher Buttons */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {mode === "photo" ? "Upload Event Photo" : "Add YouTube Video Link"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose what type of project you want to publish
                </p>
              </div>

              <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setMode("photo")}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    mode === "photo"
                      ? "bg-white text-primary shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Camera className="h-3.5 w-3.5 text-gold" />
                  Photo
                </button>
                <button
                  type="button"
                  onClick={() => setMode("video")}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    mode === "video"
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Film className="h-3.5 w-3.5 text-red-500" />
                  YouTube Video
                </button>
              </div>
            </div>

            {/* FORM A: PHOTO UPLOAD */}
            {mode === "photo" && (
              <form onSubmit={handlePhotoSubmit} className="space-y-5">
                {/* Photo File Input / Dropzone */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Event Photo File *
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer ${
                      photoDataUrl
                        ? "border-emerald-400 bg-emerald-50/40"
                        : "border-slate-300 bg-slate-50/60 hover:bg-slate-100/70 hover:border-primary/50"
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoSelect}
                      className="hidden"
                    />

                    {photoDataUrl ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={photoDataUrl}
                          alt="Preview"
                          className="max-h-48 rounded-xl object-contain shadow-md mb-3"
                        />
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                          <Check className="h-4 w-4" />
                          Image Selected (Click to change photo)
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                          <Upload className="h-6 w-6" />
                        </div>
                        <p className="text-sm font-bold text-slate-800">
                          Click to browse or drag an image here
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          Supports JPEG, PNG, WebP · Automatically compressed
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={photoTitle}
                    onChange={(e) => setPhotoTitle(e.target.value)}
                    placeholder="e.g. Royal Wedding Buffet Spread at Nicco Park"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                {/* Category & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Occasion / Category
                    </label>
                    <select
                      value={photoCategory}
                      onChange={(e) =>
                        setPhotoCategory(e.target.value as WorkItem["category"])
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Reception">Reception</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Puja">Puja / Religious</option>
                      <option value="Live Counter">Live Counter</option>
                      <option value="Other">Other Event</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Location / Venue
                    </label>
                    <input
                      type="text"
                      value={photoLocation}
                      onChange={(e) => setPhotoLocation(e.target.value)}
                      placeholder="e.g. ITC Sonar, Kolkata"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Date / Month */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Date / Season
                  </label>
                  <input
                    type="text"
                    value={photoDate}
                    onChange={(e) => setPhotoDate(e.target.value)}
                    placeholder="e.g. November 2026"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Description / Menu Highlights (Optional)
                  </label>
                  <textarea
                    value={photoDesc}
                    onChange={(e) => setPhotoDesc(e.target.value)}
                    rows={2}
                    placeholder="e.g. Grand 10-course wedding buffet catering for 700 guests with live fish fry counter..."
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Submit Photo Button */}
                <button
                  type="submit"
                  disabled={isProcessingPhoto || !photoDataUrl}
                  className="w-full rounded-xl bg-primary hover:bg-primary/95 text-white font-bold py-3.5 px-6 shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Publish Photo to "Our Work"
                </button>
              </form>
            )}

            {/* FORM B: YOUTUBE VIDEO LINK UPLOAD */}
            {mode === "video" && (
              <form onSubmit={handleVideoSubmit} className="space-y-5">
                {/* YouTube Link Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Paste Any YouTube Video Link *
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="Paste e.g. https://www.youtube.com/watch?v=... or https://youtu.be/..."
                      className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      required
                    />
                    <LinkIcon className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-500">
                    Supports regular videos, YouTube shorts, mobile links, and embed links.
                  </p>
                </div>

                {/* Live YouTube Thumbnail Preview */}
                {detectedYouTubeId ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50/50 p-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-700 mb-2">
                      <Check className="h-4 w-4" />
                      YouTube Video Detected (ID: {detectedYouTubeId})
                    </div>
                    <div className="relative aspect-video max-w-sm rounded-xl overflow-hidden bg-black shadow">
                      <img
                        src={detectedYouTubeThumb || ""}
                        alt="YouTube Preview"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-xl">
                          <Film className="h-5 w-5 ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : videoUrl.trim() ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Please paste a valid YouTube video link.
                  </div>
                ) : null}

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Video Title *
                  </label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="e.g. Master Chef Live Shorshe Ilish Cooking Highlights"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>

                {/* Category & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Occasion / Category
                    </label>
                    <select
                      value={videoCategory}
                      onChange={(e) =>
                        setVideoCategory(e.target.value as WorkItem["category"])
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer"
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Reception">Reception</option>
                      <option value="Live Counter">Live Counter</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Puja">Puja / Religious</option>
                      <option value="Other">Other Event</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Location / Venue
                    </label>
                    <input
                      type="text"
                      value={videoLocation}
                      onChange={(e) => setVideoLocation(e.target.value)}
                      placeholder="e.g. South Kolkata Heritage Hall"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Date / Season
                  </label>
                  <input
                    type="text"
                    value={videoDate}
                    onChange={(e) => setVideoDate(e.target.value)}
                    placeholder="e.g. October 2026"
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Description / Highlights (Optional)
                  </label>
                  <textarea
                    value={videoDesc}
                    onChange={(e) => setVideoDesc(e.target.value)}
                    rows={2}
                    placeholder="e.g. Video showcasing fresh Bhetki fish fry live counter and grand dessert spread..."
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                {/* Submit YouTube Video Button */}
                <button
                  type="submit"
                  disabled={!detectedYouTubeId}
                  className="w-full rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-6 shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                >
                  <Film className="h-5 w-5" />
                  Publish YouTube Video to "Our Work"
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Instructions & Live Project Feed (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Tips Box */}
            <div className="rounded-3xl bg-amber-500/10 border border-amber-500/20 p-6">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                <Sparkles className="h-4 w-4 text-gold" />
                How it Works:
              </div>
              <ul className="mt-3 space-y-2 text-xs text-amber-950/80 leading-relaxed list-disc list-inside">
                <li>
                  <strong>Photos:</strong> Pick an image file from your computer or phone.
                  It will immediately appear on the "Our Work" gallery.
                </li>
                <li>
                  <strong>Videos:</strong> Simply paste any YouTube URL. The system
                  automatically retrieves the thumbnail. When guests click on the video,
                  they are smoothly redirected to YouTube.
                </li>
                <li>
                  <strong>Security:</strong> Accessible exclusively via <code>/admin</code> with your Admin credentials.
                </li>
              </ul>
            </div>

            {/* List of Published Work Items */}
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-base">
                  Published Projects ({items.length})
                </h3>
                <Link
                  to="/work"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  View Live <ExternalLink className="h-3 w-3" />
                </Link>
              </div>

              <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
                {items.length === 0 ? (
                  <p className="text-center text-xs text-slate-400 py-8">
                    No projects yet. Upload your first photo or video above!
                  </p>
                ) : (
                  items.map((item) => {
                    const isVideo = item.type === "video";
                    return (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 p-3 hover:bg-slate-50 transition-colors"
                      >
                        {/* Thumbnail */}
                        <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-200">
                          <img
                            src={
                              isVideo
                                ? item.thumbnailUrl ||
                                  `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
                                : item.imageUrl
                            }
                            alt=""
                            className="h-full w-full object-cover"
                          />
                          {isVideo && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                              <Film className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Title and Category */}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {item.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="rounded-md bg-white border border-slate-200 px-1.5 py-0.5 text-[10px] font-bold uppercase text-slate-600">
                              {item.category}
                            </span>
                            <span className="text-[10px] text-slate-400 truncate">
                              {item.date}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                          {isVideo ? (
                            <a
                              href={item.youtubeUrl || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                              title="Test YouTube Link"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          ) : (
                            <Link
                              to="/work"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-primary/10 hover:text-primary transition-colors"
                              title="View on Our Work"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                          )}

                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.title)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                            title="Delete this project"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
