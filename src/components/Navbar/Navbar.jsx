import React from 'react'
import { Link } from 'react-router'

function Navbar() {
  return (
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/class/new'>Create Class</Link>
    </nav>
  )
}

export default Navbar