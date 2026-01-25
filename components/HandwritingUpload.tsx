import React, { useState } from 'react';

export const HandwritingUpload = () => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    // Logic to send to /api/analyzehandwriting
    setUploading(false);
  };

  return (
    <div className="p-4 border-2 border-dashed rounded-lg">
      <input type="file" onChange={handleUpload} disabled={uploading} />
      {uploading && <p>Processing with Cobel AI Engine...</p>}
    </div>
  );
};

export default HandwritingUpload;
