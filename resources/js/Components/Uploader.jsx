import React, { Component, Fragment } from "react";
import Dropzone from "react-dropzone";
import toastr from "toastr";
import { post } from "axios";

export default class Uploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            progress: 0,
            uploading: true,
            supported_mime: ["image/jpeg", "image/png"],
        };
    }

    render() {
        return (
            <div className="uploader">
                <div className="text-center">
                    <Dropzone
                        onDropAccepted={this.onDrop.bind(this)}
                        onDropRejected={this.onDropRejected.bind(this)}
                        className="btn btn-dark"
                        accept={this.state.supported_mime}
                    >
                        Select Images
                    </Dropzone>

                    {this.state.images.length > 0 && (
                        <button
                            className="btn btn-dark uploadBtn"
                            onClick={this.uploadFiles.bind(this)}
                        >
                            Upload
                        </button>
                    )}
                </div>

                {this.state.images.length ? (
                    <Fragment>
                        {this.state.uploading && (
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    role="progressbar"
                                    style={{ width: this.state.progress }}
                                    aria-valuenow={this.state.progress}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                />
                            </div>
                        )}

                        <div className="images">
                            {this.state.images.map((file) => (
                                <div key={file.preview} className="image">
                                    <span
                                        className="close"
                                        onClick={this.removeDroppedFile.bind(
                                            this,
                                            file.preview
                                        )}
                                    >
                                        X
                                    </span>
                                    <img src={file.preview} alt="" />
                                </div>
                            ))}
                        </div>
                    </Fragment>
                ) : (
                    <div className="no-images">
                        <h5 className="text-center">
                            Selected images will appear here
                        </h5>
                    </div>
                )}
            </div>
        );
    }
}
