import React from 'react'
import { Link } from 'react-router-dom'

const PaymentSuccessful = () => {
  return (
      <div>
          <h2>Thank you</h2>
          <p>Your order has been placed</p>
          <Link to='/'>Go to Home</Link>
      </div>
  )
}

export default PaymentSuccessful