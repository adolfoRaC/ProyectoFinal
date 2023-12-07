'use client'
import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
const page = () => {
    const { data: session, status } = useSession();
    useEffect(() => {
        const fetchData = async () => {
          if (session?.user.token) {
            try {
              const response = await axios.get(`http://localhost:8080/api/ventas/by-vendedor/2`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
                  "Authorization": `Bearer ${session.user.token}`
                },
              });
              console.log(response.data);
            } catch (error) {
              console.error('Errores', error);
            }
          }
        };
    
        fetchData();
        
      }, [session]);
  return (
    <div>page</div>
  )
}

export default page