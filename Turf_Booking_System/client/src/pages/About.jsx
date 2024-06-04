import React from 'react'

import ContactFormSection from '../components/core/about/ContactFormSection';
import footer from '../components/common/footer';

const About = () => {
  return (
    <div className='mx-auto text-white'>
  

      
      {/* section 5 */}
      <section className='mx-auto p-2 flex flex-col items-center justify-between gap-5 mb-[140px]'>
        <ContactFormSection />
      </section>


    </div>
  )
}

export default About