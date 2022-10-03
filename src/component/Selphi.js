import React, {createRef, useEffect, useRef, useState, useContext} from "react";
import {FPhi} from '@facephi/selphi-widget-web';
import { RootContext } from "../context/provider";
import '../index.css';


// Create lambda to render the component
const Selphi = (props) => {

    const rootContext = useContext(RootContext);
    let {setActiveView}=rootContext;
    
    // Widget Camera Resolutions
    const FPhiCameraResolutions = {
        res480p: {title: "640x480", width: 640, height: 480},
        res600p: {title: "800x600", width: 800, height: 600},
        res768p: {title: "1024x768", width: 1024, height: 768},
        res720p: {title: "1280x720 (720p)", width: 1280, height: 720},
        res1080p: {title: "1920x1080 (1080p)", width: 1920, height: 1080},
    };

    // Widget Capture State
    const [isWidgetCaptureStarted, setIsWidgetCaptureStarted] = useState(true);

    // Widget General Options
    const [widgetLivenessMode, setWidgetLivenessMode] = useState(FPhi.Selphi.LivenessMode.Passive);
    const [widgetInteractible, setWidgetInteractible] = useState(true);
    const [widgetTutorial, setWidgetTutorial] = useState(false);
    const [widgetStabilizationStage, setWidgetStabilizationStage] = useState(false);
    const [widgetVideoRecord, setWidgetVideoRecord] = useState(false);
    // const [widgetFaceTracking, setWidgetFaceTracking] = useState(false);

    // Widget Debug Options
    const [widgetShowLog, setWidgetShowLog] = useState(false);
    const [widgetDebugMode, setWidgetDebugMode] = useState(false);

    // Widget Camera Options
    const [widgetCameraResolution, setWidgetCameraResolution] = useState("res720p");
    const [widgetCameraType, setWidgetCameraType] = useState(FPhi.Selphi.CameraType.Front);
    const [widgetCameraWidth, setWidgetCameraWidth] = useState(FPhiCameraResolutions.res720p.width);
    const [widgetCameraHeight, setWidgetCameraHeight] = useState(FPhiCameraResolutions.res720p.height);

    // Create references
    const widgetRef = createRef();
    const isComponentMounted = useRef();

    // Link events with effect
    useEffect(() => {
        if (!isComponentMounted.current) {
            isComponentMounted.current = true;
        } else {
            if (isWidgetCaptureStarted) {
                const node = widgetRef.current

                node.addWidgetEventListener("onModuleLoaded", onModuleLoaded)
                node.addWidgetEventListener("onStabilizing", onStabilizing)
                node.addWidgetEventListener("onExtractionFinish", onExtractionFinish)
                node.addWidgetEventListener("onUserCancel", onUserCancel)
                node.addWidgetEventListener("onExceptionCaptured", onExceptionCaptured)
                node.addWidgetEventListener("onLivenessError", onLivenessError)
                node.addWidgetEventListener("onLivenessErrorButtonClick", onLivenessErrorButtonClick)
                node.addWidgetEventListener("onExtractionTimeout", onExtractionTimeout)
                node.addWidgetEventListener("onTimeoutErrorButtonClick", onTimeoutErrorButtonClick)
                node.addWidgetEventListener("onTrackStatus", onTrackStatus)
            }
        }
    });

    // Widget event input handler
    function onCameraResolutionChanged(event) {
        setWidgetCameraWidth(FPhiCameraResolutions[event.target.value].width);
        setWidgetCameraHeight(FPhiCameraResolutions[event.target.value].height);

        setWidgetCameraResolution(event.target.value);
    }

    // Widget start & stop buttons
    function onStartCapture() {
        console.warn(">>>> [app] onStartCapture", isWidgetCaptureStarted);
        setIsWidgetCaptureStarted(!isWidgetCaptureStarted);
    }

    function onStopCapture() {
        console.warn(">>>> [app] onStopCapture", isWidgetCaptureStarted);
        setIsWidgetCaptureStarted(false);
    }

    // Widget event handlers
    function onModuleLoaded(eventData) {
        console.warn("[Selphi] onModuleLoaded");
        console.log(eventData);
    }

    function onStabilizing(stabilizingResult) {
        console.warn("[Selphi] onStabilizing");
        console.log(stabilizingResult);
    }

    function onExtractionFinish(extractionResult) {
        console.warn("[Selphi] onExtractionFinish");
        console.log(extractionResult);

        console.log("Images returned: ", extractionResult.detail.images);
        for (let i = 0; i < extractionResult.detail.images.length; i++) {
            const img = extractionResult.detail.images[i];
            console.log(`Image ${i}: ${img.src}`);
        }

        if (extractionResult.detail.bestImage)
            console.log("BestImage: ", extractionResult.detail.bestImage.src);
        if (extractionResult.detail.bestImageCropped)
            console.log("BestImageCropped: ", extractionResult.detail.bestImageCropped.src);

        console.log("Template: ", extractionResult.detail.template);
        console.log("TemplateRaw: ", extractionResult.detail.templateRaw);
        console.log("TimeStamp: ", extractionResult.detail.timeStamp);

        console.log("LivenessMoveFails: ", extractionResult.detail.livenessMoveFails);
        console.log("SunGlassesScore: ", extractionResult.detail.sunGlassesScore);

        console.log("LivenessMoveHistory: ", extractionResult.detail.livenessMoveHistory);
        console.log("LivenessMoveStabilizedStatusHistory: ", extractionResult.detail.livenessMoveStabilizedStatusHistory);
        console.log("LivenessMoveLastStabilizedStatus: ", extractionResult.detail.livenessMoveLastStabilizedStatus);

        if (extractionResult.detail.bestImage) {
            FPhi.Selphi.Component.generateTemplateRawFromByteArray("../../assets/selphi", extractionResult.detail.bestImage, result => {
                console.log("BestImage Template Raw: ", result);
                setIsWidgetCaptureStarted(false);
            });
        } else {
            setIsWidgetCaptureStarted(false);
        }

        setActiveView("next");
    }

    function onUserCancel() {
        console.warn("[Selphi] onUserCancel");
        setIsWidgetCaptureStarted(false);
    }

    function onExceptionCaptured(exceptionResult) {
        console.warn("[Selphi] onExceptionCaptured");
        console.log(`exceptionType: ${exceptionResult.detail.exceptionType}`);
        console.log(`exceptionMessage: ${exceptionResult.detail.message}`);
        console.log(exceptionResult);

        setIsWidgetCaptureStarted(false);
    }

    function onLivenessError(livenessErrorResult) {
        console.warn("[Selphi] onLivenessError");
        console.log(livenessErrorResult);

        switch (livenessErrorResult.detail.livenessErrorType) {
            case FPhi.Selphi.LivenessDiagnostic.Unsuccess:
                console.log("[Selphi] Liveness error: Blink or movement not detected");
                break;
            case FPhi.Selphi.LivenessDiagnostic.UnsuccessLowPerformance:
                console.log("[Selphi] Liveness error: Low performance");
                break;
            case FPhi.Selphi.LivenessDiagnostic.UnsuccessGlasses:
                console.log("[Selphi] Liveness error: Glasses detected");
                break;
            case FPhi.Selphi.LivenessDiagnostic.UnsuccessLight:
                console.log("[Selphi] Liveness error: Bad lighting conditions");
                break;
            case FPhi.Selphi.LivenessDiagnostic.UnsuccessNoMovement:
                console.log("[Selphi] Liveness error: No movement");
                break;
            case FPhi.Selphi.LivenessDiagnostic.UnsuccessWrongDirection:
                console.log("[Selphi] Liveness error: Wrong direction");
                break;
            case FPhi.Selphi.LivenessDiagnostic.UnsuccessTooFar:
                console.log("[Selphi] Liveness error: Face too far");
                break;
            default:
                console.log("[Selphi] Liveness error");
                break;
        }
    }

    function onLivenessErrorButtonClick() {
        console.warn("[Selphi] onLivenessErrorButtonClick");
        setIsWidgetCaptureStarted(false);
    }

    function onExtractionTimeout(extractionTimeoutResult) {
        console.warn("[Selphi] onExtractionTimeout");
        console.log(extractionTimeoutResult);
    }

    function onTimeoutErrorButtonClick() {
        console.warn("[Selphi] onTimeoutErrorButtonClick");
        setIsWidgetCaptureStarted(false);
    }

    function onTrackStatus(eventData) {
        let trackStatusCode = Object.entries(FPhi.Selphi.TrackStatus).find(e => e[1] === eventData.detail.code);
        console.warn(`[Selphi] onTrackStatus (Code: ${trackStatusCode[1]} - ${trackStatusCode[0]}, Timestamp: ${eventData.detail.timeStamp}`);
        console.log(eventData);
    }

    return (
      
            
            <div className="row min-h-100">
                {/* Widget web SelphID */}
                <div className="col-12 col-md-9" style={{minHeight: 550}}>
                    {isWidgetCaptureStarted &&
                        <facephi-selphi
                            className="min-h-100"

                            ref={widgetRef}

                            bundlePath="../../assets/selphi"
                            // faceTracking={widgetFaceTracking}

                            language="es"

                            livenessMode={widgetLivenessMode}

                            cameraWidth={widgetCameraWidth}
                            cameraHeight={widgetCameraHeight}
                            cameraType={widgetCameraType}

                            interactible={widgetInteractible}
                            tutorial={widgetTutorial}
                            stabilizationStage={widgetStabilizationStage}

                            logImages={true}
                            cropFactor={1.7}

                            videoRecord={widgetVideoRecord}
                            videoRecordType={FPhi.Selphi.RecorderType.Remote}
                            videoRecordScale={widgetCameraWidth < 1280 ? 1 : 0.5}

                            showLog={widgetShowLog}
                            debugMode={widgetDebugMode}
                        />
                    }
                </div>

                
            </div>
        
    );
}

export {Selphi};
