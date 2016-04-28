import hello from "exports?hello!../hoge/hoge";
import React from "react";
import marked from "marked";
import ReactDOM from "react-dom";

let data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

const CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
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
  <CommentBox data={data} />,
  document.getElementById('example')
);

console.log(hello());
