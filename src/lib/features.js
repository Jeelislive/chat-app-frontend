import moment from "moment";

const fileFormat = (url ="") => {
    const fileExt = url.split(".").pop();

    if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
    return "video";

  if (fileExt === "mp3" || fileExt === "wav") return "audio";
  if (
    fileExt === "png" ||
    fileExt === "jpg" ||
    fileExt === "jpeg" ||
    fileExt === "gif"
  )
    return "image";

  return "file";
};

// Performance optimization: Cache last 7 days to avoid recalculation
let cachedLast7Days = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getLast7Days = () => {
  const now = Date.now();
  
  // Return cached result if still valid
  if (cachedLast7Days && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedLast7Days;
  }
  
  const last7Days = [];
  for (let i = 0; i < 7; i++) {
    const date = moment().subtract(i, "days");
    const dayName = date.format("dddd");
    last7Days.unshift(dayName);
  }
  
  // Cache the result
  cachedLast7Days = last7Days;
  cacheTimestamp = now;
  
  return last7Days;
}

// Performance optimization: Enhanced image transformation with WebP support and caching
const imageCache = new Map();
const MAX_CACHE_SIZE = 100;

const transformImage = (url = "", width = 100) => {
  if (!url) return "";
  
  // Check cache first
  const cacheKey = `${url}_${width}`;
  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }
  
  let transformedUrl = url;
  
  // Check if browser supports WebP (cached check)
  if (!window._supportsWebP) {
    window._supportsWebP = (() => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('webp') > -1;
    })();
  }
  
  // Optimize for Cloudinary
  if (url.includes('cloudinary.com')) {
    const format = window._supportsWebP ? 'webp' : 'auto';
    transformedUrl = `${url.split('/upload/').join(`/upload/w_${width},f_${format},q_auto,c_scale/`)}`;
  }
  // Optimize for other CDNs
  else if (url.includes('amazonaws.com') || url.includes('s3.')) {
    // Add query parameters for image optimization services
    transformedUrl = `${url}?w=${width}&q=80&f=auto`;
  }
  
  // Cache the result (with size limit)
  if (imageCache.size >= MAX_CACHE_SIZE) {
    const firstKey = imageCache.keys().next().value;
    imageCache.delete(firstKey);
  }
  imageCache.set(cacheKey, transformedUrl);
  
  return transformedUrl;
};

// Performance optimization: Enhanced localStorage with error handling and caching
const localStorageCache = new Map();

const getFromLocalStorage = (key) => {
  // Check in-memory cache first
  if (localStorageCache.has(key)) {
    return localStorageCache.get(key);
  }
  
  try {
    const item = localStorage.getItem(key);
    if (item) {
      const parsed = JSON.parse(item);
      // Cache in memory for faster subsequent access
      localStorageCache.set(key, parsed);
      return parsed;
    }
  } catch (error) {
    console.warn(`Error reading from localStorage for key: ${key}`, error);
  }
  return null;
};

const setToLocalStorage = (key, value) => {
  try {
    const stringified = JSON.stringify(value);
    localStorage.setItem(key, stringified);
    // Update in-memory cache
    localStorageCache.set(key, value);
  } catch (error) {
    console.warn(`Error writing to localStorage for key: ${key}`, error);
    // If localStorage is full, try to clear some space
    if (error.name === 'QuotaExceededError') {
      try {
        // Clear old cache entries
        localStorageCache.clear();
        localStorage.clear();
        localStorage.setItem(key, JSON.stringify(value));
        localStorageCache.set(key, value);
      } catch (retryError) {
        console.error('Failed to save to localStorage even after clearing:', retryError);
      }
    }
  }
};

// Updated function name for consistency
const dataOfLocalStorage = (key) => getFromLocalStorage(key);

export { fileFormat, transformImage, getLast7Days, dataOfLocalStorage, getFromLocalStorage, setToLocalStorage };