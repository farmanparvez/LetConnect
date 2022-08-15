import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileItems = ({ profile }) => {
// const ProfileItems = ({ profile: { user:{ name, avatar}, skills, company, location, _id, }}) => {
  // const {} = user;
  // const { profile } = props
    console.log(profile)
  return (
    <div className="profile bg-light">
      <img src={profile?.user?.avatar} alt="" className="round-img" />
      <div>
        <h2>{profile?.user?.name}</h2>
        <p>{profile?.company && <span> at {profile?.company}</span>}</p>
        <p className="my-1">{profile?.location && <span>{profile?.location}</span>}</p>
        <Link to={`/profile/${profile?._id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {profile?.skills.slice(0, 4).map((skills, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i>{skills}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItems.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItems;
