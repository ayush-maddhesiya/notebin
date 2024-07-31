
import { useState } from 'react';
import Link from 'next/link';

const subjects = ['DSA', 'CSO', 'ICSE', 'Physics', 'M1', 'M2'];
const semesters = Array.from({ length: 8 }, (_, i) => (i + 1).toString());

const Upload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [semester, setSemester] = useState('');
  const [keyword, setKeyword] = useState('');
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !subject || !semester || !keyword) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('subject', subject);
    formData.append('semester', semester);
    formData.append('keyword', keyword);

    setUploading(true);

    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setFileUrl(result.fileUrl);
      } else {
        console.error('Upload failed:', result.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto  bg-white shadow-md  rounded-md">
      <h1 className="text-2xl font-bold text-center mb-6">Upload a File</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col">
          <span className="mb-1">Title:</span>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1">Subject:</span>
          <select 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            required 
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Subject</option>
            {subjects.map((subj) => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          <span className="mb-1">Semester:</span>
          <select 
            value={semester} 
            onChange={(e) => setSemester(e.target.value)} 
            required 
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">Select Semester</option>
            {semesters.map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          <span className="mb-1">Keyword:</span>
          <input 
            type="text" 
            value={keyword} 
            onChange={(e) => setKeyword(e.target.value)} 
            required 
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <label className="flex flex-col">
          <span className="mb-1">File:</span>
          <input 
            type="file" 
            onChange={handleFileChange} 
            required 
            className="border border-gray-300 rounded-md p-2"
          />
        </label>
        <button 
          type="submit" 
          disabled={uploading} 
          className={`p-2 rounded-md text-white ${uploading ? 'bg-gray-500' : 'bg-[#05c263e7] hover:bg-green-900'}`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {fileUrl && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">File Uploaded Successfully</h2>
          <Link href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            View File
          </Link>
        </div>
      )}
    </div>
  );
};

export default Upload;
