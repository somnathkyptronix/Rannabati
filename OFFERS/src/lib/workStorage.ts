export interface WorkItem {
  id: string;
  title: string;
  category: "Wedding" | "Reception" | "Corporate" | "Puja" | "Live Counter" | "Other";
  type: "photo" | "video";
  imageUrl?: string;        // Base64 data URL or image link
  youtubeUrl?: string;      // The YouTube watch/share link
  youtubeId?: string;       // Extracted 11-char ID
  thumbnailUrl?: string;    // YouTube thumbnail or photo thumbnail
  location?: string;        // e.g. "Kolkata", "Salt Lake", "New Town"
  date?: string;            // e.g. "Winter 2026"
  description?: string;
  createdAt: number;
}

const STORAGE_KEY = "rannabati_our_work_items_v1";

// Helper to extract 11-char YouTube ID from any valid YouTube URL
export function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();
  // Handles youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID, youtube.com/shorts/ID, etc.
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const match = trimmed.match(regex);
  return match && match[1] ? match[1] : null;
}

// Generate thumbnail for YouTube ID
export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

// Default initial showcase projects with authentic Bengali catering events
export const defaultWorkItems: WorkItem[] = [
  {
    id: "work-sample-1",
    title: "Grand Bengali Wedding Feast at Nicco Park Banquets",
    category: "Wedding",
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    location: "Kolkata Banquets",
    date: "November 2026",
    description: "Full royal 12-course traditional Bengali wedding catering for 850 esteemed guests.",
    createdAt: 1731000000000,
  },
  {
    id: "work-sample-2",
    title: "Royal Wedding Reception Live Counter Highlights",
    category: "Reception",
    type: "video",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeId: "dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    location: "ITC Sonar Lawns, Kolkata",
    date: "October 2026",
    description: "Live Bhetki Fish Fry and Moghlai Kebab counters in full motion for an evening reception.",
    createdAt: 1730900000000,
  },
  {
    id: "work-sample-3",
    title: "Traditional Basanti Pulao & Kosha Mangsho Buffet Spread",
    category: "Wedding",
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80",
    location: "South Kolkata Heritage House",
    date: "October 2026",
    description: "Authentic slow-cooked Kosha Mangsho served in brass deghs alongside golden Basanti Pulao.",
    createdAt: 1730800000000,
  },
  {
    id: "work-sample-4",
    title: "Bespoke Corporate Gala Banquet for 400 Delegates",
    category: "Corporate",
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    location: "New Town Convention Centre",
    date: "September 2026",
    description: "Curated modern fusion appetisers paired with authentic Bengali thali main course banquet.",
    createdAt: 1730700000000,
  },
  {
    id: "work-sample-5",
    title: "Master Chef Live Mustard Shorshe Ilish Preparation",
    category: "Live Counter",
    type: "video",
    youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    youtubeId: "9bZkp7q19f0",
    thumbnailUrl: "https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg",
    location: "Ballygunge Cultural Celebration",
    date: "August 2026",
    description: "Padma Hilsa steamed fresh with freshly ground stone-pressed mustard and green chilies.",
    createdAt: 1730600000000,
  },
  {
    id: "work-sample-6",
    title: "Grand Durga Puja Bhog & Community Mahabhoj",
    category: "Puja",
    type: "photo",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    location: "Salt Lake City, Sector 1",
    date: "October 2026",
    description: "Pious pure vegetarian feast including Khichuri bhog, Labra, Beguni, and Chhanar Payesh.",
    createdAt: 1730500000000,
  },
];

// Load items from localStorage with fallback to default sample items
export function getWorkItems(): WorkItem[] {
  if (typeof window === "undefined") return defaultWorkItems;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultWorkItems));
      return defaultWorkItems;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return defaultWorkItems;
  } catch (err) {
    console.error("Failed to parse work items from localStorage:", err);
    return defaultWorkItems;
  }
}

// Save items to localStorage and dispatch custom event for instant cross-component updates
export function saveWorkItems(items: WorkItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("rannabati_work_updated", { detail: items }));
  } catch (err) {
    console.error("Failed to save work items to localStorage:", err);
  }
}

// Add a single item
export function addWorkItem(item: Omit<WorkItem, "id" | "createdAt">): WorkItem {
  const current = getWorkItems();
  const newItem: WorkItem = {
    ...item,
    id: "work-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
    createdAt: Date.now(),
  };
  const updated = [newItem, ...current];
  saveWorkItems(updated);
  return newItem;
}

// Delete an item by ID
export function deleteWorkItem(id: string): void {
  const current = getWorkItems();
  const updated = current.filter((item) => item.id !== id);
  saveWorkItems(updated);
}

// Reset to default sample items
export function resetWorkItems(): void {
  saveWorkItems(defaultWorkItems);
}

// Helper to resize/compress high-res image files to base64 so they store reliably in localStorage
export function compressImageFile(file: File, maxWidth = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(event.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error("Failed to load image for compression"));
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}

