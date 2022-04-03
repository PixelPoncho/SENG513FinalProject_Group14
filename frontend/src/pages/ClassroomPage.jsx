// Importing Components from node_modules
import React, { useState } from 'react'
import Grid from '../components/Grid'

// Importing styling
import '../styles/ClassroomPage.scss';

function ClassroomPage() {
  return (
    <div className="classroom-container">
      <Grid gridWidth={14} />
    </div>
  )
}

export default ClassroomPage