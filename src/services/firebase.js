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

// Default / fallback Firebase configuration template
export const getStoredFirebaseConfig = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Error reading stored Firebase config', e);
  }
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
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

// Initialize on module load if config exists
initFirebase();

// Local Storage Fallback Store (for immediate out-of-the-box working experience)
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
 * Falls back seamlessly to local storage / preloaded catalog
 */
export const subscribeToProducts = (onUpdate, onError) => {
  const db = initFirebase();

  if (!db) {
    // Deliver local products immediately
    const local = getLocalProducts();
    onUpdate(local);
    // Listen for storage events across tabs or local mutations
    const handleStorage = () => onUpdate(getLocalProducts());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }

  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        // If Firestore collection is empty, load initial default products
        const local = getLocalProducts();
        onUpdate(local);
      } else {
        const firestoreProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // format timestamp if needed
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt || new Date().toISOString()
        }));
        onUpdate(firestoreProducts);
      }
    }, (error) => {
      console.warn('Firestore subscription failed, falling back to local catalog:', error.message);
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
 * Add product to Firestore and sync local store
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

  // Always update local store for instant UI response
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
      // Still succeeded locally
      return localProduct;
    }
  }

  return localProduct;
};

/**
 * Delete product
 */
export const deleteProductFromFirestore = async (productId) => {
  const db = initFirebase();

  // Remove from local store
  const localList = getLocalProducts();
  const filtered = localList.filter(p => p.id !== productId);
  saveLocalProducts(filtered);

  if (db && !productId.startsWith('local-') && !productId.startsWith('prod-')) {
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
