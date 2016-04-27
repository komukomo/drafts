import hello from "exports?hello!../hoge/hoge";
import React from "react";
import ReactDOM from "react-dom";

let CommentBox = React.createClass({displayName: 'CommentBox',
  render: () => {
    return (
      <div className="commentBox">
        comment comment, comment...
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('example')
);

console.log(hello());
