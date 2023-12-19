import Http from "../helpers/http";

const fetchAllCategories = async () => {
  try {
    const response = await Http.get(`/category/getAllCategories`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchCategoryBySlug = async (slug) => {
  try {
    const response = await Http.get(`/category/getCategoryBySlug/${slug}`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

export const categoryService = {
  fetchAllCategories,
  fetchCategoryBySlug,
};
