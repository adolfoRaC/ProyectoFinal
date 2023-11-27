import React from 'react'
import Link from 'next/link'
import './NotFound.css'
const NotFoundPage = () => {
    return (
        <>
            <div className="container-not-found ">
                <svg className='svg-NotFound' viewBox='0 0 200 300'>
                    <defs>
                        <mask id="mask">
                            <rect className='react-notFound' width='200' height='200' />
                            <path className='path-notFound' d='M8,1 C145 100 -35 90 155 180 105 -190 10000 10 100 20' />
                        </mask>
                    </defs>
                    <path className='path-notFound' id='static-base' d='M1,8 C160 100 -25 90 150 190' />
                </svg>

                <svg className='svg-NotFound' viewBox='0 0 200 300'>
                    <defs>
                        <mask id="mask">
                            <rect className='react-notFound' width='200' height='200' />
                            <path className='path-notFound' d='M8,1 C145 100 -35 90 155 180 105 -190 10000 10 100 20' />
                        </mask>
                    </defs>
                    <path className='path-notFound' id='base' d='M1,8 C160 100 -25 90 150 190' />
                </svg>
                <div id="bean">
                </div>

            </div>
            <div className='content-msg-notfound'>

                <h2 className='h2-NotFound'>404</h2>
                <h2 className='h2-NotFound-sub'>Ups, Ha ocurrido un error</h2>
                <Link href='/' className='btn-notFound'>
                    Ir al inicio
                </Link>
                <br />
                <br />
            </div>
        </>
    )
}

export default NotFoundPage