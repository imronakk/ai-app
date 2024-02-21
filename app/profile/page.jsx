"use client";

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ProfileC from '@components/Profile';

const Profile = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [Posts, setPosts] = useState([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data)
        }
        if (session?.user.id) fetchPosts();
    }, [session?.user.id])

    //   TU LEJA MERA GHAR 
    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const handleConfirm = confirm('Are you sure you want to delete this prompt?');
        try {
            await fetch(`api/prompt/${post._id}`, {
                method: 'DELETE'
            })

            const filterdPosts = Posts.filter((p) => p._id !== post._id)
            setPosts(filterdPosts)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <ProfileC
            name="My"
            desc="Welcome to your personalized profile page"
            data={Posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default Profile