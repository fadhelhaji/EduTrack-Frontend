import React from 'react'
import { Link } from 'react-router'

function Navbar() {
  return (
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/class/new'>Create Class</Link>
        <Link to='/class'>Class List</Link>
    </nav>
  )
}

export default Navbar