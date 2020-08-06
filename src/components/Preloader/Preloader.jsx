import React from 'react'

export const Preloader = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    )
  }

  return null
}
