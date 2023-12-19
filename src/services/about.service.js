import Http from "../helpers/http";

const fetchPostAbout = async (data) => {
  try {
    const response = await Http.post(`/about/postAbout`, data);
    return response;
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

export const bannerService = {
  fetchPostAbout,
};
