import React from 'react'
import './NotFound.css';

function NotFound() {
  return (
    <div className='notFound'>
        <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
        <div className="textNotFound text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Página no encontrada</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">Lo sentimos, no hemos podido encontrar la página que busca.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/publications"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ir a inicio
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

export default NotFound