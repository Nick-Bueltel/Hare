import React from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'


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
          <div className="bg-dark text-light">

          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={this.state.plugins}
            
          />
          </div>
        );
      }
    }
export default MyEditor;