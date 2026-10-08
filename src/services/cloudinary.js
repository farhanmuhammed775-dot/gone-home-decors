const STORAGE_KEY_CLOUDINARY = 'gone_cloudinary_config';

export const getCloudinaryConfig = () => {
  return {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'y702lxik',
    uploadPreset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'gone_preset',
    apiKey: import.meta.env.VITE_CLOUDINARY_API_KEY || ''
  };
};

export const saveCloudinaryConfig = (config) => {
  localStorage.setItem(STORAGE_KEY_CLOUDINARY, JSON.stringify(config));
};

/**
 * Open Cloudinary Official Upload Widget
 */
export const openCloudinaryWidget = (onSuccess, onError) => {
  const config = getCloudinaryConfig();

  if (typeof window.cloudinary === 'undefined') {
    onError(new Error('Cloudinary widget script is still loading. Please check internet connection or upload directly.'));
    return;
  }

  try {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: config.cloudName || 'y702lxik',
        uploadPreset: config.uploadPreset || 'gone_preset',
        sources: ['local', 'url', 'camera', 'unsplash'],
        multiple: false,
        folder: 'gone_home_decors_products',
        clientAllowedFormats: ['image', 'video'],
        maxFileSize: 50000000, // 50MB
        theme: 'minimal',
        cropping: true,
        croppingAspectRatio: 4 / 3,
        croppingShowDimensions: true,
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
          if (onError) onError(error);
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
  const cloudName = config.cloudName || 'y702lxik';
  const uploadPreset = config.uploadPreset || 'gone_preset';

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
