import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { eventValidationSchema } from "../validationSchema/EventSchema";
import EventServices from "../services/EventServices";
import { toast } from "react-toastify";

const EditEvents = () => {
  const { id } = useParams();
  //   console.log(id);

  const navigate = useNavigate();
  const [details, setDetails] = useState(null);

  const initialValues = {
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
  };

  const formik = useFormik({
    initialValues: details || initialValues,
    enableReinitialize: true,
    validationSchema: eventValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await EventServices.updateEvent(id, values);
        resetForm();
        toast.success("Event Updated Successfully...");
        navigate("/");
      } catch (error) {
        console.log(error);

        toast.error("Somenthing Went Wrong", error);
      }
    },
  });

  const { values, handleChange, handleSubmit, handleBlur, errors, touched } =
    formik;

  const formattedDate = (isoString) => {
    if (!isoString) return "";
    return isoString.split("T")[0]; // Get YYYY-MM-DD part only
  };

  useEffect(() => {
    const fetchSingleEvent = async () => {
      try {
        const response = await EventServices.getEventById(id);

        // Convert the date before setting
        const eventData = {
          ...response.data,
          date: formattedDate(response.data.date),
        };

        setDetails(eventData);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message);
      }
    };

    fetchSingleEvent();
  }, [id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4 py-10">
      <div className="w-full max-w-3xl bg-white border border-gray-200 shadow-xl rounded-xl px-8 py-10 space-y-6">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-2">
          Edit Event
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter event title"
                name="title"
                value={values.title}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
              />
              {errors.title && touched.title ? (
                <p className="text-red-500">{errors.title}</p>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
              />
              {errors.date && touched.date ? (
                <p className="text-red-500">{errors.date}</p>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Time
              </label>
              <input
                type="time"
                name="time"
                value={values.time}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
              />
              {errors.time && touched.time ? (
                <p className="text-red-500">{errors.time}</p>
              ) : null}
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="Enter location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
              />
            </div>
            {errors.location && touched.location ? (
              <p className="text-red-500">{errors.location}</p>
            ) : null}
          </div>

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
              <p className="text-red-500">{errors.description}</p>
            ) : null}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 pt-4">
            <Link to="/">
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </Link>

            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvents;
