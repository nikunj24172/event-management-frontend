import axiosInstance from "../api/api";

const createEvent = (event) => {
  axiosInstance.post("/event", event);
};

const getAllEvents = () => {
  return axiosInstance.get("/event");
};

const getEventById = (id) => {
  return axiosInstance.get(`/event/${id}`); 
};


const updateEvent = (id, event) => {
  return axiosInstance.patch(`/event/${id}`, event);
};

const deleteEvent = (id) => {
  return axiosInstance.delete(`/event/${id}`);
};

export default {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
  getEventById,
};
