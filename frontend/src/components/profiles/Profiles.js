import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles } from "../actions/profile";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItems";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
// console.log(profiles, loading)
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connnectdevelop"></i>Browse and connect with
            developers
          </p>
          <div className="profiles">
            {Profiles?.length > 0 ? (
              profiles.map((prof) => <ProfileItem key={prof._id} profile={prof} />)
            ) : (
              <h4> No profiles found.... </h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

// Profiles.propTypes = {
//   getProfiles: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
// };

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
