import { Link } from "react-router-dom";


export function HomePage() {
  return (
    <div >
      <h1>Meine Website</h1>
      <Link to="/personal" className="category-box">
        Persönliches
      </Link>
    </div>
  )
}
