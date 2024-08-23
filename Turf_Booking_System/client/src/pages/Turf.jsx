import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { getFullDetailsOfTurf } from '../services/operation/TurfDetailsAPI';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { buyCourse } from '../services/operation/ownerFeature';
import RatingStars from '../components/common/RatingStars';
import GetAvgRating from '../utils/avgRating';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';
import { FaShareSquare } from 'react-icons/fa';
import { ACCOUNT_TYPE } from '../utils/constants';
import { FaRupeeSign } from "react-icons/fa";
import { setTime } from '../slices/paymenySlice';
import Spinner from '../components/common/spinner/Spinner';

const Turf = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { turfId } = useParams();

    const [turfDetails, setTurfDetail] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    const [timePrices, setTimePrice] = useState([]);
    const [price, setPrice] = useState(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const { time } = useSelector((state) => state.payment);
    const [loading, setloading] = useState(false);
    const [booked , setBooked] = useState(null);


    const handelPayment = () => {
        if (token) {

            if(time){
                let turf_time = parseInt(time);

                if(turf_time!==10 && turf_time!==11 && turf_time!==12){
                    turf_time=turf_time+12;
                }

                const currentHour = new Date().getHours();

                if(currentHour>turf_time){
                    return toast.error("Time's up! Book the turf for this time tomorrow!")
                }
            }

            if(booked===1){
                return toast.error("Turf Already Booked For Given Time");
            }
            if (!price) {
                toast.error("Please select the time");
                return;
            }
            if (time && price) {
                buyCourse(token, [turfId], parseInt(price) + 14, time, user, navigate);
            }
        }
        else {
            navigate('/login');
        }
    }

    useEffect(() => {
        const getTurfDetails = async () => {
            setloading(true);
            const response = await getFullDetailsOfTurf(turfId);
            console.log("getCourseDetails -> response", response);
            console.log("price -> response", response.turfDetails.priceTime.data);
            setTimePrice(response.turfDetails.priceTime.data);

            setTurfDetail(response.turfDetails);
            setloading(false);
        }
        getTurfDetails();
    }, [turfId]);

    useEffect(() => {
        if (turfDetails?.reviews?.length > 0) {
            const count = GetAvgRating(turfDetails?.reviews);
            setAvgReviewCount(count);
            console.log("getCourseDetails -> count", parseInt(count));
        }
        console.log("turfDetails: ", turfDetails);
    }, [turfDetails?.reviews]);

    const timeHandler = (timePrice, index) => {

        if(timePrice.booked===1){
            setBooked(1);
        }
        else{
            setBooked(null);
        }
        setPrice(timePrice.price);
        setActiveIndex(index);

        dispatch(setTime(timePrice.time));
    }



    if (!turfDetails) return <div className='flex justify-center items-center h-screen'>
        <Spinner></Spinner>
    </div>

    return (
        <div>

            {
                loading ? (<><Spinner></Spinner></>) : (<>
                    <div className=' box-content px-3 sm:px-4 w-full lg:relative flex lg:flex-row flex-col'>
                        <div className='m-auto  px-3 grid min-h-[450px] max-w-maxContentTab w-full lg:w-7/12 justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-3 xl:max-w-[810px]'>

                            <div className='relative block w-full max-h-[30rem] mr-10 lg:mr-0'>
                                <div className='absolute bottom-0 left-0 h-full w-full  shadow-[#161D29_0px_-64px_36px_-28px_inset]'></div>
                                <img src={turfDetails?.image} className='w-full h-full' alt="course img" />
                                <div className='text-center absolute right-3 top-[-15px]'>
                                    {/* copy url */}
                                    <button className='mx-auto flex items-center gap-2 py-6 text-yellow-500' onClick={
                                        () => {
                                            navigator.clipboard.writeText(window.location.href);
                                            toast.success('URL copied to clipboard');
                                        }
                                    }>
                                        <FaShareSquare className='text-xl text-yellow-500' />
                                        <span className='hidden md:block'>Share</span>
                                    </button>
                                </div>
                            </div>



                            {/* // turf description and other details  */}
                            <div className='z-30 w-full h-auto mr-10 flex flex-col items-start mt-2 justify-start gap-4 py-4 text-lg text-richblack-5'>
                                <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>{turfDetails?.turfName}</p>
                                <p className='text-richblack-200'>{turfDetails?.turfShortDesc}</p>
                                <div className='flex gap-x-3 items-center'>
                                    <span className='text-yellow-400'>{avgReviewCount || 0}</span>
                                    <RatingStars Review_Count={avgReviewCount} />
                                    <span className=' md:block hidden md:text-xl text-richblack-5'>({turfDetails?.reviews?.length} Reviews)</span>
                                </div>
                                <div>
                                    <p>Owner: {turfDetails?.owner?.firstName}  {turfDetails?.owner?.lastName}</p>
                                </div>
                                <div className='flex flex-wrap gap-3 text-lg justify-center items-center'>
                                    <AiOutlineInfoCircle className='text-2xl text-richblack-5' />
                                    <p className='text-richblack-50'>Created at &nbsp;
                                        {new Date(turfDetails?.createdAt || turfDetails?.updatedAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                    <p className='flex items-center gap-2 text-richblack-50'><BsGlobe className='text-lg text-richblack-50' />English</p>
                                </div>
                            </div>


                        </div>


                        {/* // add price time here  */}
                        <div className='lg:w-4/12 w-full lg:bg-neutral-100 md:pl-5 mt-5 rounded-md flex justify-start items-start lg:justify-items-center flex-col'>


                            {/* heading  */}
                            <div className='w-11/12 md:p-3 p-0 py-3'><p className='text-2xl'>Embrace the freedom to play at any time, for creativity knows no schedule.</p></div>

                            {/* time  */}
                            <div className='flex flex-wrap gap-4 w-10/12 p-0 pt-3'>
                                {
                                    timePrices && (
                                        timePrices.map((timePrice, index) => (
                                            <div key={index} onClick={() => timeHandler(timePrice, index)} className={`rounded-md border-2 cursor-pointer border-green-500 px-1 md:px-6 py-2 ${index === activeIndex ? ("bg-green-500") : ("")} ${timePrice?.booked===1? (" border-orange-500"):("border-green-500")} ${index === activeIndex && timePrice?.booked===1 ? ("bg-orange-500 text-white") : ("")}`}>
                                                <p className={`${index === activeIndex ? ("text-white") : ("text-green-500")} ${timePrice?.booked===1? ("text-orange-500"):("text-green-500")}`}>{timePrice.time}
                                                    {
                                                        (parseInt(timePrice.time.split(':')[0]) === 10) || (parseInt(timePrice.time.split(':')[0]) === 11) ? (<span> PM</span>) : (<span> AM</span>)
                                                    }</p>
                                            </div>
                                        ))
                                    )
                                }
                            </div>

                            {/* price  */}
                            <div className='w-11/12 md:px-3 px-0 flex flex-col items-start mt-4'>
                                <div className='w-full'>
                                    <p className='md:text-2xl border-neutral-300 md:p-2  border-y-2 text-lg font-bold'>Amount payable</p>
                                </div>
                                {
                                    price && (

                                        <div className='w-full'>
                                            <div className='w-full p-1 mt-2 md:w-11/12 flex justify-between'>
                                                <div>
                                                    <p className='md:text-xl'>Slots</p>
                                                </div>

                                                <div className='text-xl flex justify-center items-center'>
                                                    <FaRupeeSign></FaRupeeSign>
                                                    <span>{price}.00</span>
                                                </div>
                                            </div>

                                            <div className='w-full p-1 mt-2 md:w-11/12 flex justify-between'>
                                                <div>
                                                    <p className='md:text-xl'>Convenience Fee</p>
                                                </div>

                                                <div className='text-xl flex justify-center items-center'>
                                                    <FaRupeeSign></FaRupeeSign>
                                                    <span>14.00</span>
                                                </div>
                                            </div>

                                            <div className='w-full p-1 mt-2 md:w-11/12 flex justify-between'>
                                                <div>
                                                    <p className='md:text-xl font-bold'>Total</p>
                                                </div>

                                                <div className='text-xl flex justify-center items-center'>
                                                    <FaRupeeSign></FaRupeeSign>
                                                    <span className='text-red-500 font-bold'>{parseInt(price) + 14}.00</span>
                                                </div>
                                            </div>


                                        </div>
                                    )
                                }

                            </div>

                            {/* button  */}
                            {ACCOUNT_TYPE.OWNER !== user?.accountType &&
                                <div className='flex rounded-md flex-col mt-4 border-y border-y-richblack-500 w-11/12 md:p-3 p-0 py-3'>
                                    <>
                                        <button onClick={handelPayment} className='bg-green-500 py-2 rounded-md w-11/12 cursor-pointer'>BOOK</button>
                                    </>
                                </div>
                            }


                            <div className='md:mt-8 text-red-600 md:text-xl'><p>Terms & Condition :</p></div>
                            <div className='md:mt-2 md:text-lg space-y-2'>
                                <p> - Amount is refundable only up to one day prior</p>
                                <p> - Bring transition id or screenshot of the payment with you</p>
                            </div>


                        </div>


                        <div className='right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute'>
                            <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5'>
                                <img src={turfDetails?.image} alt="course img" className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full' />
                                <div className='px-4'>

                                    <div className='flex flex-col gap-4'>
                                        {ACCOUNT_TYPE.OWNER !== user?.accountType &&
                                            <>
                                                <button onClick={handelPayment} className='yellowButton'>Book</button>
                                            </>
                                        }
                                    </div>

                                    <div className='text-center'>
                                        {/* copy url */}
                                        <button className='mx-auto flex items-center gap-2 py-6 text-green-500' onClick={
                                            () => {
                                                navigator.clipboard.writeText(window.location.href);
                                                toast.success('URL copied to clipboard');
                                            }
                                        }>
                                            <FaShareSquare className='text-xl text-green-500' />
                                            <span>Share</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className='m-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
                        <div className='max-w-maxContentTab lg:mx-0 xl:max-w-[990px]'>
                            <div className='my-8 border border-richblack-600 p-3 md:p-8'>
                                <p className='text-3xl font-semibold'>
                                    Reviews
                                </p>
                                <div className='mt-5'>
                                    <div className='flex items-center gap-4'>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-4xl font-semibold'>{avgReviewCount}</span>
                                            <span className='text-2xl'>/5</span>
                                            <span className='text-richblack-50'>({turfDetails?.reviews?.length} ratings)</span>
                                            <span className='text-richblack-50'>|</span>
                                        </div>
                                    </div>
                                </div>
                                {
                                    turfDetails?.reviews?.map((item, index) => (
                                        <div key={index} className='flex flex-col md:items-baseline gap-3 my-4 mt-12 ga'>
                                            <div className='flex items-center gap-2'>
                                                <img src={`https://api.dicebear.com/5.x/initials/svg?seed=${item?.user?.firstName} ${item?.user?.lastName}`} alt="user img" className='w-[30px] h-[30px] rounded-full object-cover' />
                                                <div className='flex flex-col'>
                                                    <p className='md:text-xl min-w-max font-semibold'>{item?.user?.firstName} {item?.user?.lastName}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex items-center gap-2'>
                                                    <RatingStars Review_Count={item?.rating} />
                                                </div>
                                                <p className='text-richblack-50 text-[12px] md:text-sm max-w-4xl'>{item?.review}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </>)
            }

        </div>
    )
}

export default Turf;