import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { getPosts } from '../actions/post'

const Post = ({ getPosts, post: { isLoading, posts }}) => {

    useEffect(() => {
        getPosts()
    },[])
  return (
    <div>Post</div>
  )
}

const mapStateToProps = state => ({
    post: state.post

})

export default connect( mapStateToProps , { getPosts })(Post)