import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'antd';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const { Search } = Input;

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const onSearch = (value) => setSearchValue(value);

  console.log({ profiles });

  return (
    <>
      {loading ? (
        <Spinner tip="Loading..." size="large" />
      ) : (
        <>
          <h1 className="large text-primary">Profiles</h1>
          <p className="lead">
            <i className="fas fa-users" /> Browse and connect with other users.
          </p>
          <div className="profiles-search">
            <Search
              placeholder="Search profile name..."
              onSearch={onSearch}
              enterButton
              loading={false}
            />
          </div>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => {
                if (searchValue) {
                  if (
                    profile.user.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  )
                    return <ProfileItem key={profile._id} profile={profile} />;
                } else {
                  return <ProfileItem key={profile._id} profile={profile} />;
                }
              })
            ) : (
              <h4>No profiles found.</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
