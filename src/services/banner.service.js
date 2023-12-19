import Http from "../helpers/http";

const fetchAllBanners = async () => {
  try {
    const response = await Http.get(`/banner/getAllBanners`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};



export const bannerService = {
    fetchAllBanners,

};
