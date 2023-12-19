import Http from "../helpers/http";

const fetchAllBlogs = async () => {
  try {
    const response = await Http.get(`/blog/getAllBlogs`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

const fetchBlogBySlug = async (slug) => {
  try {
    const response = await Http.get(`/blog/getBlogBySlug/${slug}`);
    return response.result;
  } catch (error) {
    console.error(error);
  }
};

export const blogService = {
  fetchAllBlogs,
  fetchBlogBySlug,
};
