import React from 'react'
import errorImg from "../assets/images/error_img.webp"

function ImageError() {
  return (
    <img src={errorImg} alt='movie poster ' className='w-[100%] h-[350px]' ></img> 
  )
}

export default ImageError