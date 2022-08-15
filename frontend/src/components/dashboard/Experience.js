import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Monent from "react-moment";
import { deleteExperience } from "../actions/profile";

const Experience = ({ experience, deleteExperience }) => {
  // console.log(experience)
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Monent format="YYYY/MM/DD">{exp.from}</Monent> -{" "}
        {exp.to === null ? (
          "Now"
        ) : (
          <Monent format="YYYY/MM/DD">{exp.to}</Monent>
        )}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteExperience(exp._id)}>Delete</button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Year</th>
            <th className="hide-sm"></th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.array.isRequired
};

export default connect(null , {deleteExperience} )(Experience);
