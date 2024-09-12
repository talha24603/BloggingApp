import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import services from '../appWrite/config'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostCard from './PostCard'
import editPhoto from '../assets/editPhoto.svg'
import blankProfile from "../assets/blank-profile.webp";

function Profile() {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const { register, handleSubmit } = useForm()
    const userData = useSelector((state) => state.auth.userData)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        setLoading(true)
        if (!profile) {
            try {
                // Uploading the image first
                const uploadImage = await services.uploadFile(data.image[0])
                if (uploadImage) {
                    data.featuredImage = uploadImage.$id
                } else {
                    console.error("Image upload failed")
                    return
                }

                // Adding profile
                const added = await services.addProfile({ ...data, userId: userData.$id, name: userData.name })
                if (added) {
                    setProfile({ ...data, userId: userData.$id, $id: added.$id, name: userData.name });

                }
            } catch (error) {
                console.log("Error adding profile:", error)
            }
        } else {
            try {
                // Updating profile
                await services.deleteFile(profile.featuredImage)
                const uploadImage = await services.uploadFile(data.image[0])
                if (uploadImage) {
                    data.featuredImage = uploadImage.$id
                } else {
                    console.error("Image upload failed")
                    return
                }

                const updated = await services.updateProfile(profile.$id, { ...data, userId: userData.$id, name: userData.name })
                if (updated) {
                    setProfile({ ...data, name: userData.name, userId: userData.$id, $id: profile.$id });

                }
            } catch (error) {
                console.log("Error updating profile:", error)
            }
        }
        setLoading(false)
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await services.getProfiles()
                if (response) {
                    const requiredProfile = response.documents.filter((profile) => profile.userId === id)
                    if (requiredProfile.length > 0) {
                        setProfile(requiredProfile[0]);
                    }
                }
            } catch (error) {
                console.log("Error fetching profile:", error)
            }
        }
        fetchProfile()
        const fetchPosts = async () => {
            const post = await services.getPosts()
            if (post) {
                setPosts(post.documents)
            }
        }
        fetchPosts()
    }, [id])

    return (
        <div className='flex flex-col justify-center gap-4 items-center'>
            <div className='bg-slate-100 w-full flex flex-col justify-center items-center gap-2 p-4'>
              

                <>
                    <h1 className='text-3xl font-semibold'>Profile</h1>

                    <div className='relative'>
                        {profile && profile.featuredImage ? (
                            <img
                                style={{ objectFit: 'cover' }}
                                className='rounded-full w-40 h-40 border-2 border-gray-500'
                                src={services.getFilePreview(profile.featuredImage)} // Fetching the image properly
                                alt="profileImage"
                            />
                        ) : (
                            <img
                                style={{ objectFit: 'cover' }}
                                className='rounded-full w-40 h-40 border-2 border-gray-500'
                                src={blankProfile} // Default image when profile image is not available
                                alt="defaultProfileImage"
                            />
                        )}

                        {userData.$id === id && <img
                            onClick={() => document.getElementById('imageInput').click()}
                            className='w-7 bg-transparent  absolute p-0  bottom-4 right-0 hover:cursor-pointer transition-transform duration-300 ease-in-out hover:scale-125'
                            src={editPhoto}
                            alt="edit"
                        />}
                    </div>

                </>

                <span className='text-3xl font-semibold'>
                    {profile && profile.name && (
                        <span>{profile.name}</span>
                    )}
                </span>
                {userData.$id === id &&
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                            style={{ display: 'none' }}
                            id='imageInput'
                            type="file"
                            accept="image/jpg, image/jpeg, image/png, image/gif"
                            {...register('image', { required: true })}
                        />
                        <button className='p-2 bg-[#0CA7FF] hover:bg-[#37b2fa] font-semibold text-white rounded-lg' type='submit'>
                            {loading ? (
                                profile ? 'Updating...' : 'Adding...'
                            ) : (
                                profile ? 'Update Image' : 'Add Image'
                            )}
                        </button>
                    </form>}
            </div>

            {userData.$id === id && <div className='w-full flex justify-end items-end'>
                <Link to={'/addpost'}>
                    <div className='mx-10 p-2  bg-[#0CA7FF] hover:bg-[#37b2fa] font-semibold text-white rounded-lg'>
                        Add Post
                    </div>
                </Link>
            </div>}

            <div className='container min-h-screen mx-auto p-4'>
                <div className='grid gap-4 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1'>
                    {posts.map((post) => (
                        post.userId === id ? (
                            <div key={post.$id}>
                                <Link to={`/post/${post.$id}`}>
                                    <PostCard {...post} />
                                </Link>
                            </div>
                        ) : null
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Profile
