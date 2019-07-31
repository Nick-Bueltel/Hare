import React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'
import dialog from 'electron'


class MyEditor extends React.Component {
    state = {
        editorState: EditorState.createEmpty(),
        plugins: [createMarkdownPlugin()]
      };
    
    onChange = (editorState) => {
        this.setState({
          editorState,
        });
      };
    
    render() {
        return (
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={this.state.plugins}
          />
        );
      }
    }
export default MyEditor;