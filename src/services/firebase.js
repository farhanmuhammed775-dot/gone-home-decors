import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';
import { DEFAULT_PRODUCTS } from '../data/defaultProducts';

const STORAGE_KEY_CONFIG = 'gone_firebase_config';
const STORAGE_KEY_PRODUCTS = 'gone_local_products';

// Default Live Firebase Configuration
export const getStoredFirebaseConfig = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && parsed.projectId) return parsed;
    }
  } catch (e) {
    console.warn('Error reading stored Firebase config', e);
  }
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDQgqC9CGBdtuPBajupMyklZivc1zXEyUk",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "gone-home-decors.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "gone-home-decors",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "gone-home-decors.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "422373063194",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:422373063194:web:970e0a78e2956ba8562fa3",
    databaseURL: "https://gone-home-decors-default-rtdb.asia-southeast1.firebasedatabase.app"
  };
};

export const saveFirebaseConfig = (config) => {
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
};

let dbInstance = null;

export const initFirebase = () => {
  const config = getStoredFirebaseConfig();
  if (!config.apiKey || !config.projectId) {
    return null;
  }
  try {
    const app = getApps().length === 0 ? initializeApp(config) : getApp();
    dbInstance = getFirestore(app);
    return dbInstance;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return null;
  }
};

// Initialize on module load
initFirebase();

// Local Storage Fallback Store
const getLocalProducts = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Error reading local products', e);
  }
  return DEFAULT_PRODUCTS;
};

const saveLocalProducts = (products) => {
  localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
};

/**
 * Real-time listener for products from Firebase Firestore
 */
export const subscribeToProducts = (onUpdate, onError) => {
  const db = initFirebase();

  if (!db) {
    const local = getLocalProducts();
    onUpdate(local);
    const handleStorage = () => onUpdate(getLocalProducts());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }

  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // If Firestore collection is empty, seed/display initial catalog
        const local = getLocalProducts();
        onUpdate(local);
      } else {
        const firestoreProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt || new Date().toISOString()
        }));
        onUpdate(firestoreProducts);
      }
    }, (error) => {
      console.warn('Firestore subscription notice, falling back to local catalog:', error.message);
      onUpdate(getLocalProducts());
      if (onError) onError(error);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up Firestore listener:', error);
    onUpdate(getLocalProducts());
    if (onError) onError(error);
    return () => {};
  }
};

/**
 * Add product to Firestore and sync across all devices
 */
export const addProductToFirestore = async (productData) => {
  const db = initFirebase();
  const newProduct = {
    ...productData,
    price: Number(productData.price) || 0,
    mrp: Number(productData.mrp) || Math.round(Number(productData.price) * 1.25),
    rating: productData.rating || 5.0,
    reviewsCount: productData.reviewsCount || 1,
    isFeatured: Boolean(productData.isFeatured),
    createdAt: serverTimestamp()
  };

  // Sync local store for instantaneous UI response
  const localList = getLocalProducts();
  const localProduct = {
    ...newProduct,
    id: 'local-' + Date.now(),
    createdAt: new Date().toISOString()
  };
  saveLocalProducts([localProduct, ...localList]);

  if (db) {
    try {
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      return { id: docRef.id, ...newProduct };
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      return localProduct;
    }
  }

  return localProduct;
};

/**
 * Update product in Firestore
 */
export const updateProductInFirestore = async (productId, updatedData) => {
  const db = initFirebase();
  const formattedData = {
    ...updatedData,
    price: Number(updatedData.price) || 0,
    mrp: Number(updatedData.mrp) || Math.round(Number(updatedData.price) * 1.25),
    rating: updatedData.rating || 5.0,
    reviewsCount: updatedData.reviewsCount || 1,
    isFeatured: Boolean(updatedData.isFeatured),
    updatedAt: serverTimestamp()
  };

  // Update local store
  const localList = getLocalProducts();
  const updatedList = localList.map(p => 
    p.id === productId ? { ...p, ...formattedData, updatedAt: new Date().toISOString() } : p
  );
  saveLocalProducts(updatedList);

  if (db && !productId.startsWith('local-')) {
    try {
      const docRef = doc(db, 'products', productId);
      await updateDoc(docRef, formattedData);
      return { id: productId, ...formattedData };
    } catch (error) {
      console.error('Error updating in Firestore:', error);
      return { id: productId, ...formattedData };
    }
  }

  return { id: productId, ...formattedData };
};

/**
 * Delete product from Firestore
 */
export const deleteProductFromFirestore = async (productId) => {
  const db = initFirebase();

  // Remove from local store
  const localList = getLocalProducts();
  const filtered = localList.filter(p => p.id !== productId);
  saveLocalProducts(filtered);

  if (db && !productId.startsWith('local-')) {
    try {
      await deleteDoc(doc(db, 'products', productId));
      return true;
    } catch (error) {
      console.error('Error deleting from Firestore:', error);
      return false;
    }
  }
  return true;
};