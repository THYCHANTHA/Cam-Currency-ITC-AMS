import React, { useRef, useState, useCallback, useEffect } from "react";

import axios from "axios";
import {
  Camera,
  Upload,
  Video,
  RefreshCw,
  Wallet,
  ScanLine,
  XCircle,
  Menu,
  User,
  Users,
  Code,
  Activity,
  History,
  Sun,
  Moon,
  Database,
  CheckCircle,
  AlertTriangle,
  Linkedin,
  Globe,
  Zap,
  Info,
  ChevronRight,
  TrendingUp,
  Search,
  Download,
  Trash2,
  Image as ImageIcon,
  PlayCircle,
  Brain,
  ExternalLink,
  Github,
  ChevronLeft,
  LayoutGrid,
} from "lucide-react";

import thyProfile from "./assets/profile/professional profile body.png";
import lyhourProfile from "./assets/profile/photo_2026-01-11_15-30-13.jpg";
import dethProfile from "./assets/profile/deth.JPG";
import kimheangProfile from "./assets/profile/kimheang.jpg";
import lyhengProfile from "./assets/profile/lyheng.jpg";
import thaitheangProfile from "./assets/profile/thaitheang.jpg";

// --- Configuration ---
// --- Configuration ---
// In production, VITE_API_BASE_URL should be set (e.g. "https://api.yourdomain.com/api/v1")
const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const API_URL = `${BASE_URL}/detect/`;
const HISTORY_URL = `${BASE_URL}/history/`;
const DATABASE_URL = `${BASE_URL}/database/`;

// --- Components ---

const IntroOverlay = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-1000">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 animate-pulse tracking-tighter">
          CamCurrency
        </div>
      </div>
      <p className="mt-4 text-gray-400 font-mono text-sm tracking-[0.5em] uppercase animate-slide-up">
        AI-Powered Riel Detection
      </p>
      <div className="mt-8 w-48 h-1 bg-gray-900 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-progress"></div>
      </div>
    </div>
  );
};

