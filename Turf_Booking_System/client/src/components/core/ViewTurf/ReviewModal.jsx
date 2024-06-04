
import React, { useState } from 'react'
import { useEffect } from 'react';
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form';
import ReactStars from 'react-rating-stars-component';
import { useParams } from 'react-router';
import { createRating } from '../../../services/operation/TurfDetailsAPI';
import Spinner from '../../common/spinner/Spinner';

const ReviewModal = ({ setReviewModal, turfId }) => {
  const { user, profileImage } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();


  useEffect(() => {
    setValue("userExperience", "");
    setValue("userRating", undefined);
    console.log("turfId: ", turfId);
  }
    , [])

  const ratingChanged = (newRating) => {
    setValue("userRating", newRating);
    console.log("ratingChanged called");
  };


  const onSubmit = async (data) => {
    setloading(true);
    const res = await createRating({
      turfId: turfId,
      review: data.userExperience,
      rating: data.userRating
    }, token);
    setReviewModal(false);
    console.log(res);
    console.log("onSubmit called");
    setloading(false);
  }




  return (
    <div>
      {
        loading ? (<><Spinner></Spinner></>) : (<> <div className=' z-50 my-10 w-full md:w-11/12 max-w-[700px] rounded-lg border-1 border-black bg-white fixed left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2'>
          <div className='flex items-center justify-between rounded-t-lg bg-neutral-200 p-5'>
            <p className='text-xl font-semibold text-richblack-5'>Add Review</p>
            <button>
              <RxCross2 onClick={() => { setReviewModal(false) }} className=' text-xl text-richblack-25' />
            </button>
          </div>
          <div className='p-5'>
            <div className='flex items-center justify-center gap-x-4'>
              <img className='aspect-square w-[50px] rounded-full object-cover' src={profileImage} alt="user" />
              <div>
                <p className='font-semibold text-richblack-5'>{user?.firstName} {user?.lastName}</p>
                <p className='text-sm text-richblack-5'>Posting Publicly</p>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-6 flex flex-col items-center' >
              <ReactStars onChange={ratingChanged} count={5} size={44} activeColor="#ffd700" />
              <input value={getValues().userRating} {...register("userRating", { required: true })} type="hidden" />
              {errors.userRating && <span className='text-red-600 text-[11px]'>* Please provide your rating</span>}
              <div className='flex w-full md:w-11/12 flex-col space-y-2'>
                <label htmlFor="userExperience" className='text-sm text-richblack-5'>Add Your Experience <span className='text-pink-200'>*</span> </label>
                <textarea {...register("userExperience", { required: true })} className='form-style resize-x-none pl-2 pt-2 text-lg min-h-[130px] w-full' placeholder='Write your experience...'></textarea>
                {errors.userExperience && <span className='text-red-600 text-[12px]'>* Please provide your expirence</span>}
              </div>
              <div className='mt-6 flex w-11/12 justify-end gap-x-2'>
                <button onClick={() => { setReviewModal(false) }} className='px-4 py-2 rounded-lg text-sm font-medium bg-neutral-200'>Cancel</button>
                <button type='submit' className='px-4 py-2 rounded-lg text-sm font-medium text-black  bg-green-500'>Submit</button>
              </div>
            </form>
          </div>
        </div>
          <div className='fixed inset-0 z-10 !mt-0 grid place-items-center overflow-auto bg-opacity-10 backdrop-blur-sm over'></div> </>)
      }

    </div>
  )
}

export default ReviewModal;
