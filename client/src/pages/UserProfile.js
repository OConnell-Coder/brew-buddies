import React from "react";
import { useParams, useNavigate, } from "react-router-dom";
import { Row, Col, Button } from "antd";
// import 'antd/dist/antd.css';
// import BreweryCard from "../components/BreweryCard";
// import ReviewCard from "../components/ReviewCard";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER, GET_ME } from "../utils/queries";
import { ADD_FRIEND, REMOVE_FRIEND } from "../utils/mutations";
// import Auth from "../utils/auth";
// import { ExclamationCircleFilled } from "@ant-design/icons";
import styles from './UserProfile.module.css';
const ObjectId = require("bson-objectid");



export function UserProfile() {
  const [addFriend] = useMutation(ADD_FRIEND);
  const [removeFriend] = useMutation(REMOVE_FRIEND)
  const navigate = useNavigate();


  const { username } = useParams();
  const { loading: loadingUser, error: errorUser, data: dataUser } = useQuery(GET_USER, {
    variables: { username },
  });
  const userData = dataUser?.user
  const { loading: loadingMe, error: errorMe, data: dataMe, refetch } = useQuery(GET_ME)
  const meData = dataMe
  const imageData = userData?.profilePic;
  let profilePic =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  console.log(userData);
  if (!userData) {
    return <div>Loading...</div>; // return a loading state if userData is falsy
  }
  // if check to see if userData._id === something in me.friends._id
  
  const handleFollowFriend = async () => {
    console.log(new ObjectId(userData._id))
    try {
      const { data } = await addFriend({
        variables: {
          friendId: new ObjectId(userData._id)
        },
      });
      refetch();
      if (!data) {
        throw new Error('You have no friends');
      }
      navigate('/profile')
    } catch (err) {
      console.error(err);
    }
  }
  const handleRemoveFriend = async(friendId) => {
    try {
      console.log("from line 57!!!!!!!!!", friendId)
      const { data } = await removeFriend({
        variables: {
          friendId: new ObjectId(userData._id),
        },
      });
      refetch();
      navigate('/profile');
      // setBreweryList((current) => {
      //   // Create a new set of breweries excluding the deleted brewery
      //   const updatedBreweries = new Set(
      //     [...current].filter((brewery) => brewery.id !== breweryId)
      //   );
      //   return updatedBreweries;
      // });
      console.log(data)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
    
      <Row>
        <Col>
          <div>
            {imageData ? (
              <img
                className={styles.profilePic}
                src={imageData}
                alt="Database profile"
              />
            ) : (
              <img
                className={styles.profilePic}
                src={profilePic}
                alt="Default profile"
              />
            )}
          </div>
        </Col>
        <Col>
          <h2>{userData.username} {userData.postalCode}</h2>
          <div>{userData.birthday}</div>
          <div>{userData.pronouns}</div>
          <div>{userData.intro}</div>
        </Col>
      </Row>
      {
    meData?.me.friends && meData.me.friends.length > 0 ? (
      meData.me.friends.map((friend) => (
        (friend.username === userData.username)?
        <Button key={friend.username} onClick={handleRemoveFriend}>
        Remove Friend
      </Button>
      :
      console.log("hi")
        
      )
      )
    ) : (
      <Button onClick={handleFollowFriend}>
      Add Friend
    </Button>
  )
  }
      <Row>
        <h2>My most recent reviews</h2>
        {/* <ReviewCard/>
        <ReviewCard/>
        <ReviewCard/> */}
      </Row>
      <Row>
        <h2>Places I hope to go</h2>
        {/* <BreweryCard/>
        <BreweryCard/>
        <BreweryCard/> */}
      </Row>
      

    </>
  );
}

