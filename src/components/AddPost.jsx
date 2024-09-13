import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import services from '../appWrite/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddPost = ({ postToEdit }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state) => state.auth.userData);

  if (postToEdit) {
    setValue('title', postToEdit.title || '');
    setValue('content', postToEdit.content || '');
  }

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (postToEdit) {
        const updatedImage = await services.uploadFile(data.image[0]);
        if (updatedImage) {
          const updatedfileId = updatedImage.$id;
          data.featuredImage = updatedfileId;
          await services.deleteFile(postToEdit.featuredImage);
        } else {
          data.featuredImage = postToEdit.featuredImage;
        }
        const updated = await services.updatePost(postToEdit.$id, { ...data });
        if (updated) {
          navigate(`/post/${updated.$id}`);
        }
      } else {
        const res = await services.uploadFile(data.image[0]);
        if (res) {
          const fileId = res.$id;
          data.featuredImage = fileId;
          const add = await services.addPost({ ...data, userId: userData.$id, AuthorName: userData.name });
          if (add) {
            navigate(`/post/${add.$id}`);
          }
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="bg-gray-100 shadow-md rounded-lg w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold text-center text-[#0CA7FF] mb-6">
          {postToEdit ? 'Edit Post' : 'Create a New Post'}
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-[#0CA7FF] font-medium mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              placeholder="Enter Title"
              className="w-full p-3 border text-[#0CA7FF] bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-[#0CA7FF] font-medium mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              placeholder="Enter your Content"
              className="w-full p-3 border text-[#0CA7FF] bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="6"
              {...register('content', { required: 'Content is required' })}
            />
            {errors.content && <p className="text-red-500">{errors.content.message}</p>}
          </div>

          <div>
            <label className="block text-[#0CA7FF] font-medium mb-2" htmlFor="image">
              Featured Image
            </label>
            <input
              id="image"
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/gif"
              className="w-full p-2 border text-[#0CA7FF] bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              {...register('image', { required: 'Featured image is required' })}
            />
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          </div>

          {postToEdit && (
            <div className="mt-4">
              <h3 className="text-[#0CA7FF] font-semibold mb-2">Current Image:</h3>
              <img
                src={services.getFilePreview(postToEdit.featuredImage)}
                alt="post image"
                className="w-40 h-auto rounded-lg shadow-lg"
              />
            </div>
          )}

          <button
            className="w-full bg-[#0CA7FF] text-white font-bold py-3 rounded-lg hover:bg-[#38b5fd] transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            {loading ? (postToEdit ? 'Updating...' : 'Adding...') : (postToEdit ? 'Update Post' : 'Add Post')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
