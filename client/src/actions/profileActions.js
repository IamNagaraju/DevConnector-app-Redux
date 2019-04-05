import axios from 'axios';
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES,
} from './types';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('http://localhost:5000/api/profiles')
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {},
      });
    });
};

//Get Profile By handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`http://localhost:5000/api/profiles/handle/${handle}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: null,
      });
    });
};

export const deleteAccount = () => dispatch => {
  if (window.confirm('Are you sure ? This cannot be undone !')) {
    axios
      .delete('http://localhost:5000/api/profiles')
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {},
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  }
};

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/profiles', profileData)
    .then(res => {
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const addExperience = (expData, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/profiles/experience', expData)
    .then(res => {
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//ADD Education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('http://localhost:5000/api/profiles/education', eduData)
    .then(res => {
      history.push('/dashboard');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`http://localhost:5000/api/profiles/experience/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Delete education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`http://localhost:5000/api/profiles/education/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Get all Profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('http://localhost:5000/api/profiles/all')
    .then(res => {
      dispatch({
        type: GET_PROFILES,
        payload: res.data,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING,
  };
};

//clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};
