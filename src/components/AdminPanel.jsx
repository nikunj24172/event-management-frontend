import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, RefreshCw, ChevronDown } from "lucide-react";
import EventServices from "../services/EventServices";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const AdminPanel = () => {
  const [events, setEvents] = useState({
    today: [],
    future: [],
    past: [],
  });

  const [showAll, setShowAll] = useState({
    today: false,
    future: false,
    past: false,
  });

  const deleteEvent = async (id) => {
    try {
      const response = await EventServices.deleteEvent(id);
      toast.success(response?.data.message);
      fetchEvents();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await EventServices.getAllEvents();
      console.log(res);

      setEvents(res?.data?.message);
      console.log(res.data.message);
    } catch (err) {
      console.error(err);
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const renderSection = (title, list, category) => {
    const isExpanded = showAll[category];
    const visibleList = isExpanded ? list : list.slice(0, 3);

    return (
      <details open className="mb-6">
        <summary className="flex items-center justify-between cursor-pointer bg-white/60 backdrop-blur-md px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition">
          <span className="text-lg font-semibold text-gray-800">{title}</span>
          <ChevronDown size={20} />
        </summary>
        <div className="mt-3 space-y-4 px-2">
          {list.length === 0 ? (
            <p className="text-sm text-gray-500 italic">
              No events in this category.
            </p>
          ) : (
            visibleList.map((event) => (
              <div
                key={event._id}
                className="bg-white bg-opacity-90 border border-gray-200 p-4 rounded-xl shadow-md flex justify-between flex-col sm:flex-row sm:items-center gap-3 hover:shadow-lg transition"
              >
                <div className="flex-1">
                  <h3 className="text-md font-semibold text-indigo-700">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {event.date.slice(0, 10)} @ {event.time || "N/A"}{" "}
                    {event.location && `— ${event.location}`}
                  </p>
                  {event.description && (
                    <p className="text-sm text-gray-700 mt-1">
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 self-end sm:self-auto">
                  <Link to={`/edit/${event._id}`}>
                    <button className="p-2 rounded-md hover:bg-yellow-100 text-yellow-600">
                      <Pencil size={18} />
                    </button>
                  </Link>

                  <button
                    className="p-2 rounded-md hover:bg-red-100 text-red-600"
                    onClick={() => deleteEvent(event._id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}

          {list.length > 3 && (
            <div className="text-center mt-3">
              <button className="text-indigo-600 hover:underline text-sm" onClick={() =>
                  setShowAll((prev) => ({
                    ...prev,
                    [category]: !isExpanded,
                  }))
                }>
                {isExpanded ? " Show Less" : "Show All"}
              </button>
            </div>
          )}
        </div>
      </details>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <div className="w-full max-w-6xl bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-gray-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <h2 className="text-3xl font-bold text-indigo-700 text-center sm:text-left">
            Admin Panel
          </h2>
          <div className="flex gap-3">
            <Link to="/add-event">
              <button className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 text-sm transition">
                <Plus size={16} /> Add Event
              </button>
            </Link>
            <button
              onClick={fetchEvents}
              className="p-2 bg-white border border-gray-300 rounded-full shadow hover:bg-gray-100 transition"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
        {renderSection("Today’s Events", events.today)}
        {renderSection("Future Events", events.future)}
        {renderSection("Past Events", events.past)}
      </div>
    </div>
  );
};

export default AdminPanel;
