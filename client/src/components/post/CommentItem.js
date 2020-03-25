import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Linkify from 'react-linkify';

import {
  getPost,
  getComments,
  getComment,
  deleteComment
} from '../../reduxActions/post';

const CommentItem = ({
  getPost,
  getComments,
  postId,
  postState: { comment: childComments, comments },
  postState,
  getComment,
  post: { text, date, userName, bibimName, user, _id, tick },
  comment,
  post,
  auth,
  deleteComment,
  deletePost,
  addComment,
  addPost
}) => {
  let ok = null;
  if (childComments) {
    ok = true;
  } else {
    ok = false;
  }

  // let postIdsToCheck = [];
  // if (ok === ok) {
  //   postState.post.comments.map(comment => {
  //     postIdsToCheck.push(comment._id);
  //     // postIdsToCheck.map(String);
  //   });
  // }

  // useEffect(() => {
  //   getComments(1, 10, true, postIdsToCheck);
  // }, [getComments, tick]);

  useEffect(() => {
    getComment(_id);
  });

  const componentDecorator = (href, text, key) => (
    <a href={href} key={key} target='_blank' rel='noopener noreferrer'>
      {text}
    </a>
  );

  // const clickAction = (_id, value) => {
  //   if (auth.isAuthenticated === true) {
  //     if (value === 'like') {
  //       addLike(_id);
  //     } else if (value === 'unlike') {
  //       removeLike(_id);
  //     }
  //   } else {
  //     setModalIsOpen(true);
  //   }
  // };

  // const [modalIsOpen, setModalIsOpen] = useState(false);

  //Click 'Reply' to open comment box
  // const [openBox, setOpenBox] = useState(false);

  // const clickReply = () => {
  //   setOpenBox(!openBox);
  // };

  return (
    <div>
      {ok === true ? (
        <div className=' bg-white p-1 my-05  post-item'>
          <Linkify
            componentDecorator={componentDecorator}
            className='mbottom-025  text-normal'
          >
            {text}
          </Linkify>

          <div>
            <Link className='text-normal xsmall' to={`/profile/${user}`}>
              <p className='inline ph'>by {userName} </p>
            </Link>
            <p className='post-date inline my-1 xsmall'>
              on <Moment format='MM/DD/YYYY'>{date}</Moment>
            </p>{' '}
            <div>
              {_id !== null ? (
                <Fragment>
                  {/* <div className='btn btn-primary'>
                    <p
                      onClick={() => {
                        clcikReply();
                      }}
                    >
                      Reply
                    </p>
                  </div> */}

                  {auth.isAuthenticated === true && null !== auth.user
                    ? user === auth.user._id && (
                        <button
                          onClick={() => deleteComment(postId, _id)}
                          type='button'
                          className='btn   '
                        >
                          <p> Delete</p>
                        </button>
                      )
                    : null}

                  {/* {openBox ? (
                    <CommentForm
                      postId={_id}
                      bibimName={bibimName}
                    ></CommentForm>
                  ) : null} */}

                  {/* postuser === logged in user */}
                </Fragment>
              ) : null}
            </div>
          </div>

          {/* <div className='comments'>
            {childComments.comments
              ? childComments.comments.map(comment => (
                  <CcItem
                    // post={post}
                    key={comment._id}
                    post={comment}
                    postId={comment._id}
                  />
                ))
              : null}
          </div> */}

          {/* {postState.comments.map(post =>
            postIdsToCheck.includes(post.parentId) &&
            post.parentId === postId ? (
              <CcItem post={post} postId={post._id} key={post._id}></CcItem>
            ) : null
          )} */}
        </div>
      ) : null}
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,

  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  postState: state.post
});

export default connect(mapStateToProps, {
  deleteComment,
  getPost,
  getComments,
  getComment
})(CommentItem);
