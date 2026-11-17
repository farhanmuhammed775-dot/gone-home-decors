const STORAGE_KEY_CLOUDINARY = 'gone_cloudinary_config';

export const getCloudinaryConfig = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_CLOUDINARY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Error reading stored Cloudinary config', e);
  }
  return {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'y702lxik',
    // 'ml_default' is a SIGNED preset — replace with your unsigned preset name in API Settings
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'ml_default',
    apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || ''
  };
};

export const saveCloudinaryConfig = (config) => {
  localStorage.setItem(STORAGE_KEY_CLOUDINARY, JSON.stringify(config));
};

/**
 * Wait for the Cloudinary widget script to finish loading (up to 8 seconds).
 * Returns true if loaded, false if timed out.
 */
const waitForCloudinaryWidget = (timeoutMs = 8000) =>
  new Promise((resolve) => {
    if (typeof window.cloudinary !== 'undefined') {
      resolve(true);
      return;
    }
    const start = Date.now();
    const check = () => {
      if (typeof window.cloudinary !== 'undefined') {
        resolve(true);
      } else if (Date.now() - start >= timeoutMs) {
        resolve(false);
      } else {
        setTimeout(check, 150);
      }
    };
    check();
  });

/**
 * Open Cloudinary Official Upload Widget
 */
export const openCloudinaryWidget = async (onSuccess, onError) => {
  const config = getCloudinaryConfig();

  // Wait for the deferred script to be ready before giving up
  const ready = await waitForCloudinaryWidget(8000);
  if (!ready) {
    onError(
      new Error(
        'Cloudinary widget failed to load. Check your internet connection or use the "Upload File" button instead.'
      )
    );
    return;
  }

  try {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: config.cloudName || 'demo',
        uploadPreset: config.uploadPreset || 'ml_default',
        sources: ['local', 'url', 'camera', 'unsplash'],
        multiple: false,
        folder: 'gone_home_decors_products',
        clientAllowedFormats: ['image', 'video'],
        maxFileSize: 50000000, // 50MB
        theme: 'minimal',
        styles: {
          palette: {
            window: '#1C1F24',
            windowBorder: '#C5A059',
            tabIcon: '#C5A059',
            menuIcons: '#C5A059',
            textDark: '#121417',
            textLight: '#FDFBF7',
            link: '#C5A059',
            action: '#25D366',
            inactiveTabIcon: '#8E909A',
            error: '#F44336',
            inProgress: '#C5A059',
            complete: '#25D366',
            sourceBg: '#272B30'
          }
        }
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary widget error:', error);
          // Translate common widget errors into plain English
          if (error.status === 'upload_error') {
            if (onError)
              onError(
                new Error(
                  'Upload failed — your Cloudinary upload preset may be set to "Signed". ' +
                  'Go to API Settings → set an Unsigned preset and try again.'
                )
              );
          } else {
            if (onError) onError(new Error(error.statusText || error.message || 'Widget upload failed.'));
          }
          return;
        }
        if (result && result.event === 'success') {
          console.log('Uploaded image URL:', result.info.secure_url);
          if (onSuccess) onSuccess(result.info.secure_url, result.info);
        }
      }
    );

    widget.open();
  } catch (err) {
    console.error('Error launching Cloudinary widget:', err);
    if (onError) onError(err);
  }
};

/**
 * Direct file upload via Cloudinary REST API (Unsigned)
 */
export const uploadFileDirectly = async (file, onProgress) => {
  const config = getCloudinaryConfig();
  const cloudName = config.cloudName || 'demo';
  const uploadPreset = config.uploadPreset || 'ml_default';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('folder', 'gone_home_decors_products');

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', endpoint);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        const percent = Math.round((e.loaded / e.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          resolve(response.secure_url);
        } catch (e) {
          reject(new Error('Invalid response from Cloudinary'));
        }
      } else {
        try {
          const errRes = JSON.parse(xhr.responseText);
          reject(new Error(errRes.error?.message || 'Upload failed'));
        } catch (e) {
          reject(new Error(`Cloudinary upload failed with status ${xhr.status}`));
        }
      }
    };

    xhr.onerror = () => reject(new Error('Network error uploading to Cloudinary'));
    xhr.send(formData);
  });
};
