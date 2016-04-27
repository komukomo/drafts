import hello from "exports?hello!../hoge/hoge";
import React from "react";
import ReactDOM from "react-dom";

const CommentBox = React.createClass({
  render: () => {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList />
        <CommentForm />
      </div>
    );
  }
});

const CommentList = React.createClass({
  render: () => {
    return (
      <div className="commentList">
        commentList...
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
  <CommentBox />,
  document.getElementById('example')
);

console.log(hello());
