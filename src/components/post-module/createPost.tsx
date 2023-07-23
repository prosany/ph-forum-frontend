import { useAppSelector } from "@/models";
import { postSchema } from "@/schemas/postSchema";
import { POST } from "@/utilities/axios-helper";
import uploadFiles from "@/utilities/cloudinary";
import categories from "@/utilities/dummy-categories";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";

const initialValues = {
  status: "New",
  body: "",
  category: "",
};

const CreatePost = (props: any) => {
  const { closeFn } = props;
  const [tags, setTags] = useState<{
    text: string;
    tags: string[];
  }>({
    text: "",
    tags: [],
  });
  const [files, setFiles] = useState<any>([]);
  const tagsInput = useRef<any>(null);
  const { user } = useAppSelector((state) => ({
    user: state.auth.user as any,
  }));

  const handleAddTags = () => {
    if (!tags.text) return toast.error("No text found");
    const text = tags.text;
    if (tags.tags.includes(text)) {
      toast.error("Tag already exists");
      setTags((prev) => ({ ...prev, text: "" }));
      tagsInput?.current?.focus();
      return;
    }
    setTags((prev) => ({ ...prev, text: "", tags: [...prev.tags, text] }));
    tagsInput?.current?.focus();
  };

  const handleUpload = (e: any) => {
    const array = Array.from(e.target.files);
    const files = array.map((file: any) => file);
    setFiles((prev: any) => [...prev, ...files]);
  };

  let toastId: string | undefined;
  const formik = useFormik({
    initialValues,
    validationSchema: postSchema,
    onSubmit: async (values) => {
      toast.dismiss(toastId);
      try {
        toastId = toast.loading("Posting...");
        const data = { ...values };
        const uploaded = await uploadFiles(files);

        const res = await POST(
          "/create-post",
          {
            ...data,
            tags: tags.tags.join(", ") || null,
            photosOrVideos: uploaded || [],
          },
          {
            headers: {
              Authorization: `Bearer ${user?.token}`,
            },
          }
        );
        if (res.status === 1) {
          toast.dismiss(toastId);
          toast.success("Post successfully created.");
          closeFn((prev: any) => !prev);
        } else {
          toast.dismiss(toastId);
          toast.error("Post create failed.");
        }
      } catch (error) {
        toast.dismiss();
        toast.error("Post create failed.");
      }
    },
  });
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#0000009f] z-20 flex justify-center items-center">
      <div className="w-2/5 bg-white rounded-lg max-h-[90vh] overflow-y-scroll">
        <div className="flex justify-center items-center relative p-4">
          <h1 className="font-bold text-xl">Create Post</h1>
          <button
            onClick={() => {
              toast.dismiss();
              closeFn((prev: any) => !prev);
            }}
            className="w-10 h-10 bg-[#e4e6ea] rounded-full absolute top-auto right-5"
          >
            <i className="fa-solid fa-xmark text-[#5e6771] text-xl"></i>
          </button>
        </div>
        <hr />
        <form onSubmit={formik.handleSubmit}>
          <div className="flex items-start pt-3 px-6 pb-1">
            <div className="w-14">
              <img
                src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                alt=""
                className="w-10 h-10 rounded-full object-cover shadow-sm"
              />
            </div>
            <div className="w-full">
              <h1 className="text-md font-medium">{user?.name}</h1>
              <span className="border px-4 py-1 rounded-lg select-none text-sm bg-slate-200 font-semibold">
                <label htmlFor="status">
                  {formik.values.status === "Public" ? (
                    <i className="fa-solid fa-earth-asia"></i>
                  ) : (
                    <i className="fa-solid fa-lock"></i>
                  )}
                </label>
                <select
                  id="status"
                  name="status"
                  onChange={formik.handleChange}
                  value={formik.values.status}
                  className="px-1 py-0 appearance-none select-none bg-transparent outline-none"
                >
                  <option value="New">Public</option>
                  <option value="Draft">Draft</option>
                </select>
              </span>
            </div>
          </div>
          <div>
            <textarea
              name="body"
              className="w-full p-4 outline-none resize-none text-[18px] max-h-[300px] text-gray-700 placeholder:text-gray-600"
              rows={5}
              placeholder="Share or Ask Something to Everyone Mahabub?"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.body}
            ></textarea>

            {/* show a image or video preview here */}
            <div className="grid grid-cols-3 gap-4 px-6 mb-5">
              {files.length > 0 &&
                files.map((file: any, index: number) => {
                  // check the type of file
                  const isImage = file.type.includes("image");
                  const isVideo = file.type.includes("video");
                  return (
                    <div key={index} className="relative">
                      {isImage && (
                        <>
                          <img
                            src={URL.createObjectURL(file)}
                            alt=""
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFiles((prev: any) =>
                                prev.filter(
                                  (item: any) => item.name !== file.name
                                )
                              );
                            }}
                            className="absolute top-2 h-6 w-6 right-2 text-lg text-white rounded-full bg-red-500 p-1 flex justify-center items-center"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </>
                      )}
                      {isVideo && (
                        <>
                          <video
                            src={URL.createObjectURL(file)}
                            controls={false}
                            autoPlay
                            muted
                            loop
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setFiles((prev: any) =>
                                prev.filter(
                                  (item: any) => item.name !== file.name
                                )
                              );
                            }}
                            className="absolute top-2 h-6 w-6 right-2 text-lg text-white rounded-full bg-red-500 p-1 flex justify-center items-center"
                          >
                            <i className="fa-solid fa-xmark"></i>
                          </button>
                        </>
                      )}
                    </div>
                  );
                })}
            </div>

            <div className="flex justify-start items-center flex-wrap px-6">
              {tags.tags.map((item, index) => (
                <p
                  key={index}
                  className="bg-gray-50 px-2 py-1 m-1 rounded-lg flex items-center capitalize text-sm"
                >
                  <span>{item}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setTags((prev) => ({
                        ...prev,
                        tags: prev.tags.filter((tag) => tag !== item),
                      }));
                    }}
                    className="ml-2 mr-1 bg-[#e4e6ea] text-[#5e6771] rounded-full w-5 h-5 flex items-center justify-center text-sm"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </p>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6 py-1 mt-4 mx-5">
              <div>
                <p className="text-[10px] uppercase mb-1 text-gray-500">
                  Category
                </p>
                <div className="relative">
                  <select
                    onChange={formik.handleChange}
                    name="category"
                    className="w-full border border-gray-300 text-gray-600 cursor-pointer px-6 py-2 rounded-lg appearance-none select-none"
                  >
                    <option value="" disabled selected>
                      Select Category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <span className="absolute top-1/2 -translate-y-1/2 right-3 text-xs text-gray-500">
                    <i className="fa-solid fa-arrow-down"></i>
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase mb-1 text-gray-500">Tags</p>
                <div className="relative">
                  <input
                    type="text"
                    onChange={(e) => {
                      const updatedValue = e.target.value.replace(/\s+/g, "-");
                      setTags((prev) => ({ ...prev, text: updatedValue }));
                    }}
                    ref={tagsInput}
                    value={tags.text}
                    className="w-full border border-gray-300 text-gray-600 px-1 py-2 rounded-lg appearance-none select-none"
                  />
                  <span
                    onClick={handleAddTags}
                    className="absolute top-1/2 -translate-y-1/2 right-0 pr-4 pl-1 text-xl cursor-pointer text-gray-500"
                  >
                    <i className="fa-solid fa-circle-plus"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center gap-3 border border-gray-300 rounded-lg px-6 py-1 mt-4 mx-5">
              <h1 className="font-semibold text-gray-700">Add to your post</h1>
              <div className="flex gap-3">
                <input
                  type="file"
                  id="uploadFiles"
                  accept="video/*,image/*"
                  onChange={handleUpload}
                  multiple
                  hidden
                />
                <label
                  htmlFor="uploadFiles"
                  className="flex justify-center items-center font-light p-2 rounded text-[15px] hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-xl mr-2 text-green-600">
                    <i className="fa-solid fa-photo-film"></i>
                  </span>
                  Photo/Video
                </label>
                <button
                  type="button"
                  className="flex justify-center items-center font-light p-2 rounded text-[15px] hover:bg-gray-50"
                >
                  <span className="text-xl mr-2 text-[#f7b928]">
                    <i className="fa-regular fa-face-laugh-wink"></i>
                  </span>
                  Feeling/Activity
                </button>
              </div>
            </div>
            <div className="mx-5 my-3">
              <button
                className="bg-colorBase w-full text-white p-2 rounded-lg disabled:bg-violet-300 disabled:cursor-not-allowed"
                disabled={
                  formik.values.body === "" || formik.values.category === ""
                }
                type="submit"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
