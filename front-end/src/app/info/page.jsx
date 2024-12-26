'use client';
import React, { useState, useEffect } from 'react';

export default function Info() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Lấy token từ cookie chỉ trong useEffect
        const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
        const tokenValue = token?.split('=')[1];

        if (!tokenValue) {
            window.location.href = '/dangnhap';
            return; 
        }

        const getUser = async () => {
            try {
                const res = await fetch('http://localhost:3000/users/detailuser', {
                    headers: {
                        Authorization: `Bearer ${tokenValue}`,
                    },
                });

                if (!res.ok) {
                    throw new Error('Error getting user information');
                }

                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.error(error);

            } finally {
                setLoading(false); 
            }
        };

        getUser();
    }, []); 

    if (loading) {
        return <div>Loading...</div>; 
    }

    return (
        <div className='container-info'>
            <div className='content-info'>
                <h2>Personal Information</h2>
                <div className='info'>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Tên:</strong> {user.name}</p>
                    {/* <p><strong>Địa chỉ:</strong> {user.address}</p> */}
                    <button className='btn-logout' onClick={() => {
                document.cookie = 'token=; path=/; max-age=0';
                window.location.href = '/dangnhap';
            }
            }>Đăng xuất</button>
                </div>
            </div> 
        </div>
    );
}
