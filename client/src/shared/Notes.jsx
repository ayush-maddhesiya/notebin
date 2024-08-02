import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDownIcon, SearchIcon } from "lucide-react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import initialFilters from "@/constants/filters";
import Cookies from "js-cookie";
import { BASE_URL } from "@/constants/data";

const Notes = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Newest");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = Cookies.get("token");
      try {
        const response = await axios.get(`${BASE_URL}api/v1/file/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    let result = notes;

    // filters
    filters.forEach((filter) => {
      const checkedOptions = filter.options
        .filter((option) => option.checked)
        .map((option) => option.value);
      if (checkedOptions.length > 0) {
        result = result.filter((note) =>
          checkedOptions.includes(note[filter.id])
        );
      }
    });

    if (searchTerm) {
      result = result.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // sorting
    switch (sortOption) {
      case "Newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "Oldest":
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }

    setFilteredNotes(result);
  }, [filters, searchTerm, sortOption, notes]);

  const handleFilterChange = (filterId, optionValue) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.id === filterId
          ? {
              ...filter,
              options: filter.options.map((option) =>
                option.value === optionValue
                  ? { ...option, checked: !option.checked }
                  : option
              ),
            }
          : filter
      )
    );
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const toggleDropdown = (sectionId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="bg-white w-[100vw] h-[100vh]">
      <Navbar />

      <main className="max-w-[100%] mx-auto min-h-[100vh] px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between border-b border-gray-200 pb-3 pt-3 items-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Explore Notes
          </h1>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search notes..."
                className="pl-10 pr-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={handleSearch}
              />
              <SearchIcon
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            <div className="relative inline-block text-left">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                value={sortOption}
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option>Newest</option>
                <option>Oldest</option>
              </select>
              <ChevronDownIcon
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-8 gap-y-10">
            {/* Filters */}
            <form className="hidden lg:block">
              {filters.map((section) => (
                <div key={section.id} className="border-b border-gray-200 py-3">
                  <h3 className="flow-root -my-3">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                      onClick={() => toggleDropdown(section.id)}
                    >
                      <span className="font-medium text-gray-900">
                        {section.name}
                      </span>
                      <span className="ml-6 flex items-center">
                        <ChevronDownIcon
                          className={`h-5 w-5 transform ${
                            openDropdowns[section.id] ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                  </h3>
                  {openDropdowns[section.id] && (
                    <div className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`filter-${section.id}-${option.value}`}
                              name={`${section.id}[]`}
                              value={option.value}
                              type="checkbox"
                              checked={option.checked}
                              onChange={() =>
                                handleFilterChange(section.id, option.value)
                              }
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-${section.id}-${option.value}`}
                              className="ml-3 text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </form>

            {/* Note grid */}
            <div className="lg:col-span-4">
              {loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error}</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
                  {filteredNotes.map((note) => (
                    <div
                      key={note._id}
                      className="group relative border rounded shadow-md"
                    >
                      <h1 className="text-2xl py-2 border-b px-2 wrap">
                        {(note.title).slice(0,30)}
                      </h1>
                      <div className="flex justify-between p-2 text-sm">
                        <p>{note.semester} sem</p>
                        <a
                          href={note.fileUrl}
                          rel="noopener noreferrer"
                          className="bg-[#093A3E] text-white px-2 py-1 rounded"
                        >
                          Download
                        </a>
                      </div>
                      <div className="text-xs p-2 text-gray-500">
                        <p>{note.user.name}</p>
                        <p>{note.user.enrollmentNo}</p>
                        <p>Subject : {note.subject}</p>
                        <p>{formatDate(note.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Notes;
