import React, { useEffect, useState } from 'react'

import { sidebarLinks } from '../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import {VscSignOut} from "react-icons/vsc"
import ConfirmationModal from '../../common/ConfirmationModel'
import { logout } from '../../../services/operation/authApi'
// import { setCourse, setStep } from '../../../slices/courseSlice'

const Sidebar = () => {

    const {user, loading: profileLoading} = useSelector((state) => state.profile);
    const {loading:authLoading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);


    if(profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                Loading...
            </div>
        )
    }

  return (
    <div className=' text-black bg-white'>
        <div className='hidden min-w-[222px] flex-col border-r-[1px] border-stone-300 lg:flex
        h-[calc[100vh-3.5rem)] bg-white py-10'>

            <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLink key={link.id}  link={link} iconName={link.icon} />
                        )
                    })}
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-stone-300'></div>

            <div className='flex flex-col '>
                    <SidebarLink 
                        link={{name:"Settings", path:"/dashboard/settings"}}
                        iconName="VscSettingsGear"
                    />

                    <button 
                        onClick={ () => setConfirmationModal({
                            text1: "Are You Sure ?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text:"Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                        })}
                        className='text-sm font-medium text-richblack-300 mx-4 my-2'>

                        <div className='flex items-center gap-x-2'>
                            <VscSignOut className='text-lg'/>
                            <span>Logout</span>
                        </div>

                    </button>

            </div>

        </div>







        {/* mobile sidebar */}
        <div className='flex lg:hidden fixed bottom-0 justify-between bg-green-500 items-center px-3 py-1 z-50 w-full'>
        <div className='flex flex-row w-full justify-between'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLink key={link.id}  link={link} iconName={link.icon} />
                        )
                    })}
                    <SidebarLink 
                        link={{name:"Settings", path:"/dashboard/settings"}}
                        iconName="VscSettingsGear"
                    />
            </div>
            

        </div>



      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default Sidebar;