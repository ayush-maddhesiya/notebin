"use client"
import ProtectedRoute from '@/shared/ProtectedRoute'
import UploadNotes from '@/shared/UploadNotes'
import React from 'react'

const page = () => {
  return (
    <>
    <ProtectedRoute>
    <UploadNotes/>
    </ProtectedRoute>
    </>
  )
}

export default page