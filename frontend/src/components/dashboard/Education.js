
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Monent from "react-moment";
import { deleteEducation } from "../actions/profile";

const Education = ({ education, deleteEducation }) => {
//   console.log(educations)
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Monent format="YYYY/MM/DD">{edu.from}</Monent> -{" "}
        {edu.to === null ? (
          "Now"
        ) : (
          <Monent format="YYYY/MM/DD">{edu.to}</Monent>
        )}
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => deleteEducation(edu._id)}>Delete</button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Deegree</th>
            <th className="hide-sm">Year</th>
            <th className="hide-sm"></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education : PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
};

export default connect(null, { deleteEducation })(Education);
