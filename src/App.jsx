import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLoginModal } from './components/AdminLoginModal';
import { subscribeToProducts, getLocalProducts } from './services/firebase';
import { MessageCircle } from 'lucide-react';
import { Toast } from './components/Toast';

export function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'admin' | 'product'
  const [products, setProducts] = useState(() => getLocalProducts());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [toast, setToast] = useState({ message: '', type: 'info' });

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return sessionStorage.getItem('gone_admin_auth') === 'true';
  });
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);

  // Handle URL route checking: support /admin or #admin
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const isTryingAdmin = path === '/admin' || hash === '#admin';
      const isTryingProduct = path.startsWith('/product/');

      if (isTryingAdmin) {
        const isAuth = sessionStorage.getItem('gone_admin_auth') === 'true';
        if (isAuth) {
          setCurrentView('admin');
        } else {
          setCurrentView('home');
          setShowAdminLoginModal(true);
        }
      } else if (isTryingProduct) {
        setCurrentView('product');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setCurrentView('home');
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  // Sync route change to browser history
  const navigateTo = (view) => {
    setCurrentView(view);
    if (view === 'admin') {
      window.history.pushState({}, '', '#admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', window.location.pathname);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Open secret admin login (triggered by 3 clicks on the logo)
  const handleOpenAdminLogin = () => {
    if (isAdminAuthenticated) {
      navigateTo('admin');
      showNotification('Opening Admin Dashboard...', 'info');
    } else {
      setShowAdminLoginModal(true);
    }
  };

  // On successful login with User ID: G1homedecor and Password: G1@home
  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setShowAdminLoginModal(false);
    navigateTo('admin');
    showNotification('Welcome back! Admin access granted.', 'success');
  };

  // Log out action
  const handleLogout = () => {
    sessionStorage.removeItem('gone_admin_auth');
    setIsAdminAuthenticated(false);
    navigateTo('home');
    showNotification('Admin safely logged out.', 'info');
  };

  // Real-time Firestore subscription
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToProducts(
      (updatedProducts) => {
        setProducts(updatedProducts);
        setLoading(false);
      },
      (err) => {
        console.warn('Subscription error handled:', err);
        setError(err.message);
        setLoading(false);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const showNotification = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'info' });
    }, 4500);
  };

  const whatsappDirectUrl = "https://wa.me/+918606854763?text=Hi%2C%20I%20have%20an%20inquiry%20about%20G%20One%20Home%20D%C3%A9cors.";

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#1F2421] selection:bg-[#C5A059]/20 selection:text-[#88652D]">
      {/* Global Navigation Header (Admin trigger hidden in logo - 3 clicks) */}
      <Header
        currentView={currentView}
        onOpenAdminLogin={handleOpenAdminLogin}
        onCategorySelect={(cat) => {
          setActiveCategory(cat);
          if (currentView !== 'home') navigateTo('home');
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {currentView === 'admin' && isAdminAuthenticated ? (
          <AdminDashboard
            products={products}
            onBackToStore={() => navigateTo('home')}
            onLogout={handleLogout}
            onNotify={showNotification}
          />
        ) : currentView === 'product' ? (
          <ProductPage
            products={products}
            onBack={() => navigateTo('home')}
          />
        ) : (
          <HomePage
            products={products}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            loading={loading}
            error={error}
          />
        )}
      </div>

      {/* Global Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          if (currentView !== 'home') navigateTo('home');
        }}
      />

      {/* Secret Admin Authentication Modal */}
      <AdminLoginModal
        isOpen={showAdminLoginModal}
        onClose={() => setShowAdminLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Persistent Floating WhatsApp Quick-Chat Action */}
      <aside aria-label="WhatsApp Quick Contact" className="fixed bottom-6 left-6 z-40">
        <a
          href={whatsappDirectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 hover:bg-[#20ba59] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/30"
          title="Direct WhatsApp Chat with G One Home Décors"
        >
          <MessageCircle className="w-5 h-5 fill-white shrink-0 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-xs font-bold tracking-wide hidden sm:inline pr-1">
            WhatsApp Us
          </span>
        </a>
      </aside>

      {/* Toast Feedback */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: '', type: 'info' })}
        />
      )}
    </div>
  );
}

export default App;