export const uploadToCloudinary = async (file: File): Promise<string> => {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY!;
  const apiSecret = import.meta.env.VITE_CLOUDINARY_API_SECRET!;

  // Create signature string (alphabetical order)
  const paramsToSign = `folder=profile_photos&timestamp=${timestamp}`;
  const stringToSign = paramsToSign + apiSecret;

  // Simple SHA1 hash without crypto-js
  const signature = await crypto.subtle
    .digest('SHA-1', new TextEncoder().encode(stringToSign))
    .then(buffer =>
      Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
    );

  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', 'profile_photos');
  formData.append('timestamp', timestamp.toString());
  formData.append('api_key', apiKey);
  formData.append('signature', signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'depeqzb6z'
    }/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error('Cloudinary error:', data);
    throw new Error(data.error?.message || 'Upload failed');
  }

  return data.secure_url;
};
