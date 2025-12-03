// app/admin/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { File, FileImage} from 'lucide-react';
const server = process.env.NEXT_PUBLIC_API_URL;
type FormDataType = {
  title: string;
  source: string;
  author: string;
  description: string;
  content: string;
  url: string;
  date: string;
};

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    source: "",
    author: "",
    description: "",
    content: "",
    url: "",
    date: "",
  })
  const [images, setImages] = useState<File[]>([])
  const router = useRouter();

  // Simple password (change this!)
  const ADMIN_PASSWORD = '@trendz3344'; 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setMessage('Logged in successfully!');
    } else {
      setMessage('Wrong password');
    }
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const fd = new FormData();

   (Object.keys(formData) as Array<keyof FormDataType>).forEach((key) => {
  fd.append(key, formData[key]);
  });

    images.forEach((img) => fd.append("images", img));

    const res = await fetch(`${server}/api/news/upload`, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      const err = await res.json();
      return setMessage(err.message || "File not uploaded, try again");
    }

    const data = await res.json();
    const id = data.id
    router.push(`https://www.trendz.ng/news/${id}`)
    // reset form if needed
    setMessage("Upload successful");

  } catch (error) {
    console.error(error);
    setMessage("Server error");
  } finally {
    setIsLoading(false);
  }
};


  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border rounded-lg text-lg "
              required
            />
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
          {message && <p className="mt-4 text-center text-red-600">{message}</p>}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-300 py-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800">Admin – Post News</h1>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setPassword('');
                }}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </div>

            {message && (
              <div className={`p-4 rounded-lg mb-6 ${message.includes('success') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-2">Title *</label>
                <input
                  name="title"
                  type="text"
                  required
                  className="w-full p-4 border rounded-lg text-lg"
                  placeholder="Enter news title"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                />

              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium mb-2">Source</label>
                  <input
                    name="source"
                    type="text"
                    defaultValue="Admin"
                    className="w-full p-4 border rounded-lg"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value
                      })
                    }}
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2">Author</label>
                  <input
                    name="author"
                    type="text"
                    placeholder="Optional"
                    className="w-full p-4 border rounded-lg"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value
                      })
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">Short Description *</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  className="w-full p-4 border rounded-lg"
                  placeholder="Brief summary"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value
                    })
                  }}
                />
              </div>

              <div>
                <label className="block text-lg font-medium mb-2">Full Content (Optional)</label>
                <textarea
                  name="content"
                  rows={8}
                  className="w-full p-4 border rounded-lg font-mono text-sm"
                  placeholder="Paste full article or leave blank"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value
                    })
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium mb-2">Article URL</label>
                  <input
                    name="url"
                    type="url"
                    className="w-full p-4 border rounded-lg"
                    placeholder="https://example.com/article"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value
                      })
                    }}
                  />
                </div>
                <div>
                  <label className="block text-lg font-medium mb-2">Published Date</label>
                  <input
                    name="publishedAt"
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full p-4 border rounded-lg"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        [e.target.name]: e.target.value
                      })
                    }}
                  />
                </div>
              </div>

              <div>
                <input
                  style={{display:"none"}}
                  id='file'
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setImages(Array.from(e.target.files));
                    }
                  }}
                />
              </div>
              <div className="flex gap-3 mt-3">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
                <label htmlFor="file" className="block text-lg font-medium mb-2"><FileImage className='h-20 w-20'/></label>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-xl font-bold text-xl hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
              >
                {
                  isLoading ?
                  <div className="flex justify-center items-center">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  :
                  " Publish News"
                }
               
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}