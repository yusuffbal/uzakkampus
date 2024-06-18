import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: [],
  progresstable: []
};


export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
      DashboardAnaliysesFetched(state, action) {
        state.entities = action.payload.entities;
      },
      DashboardProgressTableFetched(state, action) {
        state.progresstable = action.payload.entities;
      }
     
    },
  });
  
