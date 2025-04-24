"use client"
import { useState } from "react";

const initialPages = {
  about: {
    title: "About Us",
    content: "Welcome to our website! We are a team of passionate individuals.",
  },
  faq: {
    title: "FAQ",
    content: "Here are some frequently asked questions...",
  },
  howItWorks: {
    title: "How It Works",
    content: "Learn how to use our platform step by step.",
  },
  blog: {
    title: "Blog",
    content: "Read our latest blog posts and updates here.",
  },
};

export default function SystemPage() {
  const [pages, setPages] = useState(initialPages);
  const [selectedPage, setSelectedPage] = useState("about");
  const [title, setTitle] = useState(pages[selectedPage].title);
  const [content, setContent] = useState(pages[selectedPage].content);

  const handleSave = () => {
    setPages((prev) => ({
      ...prev,
      [selectedPage]: { title, content },
    }));
  };

  const handleDelete = () => {
    const newPages = { ...pages };
    delete newPages[selectedPage];
    setPages(newPages);
    setSelectedPage("about"); // Default to About after deletion
  };

  const handlePageChange = (page) => {
    setSelectedPage(page);
    setTitle(pages[page]?.title || "");
    setContent(pages[page]?.content || "");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-dark-card rounded-lg shadow-lg">
      <h2 className="text-blue-900 text-2xl font-bold mb-4">System Page Management</h2>

      {/* Page Selection */}
      <div className="flex space-x-4 mb-6">
        {["about", "faq", "howItWorks", "blog"].map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${
              selectedPage === page ? "bg-blue text-white" : "bg-dark-bg text-light-gray"
            } py-2 px-4 rounded-md`}
          >
            {page.charAt(0).toUpperCase() + page.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Editing Section */}
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-blue-800">Page Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-blue-800 text-white border-2 border-blue rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-light-gray">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={6}
            className="w-full p-3 bg-dark-bg text-light-gray border-2 border-blue rounded-md"
            required
          />
        </div>

        <div className=" ">
          <button
            onClick={handleSave}
            className=" text-white py-2 px-6 bg-blue-800 rounded-md"
          >
            Save Changes
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-6 rounded-md"
          >
            Delete Page
          </button>
        </div>
      </div>

      {/* Display Current Content */}
      <section className="mt-8">
        <h3 className="text-blue text-xl font-semibold mb-4">Current Content</h3>
        <div className="bg-dark-bg p-6 rounded-md border border-dark-gray">
          <h4 className="text-lg font-bold text-light-gray">{title}</h4>
          <p className="text-light-gray">{content}</p>
        </div>
      </section>
    </div>
  );
}

