import axiosInstance from "../api/api";

const createEvent = (event) => {
  axiosInstance.post("/event", event);
};

const getAllEvents = () => {
  return axiosInstance.get("/get-all-events");
};

const getEventById = (id) => {
  return axiosInstance.get(`/edit-event/${id}`); 
};


const updateEvent = (id, event) => {
  return axiosInstance.patch(`/update-event/${id}`, event);
};

const deleteEvent = (id) => {
  return axiosInstance.delete(`/delete-event/${id}`);
};

export default {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getEventById,
};
