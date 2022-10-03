/** ConfigurationManager class
 *  initial configuration.
 */
export class ConfigurationManager {
    container: any;
    language: string;
    dpiList: number[];
    cameraWidth: number;
    cameraHeight: number;
    cameraId: string;
    showLog: boolean;
    bundlePath: string;
    resourcesPath: string;
    onExtractionFinish: Function;
    onUserCancel: any;
    onExceptionCaptured: any;
    onExtractionTimeout: any;
    onModuleLoaded: any;
    onTrackStatus: any;
    mode: number;
    askSimpleMode: boolean;
    preview: boolean;
    documentDimensions: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    qualityThreshold: number;
    edgeOffset: number;
    forceLandscape: boolean;
    canvasHD: boolean;
    graphPath: string;
    cropFactor: number;
    initialTip: boolean;
    captureTimeout: number;
    captureRetries: number;
    captureSensibility: number;
    imageFormat: string;
    imageQuality: number;
    videoRecord: boolean;
    videoRecordRate: number;
    videoRecordScale: number;
    videoRecordType: any;
    /**
     * Html div container. Div container where widget will be populated.
     * @param {Object} c - the div container
     */
    setContainer(c: any): void;
    /**
     * Get div container attached to widget.
     * @return {Object} div container
     */
    getContainer(): any;
    /**
     * Widget language as two letter iso string format (Default language 'es').
     * @param {string} l - the language as two letter iso string format
     */
    setLanguage(l: string): void;
    /**
     * Get language setup.
     * @return {string} language setup
     */
    getLanguage(): string;
    /**
     * Set list of available dpi resources.
     * @param {number[]} list - list of available dpi resources.
     */
    setDpiList(list: number[]): void;
    /**
     * Get list of available dpi resources.
     * @returns list of available dpi resources.
     */
    getDpiList(): number[];
    /**
     * Bundle path. Modify path if resources are located in non default widget path.<br />
     * Example: widget with multiple skins must setup resources path to the correct skin.<br />
     * Default path: "./FPhi.Widget.Resources"
     * @param {string} h - path of resources
     */
    setBundlePath(h: string): void;
     /**
      * Get resources path setup.
      * @return {string} resources path setup.
      */
    getBundlePath(): string;
    /**
     * Resources path. Modify path if resources are located in non default widget path.<br />
     * Example: widget with multiple skins must setup resources path to the correct skin.<br />
     * Default path: "./FPhi.Widget.Resources"
     * @param {string} h - path of resources
     */
    setResourcesPath(h: string): void;
    /**
     * Get resources path setup.
     * @return {string} resources path setup.
     */
    getResourcesPath(): string;
    /**
     * Set graphPath.
     * @param {string} m - graphPath.
     */
    setGraphPath(m: string): void;
    /**
     * Get graphPath.
     * @return {string} graphPath.
     */
    getGraphPath(): string;
    /**
     * Set desired camera width resolution (in pixels units).<br />
     * Default camera resolution: 1280x720
     * @param {number} w - desired camera width resolution
     */
    setCameraWidth(w: number): void;
    /**
     * Get desired camera width resolution setup.
     * @return {number} desired camera width resolution
     */
    getCameraWidth(): number;
    /**
     * Set desired camera height resolution (in pixels units).<br />
     * Default camera resolution: 1280x720
     * @param {number} h - desired camera height resolution
     */
    setCameraHeight(h: number): void;
    /**
     * Get desired camera height resolution setup.
     * @return {number} desired camera height resolution
     */
    getCameraHeight(): number;
    /**
     * Event fired when widget finish without errors.
     * @param {Function} event - Event fired when widget finish without errors.
     */
    setOnExtractionFinish(event: Function): void;
    /**
     * Get onExtractionFinish event.
     * @return {Function} onExtractionFinish event.
     */
    getOnExtractionFinish(): Function;
    /**
     * Event fired if user cancel extraction process.
     * @param {Object} event - Event fired if user cancel extraction process.
     */
    setOnUserCancel(event: any): void;
    /**
     * Get onUserCancel event.
     * @return {Object} onUserCancel event.
     */
    getOnUserCancel(): any;
    /**
     * Event fired if internal error occours.
     * @param {Object} event - Event fired if internal error occours.
     */
    setOnExceptionCaptured(event: any): void;
    /**
     * Get onExceptionCaptured event.
     * @return {Object} onExceptionCaptured event.
     */
    getOnExceptionCaptured(): any;
    /**
     * Event fired if timeout rised maximum available time for capturing process.
     * @param {Object} event - Event fired if timeout rised maximum available time for capturing process.
     */
    setOnExtractionTimeout(event: any): void;
    /**
     * Get onExtractionTimeout event.
     * @return {Object} onExtractionTimeout event.
     */
    getOnExtractionTimeout(): any;
    /**
     * Event fired when wasm module loaded.
     * @param {Object} event - Event fired when wasm module loaded.
     */
    setOnModuleLoaded(event: any): void;
    /**
     * Get onModuleLoaded event.
     * @return {Object} onModuleLoaded event.
     */
    getOnModuleLoaded(): any;
    /**
     * Event fired every time a stabilization event occurs.
     * @param {Object} event - Event fired every time a stabilization event occurs.
     */
    setOnTrackStatus(event: any): void;
    /**
     * Get onStabilizing event.
     * @return {Object} onStabilizing event.
     */
    getOnTrackStatus(): any;
    /**
     * Set widget mode.
     * @param {number} m - widget mode.
     */
    setMode(m: number): void;
    /**
     * Get mode.
     * @return {number} mode.
     */
    getMode(): number;
    /**
     * Set ask manual mode.
     * @param {askSimpleMode} m - widget mode.
     */
    setAskSimpleMode(m: any): void;
    /**
     * Get mode.
     * @return {askSimpleMode} mode.
     */
    getAskSimpleMode(): any;
    /**
     * Set/get preview flag.
     * Set preview flag.
     * @param {boolean} p - preview flag.
     */
    setPreview(p: boolean): void;
    /**
     * Get preview flag.
     * @return {boolean} preview flag.
     */
    getPreview(): boolean;
    /**
     * Set physical dimensions of desired document.
     * @param {map} dd - dimensions of desired document.
     */
    setDocumentDimensions(dd: any): void;
    /**
     * Get physical dimensions of desired document.
     * @return {map} dimensions of desired document.
     */
    getDocumentDimensions(): any;
    /**
     * Set document crop factor. Retourned document area image is scaled accorded to this value. Only values > 1.0 are accepted.
     * @param {number} cf - crop factor. Retourned document area image is scaled accorded to this value. Only values > 1.0 are accepted
     */
    setCropFactor(cf: number): void;
    /**
     * Get document crop factor. Retourned document area image is scaled accorded to this value. Only values > 1.0 are accepted.
     * @return {number} crop factor. Retourned document area image is scaled accorded to this value. Only values > 1.0 are accepted
     */
    getCropFactor(): number;
    /**
     * Set qualityThreshold.
     * @param {number} qt - qualityThreshold.
     */
    setQualityThreshold(qt: number): void;
    /**
     * Get qualityThreshold.
     * @return {number} qualityThreshold.
     */
    getQualityThreshold(): number;
    /**
     * Set edgeOffset.
     * @param {number} eo - edgeOffset.
     */
    setEdgeOffset(eo: number): void;
    /**
     * Get edgeOffset.
     * @return {number} edgeOffset.
     */
    getEdgeOffset(): number;
    /**
     * Set forceLandscape mode.
     * @param {boolean} fl - forceLandscape mode.
     */
    setForceLandscape(fl: boolean): void;
    /**
     * Get forceLandscape mode.
     * @return {boolean} forceLandscape mode.
     */
    getForceLandscape(): boolean;
    /**
     * Set canvas high quality for screens 2x, 3x.
     * @param {boolean} chd - canvas high quality for screens 2x, 3x.
     */
    setCanvasHD(chd: boolean): void;
    /**
     * Get canvas high quality for screens 2x, 3x.
     * @return {boolean} canvas high quality for screens 2x, 3x.
     */
    getCanvasHD(): boolean;
    /**
     * Set captureTimeout time.
     * @param {number} fl - captureTimeout time.
     */
    setCaptureTimeout(fl: number): void;
    /**
     * Get captureTimeout time.
     * @return {number} captureTimeout time.
     */
    getCaptureTimeout(): number;
    /**
     * Set capture retries.
     * @param {number} fl - capture retries.
     */
    setCaptureRetries(fl: number): void;
    /**
     * Get capture retries.
     * @return {number} capture retries.
     */
    getCaptureRetries(): number;
    /**
     * Set capture sensibility.
     * @param {number} cs - capture sensibility.
     */
    setCaptureSensibility(cs: number): void;
    /**
     * Get capture sensibility.
     * @return {number} capture sensibility.
     */
    getCaptureSensibility(): number;
    /**
     * Set imageFormat.
     * @param {string} m - imageFormat.
     */
    setImageFormat(m: string): void;
    /**
     * Get imageFormat.
     * @return {string} imageFormat.
     */
    getImageFormat(): string;
    /**
     * Set imageQuality.
     * @param {number} m - imageQuality.
     */
    setImageQuality(m: number): void;
    /**
     * Get imageQuality.
     * @return {number} imageQuality.
     */
    getImageQuality(): number;
    /**
     * Set cameraId.
     * @param {string} m - cameraId.
     */
    setCameraId(m: string): void;
    /**
     * Get cameraId.
     * @return {string} cameraId.
     */
    getCameraId(): string;
    /**
     * Set initialTip.
     * @param {boolean} m - initialTip.
     */
    setInitialTip(m: boolean): void;
    /**
     * Get initialTip.
     * @return {boolean} initialTip.
     */
    getInitialTip(): boolean;
    /**
     * Set videoRecord.
     * @param {boolean} value - videoRecord.
     */
    setVideoRecord(value: boolean): void;
    /**
     * Get videoRecord.
     * @return {boolean} videoRecord.
     */
    getVideoRecord(): boolean;
    /**
     * Set videoRecordRate.
     * @param {number} value - videoRecordRate.
     */
    setVideoRecordRate(value: number): void;
    /**
     * Get videoRecordRate.
     * @return {number} videoRecordRate.
     */
    getVideoRecordRate(): number;
    /**
     * Set videoRecordScale.
     * @param {number} value - videoRecordScale.
     */
    setVideoRecordScale(value: number): void;
    /**
     * Get videoRecordScale.
     * @return {number} videoRecordScale.
     */
    getVideoRecordScale(): number;
    /**
     * Set videoRecordType.
     * @param {number} value - videoRecordType.
     */
    setVideoRecordType(value: number): void;
    /**
     * Get videoRecordType.
     * @return {number} videoRecordType.
     */
    getVideoRecordType(): number;
    /**
     * Set showLog property.
     * @param {boolean} value - showLog property.
     */
    setShowLog(value: boolean): void;
    /**
     * Get showLog property.
     * @return {boolean} showLog property.
     */
    getShowLog(): boolean;
}
