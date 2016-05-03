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
        <Calendar />
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

const weeks = [
  [1, 2, 3, 4, 5, 6, 7],
  [8, 9, 10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19, 20, 21],
  [22, 23, 24, 25, 26, 27, 28],
  [29, 30, 31]
];


const CalendarCell = React.createClass({
  getInitialState: function() {
    return {order: ""};
  },
  handleChange: function(e) {
    const value = e.currentTarget.value;
    if (e.currentTarget.value === this.state.order) {
      this.setState({order: null}); // cancel
    } else {
      this.setState({order: value});
    }
  },
  render: function() {
    const disabled = this.props.date < this.props.today;
    return (
      <div>
        {this.props.date} {disabled}
        <label>
          <input
            name={this.props.date}
            type="radio"
            onChange={this.handleChange}
            value="180"
            checked={this.state.order === "180"}
            disabled={disabled}
          />
          {disabled}g
        </label>
        <label>
          <input name={this.props.date}
            type="radio"
            onChange={this.handleChange}
            value="240"
            checked={this.state.order === "240"}
            disabled={disabled}
          />
          240g
        </label>
      </div>
    )
  }
});

const Calendar = React.createClass({
  render: function() {
    let that = this;
    let today = (new Date()).getDate();
    return (
      <div>
        <table>
          <tbody>
            {weeks.map((week) => {
              return (
                <tr>
                  {
                    week.map((date) => {
                      return (
                        <td>
                          <CalendarCell today={today} date={date} />
                        </td>
                      )
                    })
                  }
                </tr>
              )}
            )}
          </tbody>
        </table>
      </div>
    )
  }
});



ReactDOM.render(
  <CommentBox url="/data.json" pollInterval={2000} />,
  document.getElementById('example')
);

console.log(hello());
