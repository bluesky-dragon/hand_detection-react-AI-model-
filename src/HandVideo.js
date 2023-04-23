import { Component } from "react";
import * as handTrack from 'handtrackjs';

const defaultParams = {
  flipHorizontal: false,
  outputStride: 16,
  imageScaleFactor: 1,
  maxNumBoxes: 20,
  iouThreshold: 0.2,
  scoreThreshold: 0.6,
  modelType: "ssd320fpnlite",
  modelSize: "large",
  bboxLineWidth: "2",
  fontSize: 17,
};


export default class HandVideo extends Component {

    detect=  () => {
        const video = document.getElementById('video');
        let updateNote = document.getElementById("updatenote");

        let model = null;
        handTrack.load(defaultParams).then(lmodel => {
            // detect objects in the image.
            model = lmodel
            updateNote.innerText = "Loaded Model!"
            handTrack.startVideo(video).then(function (status) {
                if (status) {
                    
                    updateNote.innerText = "Video started. Now tracking"

                    model.detect(video).then(predictions => {
                        video.play();

                        console.log("Predictions: ", predictions);

                    }).catch(err => {
                        debugger;
                        console.log(err)
                    });
                } else {
                    updateNote.innerText = "Please enable video"
                }
            });
        });

        updateNote.innerText = "Starting video"

        
    }
    toggleVideo = () => {
        this.detect()
    }


    render() {
        return (<header className="App-header">
        <video width="320" height="240" id='video' controls>
          <source src={'./Single_Tap_1.mp4'} type="video/mp4" />
        </video>
        <div className="mb10">
            <button onClick={this.toggleVideo} id="trackbutton" className="bx--btn bx--btn--secondary" type="button">
            Toggle Video
            </button>
            <div id="updatenote" className="updatenote mt10"> loading model ..</div>
        </div>
        <p id="updatenote">If you move your hand, then the folowing textarea's color become black..</p>
        <textarea id='input-text' width='320' height='300' />
        </header>)
    }
} 