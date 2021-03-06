import React from 'react';
import PropTypes from 'prop-types';
import {
  convertToRaw,
  EditorState,
  RichUtils
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMarkdownPlugin from 'draft-js-markdown-plugin';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton
} from 'draft-js-buttons';
import createLinkPlugin from 'draft-js-anchor-plugin';

const linkPlugin = createLinkPlugin({
  placeholder: 'Enter a URL and press enter'
});
const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
    linkPlugin.LinkButton
  ]
});
const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [
  inlineToolbarPlugin,
  linkPlugin,
  createMarkdownPlugin()
];

export default class MyEditor extends React.Component {
  static defaultProps = {
    placeholder: 'Write something...'
  }
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      clientModeOn: false
    };
    // Functions called by the render function
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.renderPlaceholder = this.renderPlaceholder.bind(this);
    this.focus = () => this.refs.editor.focus();
    this.handlePost = this.handlePost.bind(this);
  }
  componentDidMount() {
    this.setState({ clientModeOn: true });
  }
  // Here, we are passing a key command (like "command + b" for bold or "command + u" for underline) as an argument,
  // which will get passed to the RichUtils.handleKeyCommand.
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  renderPlaceholder(placeholder, editorState) {
    const contentState = editorState.getCurrentContent();
    const shouldHide = contentState.hasText() || contentState.getBlockMap().first().getType() !== 'unstyled';
    return shouldHide ? '' : placeholder;
  }
  handlePost() {
    const content = this.state.editorState.getCurrentContent();
    // content to save to the db
    const contentToSave = JSON.stringify(convertToRaw(content));
    this.props.handlePost(contentToSave);
  }
  renderEditor() {
    if (!this.state.clientModeOn) {
      return null;
    }
    return (
      <div className="card feed bg-dark text-light">
        <div className="card-content">
          <div className="row feed-user">
            <div className="col">
              <img className="circle" src={this.props.userPic} alt=""/>
            </div>
            <div className="col">
              <p>{this.props.userDisplayName}</p>
            </div>
          </div>
          <div className="draft-js-editor">
            <Editor
              editorState={this.state.editorState}
              plugins={plugins}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
             
              ref={(element) => { this.editor = element; }}
            />
            <InlineToolbar />
          </div>
        </div>
        <div className="card-action">
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>{ this.renderEditor() }</div>
    );
  }
}
MyEditor.propTypes = {
  handlePost: PropTypes.func.isRequired,
  userDisplayName: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};




// import React from 'react'
// import { Editor, EditorState, } from 'draft-js'
// import createMarkdownPlugin from 'draft-js-markdown-plugin'


// class MyEditor extends React.Component {
//     state = {
//         editorState: EditorState.createEmpty(),
//         plugins: [createMarkdownPlugin()]
//       };
    
//     onChange = (editorState) => {
//         this.setState({
//           editorState,
//         });
//       };
    
//     render() {
//         return (
//           <div>


//           </div>
          
          

          
//           );
//         }
//       }
//       // <div className="bg-dark text-light">

//       // <Editor
//       //   editorState={this.state.editorState}
//       //   onChange={this.onChange}
//       //   plugins={this.state.plugins}
        
//       // />
//       // </div>
// export default MyEditor;