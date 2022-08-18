import React, { Fragment, useEffect } from "react";
// import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import { getPost } from "../actions/post";

const PostSingle = ({ post: { singlePost }, loading, getPost, match }) => {
  // let { userId } = useParams();
  console.log(singlePost);
  useEffect(() => {
    getPost(match.params.id);
  }, []);
  return (
    <Fragment>
      {loading || singlePost === null ? (
        <Spinner />
      ) : (
        <section className="container">
          <Link to="/posts" className="btn">
            Back To Posts
          </Link>
          <PostItem post={singlePost} showActions={false} />
          <CommentForm postId={singlePost._id} />
          <div className="comments">
            {singlePost?.comments?.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={singlePost._id}
              />
            ))}
          </div>
        </section>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(PostSingle);
