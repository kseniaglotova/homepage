import { Link } from 'react-router-dom'
export function Links () {
  return (
    <div>
      <h1> Links Page</h1>
      <p>This is the links page.</p>
      <ul>
        <li><Link to="https://www.instagram.com/kseniaglotovaa/" >Personal Instagram</Link></li>
        <li><a href="mailto:ksenia.a.glotova@gmail.com">E-Mail</a></li>
        <li><a href="tel:+4915140314269">Phone Number</a></li>
        </ul>
    </div>
  )
}