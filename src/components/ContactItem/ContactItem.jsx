import React from 'react'

import './ContactItem.css'

export const ContactItem = ({ name, phone, onDelete }) => {
  return (
    <li className="collection-item">
      <div className="contact-row">
        <div className="contact-cell">
          <i className="material-icons contact-icon">child_care</i>
          <span>{name}</span>
        </div>
        <div className="contact-cell">
          <i className="material-icons contact-icon">phone</i>
          <span>{phone}</span>
        </div>
        <div className="contact-fill"></div>
        <div className="contact-service">
          <i className="material-icons contact-icon contact-service-icon">
            mode_edit
          </i>
          <i
            className="material-icons contact-service-icon icon-red"
            onClick={onDelete}
          >
            delete_forever
          </i>
        </div>
      </div>
    </li>
  )
}
