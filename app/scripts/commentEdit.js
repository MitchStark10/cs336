import React from 'react';
import { Link } from 'react-router';
import { store, ActionTools, StoreTools} from './flux'

module.exports = React.createClass({
    getInitialState: function() {
        return {author: '', text: ''};
    },
    componentDidMount: function() {
        let commentToEdit = StoreTools.findComment(this.props.params.id, store.getState().data);
        this.setState({author: commentToEdit.author, text: commentToEdit.text});
    },
    componentDidUpdate: function(prevProps) {
        if (this.props.params.id != prevProps.params.id) {
            this.loadData();
        }
    },
    handleAuthorChange: function(e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function(e) {
        this.setState({text: e.target.value});
    },
    contextTypes: {
        router: React.PropTypes.object
    },
    handleUpdate: function() {
        var updatedComment = {
            id: Number(this.props.params.id),
            author: this.state.author.trim(),
            text: this.state.text.trim()
        }
        store.dispatch(ActionTools.editComment(updatedComment))
        this.context.router.push('/');
    },
    handleDelete: function() {
        var deleteComment = {
            id: Number(this.props.params.id),
            author: this.state.author.trim(),
            text: this.state.text.trim()
        }
        store.dispatch(ActionTools.deleteComment(deleteComment))
        this.context.router.push('/');
    },
    render: function() {
        return (
            <div>
                <form className="commentForm">
                    <h1>Comment Edit - {this.state.id}</h1>
                    <input
                        type="text"
                        value={this.state.author}
                        onChange={this.handleAuthorChange}
                    />
                    <input
                        type="text"
                        value={this.state.text}
                        onChange={this.handleTextChange}
                    />
                    <button type="button" onClick={this.handleUpdate}>Update</button>
                    <button type="button" onClick={this.handleDelete}>Delete</button>
                </form>
                <Link to='/'>Cancel</Link>
            </div>
        );
    }
});