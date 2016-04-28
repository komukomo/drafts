import hello from "exports?hello!../hoge/hoge";
import React from "react";
import marked from "marked";
import ReactDOM from "react-dom";
import $ from "jquery";


const CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommnetsFromServer();
    setInterval(this.loadCommnetsFromServer, this.props.pollInterval);
  },
  loadCommnetsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: (data) => {
        this.setState({data: data});
      },
      error: (xhr, status, err) => {
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

const Comment = React.createClass({
  rawMarkup: function() {
    const rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

const CommentList = React.createClass({
  render: function() {
    let commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={Comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

const CommentForm = React.createClass({
  render: () => {
    return (
      <div className="commentForm">
        commentForm...
      </div>
    );
  }
});


ReactDOM.render(
  <CommentBox url="/data.json" pollInterval={2000} />,
  document.getElementById('example')
);

console.log(hello());
