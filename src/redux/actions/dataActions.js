import {
  SET_EVENTS,
  LOADING_DATA,
  GONNA_EVENT,
  UNGONNA_EVENT,
  DELETE_EVENT,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_EVENT,
  SET_EVENT,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from '../types';
import axios from 'axios';

// Get all posts
export const getEvents = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios.get('/events');
    dispatch({ type: SET_EVENTS, payload: res.data });
  } catch (err) {
    dispatch({ type: SET_EVENTS, payload: {} });
  }
};

// Gonna post
export const gonnaEvent = (eventId) => async (dispatch) => {
  try {
    const res = await axios.get(`/event/${eventId}/gonna`);
    dispatch({ type: GONNA_EVENT, payload: { ...res.data, eventId } });
  } catch (error) {
    console.log(error);
  }
};

// Ungonna post
export const ungonnaEvent = (eventId) => async (dispatch) => {
  try {
    const res = await axios.get(`/event/${eventId}/ungonna`);
    dispatch({ type: UNGONNA_EVENT, payload: { ...res.data, eventId } });
  } catch (error) {
    console.log(error);
  }
};

// Delete post
export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    await axios.delete(`/event/${eventId}`);
    console.log('V data actions', eventId);
    dispatch({ type: DELETE_EVENT, payload: eventId });
  } catch (error) {
    console.log(error);
  }
};

// Post event
export const postEvent = (event) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post(`/event`, event);
    dispatch({ type: POST_EVENT, payload: res.data });
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

// Get one event
export const getEvent = (eventId) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.get(`/event/${eventId}`);
    dispatch({ type: SET_EVENT, payload: res.data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    console.log(error);
  }
};

export const commentOnEvent = (eventId, commentBody) => async (dispatch) => {
  try {
    const res = await axios.post(`/event/${eventId}/comment`, {
      body: commentBody,
    });
    dispatch({ type: SUBMIT_COMMENT, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({ type: SET_ERRORS, payload: error.response.data });
  }
};

export const getUserData = (username) => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios.get(`/user/${username}`);
    dispatch({ type: SET_EVENTS, payload: res.data.events });
  } catch (error) {
    dispatch({ type: SET_EVENTS, payload: null });
  }
};
