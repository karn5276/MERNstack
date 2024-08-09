import React, { useEffect, useState } from 'react'
import GetAvgRating from '../../../utils/avgRating';
import { Link, useNavigate } from 'react-router-dom';
import RatingStars from '../../common/RatingStars';
import { CiHeart } from "react-icons/ci";
// import Heart from '../../common/heart/Heart';
import { FaHeart } from "react-icons/fa";

const TurfCard = ({ turf, Height }) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const count = GetAvgRating(turf.reviews);
        setAvgReviewCount(count);
    }, [turf])

    const handleHover = () => {
      setIsHovered(!isHovered);
    };
  


    return (
        <div className='mb-4 p-2 relative md:min-h-[500px]  min-h-[370px] flex gap-y-3 md:w-1/4 w-1/2 hover:scale-[1.03] transition-all duration-200 z-50 '>
            <div>

                <Link to={`/turfs/${turf._id}`} className='w-full'>
                    <div className='bg-white min-h-[320px] p-2  md:min-h-[460px] md:max-h-[600px] rounded-lg'>
                        <div>
                            <img
                                src={turf?.image}
                                alt='turf thumbnail'
                                className={`${Height} w-full rounded-xl object-cover`}
                            />
                        </div>
                        <div className='flex flex-col gap-2 px-2 py-3'>
                            <div className='flex justify-between'>
                                <p className='text-md md:text-xl font-bold text-black'>{turf?.turfName}</p>
                                <button>
                                    <span>
                                        {
                                            isHovered ? (<><FaHeart className='text-3xl text-red-600'  onMouseLeave={handleHover}></FaHeart></>):(<><CiHeart onMouseEnter={handleHover}
                                                onMouseLeave={handleHover} 
                                                className='text-3xl'>
                                        </CiHeart></>)
                                        }
                                        
                                    </span>
                                </button>
                                {/* <button><Heart></Heart></button> */}
                            </div>

                            {/* owner name section  */}
                            {/* <p className='text-[12px] md:text-xl text-richblack-5 opacity-85'>Owner: <span className='text-black opacity-85'>{turf?.owner?.firstName} {turf?.owner?.lastName}</span></p> */}
                            
                            <p className='text-black text-md opacity-70'>{turf.area} {turf.city} {turf.pinCode}</p>
                            <div className='flex'>
                                {/* <span className='text-yellow-500'>{avgReviewCount || 0}</span> */}
                                <RatingStars Review_Count={avgReviewCount} />
                                {/* <span className=' md:block hidden md:text-xl text-black'>{turf?.reviews?.length} Ratings</span> */}
                            </div>
                            
                        </div>
                        
                    

                    </div>
                </Link>
                {/* <div className='absolute bottom-0  w-full mt-5 pt-2'>
                    <button onClick={() => navigate(`/turfs/${turf._id}`)} className='bg-green-500 text-white w-11/12 m-auto p-2 rounded-md mt-2 text-lg'>View</button>
                </div> */}
            </div>


        </div>
    )
}

export default TurfCard;