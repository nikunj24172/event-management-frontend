import { useFormik } from "formik";
import React from "react";
import { eventValidationSchema } from "../validationSchema/EventSchema";
import EventServices from "../services/EventServices";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const EventForm = () => {
  const initialValue = {
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: eventValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await EventServices.createEvent(values);
        resetForm();
        setTimeout(() => {
          navigate("/");
        }, 1000);
        toast.success("Event Created Successfully");
      } catch (error) {
        toast.error("Error in Creating Event !!", error);
      }
    },
  });
  const { values, handleChange, handleBlur, handleSubmit, errors, touched } =
    formik;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4 py-10">
      <div className="w-full max-w-3xl bg-white border border-gray-200 shadow-xl rounded-xl px-8 py-10 space-y-6">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-2">
          Add Events
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Grid: Title, Date, Time, Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter event title"
                onChange={handleChange}
                value={values.title}
                onBlur={handleBlur}
                name="title"
                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
              />
              {errors.title && touched.title ? (
                <p className="text-red-500">{errors.title}</p>
              ) : null}
            </div>

            {/* Date */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={values.date}
                onBlur={handleBlur}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
              />
              {errors.date && touched.date ? (
                <p className="text-red-500">{errors.date}</p>
              ) : null}
            </div>

            {/* Time */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.time}
                name="time"
                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
              />
              {errors.date && touched.time ? (
                <p className="text-red-500">{errors.time}</p>
              ) : null}
            </div>

            {/* Location */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
                placeholder="Enter location"
                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
              />
                {errors.location && touched.location ? (
                <p className="text-red-600">{errors.location}</p>
              ) : null}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              placeholder="Write event details..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            />
              {errors.description && touched.description ? (
                <p className="text-red-600">{errors.description}</p>
              ) : null}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
