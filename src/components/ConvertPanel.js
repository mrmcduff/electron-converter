import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import * as actions from '../actions';

class ConvertPanel extends Component {

  onCancelPressed = () => {
    this.props.removeAllVideos();
    this.props.history.push('/')
  }

  onConvertPressed = () => {
    console.log('pressed');
    this.props.convertVideos(this.props.videos);
    // this.props.convertVideos.bind(null, this.props.videos)
  }

  render() {
    console.log(this.props.videos);
    console.log(this.props.convertVideos);
    return (
      <div className="convert-panel">
        <button className="btn red" onClick={this.onCancelPressed}>
          Cancel
        </button>
        <button className="btn" onClick={this.onConvertPressed}>
          Convert!
        </button>
      </div>
    );
  };
}

function mapStateToProps(state) {
  const videos = _.map(state.videos);
  return { videos };
}

export default withRouter(
  connect(mapStateToProps, actions)(ConvertPanel)
);


// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router'
// import _ from 'lodash';
// import * as actions from '../actions';

// class ConvertPanel extends Component {

//   onCancelPressed = () => {
//     this.props.removeAllVideos();
//     this.props.history.push('/')
//   }

//   onConvertPressed = () => {
//     console.log(`dispatching videos: ${this.props.videos.length}`);
//     // this.props.convertVideos.bind(null, this.props.videos);
//     // this.props.convertVideos(this.props.videos);
//     this.props.convertVideos(this.props.videos);
//   }

//   render() {
//     return (
//       <div className="convert-panel">
//         <button className="btn red" onClick={this.onCancelPressed}>
//           Cancel
//         </button>
//         <button className="btn" onClick={this.onConvertPressed}>
//           Convert!
//         </button>
//       </div>
//     );
//   };
// }

// function mapStateToProps(state) {
//   const videos = _.map(state.videos);
//   return { videos };
// }

// export default withRouter(
//   connect(mapStateToProps, actions)(ConvertPanel)
// );
