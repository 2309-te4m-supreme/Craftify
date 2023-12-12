import { Link } from 'react-router-dom'
import springFlowers from "../assets/springFlowers.mp4";

export default function Home() {
  return (
    <>
      {
        <video
          className="springFlowers"
          src={springFlowers}
          autoPlay
          loop
          muted
        />
      }
      <div className="center-container">
        <div class="gray-200">
          <Link to='/products'>
          <button className="btn btn-200">View Products</button>
          </Link>
        </div>
      </div>
    </>
  );
}