const Modal = ({ children, onClose, title, theme }) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    onClick={onClose}
  >
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />
    <div
      className={`relative w-full max-w-4xl border rounded-3xl shadow-2xl overflow-hidden animate-slide-up ${
        theme === "dark"
          ? "bg-gray-900 border-white/10"
          : "bg-white border-gray-200"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`px-6 py-4 border-b flex justify-between items-center ${
          theme === "dark"
            ? "bg-white/5 border-white/10"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        <h3
          className={`text-xl font-bold flex items-center gap-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
        <button
          onClick={onClose}
          className={`p-2 rounded-full transition-colors ${
            theme === "dark"
              ? "hover:bg-white/10 text-gray-400 hover:text-white"
              : "hover:bg-gray-200 text-gray-500 hover:text-gray-900"
          }`}
        >
          <XCircle className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto max-h-[80vh]">{children}</div>
    </div>
  </div>
);

const NavButton = ({ active, onClick, icon: Icon, label, theme }) => (
  <button
    onClick={onClick}
    className={`relative group flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
      active
        ? "bg-blue-600/20 text-blue-500 ring-1 ring-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]"
        : theme === "dark"
        ? "text-gray-400 hover:text-white hover:bg-white/5"
        : "text-gray-500 hover:text-gray-900 hover:bg-black/5"
    }`}
  >
    <Icon
      className={`w-5 h-5 transition-transform duration-300 ${
        active ? "scale-110" : "group-hover:scale-110"
      }`}
    />
    <span className="font-medium text-sm">{label}</span>
    {active && (
      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]"></span>
    )}
  </button>
);

const StatCard = ({ title, value, icon: Icon, color, delay, theme }) => {
  const colors = {
    emerald: {
      bg: "bg-emerald-500/20",
      text: "text-emerald-500",
      glow: "bg-emerald-500/10",
      hoverGlow: "group-hover:bg-emerald-500/20",
    },
    blue: {
      bg: "bg-blue-500/20",
      text: "text-blue-500",
      glow: "bg-blue-500/10",
      hoverGlow: "group-hover:bg-blue-500/20",
    },
    purple: {
      bg: "bg-purple-500/20",
      text: "text-purple-500",
      glow: "bg-purple-500/10",
      hoverGlow: "group-hover:bg-purple-500/20",
    },
  };

  const c = colors[color] || colors.blue;

  return (
    <div
      className={`glass-card border p-6 rounded-2xl relative overflow-hidden group ${
        theme === "dark"
          ? "bg-white/5 border-white/10"
          : "bg-white/60 border-white/40 shadow-xl"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl transition-colors ${c.glow} ${c.hoverGlow}`}
      ></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p
              className={`text-sm font-medium uppercase tracking-wider ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {title}
            </p>
            <h3
              className={`text-3xl font-bold mt-1 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {value}
            </h3>
          </div>
          <div className={`p-3 rounded-xl ${c.bg} ${c.text}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

export default function App() {
  // Logic Refs & State
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const imgRef = useRef(null);
  const imageCanvasRef = useRef(null);

  const [introDone, setIntroDone] = useState(false);
  const [activeTab, setActiveTab] = useState("scanner");
  const [mode, setMode] = useState("image");
  const [theme, setTheme] = useState("dark");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [imgSrc, setImgSrc] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);
  const [dbStatus, setDbStatus] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Gallery State for Batch Uploads
  const [gallery, setGallery] = useState([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // --- Effects ---
  useEffect(() => {
    fetchHistory();
  }, []);

  // Gallery Navigation Effect
  useEffect(() => {
    if (gallery.length > 0 && gallery[galleryIndex]) {
      const current = gallery[galleryIndex];
      setImgSrc(current.src);
      setPredictions(current.detections);
      // Helper to redraw is triggered by img.onLoad
    }
  }, [galleryIndex, gallery]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // --- Logic Functions ---

  const fetchHistory = async () => {
    try {
      const res = await axios.get(HISTORY_URL);
      const mapped = res.data
        .map((item) => ({
          id: item.id,
          time: new Date(item.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          date: new Date(item.created_at).toLocaleDateString(),
          fullDate: new Date(item.created_at),
          value: item.total_amount,
          count: item.detections ? item.detections.length : 0,
          filename: item.filename,
          items: item.detections || [],
        }))
        .sort((a, b) => b.fullDate - a.fullDate);
      setHistory(mapped);
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  };

  const clearHistory = async (range) => {
    if (!confirm(`Clear ${range} records? This cannot be undone.`)) return;
    try {
      await axios.delete(`${HISTORY_URL}?range=${range}`);
      fetchHistory();
    } catch (err) {
      alert("Failed to clear history");
    }
  };

  const deleteRecord = (id, e) => {
    e.stopPropagation();
    setConfirmDeleteId(id);
  };

  const executeDelete = async () => {
    if (!confirmDeleteId) return;
    try {
      await axios.delete(`${HISTORY_URL}${confirmDeleteId}`);
      setHistory((prev) => prev.filter((item) => item.id !== confirmDeleteId));
      setConfirmDeleteId(null);
    } catch (err) {
      console.error("Failed to delete record:", err);
      alert("Failed to delete record.");
    }
  };

  const handlePrediction = async (payload, isStream = false) => {
    if (!isStream) setLoading(true);

    try {
      const formData = new FormData();

      if (payload instanceof File) {
        formData.append("file", payload);
      } else if (typeof payload === "string" && payload.startsWith("data:")) {
        const res = await fetch(payload);
        const blob = await res.blob();
        formData.append(
          "file",
          new File([blob], "capture.jpg", { type: "image/jpeg" })
        );
      } else if (payload instanceof Blob) {
        formData.append(
          "file",
          new File([payload], "stream.jpg", { type: "image/jpeg" })
        );
      }

      const url = isStream ? `${API_URL}?save=false` : API_URL;
      const response = await axios.post(url, formData);

      if (response.data.detections) {
        setPredictions(response.data.detections);
        setTotalValue(response.data.total_value);

        if (isStream) {
          drawHUD(response.data.detections, isStream);
        } else {
          // Final Capture Result
          // We DO NOT overwrite setImgSrc with the backend image anymore,
          // because we want to keep the clean original and draw our own cool HUD.

          /* 
          if (response.data.annotated_image) {
             setImgSrc(`data:image/jpeg;base64,${response.data.annotated_image}`);
          } 
          */

          // Trigger custom drawing for static images
          setTimeout(() => drawStaticHUD(response.data.detections), 100);

          fetchHistory();
          // Stop live streaming since we have a result
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (!isStream) setLoading(false);
    }
  };

  // Video Frame Loop
  const captureVideoFrame = () => {
    if (
      videoRef.current &&
      !videoRef.current.paused &&
      !videoRef.current.ended
    ) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0);

      canvas.toBlob(
        (blob) => {
          handlePrediction(blob, true);
        },
        "image/jpeg",
        0.7
      );

      // Throttled recursion for performance (e.g. 5fps)
      setTimeout(() => {
        requestAnimationFrame(captureVideoFrame);
      }, 200);
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setMode("image");
    setLoading(true);

    const newGallery = [];

    // Process all files
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        newGallery.push({
          src: URL.createObjectURL(file), // create local view url
          detections: res.data.detections,
          file: file,
        });
      } catch (err) {
        console.error("Error processing file:", file.name, err);
      }
    }

    if (newGallery.length > 0) {
      setGallery(newGallery);
      setGalleryIndex(0);
      setImgSrc(newGallery[0].src);
      setPredictions(newGallery[0].detections);
      fetchHistory(); // Sync history
    }

    setLoading(false);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
      setMode("video");
      setPredictions([]);
      setTotalValue(0);
    }
  };

  const drawHUD = (detections, isStream) => {
    const canvas = canvasRef.current;

    // Choose source element based on mode
    let sourceEl = null;
    if (mode === "video") sourceEl = videoRef.current;

    if (!canvas || !sourceEl) return;

    const ctx = canvas.getContext("2d");

    // Calculate Rendered Dimensions vs Intrinsic Dimensions
    // This solves the 'object-contain' letterboxing/pillarboxing issue
    const containerW = sourceEl.offsetWidth || sourceEl.width;
    const containerH = sourceEl.offsetHeight || sourceEl.height;
    const naturalW = sourceEl.videoWidth;
    const naturalH = sourceEl.videoHeight;

    if (!naturalW || !naturalH) return;

    const containerRatio = containerW / containerH;
    const imgRatio = naturalW / naturalH;

    let scale, offsetX, offsetY;

    if (imgRatio > containerRatio) {
      // Source is wider than container: Fills width
      scale = containerW / naturalW;
      offsetX = 0;
      offsetY = (containerH - naturalH * scale) / 2;
    } else {
      // Source is taller than container: Fills height
      scale = containerH / naturalH;
      offsetX = (containerW - naturalW * scale) / 2;
      offsetY = 0;
    }

    // Set canvas to match the DISPLAYED container size
    canvas.width = containerW;
    canvas.height = containerH;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach((det) => {
      // Transform Coordinates
      const [ox1, oy1, ox2, oy2] = det.bbox;

      const x1 = ox1 * scale + offsetX;
      const y1 = oy1 * scale + offsetY;
      const x2 = ox2 * scale + offsetX;
      const y2 = oy2 * scale + offsetY;

      const width = x2 - x1;
      const height = y2 - y1;

      // Modern Tech Corners
      const cornerLen = 20;
      const cornerRad = 4;
      ctx.lineJoin = "round";
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#00ff9d";
      ctx.shadowColor = "#00ff9d";
      ctx.shadowBlur = 10;

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(x1, y1 + cornerLen);
      ctx.lineTo(x1, y1 + cornerRad);
      ctx.arcTo(x1, y1, x1 + cornerLen, y1, cornerRad);
      ctx.lineTo(x1 + cornerLen, y1);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(x2 - cornerLen, y1);
      ctx.lineTo(x2 - cornerRad, y1);
      ctx.arcTo(x2, y1, x2, y1 + cornerLen, cornerRad);
      ctx.lineTo(x2, y1 + cornerLen);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(x2, y2 - cornerLen);
      ctx.lineTo(x2, y2 - cornerRad);
      ctx.arcTo(x2, y2, x2 - cornerLen, y2, cornerRad);
      ctx.lineTo(x2 - cornerLen, y2);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(x1 + cornerLen, y2);
      ctx.lineTo(x1 + cornerRad, y2);
      ctx.arcTo(x1, y2, x1, y2 - cornerLen, cornerRad);
      ctx.lineTo(x1, y2 - cornerLen);
      ctx.stroke();

      // Inner Label
      const label = `${det.class} ៛`;
      const conf = `${(det.confidence * 100).toFixed(0)}%`;

      ctx.font = "bold 14px Outfit, sans-serif";
      const labelMetrics = ctx.measureText(label);
      const confMetrics = ctx.measureText(conf);
      const totalWidth = labelMetrics.width + confMetrics.width + 20;

      // Label Background (Inside Box, Top-Left)
      const labelX = x1 + 5;
      const labelY = y1 + 5;
      const labelH = 24;

      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.beginPath();
      ctx.roundRect(labelX, labelY, totalWidth, labelH, 6);
      ctx.fill();

      // Border for Label
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0, 255, 157, 0.5)";
      ctx.stroke();

      // Text
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, labelX + 8, labelY + 17);

      ctx.fillStyle = "#00ff9d";
      ctx.fillText(conf, labelX + labelMetrics.width + 12, labelY + 17);
    });
  };

  // Static Image HUD Drawing (for Upload Mode)
  const drawStaticHUD = (detections) => {
    const canvas = imageCanvasRef.current;
    const img = imgRef.current;

    if (!canvas || !img) return;

    // We need to calculate the actual displayed size of the image within the object-contain container
    const containerW = img.width;
    const containerH = img.height;
    const naturalW = img.naturalWidth;
    const naturalH = img.naturalHeight;

    // Calculate aspect ratios
    const containerRatio = containerW / containerH;
    const imgRatio = naturalW / naturalH;

    let renderW, renderH, offsetX, offsetY, scale;

    if (imgRatio > containerRatio) {
      // Image is wider than container: Fills width
      renderW = containerW;
      scale = containerW / naturalW;
      renderH = naturalH * scale;
      offsetX = 0;
      offsetY = (containerH - renderH) / 2;
    } else {
      // Image is taller than container: Fills height
      renderH = containerH;
      scale = containerH / naturalH;
      renderW = naturalW * scale;
      offsetY = 0;
      offsetX = (containerW - renderW) / 2;
    }

    // Set canvas to match the CONTAINER size (since it overlays the container)
    canvas.width = containerW;
    canvas.height = containerH;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    detections.forEach((det) => {
      // Original coordinates
      const [ox1, oy1, ox2, oy2] = det.bbox;

      // Transform to Rendered coordinates
      const x1 = ox1 * scale + offsetX;
      const y1 = oy1 * scale + offsetY;
      const x2 = ox2 * scale + offsetX;
      const y2 = oy2 * scale + offsetY;

      // --- SAME DRAWING LOGIC AS drawHUD ---
      // Modern Tech Corners
      const cornerLen = 20;
      const cornerRad = 4;
      ctx.lineJoin = "round";
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#00ff9d";
      ctx.shadowColor = "#00ff9d";
      ctx.shadowBlur = 10;

      // Top-Left
      ctx.beginPath();
      ctx.moveTo(x1, y1 + cornerLen);
      ctx.lineTo(x1, y1 + cornerRad);
      ctx.arcTo(x1, y1, x1 + cornerLen, y1, cornerRad);
      ctx.lineTo(x1 + cornerLen, y1);
      ctx.stroke();

      // Top-Right
      ctx.beginPath();
      ctx.moveTo(x2 - cornerLen, y1);
      ctx.lineTo(x2 - cornerRad, y1);
      ctx.arcTo(x2, y1, x2, y1 + cornerLen, cornerRad);
      ctx.lineTo(x2, y1 + cornerLen);
      ctx.stroke();

      // Bottom-Right
      ctx.beginPath();
      ctx.moveTo(x2, y2 - cornerLen);
      ctx.lineTo(x2, y2 - cornerRad);
      ctx.arcTo(x2, y2, x2 - cornerLen, y2, cornerRad);
      ctx.lineTo(x2 - cornerLen, y2);
      ctx.stroke();

      // Bottom-Left
      ctx.beginPath();
      ctx.moveTo(x1 + cornerLen, y2);
      ctx.lineTo(x1 + cornerRad, y2);
      ctx.arcTo(x1, y2, x1, y2 - cornerLen, cornerRad);
      ctx.lineTo(x1, y2 - cornerLen);
      ctx.stroke();

      // Inner Label
      const label = `${det.class} ៛`;
      const conf = `${(det.confidence * 100).toFixed(0)}%`;

      ctx.font = "bold 14px Outfit, sans-serif";
      const labelMetrics = ctx.measureText(label);
      const confMetrics = ctx.measureText(conf);
      const totalWidth = labelMetrics.width + confMetrics.width + 20;

      const labelX = x1 + 5;
      const labelY = y1 + 5;
      const labelH = 24;

      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.beginPath();
      ctx.roundRect(labelX, labelY, totalWidth, labelH, 6);
      ctx.fill();

      // Border for Label
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0, 255, 157, 0.5)";
      ctx.stroke();

      // Text
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, labelX + 8, labelY + 17);

      ctx.fillStyle = "#00ff9d";
      ctx.fillText(conf, labelX + labelMetrics.width + 12, labelY + 17);
    });
  };

  // --- Render Views ---

  if (!introDone) return <IntroOverlay onComplete={() => setIntroDone(true)} />;

  return (
    <div
      className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${
        theme === "dark"
          ? "bg-[#050505] text-white selection:bg-blue-500/30"
          : "bg-[#eef2f6] text-slate-900 selection:bg-blue-500/20"
      }`}
    >
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={`absolute top-0 -left-1/4 w-1/2 h-1/2 rounded-full blur-[120px] animate-pulse transition-colors duration-700 ${
            theme === "dark" ? "bg-blue-600/10" : "bg-blue-400/20"
          }`}
        ></div>
        <div
          className={`absolute bottom-0 -right-1/4 w-1/2 h-1/2 rounded-full blur-[120px] animate-pulse transition-colors duration-700 ${
            theme === "dark" ? "bg-purple-600/10" : "bg-purple-400/20"
          }`}
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 ${
            theme !== "dark" && "invert opacity-10"
          }`}
        ></div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 inset-x-0 z-40 backdrop-blur-xl border-b transition-colors duration-500 ${
          theme === "dark"
            ? "bg-black/50 border-white/5"
            : "bg-white/70 border-white/40"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="relative group cursor-pointer"
              onClick={() => setActiveTab("scanner")}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-500"></div>
              <div
                className={`relative w-10 h-10 rounded-lg flex items-center justify-center border transition-colors ${
                  theme === "dark"
                    ? "bg-black border-white/10"
                    : "bg-white border-white/50"
                }`}
              >
                <span className="text-xl">💵</span>
              </div>
            </div>
            <div>
              <h1
                className={`text-xl font-bold tracking-tight ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                CamCurrency
              </h1>
              <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">
                Intelligent Scanner
              </p>
            </div>
          </div>

          <div
            className={`hidden md:flex items-center gap-2 p-1.5 rounded-2xl border transition-colors ${
              theme === "dark"
                ? "bg-white/5 border-white/5"
                : "bg-black/5 border-black/5"
            }`}
          >
            {[
              { id: "scanner", icon: Camera, label: "Scanner" },
              { id: "history", icon: History, label: "Analytics" },
              { id: "team", icon: Users, label: "Team" },
              { id: "model", icon: Brain, label: "Model" },
              { id: "system", icon: Database, label: "System" },
            ].map((item) => (
              <NavButton
                key={item.id}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
                icon={item.icon}
                label={item.label}
                theme={theme}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${
                theme === "dark"
                  ? "bg-white/10 hover:bg-white/20 text-yellow-400"
                  : "bg-black/5 hover:bg-black/10 text-slate-700"
              }`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <div className="hidden md:block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono animate-pulse">
              ● SYSTEM ONLINE
            </div>
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${
                theme === "dark"
                  ? "hover:bg-white/10 text-white"
                  : "hover:bg-gray-100 text-slate-900"
              }`}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div
            className={`md:hidden absolute top-20 left-0 right-0 border-b shadow-xl animate-slide-up ${
              theme === "dark"
                ? "bg-black/90 backdrop-blur-xl border-white/10"
                : "bg-white/90 backdrop-blur-xl border-gray-200"
            }`}
          >
            <div className="p-4 flex flex-col gap-2">
              {[
                { id: "scanner", icon: Camera, label: "Scanner" },
                { id: "history", icon: History, label: "Analytics" },
                { id: "team", icon: Users, label: "Team" },
                { id: "system", icon: Database, label: "System" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === item.id
                      ? "bg-blue-600/20 text-blue-500 border border-blue-500/20"
                      : theme === "dark"
                      ? "text-gray-400 hover:bg-white/5 active:bg-white/10"
                      : "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 pt-32 pb-20 relative z-10 min-h-screen">
        {/* SCANNER VIEW */}
        {activeTab === "scanner" && (
          <div className="animate-fade-in flex flex-col lg:flex-row gap-8">
            {/* Left: Scanner Interface */}
            <div className="flex-1 space-y-4">
              {/* Mode Selection Pills */}
              <div className="flex flex-wrap justify-center p-1 rounded-2xl bg-gray-500/10 backdrop-blur-sm self-center w-fit max-w-full mx-auto border border-white/10">
                {[
                  { id: "image", label: "Upload Image", icon: ImageIcon },
                  { id: "video", label: "Upload Video", icon: PlayCircle },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setMode(m.id);
                      setPredictions([]);
                      setImgSrc(null);
                      setVideoSrc(null);
                      setTotalValue(0);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      mode === m.id
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                    }`}
                  >
                    <m.icon className="w-4 h-4" />
                    {m.label}
                  </button>
                ))}
              </div>

              <div
                className={`glass-card border rounded-3xl p-1 relative overflow-hidden ring-1 group w-full md:w-1/2 mx-auto ${
                  theme === "dark"
                    ? "bg-black/40 border-white/10 ring-white/10"
                    : "bg-white border-white/60 ring-black/5 shadow-2xl"
                }`}
              >
                <div className="relative rounded-2xl overflow-hidden h-96 bg-black flex items-center justify-center">
                  {/* --- UPLOAD IMAGE MODE --- */}
                  {mode === "image" && (
                    <div className="relative w-full h-full group-hover:scale-[1.01] transition-transform duration-500 bg-black/5">
                      {imgSrc ? (
                        <>
                          <img
                            ref={imgRef}
                            src={imgSrc}
                            alt="Captured"
                            className="w-full h-full object-contain"
                            onLoad={() => {
                              if (predictions.length > 0)
                                drawStaticHUD(predictions);
                            }}
                          />
                          <canvas
                            ref={imageCanvasRef}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                          />

                          {/* Navigation Controls */}
                          {gallery.length > 1 && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setGalleryIndex((prev) =>
                                    prev === 0 ? gallery.length - 1 : prev - 1
                                  );
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur transition z-20"
                              >
                                <ChevronLeft className="w-6 h-6" />
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setGalleryIndex((prev) =>
                                    prev === gallery.length - 1 ? 0 : prev + 1
                                  );
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur transition z-20"
                              >
                                <ChevronRight className="w-6 h-6" />
                              </button>

                              <div className="absolute top-4 inset-x-0 flex justify-center z-20">
                                <span className="bg-black/60 text-white px-3 py-1 rounded-full text-xs font-mono backdrop-blur">
                                  {galleryIndex + 1} / {gallery.length}
                                </span>
                              </div>
                            </>
                          )}

                          <button
                            onClick={() => {
                              setImgSrc(null);
                              setPredictions([]);
                              setGallery([]);
                            }}
                            className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur rounded-full hover:bg-white/10 transition z-30"
                          >
                            <XCircle className="w-6 h-6 text-white" />
                          </button>
                        </>
                      ) : (
                        <div
                          className="flex flex-col items-center justify-center h-full w-full cursor-pointer hover:bg-white/5 transition"
                          onClick={() => fileInputRef.current.click()}
                        >
                          <div className="p-3 rounded-full bg-white/5 mb-3 group-hover:scale-110 transition">
                            <Upload className="w-6 h-6 text-blue-500" />
                          </div>
                          <p className="text-sm font-medium text-gray-400">
                            Click to Upload Image
                          </p>
                          <p className="text-xs text-gray-600">
                            Supports JPG, PNG
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* --- VIDEO MODE --- */}
                  {mode === "video" && (
                    <div className="relative w-full h-full bg-black/5">
                      {videoSrc ? (
                        <>
                          <video
                            ref={videoRef}
                            src={videoSrc}
                            className="w-full h-full object-contain"
                            controls
                            onPlay={captureVideoFrame}
                            crossOrigin="anonymous"
                          />
                          <canvas
                            ref={canvasRef}
                            className="absolute inset-0 w-full h-full pointer-events-none"
                          />
                          <button
                            onClick={() => {
                              setVideoSrc(null);
                              setPredictions([]);
                            }}
                            className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur rounded-full hover:bg-white/10 transition z-50"
                          >
                            <XCircle className="w-6 h-6 text-white" />
                          </button>
                        </>
                      ) : (
                        <div
                          className="flex flex-col items-center justify-center h-full w-full cursor-pointer hover:bg-white/5 transition"
                          onClick={() => videoInputRef.current.click()}
                        >
                          <div className="p-6 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition">
                            <PlayCircle className="w-12 h-12 text-purple-500" />
                          </div>
                          <p className="text-lg font-medium text-gray-400">
                            Click to Upload Video
                          </p>
                          <p className="text-sm text-gray-600">
                            Supports MP4, WebM
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Hidden Inputs */}
              {/* Hidden Inputs */}
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <input
                type="file"
                ref={videoInputRef}
                onChange={handleVideoUpload}
                accept="video/*"
                className="hidden"
              />
            </div>
          </div>
        )}
        {/* ANALYTICS / HISTORY VIEW */}
        {activeTab === "history" && (
          <div className="animate-fade-in space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
              <div>
                <h2
                  className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                    theme === "dark"
                      ? "from-white to-gray-500"
                      : "from-slate-900 to-slate-500"
                  }`}
                >
                  Analytics
                </h2>
                <p className="text-gray-500 mt-2">
                  Comprehensive breakdown of your session data.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => clearHistory("today")}
                  className={`px-4 py-2 text-sm rounded-lg border transition ${
                    theme === "dark"
                      ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                      : "bg-white hover:bg-gray-50 border-gray-200 text-slate-700"
                  }`}
                >
                  Clear Today
                </button>
                <button
                  onClick={() => clearHistory("all")}
                  className="px-4 py-2 text-sm bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg border border-red-500/20 transition"
                >
                  Delete All
                </button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Total Detected"
                value={`${history
                  .reduce((acc, curr) => acc + curr.value, 0)
                  .toLocaleString()} ៛`}
                icon={Wallet}
                color="emerald"
                delay={0}
                theme={theme}
              />
              <StatCard
                title="Scans Performed"
                value={history.length}
                icon={ScanLine}
                color="blue"
                delay={100}
                theme={theme}
              />
              <StatCard
                title="Avg. Value"
                value={`${Math.round(
                  history.length
                    ? history.reduce((acc, curr) => acc + curr.value, 0) /
                        history.length
                    : 0
                ).toLocaleString()} ៛`}
                icon={TrendingUp}
                color="purple"
                delay={200}
                theme={theme}
              />
            </div>

            {/* Grid of Records */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
              {history.map((record, idx) => (
                <div
                  key={record.id}
                  onClick={() => setSelectedRecord(record)}
                  className={`group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-slide-up ${
                    theme === "dark"
                      ? "bg-gray-900 border border-white/10 hover:border-blue-500/50"
                      : "bg-white border border-gray-200 hover:border-blue-400 shadow-lg"
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <img
                    src={`http://localhost:8000/results/verified_${record.filename}`}
                    onError={(e) =>
                      (e.target.src =
                        "https://via.placeholder.com/300x400?text=Scan")
                    }
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                  <button
                    onClick={(e) => deleteRecord(record.id, e)}
                    className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 scale-90 hover:scale-110"
                    title="Delete Record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent">
                    <p className="text-emerald-400 font-bold text-xl">
                      {record.value.toLocaleString()} ៛
                    </p>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-xs text-gray-400">{record.time}</p>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white">
                        {record.count} items
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* TEAM VIEW */}
        {activeTab === "team" && (
          <div className="animate-fade-in py-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-6">
                The Architects
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Built with precision and passion by the engineering students of
                Institute of Technology of Cambodia.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: "THY CHANTHA",
                  role: "Team Leader",
                  img: thyProfile,
                  desc: (
                    <span>
                      System Architecture, Model Training (YOLOv8), Backend
                      (FastAPI), DevOps (Docker/VPS).{" "}
                      <a
                        href="https://thychantha.wuaze.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        thychantha.wuaze.com
                      </a>
                    </span>
                  ),
                },
                {
                  name: "Roeun Sovandeth",
                  role: "Frontend Dev",
                  img: dethProfile,
                  desc: "React UI, Webcam Integration, Tailwind CSS Design",
                },
                {
                  name: "San Kimheang",
                  role: "Database Eng.",
                  img: kimheangProfile,
                  desc: "PostgreSQL Schema, Data Persistence, Analytics queries",
                },
                {
                  name: "Taing Thaitheang",
                  role: "Logic Designer",
                  img: thaitheangProfile,
                  desc: "Calculator Algorithm, Business Logic flow",
                },
                {
                  name: "Sem Yuthearylyhour",
                  role: "API Dev",
                  img: lyhourProfile,
                  desc: "API Endpoints implementation, Integration Testing",
                },
                {
                  name: "Siv Lyheng",
                  role: "QA & DevOps",
                  img: lyhengProfile,
                  desc: "Quality Assurance, Documentation, Deployments",
                },
              ].map((member, i) => (
                <div
                  key={i}
                  className="group relative"
                  onClick={() => setSelectedTeamMember(member)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  <div
                    className={`relative glass-card border rounded-3xl p-8 text-center h-full transition flex flex-col items-center cursor-pointer ${
                      theme === "dark"
                        ? "bg-black/40 border-white/10 hover:bg-black/60"
                        : "bg-white/80 border-white/60 shadow-xl hover:bg-white"
                    }`}
                  >
                    <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-6">
                      <img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-full rounded-full object-cover border-4 border-black"
                      />
                    </div>
                    <h3
                      className={`text-xl font-bold mb-1 ${
                        theme === "dark" ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {member.name}
                    </h3>
                    <p className="text-blue-500 font-medium text-sm mb-4 uppercase tracking-widest">
                      {member.role}
                    </p>
                    <p
                      className={`text-sm leading-relaxed ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {member.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* SYSTEM VIEW */}
        {activeTab === "system" && (
          <div className="max-w-2xl mx-auto animate-slide-up">
            <div
              className={`border rounded-3xl p-8 ${
                theme === "dark"
                  ? "bg-white/5 border-white/10"
                  : "bg-white border-gray-200 shadow-xl"
              }`}
            >
              <h2
                className={`text-2xl font-bold mb-6 flex items-center gap-3 ${
                  theme === "dark" ? "text-white" : "text-slate-900"
                }`}
              >
                <Database className="w-6 h-6 text-purple-500" />
                System Status
              </h2>

              <div className="space-y-4">
                <div
                  className={`p-4 rounded-xl border flex justify-between items-center ${
                    theme === "dark"
                      ? "bg-black/40 border-white/10"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <span className="text-gray-500">API Endpoint</span>
                  <code
                    className={`text-sm px-2 py-1 rounded text-blue-500 ${
                      theme === "dark"
                        ? "bg-white/10"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    {API_URL}
                  </code>
                </div>

                <div
                  className={`p-4 rounded-xl border flex justify-between items-center ${
                    theme === "dark"
                      ? "bg-black/40 border-white/10"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <span className="text-gray-500">Database Connection</span>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        dbStatus === "connected" ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span
                      className={
                        dbStatus === "connected"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {dbStatus === "connected" ? "Active" : "Offline"}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    onClick={async () => {
                      try {
                        await axios.get(DATABASE_URL);
                        setDbStatus("connected");
                      } catch (e) {
                        setDbStatus("error");
                      }
                    }}
                    className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition"
                  >
                    Run Diagnostics
                  </button>
                  <button
                    onClick={() =>
                      // API_URL is .../api/v1/detect/
                      // We want root URL + /docs -> http://localhost:8000/docs
                      window.open(new URL(API_URL).origin + "/docs", "_blank")
                    }
                    className={`px-6 py-3 border rounded-xl font-bold transition flex items-center gap-2 ${
                      theme === "dark"
                        ? "bg-white/5 hover:bg-white/10 border-white/10 text-white"
                        : "bg-white hover:bg-gray-50 border-gray-200 text-slate-700"
                    }`}
                  >
                    <Code className="w-4 h-4" /> API Docs
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* MODEL RESOURCES VIEW */}
        {activeTab === "model" && (
          <div className="animate-fade-in max-w-6xl mx-auto py-12">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 mb-6">
                Model Resources
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Access the underlying data, source code, and training results
                that power CamCurrency.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Dataset Card */}
              <div
                onClick={() =>
                  window.open(
                    "https://www.kaggle.com/datasets/thychantha/khmer-currency-itc-ams-gen2-c",
                    "_blank"
                  )
                }
                className={`group cursor-pointer relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white border-gray-200 shadow-xl hover:shadow-2xl"
                }`}
              >
                <div className="absolute top-8 right-8">
                  <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                  <Database className="w-8 h-8" />
                </div>
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Training Dataset
                </h3>
                <p
                  className={`mb-6 leading-relaxed ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  The comprehensive Khmer Currency Image Dataset (Gen 2) used to
                  train our YOLOv8 model. Hosted on Kaggle.
                </p>
                <span className="text-blue-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  View on Kaggle <ChevronRight className="w-4 h-4" />
                </span>
              </div>

              {/* Model Result Card */}
              <div
                onClick={() =>
                  window.open(
                    "https://drive.google.com/file/d/12oVjM48fQl-_S7uxk6j6WvM0cFxM9HVT/view?usp=sharing",
                    "_blank"
                  )
                }
                className={`group cursor-pointer relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white border-gray-200 shadow-xl hover:shadow-2xl"
                }`}
              >
                <div className="absolute top-8 right-8">
                  <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-purple-500 transition-colors" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                  <Activity className="w-8 h-8" />
                </div>
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Model Performance
                </h3>
                <p
                  className={`mb-6 leading-relaxed ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Detailed evaluation metrics (F1-score, mAP, Confusion Matrix)
                  and validation results.
                </p>
                <span className="text-purple-500 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                  View Report <ChevronRight className="w-4 h-4" />
                </span>
              </div>

              {/* GitHub Card */}
              <div
                onClick={() =>
                  window.open(
                    "https://github.com/THYCHANTHA/Cam-Currency-ITC-AMS",
                    "_blank"
                  )
                }
                className={`group cursor-pointer relative p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/10"
                    : "bg-white border-gray-200 shadow-xl hover:shadow-2xl"
                }`}
              >
                <div className="absolute top-8 right-8">
                  <ExternalLink className="w-6 h-6 text-gray-400 group-hover:text-gray-200 transition-colors" />
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gray-500/10 flex items-center justify-center mb-6 text-gray-400 group-hover:scale-110 transition-transform">
                  <Github className="w-8 h-8" />
                </div>
                <h3
                  className={`text-2xl font-bold mb-3 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Source Code
                </h3>
                <p
                  className={`mb-6 leading-relaxed ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Explore the full codebase, including the FastAPI backend,
                  React frontend, and training scripts.
                </p>
                <span className="text-gray-400 font-medium flex items-center gap-2 group-hover:gap-3 transition-all group-hover:text-white">
                  View on GitHub <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal for viewing details */}
      {selectedRecord && (
        <Modal
          title={`Scan: ${selectedRecord.time} • ${selectedRecord.date}`}
          onClose={() => setSelectedRecord(null)}
          theme={theme}
        >
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <img
                src={`http://localhost:8000/results/verified_${selectedRecord.filename}`}
                className="w-full rounded-xl border border-white/10"
                alt="Detail"
              />
            </div>
            <div className="lg:w-1/3 space-y-6">
              <div
                className={`p-6 rounded-2xl border ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <p className="text-gray-500 text-sm uppercase tracking-wider mb-1">
                  Total Value
                </p>
                <p className="text-4xl font-bold text-emerald-500">
                  {selectedRecord.value.toLocaleString()} ៛
                </p>
              </div>

              <div>
                <h4
                  className={`font-bold mb-3 flex items-center gap-2 ${
                    theme === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  <ScanLine className="w-4 h-4 text-blue-500" /> Detected Items
                </h4>
                <div className="space-y-2">
                  {selectedRecord.items.map((item, i) => (
                    <div
                      key={i}
                      className={`flex justify-between p-3 rounded-lg text-sm ${
                        theme === "dark"
                          ? "bg-white/5"
                          : "bg-gray-50 border border-gray-100"
                      }`}
                    >
                      <span className="text-gray-500">Khmer Riel Note</span>
                      <span
                        className={`font-mono font-bold ${
                          theme === "dark" ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {item.class} ៛
                      </span>
                    </div>
                  ))}
                  {selectedRecord.items.length === 0 && (
                    <p className="text-gray-500 italic">
                      No individual items recorded.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal for viewing Team Member */}
      {selectedTeamMember && (
        <Modal
          title={selectedTeamMember.name}
          onClose={() => setSelectedTeamMember(null)}
          theme={theme}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="md:w-1/2">
              <img
                src={selectedTeamMember.img}
                alt={selectedTeamMember.name}
                className="w-full rounded-2xl shadow-2xl border-4 border-white/10"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <div>
                <h3
                  className={`text-3xl font-bold mb-2 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {selectedTeamMember.name}
                </h3>
                <p className="text-blue-500 font-bold text-lg uppercase tracking-wider">
                  {selectedTeamMember.role}
                </p>
              </div>

              <div
                className={`p-6 rounded-2xl border ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <h4 className="text-gray-500 text-sm uppercase tracking-wider mb-2">
                  Role & Responsibilities
                </h4>
                <p
                  className={`text-lg leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {selectedTeamMember.desc}
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Modal for Deletion */}
      {confirmDeleteId && (
        <Modal
          title="Confirm Deletion"
          onClose={() => setConfirmDeleteId(null)}
          theme={theme}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/20">
              <AlertTriangle className="w-8 h-8" />
              <div>
                <h4 className="font-bold text-lg">Are you sure?</h4>
                <p className="text-sm opacity-90">
                  This action cannot be undone. This record will be permanently
                  deleted.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  theme === "dark"
                    ? "bg-white/10 hover:bg-white/20 text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                Cancel
              </button>
              <button
                onClick={executeDelete}
                className="px-4 py-2 rounded-lg font-medium bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30 transition transform hover:scale-105"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
