import React, { useState } from 'react';
import { 
  Upload, 
  PlusCircle, 
  Trash2, 
  Image as ImageIcon, 
  Settings, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  ArrowLeft, 
  Database, 
  Cloud, 
  Eye,
  RefreshCw,
  Sparkles,
  LogOut
} from 'lucide-react';
import { ADMIN_CATEGORIES } from '../data/categories';
import { addProductToFirestore, deleteProductFromFirestore, getStoredFirebaseConfig, saveFirebaseConfig, initFirebase } from '../services/firebase';
import { openCloudinaryWidget, uploadFileDirectly, getCloudinaryConfig, saveCloudinaryConfig } from '../services/cloudinary';
import { formatINR } from '../components/ProductCard';

export const AdminDashboard = ({ products, onBackToStore, onLogout, onNotify }) => {
  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(ADMIN_CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [material, setMaterial] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  // Upload & submission states
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);

  // Settings State
  const [firebaseConfig, setFirebaseConfig] = useState(getStoredFirebaseConfig());
  const [cloudinaryConfig, setCloudinaryConfig] = useState(getCloudinaryConfig());
  const isFirebaseConnected = Boolean(initFirebase());

  // Handle Cloudinary Official Widget
  const handleOpenCloudinaryWidget = () => {
    openCloudinaryWidget(
      (secureUrl) => {
        setImageUrl(secureUrl);
        onNotify('Media uploaded successfully to Cloudinary!', 'success');
      },
      (error) => {
        onNotify(error.message || 'Cloudinary widget upload failed', 'error');
      }
    );
  };

  // Handle direct file upload via Cloudinary REST API
  const handleDirectFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      const secureUrl = await uploadFileDirectly(file, (percent) => {
        setUploadProgress(percent);
      });
      setImageUrl(secureUrl);
      onNotify('Media uploaded to Cloudinary successfully!', 'success');
    } catch (err) {
      console.warn('Direct upload error:', err);
      // Create local object URL as fallback preview if cloud upload preset is pending
      const localPreview = URL.createObjectURL(file);
      setImageUrl(localPreview);
      onNotify('Preview loaded locally. Configure Cloudinary credentials in Settings for cloud sync.', 'info');
    } finally {
      setUploading(false);
    }
  };

  // Form Submit: Store metadata into Firebase Firestore
  const handleSubmitProduct = async (e) => {
    e.preventDefault();

    if (!title.trim() || !price || !category) {
      onNotify('Please fill in Product Title, Category, and Price', 'error');
      return;
    }

    setSubmitting(true);

    try {
      const productData = {
        title: title.trim(),
        category,
        price: Number(price),
        mrp: mrp ? Number(mrp) : Math.round(Number(price) * 1.25),
        description: description.trim() || 'Custom handcrafted luxury home decor piece by G One Home Décors.',
        image_url: imageUrl.trim() || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop',
        material: material.trim() || 'Grade-A Solid Wood & Brass',
        dimensions: dimensions.trim() || 'Bespoke Custom Measurements',
        isFeatured: Boolean(isFeatured),
        rating: 5.0,
        reviewsCount: 1
      };

      await addProductToFirestore(productData);

      if (isFirebaseConnected) {
        onNotify(`Product "${title}" published to Firebase Cloud & synced across all devices!`, 'success');
      } else {
        onNotify(`Product saved in this browser. Connect Firebase in API Settings to sync to your phone and all devices!`, 'info');
      }

      // Reset form
      setTitle('');
      setCategory(ADMIN_CATEGORIES[0]);
      setPrice('');
      setMrp('');
      setDescription('');
      setImageUrl('');
      setMaterial('');
      setDimensions('');
      setIsFeatured(false);
      setUploadProgress(0);
    } catch (err) {
      console.error('Error saving product:', err);
      onNotify('Failed to publish product. ' + err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  // Delete product from Firestore
  const handleDeleteProduct = async (productId, prodTitle) => {
    if (!window.confirm(`Are you sure you want to remove "${prodTitle}"?`)) return;

    try {
      await deleteProductFromFirestore(productId);
      onNotify(`Product "${prodTitle}" deleted from catalog.`, 'info');
    } catch (err) {
      onNotify('Failed to delete product: ' + err.message, 'error');
    }
  };

  // Save integration configs
  const handleSaveConfigs = () => {
    saveFirebaseConfig(firebaseConfig);
    saveCloudinaryConfig(cloudinaryConfig);
    setShowConfigModal(false);
    onNotify('Firebase & Cloudinary settings updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Top Breadcrumb & Action Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-gray-200/80 shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#121417] text-[#E8D3A2]">
                Admin Portal
              </span>
              <span className="text-xs text-gray-400 font-mono">/admin</span>
            </div>
            <h1 className="font-['Cinzel'] font-bold text-2xl sm:text-3xl text-gray-900">
              Product & Catalog Management
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Upload products to Cloudinary & sync directly into Firebase Firestore in real-time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowConfigModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Settings className="w-4 h-4 text-[#C5A059]" />
              <span>API Settings</span>
            </button>

            <button
              onClick={onBackToStore}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
              <span>Storefront</span>
            </button>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="Securely log out from admin panel"
            >
              <LogOut className="w-4 h-4 text-red-600" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Firebase Cloud Connection Status Banner */}
        {!isFirebaseConnected && (
          <div className="mb-8 p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm">Firebase Cloud Database Not Connected (Running in Local Mode)</p>
                <p className="text-amber-800 text-xs mt-1 leading-relaxed">
                  Products you add right now are only saved in this computer's browser memory and will <strong>NOT appear on your mobile phone or other devices</strong>. To sync across all devices, click <strong>API Settings</strong> and connect your Firebase project.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowConfigModal(true)}
              className="px-4 py-2 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs shrink-0 cursor-pointer shadow-sm transition-colors"
            >
              Connect Firebase Keys
            </button>
          </div>
        )}

        {/* 2-Column Layout: Form (Left) & Current Inventory (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* PRODUCT UPLOAD FORM (5 Columns) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-7 sticky top-28">
              
              <div className="flex items-center gap-3 pb-4 mb-5 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#FCF9F0] border border-[#EEDFA8] flex items-center justify-center text-[#88652D]">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-['Cinzel'] font-bold text-lg text-gray-900">
                    Add New Product
                  </h2>
                  <p className="text-xs text-gray-500">
                    Syncs to Firestore & updates User Page instantly
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmitProduct} className="space-y-4">
                
                {/* Product Title */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-['Cinzel']">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Royal Rosewood Dining Table"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>

                {/* Category Selection Dropdown */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-['Cinzel']">
                    Category Selection *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#C5A059] bg-white text-gray-800 cursor-pointer"
                  >
                    {ADMIN_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price (Numeric INR) & MRP */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-['Cinzel']">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      placeholder="e.g. 45000"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-['Cinzel']">
                      Original MRP (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      placeholder="e.g. 58000"
                      value={mrp}
                      onChange={(e) => setMrp(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>
                </div>

                {/* Media Upload: Cloudinary Integration */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-['Cinzel']">
                    Product Media (Cloudinary) *
                  </label>
                  
                  {/* Upload Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 mb-2">
                    {/* Official Cloudinary Widget Button */}
                    <button
                      type="button"
                      onClick={handleOpenCloudinaryWidget}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#121417] hover:bg-gray-800 text-[#E8D3A2] text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <Cloud className="w-4 h-4 text-[#C5A059]" />
                      <span>Cloudinary Widget</span>
                    </button>

                    {/* Direct File Picker */}
                    <label className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-gray-300 hover:border-[#C5A059] bg-white text-gray-700 text-xs font-semibold cursor-pointer transition-colors text-center">
                      <Upload className="w-4 h-4 text-[#C5A059]" />
                      <span>Upload File</span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleDirectFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Or Direct Image URL input */}
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="Or paste secure image/video URL directly..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none focus:border-[#C5A059]"
                    />
                  </div>

                  {/* Progress indicator */}
                  {uploading && (
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-[#C5A059] h-1.5 rounded-full transition-all duration-300" 
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1 text-right">Uploading: {uploadProgress}%</p>
                    </div>
                  )}

                  {/* Media Preview Box */}
                  {imageUrl && (
                    <div className="mt-2 relative rounded-xl overflow-hidden border border-[#C5A059]/40 bg-gray-50 max-h-36">
                      <img
                        src={imageUrl}
                        alt="Preview"
                        className="w-full h-32 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImageUrl('')}
                        className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 text-white hover:bg-black text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5 font-['Cinzel']">
                    Product Description *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide details about wood finish, design accents, and craftsmanship..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-gray-300 focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                {/* Additional Specs: Material & Dimensions */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Material / Wood Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kerala Teak Wood"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                      Dimensions / Size
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 72 x 36 x 30 Inches"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Featured Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#C5A059] rounded border-gray-300 focus:ring-[#C5A059]"
                  />
                  <label htmlFor="isFeatured" className="text-xs text-gray-700 font-medium cursor-pointer">
                    Mark as Featured Product (Highlight on Top)
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting || uploading}
                  className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#ECC872] via-[#C5A059] to-[#9A7B2C] text-[#121417] shadow-lg shadow-[#C5A059]/30 hover:shadow-xl hover:shadow-[#C5A059]/40 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2 mt-4"
                >
                  {submitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Saving to Firestore...</span>
                    </>
                  ) : (
                    <>
                      <PlusCircle className="w-4 h-4" />
                      <span>Publish to Firestore Catalog</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

          {/* CATALOG INVENTORY TABLE (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-gray-200/90 shadow-sm p-6 sm:p-7">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-gray-100">
                <div>
                  <h2 className="font-['Cinzel'] font-bold text-lg text-gray-900 flex items-center gap-2">
                    <span>Live Catalog Inventory</span>
                    <span className="text-xs font-mono font-normal bg-gray-100 px-2 py-0.5 rounded-full text-gray-600">
                      {products.length} Items
                    </span>
                  </h2>
                  <p className="text-xs text-gray-500">
                    Real-time list of products active in Firestore & User Storefront
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {isFirebaseConnected ? (
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      Firebase Cloud Synced
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full font-medium border border-amber-200">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      Local Demo Mode
                    </span>
                  )}
                </div>
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 text-gray-500 font-semibold uppercase tracking-wider border-b border-gray-200">
                    <tr>
                      <th className="py-3 px-3">Item</th>
                      <th className="py-3 px-3">Category</th>
                      <th className="py-3 px-3">Price</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-gray-50/80 transition-colors group">
                        
                        {/* Title & Thumbnail */}
                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.image_url || '/assets/logo.png'}
                              alt={prod.title}
                              className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                            />
                            <div className="max-w-[200px] sm:max-w-[260px]">
                              <p className="font-semibold text-gray-900 line-clamp-1 group-hover:text-[#88652D] transition-colors">
                                {prod.title}
                              </p>
                              <p className="text-[11px] text-gray-400 line-clamp-1">
                                {prod.material || 'Solid Hardwood'}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-3">
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase bg-gray-100 text-gray-700">
                            {prod.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-3.5 px-3">
                          <span className="font-bold text-gray-900">
                            {formatINR(prod.price)}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* WhatsApp Direct preview */}
                            <a
                              href={`https://wa.me/+918606854763?text=Hi%2C%20I%20would%20like%20to%20confirm%20an%20order%20for%20${encodeURIComponent(prod.title)}%20priced%20at%20${encodeURIComponent(formatINR(prod.price))}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                              title="Test WhatsApp Order Link"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            {/* Delete Action */}
                            <button
                              onClick={() => handleDeleteProduct(prod.id, prod.title)}
                              className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                              title="Delete from Firestore"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* CLOUDINARY & FIREBASE INTEGRATION MODAL */}
      {showConfigModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowConfigModal(false)}
        >
          <div 
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-[#C5A059]/40 shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <Settings className="w-5 h-5 text-[#C5A059]" />
                <h3 className="font-['Cinzel'] font-bold text-lg text-gray-900">
                  API & Cloud Configuration
                </h3>
              </div>
              <button 
                onClick={() => setShowConfigModal(false)}
                className="text-gray-400 hover:text-gray-700 text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-6">
              Enter your live Firebase Firestore and Cloudinary project credentials below. Settings are safely saved in local storage.
            </p>

            {/* Cloudinary Section */}
            <div className="mb-6 p-4 rounded-2xl bg-[#FCF9F0] border border-[#EEDFA8]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#88652D] font-['Cinzel'] mb-3 flex items-center gap-1.5">
                <Cloud className="w-4 h-4" /> Cloudinary Credentials
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Cloud Name</label>
                  <input
                    type="text"
                    placeholder="e.g. gonehomedecors"
                    value={cloudinaryConfig.cloudName}
                    onChange={(e) => setCloudinaryConfig({ ...cloudinaryConfig, cloudName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Upload Preset (Unsigned)</label>
                  <input
                    type="text"
                    placeholder="e.g. gone_preset or ml_default"
                    value={cloudinaryConfig.uploadPreset}
                    onChange={(e) => setCloudinaryConfig({ ...cloudinaryConfig, uploadPreset: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Firebase Section */}
            <div className="mb-6 p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 font-['Cinzel'] mb-3 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-[#C5A059]" /> Firebase Firestore Credentials
              </h4>
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">API Key</label>
                  <input
                    type="text"
                    placeholder="AIzaSy..."
                    value={firebaseConfig.apiKey}
                    onChange={(e) => setFirebaseConfig({ ...firebaseConfig, apiKey: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">Project ID</label>
                  <input
                    type="text"
                    placeholder="gone-home-decors"
                    value={firebaseConfig.projectId}
                    onChange={(e) => setFirebaseConfig({ ...firebaseConfig, projectId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-semibold mb-1">App ID</label>
                  <input
                    type="text"
                    placeholder="1:123456789:web:abcdef..."
                    value={firebaseConfig.appId}
                    onChange={(e) => setFirebaseConfig({ ...firebaseConfig, appId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveConfigs}
                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#121417] hover:bg-[#C5A059] hover:text-[#121417] text-white transition-all shadow-md"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
