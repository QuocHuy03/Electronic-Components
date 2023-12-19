import Http from "../helpers/http";

const fetchAllBrands = async () => {
  try {
    const response = await Http.get(`/brand/getAllBrands`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchBrandBySlug = async (slug) => {
  try {
    const response = await Http.get(`/brand/getBrandBySlug/${slug}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const brandService = {
  fetchAllBrands,
  fetchBrandBySlug,
};
