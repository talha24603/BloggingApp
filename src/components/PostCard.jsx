import React, { useEffect, useState } from 'react';
import services from '../appWrite/config';
import { Link } from 'react-router-dom';
import blankProfile from "../assets/blank-profile.webp";

const PostCard = ({ featuredImage, title, userId,AuthorName }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchImage = () => {
      try {
        const image = services.getFilePreview(featuredImage);
        setImageUrl(image);
      } catch (err) {
        console.error('Error fetching image:', err);
        setError(true);
      }
    };

    if (featuredImage) {
      fetchImage();
    }

    const fetchProfile = async () => {
      try {
        const response = await services.getProfiles();
        if (response) {
          const requiredProfile = response.documents.filter((profile) => profile.userId === userId);
          if (requiredProfile.length > 0) {
            setProfile(requiredProfile[0]);
          }
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [featuredImage, userId]);

  return (
    <div className="m-3 rounded-xl w-80 bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      {error ? (
        <p className="text-red-500 text-center p-4">Error loading image</p>
      ) : imageUrl ? (
        <img
          className="w-full h-48 object-cover rounded-t-xl"
          src={imageUrl}
          alt="featured"
        />
      ) : (
        <div className="w-full h-48 bg-gray-300 animate-pulse rounded-t-xl"></div>
      )}

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 truncate">{title}</h2>

        <div className="inline-flex pr-2 items-center mt-3 border rounded-full hover:bg-slate-300 ma  bg-slate-200">
          {profile && profile.featuredImage ? (
            <Link to={`/profile/${userId}`} className="flex items-center">
              <img
                className="rounded-full w-10 h-10 object-cover border-2 border-gray-200"
                src={services.getFilePreview(profile.featuredImage)}
                alt="profileImage"
              />
              <span className="ml-3 font-medium text-gray-700">{profile.name}</span>
            </Link>
          ) : (
            <div className="flex items-center">
              <img
                className="rounded-full w-10 h-10 object-cover border-2 border-gray-200"
                src={blankProfile}
                alt="profileImage"
              />
              <span className="ml-3 text-gray-500">{AuthorName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
