import React, { useEffect, useState } from 'react';
import services from '../appWrite/config';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import blankProfile from "../assets/blank-profile.webp"; // Replace with your default user image

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  const [image, setImage] = useState('');
  const userData = useSelector((state) => state.auth.userData);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await services.deletePost(id);
        navigate('/allposts');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const post = await services.getPost(id);
        setPostData(post);

        if (post.featuredImage) {
          const picture = services.getFilePreview(post.featuredImage);
          setImage(picture || '');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div className="relative w-full min-h-screen bg-white flex justify-center items-center">
      <div className="bg-white shadow-lg m-5 rounded-lg overflow-hidden flex max-w-4xl">
        {/* Image Section */}
        {image ? (
          <img className="w-1/2 h-auto object-cover rounded-l-lg" src={image} alt={postData?.title} />
        ) : (
          <div className="w-1/2 h-auto object-cover rounded-l-lg bg-gray-200"></div>
        )}

        {/* Content Section */}
        <div className="w-1/2 p-6 flex flex-col justify-between">
          {/* Post Title */}
          <h1 className="text-2xl font-semibold mb-4">{postData?.title}</h1>

          {/* Post Content */}
          <p className="text-gray-700 mb-6">{postData?.content}</p>

          {/* Author Info and Actions */}
          <div className="flex justify-between items-center">
            {/* Author Info */}
           

            {/* Action Buttons */}
            {postData?.userId === userData?.$id && (
              <div className="flex space-x-4">
                <Link
                  to={`/editpost/${id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:outline-none"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
