import React from 'react'

function Footer() {
  return (
    <section className='footer'>
        <h1 className='brand-footer font-brand font-medium tracking-widest'>#Unleash the visuals</h1>
        {/* Logo sections */}
        <div className='flex items-center justify-center gap-8 my-8'>
            <i class="ri-facebook-circle-fill logo"></i>
            <i class="ri-instagram-fill logo"></i>
            <i class="ri-twitter-x-fill logo"></i>
            <i class="ri-youtube-fill logo"></i>
            <i class="ri-linkedin-box-fill logo"></i>
        </div>

        {/* Disclaimer */}
        <div className='text-center text-gray-500 text-sm'>
            <p className='my-2'>Copyright {new Date().getFullYear()}© Bookit Pvt. Ltd. All Rights Reserved.</p>
            <p className='my-4'>The content and images used on this site are copytight protected and copyright vests with the respective owners.The usage of the content and images on the website is intended to promote the work and no endorsement of the artist shall be implied.Unathorized use is prohibited and punishable under the law.</p>
        </div>
    </section>
  )
}

export default Footer