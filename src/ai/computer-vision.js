const cv = require('opencv4nodejs');

class ComputerVision {
    constructor() {
        this.net = cv.readNetFromCaffe('deploy.prototxt', 'model.caffemodel');
    }

    detectObjects(imagePath) {
        const image = cv.imread(imagePath);
        const blob = cv.blobFromImage(image, 1, new cv.Size(300, 300), new cv.Vec(104, 117, 123));
        this.net.setInput(blob);
        const detections = this.net.forward();
        return detections;
    }
}

module.exports = ComputerVision;
