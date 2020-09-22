import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name }
  }
}) => (
  <div className="profile-about bg-light p-2">
    {bio && (
      <>
        <h2 className="text-primary">{name.trim().split(' ')[0]}s Bio</h2>
        <p>{bio}</p>
        <div className="line" />
      </>
    )}
    <h2 className="text-primary">Skills & Hobbies</h2>
    <div className="skills">
      {skills.map((skill, index) => (
        <div key={index} className="p-1">
          <Tag color="#17a2b8">{skill}</Tag>
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
