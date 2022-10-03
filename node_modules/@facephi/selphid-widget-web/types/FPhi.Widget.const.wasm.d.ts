import { Widget } from "./FPhi.Widget.wasm";
import { WidgetComponent } from "./FPhi.Widget.component";
import { ConfigurationManager } from "./FPhi.Widget.configurator";

export namespace Const {
    enum Mode {
        Front = 0,
        Back = 1,
        Full = 2
    }
    enum CaptureSensibility {
        Low = 0,
        Normal = 1,
        High = 2,
        Auto = 3
    }
    enum TrackStatus {
        ChangeState = 0,
        Tap = 1,
        DocumentBorder = 2
    }
    enum RecorderType {
        Gif = 0,
        Remote = 1
    }
    enum RecorderStatus {
        Ok = 0,
        Unknown = 1,
        SocketError = 2
    }
    enum SimpleModeStates {
        InfoFront = 0,
        PreviewFront = 1,
        InfoBack = 2,
        PreviewBack = 3
    }
    enum ExceptionType {
        CameraError = 1,
        ExtractorError = 2,
        ControlNotInitializedError = 3,
        ImageCropResizeError = 4,
        UnexpectedCaptureError = 5
    }

    enum DocumentType {
        IDCard = 0,
        Passport = 1, // no leemos ningun descriptor de modelo (de momento)
        DriversLicense = 2, // DocumentDL_All.xml
        ForeignCard = 3, // DocumentFC_All.xml
        CreditCard = 4, // no se lee nada
        Custom = 5 // DocumentCU_All.xml
    }
    
    enum ScanMode {
        Generic = 0,
        Specific = 1,
        Search = 2
    }

    const Widget: Widget;
    const ConfigurationManager: ConfigurationManager;
    const Component: WidgetComponent;
    const Version: number;

    function CheckCapabilities(): {};
}
