import * as Yup from "yup";

export const postSchema = Yup.object({
  status: Yup.string().required("Status is required."),
  body: Yup.string().required("Content is required."),
  category: Yup.string().required("Category is required."),
});
