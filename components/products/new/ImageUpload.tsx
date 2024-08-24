"use client"

import { getImagePath } from '@/src/utils'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useState } from 'react'
import { TbPhotoPlus } from 'react-icons/tb'

interface ImageUploadProps {
  image?: string
}

export default function ImageUpload({ image }: ImageUploadProps) {
  const [resource, setResource] = useState('')

  return (
    <CldUploadWidget
      onSuccess={(result, { widget }) => {
        if (result.event === 'success') {
          widget.close()

          // if (typeof result.info !== 'string') {
          // setResource(result.info!.secure_url)
          if (typeof result.info !== 'string' && result.info?.secure_url) {
            setResource(result.info.secure_url)
          }
        }
      }}
      uploadPreset='next_quiosco'
      options={{
        maxFiles: 1,
        // 10MB
        maxFileSize: 10000000,
        // on_success: 'ga'
        // onUpload: (file) => {
        //   console.log(file)
        // },
        // upload: () => {},
        // cancel: () => {},
        // error: () => {},
        // onRemove: () => {},
      }}
    >
      {({ open }) => (
        <>
          <div className='space-y-2'>
            <label className='text-slate-800'>
              Imagen Producto
            </label>
            <div
              className='relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100'
              onClick={() => open()}
            >
              <TbPhotoPlus
                size={50}
              />
              <p className='text-lg font-semibold'>
                Agregar Imagen
              </p>

              {
                resource && (
                  <div className='absolute inset-0 w-full h-full'>
                    <Image
                      fill
                      // className='w-full'
                      style={{
                        objectFit: 'contain',
                      }}
                      src={resource}
                      alt='imagen del nuevo producto'
                    // style={{
                    //   backgroundImage: `url(${resource})`,
                    //   backgroundPosition: 'center',
                    //   backgroundSize: 'cover',
                    // }}
                    />
                  </div>
                  // <div/>
                )
              }
            </div>
          </div>

          {
            image && !resource && (
              <>
                <label>
                  Imagen Actual:
                </label>
                <div className='relative h-64 w-64 mx-auto'>
                  <Image
                    fill
                    style={{
                      objectFit: 'contain',
                      // display: 'flex',
                      // justifyContent: 'center',
                    }}
                    src={getImagePath(image)}
                    alt='imagen actual del producto'
                  />
                </div>
              </>
            )
          }

          <input
            type="hidden"
            name='image'
            value={resource || image}
          // defaultValue={image}
          />
        </>
      )}
    </CldUploadWidget>
  )
}
