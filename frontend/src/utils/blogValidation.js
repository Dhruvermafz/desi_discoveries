import * as Yup from "yup";

// Define the validation schema using Yup
const blogValidation = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  excerpt: Yup.string().required("Excerpt is required"),
  tags: Yup.string(),
  categories: Yup.string(),
});

export default blogValidation;
