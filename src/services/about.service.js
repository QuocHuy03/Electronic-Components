import Http from "../helpers/http";

const fetchPostAbout = async (data) => {
  try {
    const response = await Http.post(`/about/addAbout`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const aboutService = {
  fetchPostAbout,
};
