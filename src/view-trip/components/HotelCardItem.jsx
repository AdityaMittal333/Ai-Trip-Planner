import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HotelCardItem({ hotel }) {

  const [photoUrl,setPhotoUrl]=useState(null);
  
    useEffect(()=>{
      hotel&&GetPlacePhoto();
    },[hotel]);
  
    const GetPlacePhoto=async()=>{
      const data={
        textQuery:hotel?.hotelName
      }
      try {
        const resp = await GetPlaceDetails(data);
        const photoname = resp.data.places[0].photos[0].name;
        const newPhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoname);
        setPhotoUrl(newPhotoUrl); 
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

  return (
    <div className='hover:scale-105 transition-all cursor-pointer'>
      <Link to={`https://www.google.com/maps/search/?api=1&query=${hotel?.hotelName},${hotel?.hotelAddress}`} target='_blank'>
      <img src={photoUrl || '/placeholder.WEBP'} 
     className='rounded-xl h-[180px] w-full object-cover' 
     alt="Hotel" />

        <div className='my-2 flex flex-col gap-2'>
          <h2 className='font-medium'>{hotel?.hotelName}</h2>
          <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
          <h2 className='text-sm'>💰 {hotel?.price}</h2>
          <h2 className='text-sm'>⭐ {hotel?.rating}</h2>
        </div>
      </Link>
    </div>
  );
}

export default HotelCardItem;
