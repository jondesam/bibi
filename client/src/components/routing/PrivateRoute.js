import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        // console.log('props aaa', props);

        return !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

// Same above
// const PrivateRoute = props => {
//   console.log('PrivateRoute props', props);

//   if (!props.auth.isAuthenticated && !props.auth.loading) {
//     return <Redirect to='/login' />;
//   } else {
//     return <Route exact path={props.path} component={props.component} />;
//   }
// };

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
