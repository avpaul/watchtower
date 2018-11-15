import axios from 'axios';

const fellowsSummaryService = {
  fetchFellowsSummary: async url => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default fellowsSummaryService;
