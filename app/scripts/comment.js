import React from 'react';
import Remarkable from 'remarkable';

import '../css/base.css';
import CommentBox from './comment_box.js'

// tutorial4.js
module.exports = React.createClass({
  render: function() {
    var md = new Remarkable()
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {md.render(this.props.children.toString())}
      </div>
    );
  }
});