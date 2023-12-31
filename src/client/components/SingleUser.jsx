import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


export default function SingleUser({ token }) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const API = "/api";

  const { userId } = useParams();

  useEffect(() => {
    fetchSingleUser();
  }, []);

  async function fetchSingleUser() {
    try {
      const response = await fetch(`${API}/users/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result);
      setUserDetails(result.user);
    } catch (error) {
      console.error(error);
    }
  }

  function handleClick() {
    navigate(`/admin/users/${userId}`);
  }

  return (
    <>
      <h3>
        {userDetails.first_name} {userDetails.last_name}
      </h3>
      <ul>
        <li>Email: {userDetails.email}</li>
        <li>Address: {userDetails.address}</li>
        <li>Phone Number: {userDetails.phone_number}</li>
        <li>Permissions: {userDetails.permissions}</li>
        <li>User ID: {userDetails.user_id}</li>
        <button onClick={handleClick}>Edit</button>
      </ul>
    </>
  );
}