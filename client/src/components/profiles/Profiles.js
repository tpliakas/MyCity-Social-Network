import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { getProfiles } from '../../actions/profile';

const { Search } = Input;

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [searchValue, setSearchValue] = useState(null);
  const [hasProfiles, setHasProfiles] = useState(null);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  useEffect(() => {
    if (!profiles) return;
    setHasProfiles(profiles.length);
  }, [profiles]);

  const onSearch = (value) => setSearchValue(value);

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
            {hasProfiles > 0
              ? profiles.map((profile) => {
                  if (searchValue) {
                    if (
                      profile.user.name
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())
                    )
                      return (
                        <motion.div
                          key={profile._id}
                          initial={{ x: '-500px', opacity: 0 }}
                          animate={{
                            x: 0,
                            opacity: 1,
                            transition: { duration: 0.8 }
                          }}
                          exit={{ opacity: 0, scale: 0 }}
                        >
                          <ProfileItem key={profile._id} profile={profile} />
                        </motion.div>
                      );
                  } else {
                    return (
                      <AnimatePresence key={profile._id}>
                        <motion.div
                          initial={{ x: '-500px', opacity: 0 }}
                          animate={{
                            x: 0,
                            opacity: 1,
                            transition: { duration: 0.8 }
                          }}
                          exit={{ opacity: 0, scale: 0 }}
                        >
                          <ProfileItem key={profile._id} profile={profile} />
                        </motion.div>
                      </AnimatePresence>
                    );
                  }
                })
              : hasProfiles === 0 && <h4>No profiles found.</h4>}
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
