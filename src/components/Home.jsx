import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import services from '../appWrite/config';
import PostCard from './PostCard';
import { Link } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Set to true initially to show loader
  const authstatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const dbPosts = await services.getPosts();
        if (dbPosts) {
          setPosts(dbPosts.documents);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto p-8">
        {authstatus ? (
          <>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
              Your Favorite Blogs
            </h1>
            {loading ? (
              <p className="text-center text-gray-600">Loading posts...</p>
            ) : posts.length > 0 ? (
              <div className="grid gap-6 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                {posts.map((post) => (
                  <div key={post.$id}>
                    <Link to={`/post/${post.$id}`}>
                      <PostCard {...post} />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No posts available</p>
            )}
          </>
        ) : (
          <h1 className="text-3xl font-semibold text-center text-gray-700 mt-20">
            Login to read your favorite blogs
          </h1>
        )}
      </div>
    </div>
  );
};

export default Home;
