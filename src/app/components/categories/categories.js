import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { compose } from 'redux';
import classnames from 'classnames';
import * as R from 'ramda';

import { getCategories, getActiveCategoryId } from '../../selectors';

const Categories = ({ categories, activeCategoryId }) => {
  const getActiveState = R.propEq('id', activeCategoryId);
  const renderCategory = (category, index) => {
    const linkClass = classnames({
      'list-group-item': true,
      active: getActiveState(category)
    });
    return (
      <Link to={`/categories/${category.id}`} className={linkClass} key={index}>
        {category.name}
      </Link>
    );
  };
  const renderAllCategory = () => {
    const linkClass = classnames({
      'list-group-item': true,
      active: R.isNil(activeCategoryId)
    });
    return (
      <Link to="/" className={linkClass}>
        All
      </Link>
    );
  };
  return (
    <div className="well">
      <h4>Brand</h4>
      <div className="list-group">
        {renderAllCategory()}
        {categories.map((category, index) => renderCategory(category, index))}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  categories: getCategories(state),
  activeCategoryId: getActiveCategoryId(ownProps)
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    null
  )
)(Categories);

Categories.defaultProps = {
  activeCategoryId: ''
};

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  activeCategoryId: PropTypes.string
};
