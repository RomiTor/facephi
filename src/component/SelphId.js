import React, {createRef, useContext, useEffect, useRef, useState} from "react";
import {FPhi} from "@facephi/selphid-widget-web";
import { RootContext } from "../context/provider";

const SelphId = () => {

    const rootContext = useContext(RootContext);
    let {setActiveView}=rootContext;

    const FPhiCameraResolutions = {
        res480p: {title: "640x480", width: 640, height: 480},
        res600p: {title: "800x600", width: 800, height: 600},
        res768p: {title: "1024x768", width: 1024, height: 768},
        res720p: {title: "1280x720 (720p)", width: 1280, height: 720},
        res1080p: {title: "1920x1080 (1080p)", width: 1920, height: 1080},
    };

    const [isWidgetCaptureStarted, setIsWidgetCaptureStarted] = useState(true);
    const [widgetPreviewCapture, setWidgetPreviewCapture] = useState(true);
    const [widgetForceLandscape, setWidgetForceLandscape] = useState(false);
    const [widgetInitialTip, setWidgetInitialTip] = useState(false);
    const [widgetDebugMode, setWidgetDebugMode] = useState(false);
    const [widgetCameraResolution, setWidgetCameraResolution] = useState("res720p");
    const [widgetCameraWidth, setWidgetCameraWidth] = useState(FPhiCameraResolutions.res720p.width);
    const [widgetCameraHeight, setWidgetCameraHeight] = useState(FPhiCameraResolutions.res720p.height);
    const [widgetVideoRecord, setWidgetVideoRecord] = useState(false);
    const [widgetShowLog, setWidgetShowLog] = useState(false);
    const [widgetStartSimpleMode, setWidgetStartSimpleMode] = useState(false);
    const [widgetLicenseKey, setWidgetLicenseKey] = useState("3D430010231C062B0411476A4A2F2702061538014903324149720C0625140E003E1C3D3F1106476A4A252F02060B230D2C281706093F180C644D4109390B0C281206476A134B250E0E0835061D35435947340D1F230D0C153D0D0732434F4734091D23240D0172524B745151577D595B6B5252477C4A0C3E15110414091D27435947632C5D75512555135B5A76255352635D5972535455115B5A77255351625B5900505451675E2872205224615C587053515764595875505156625C5B705422551658507527525462515975545357125E597720575362295B03525055625B2F72565220675D5C7253535465592876545351602C597152555063585077225350662C5B0453525462595F76525056602E597E522150675A5F7720515666515B7052515065592874515155605C5C7F505550605B5A74565757602A5873532756165A5D76565256612B5904512254165E5876555324615E5875555B5465595E7758535D635A5D03505056655A5A76535157635A5C7250545616595D76555224632B5B73505650605E5076535021622A5873545654615B2F76235223635E5C7650575712595E7256502160585975515A54145B2D76275157612E5C74522257165B2D76585353672D5B0054515465592A76205056622B597152565714592B762251236251587051535764585E74545356615E590551205566585D74565753625C587E512550675B287753525C632D5C705127576859517358525562505B72535457695B5F73225023625A587551575664585C74245324622D597450535667595173255157602A5B72532155605E5874575123615D597351555013595E7324505D60505B0554555111595E7753565C62295975545457625E5B74525621602A5D07532155605B5877535223635C5B7651525516585E75245757675E5C05555251695F5B76555355625D5972512754665B5C75225353622C5972512757615B2F76235226622A5972512754615F5B73535727632C5A02555255665A5C772352216251590551555467582A7220565661295D75535655645B5A7625525C622D597E55505760585A7555572766295A02555255615B2F76235226622A597251275461585D7750525C625B5A0255525016582A72205150622E5974515555125A5A7625512662505871515555695B2F7759532661295D75552556695F5B76555355625D5972512754665B5C75555727672B5807522551675B5A76565351622A5972512754615A5A75555727672B5A02555255615B5C7724532662295903505055685B5C7657522161295D75552556695F5B7622535D635A5972535555125B5D75555727672B5A02555250675E5973205627662A5C76545251685E5A73585050665C5D02522551675B2A76505324625B590050535560595D76565324635B5905515555125A5D75555727672B5A0255525466585B7727515D605F5B76522257165B5B74275655622B5A7E525754145B2F7620562460505C77505251115B2A7456505C62595903552054625E5A73255124635E5B0451265568592B7624502667585A7E505455695F2B7453512763595B71515B5616595076505054675C5871505257165F2F7427505D675E5B0453215713595B73515226675B597453205115592D77225152612B587351205416582876535355632B5C7651255566585977205757635E5B70505155645A5D7256525C615E5874515A57155A5D73255221612B5B73512554665A2874225223675B5C7E515A56615B2D77225623635A5903515354635A597358522060505B7055205661595F76205356632D590551575715585073235055602B5905515155115E517457565D635E5B02515256165B2876245023602D5B07515457635B2F77275324605F5A7053265516585976545353625D5A73532051115B5B77505350675C5904505A54655A5173275352602A5B7F545154135B2C7425512160295971545456635B5D77205320615F5A72535655665B5176235224615C5B7F54555715592D74255154625B5C7653275763585A76225326672E5B7054565664592C7454562666515B70505A50655B2A7620562160595C75535B5061592D72525154625B5976505A54635A5B74585327622B5A70525651155E5973545050665C5D02522551675A5976585324622C597651575560592C76585351625B5A0255525016582A7220535062515974515155695B5176565224635A5A0255525169582A7220532662505970512255125B5C75225255635E5972522551675E2875555727602A597E515354675B2F76205350622E5900515B56695F5B72555050665C5877505255115B5D77255324635A5A0255525016582A72205024625B590250505514595074225050665C5D02522551675A5F76255227635D597E51205512582A7220565661295D75545151125E5975555727632A5D02522551675A59772053536358597E515455605A5B75555727672B5A02555257635B5876235326615E597F512256695F5B7754572766295D75512555115B5E7627535562505970555250165B5F76585350635D5972552551675B5C76575320622E5900515556615A5077595326665C5C04555257685B507623522762515975512555135B2C76525727632A4B6A430F0C330D073504270A331D04230F17476A1C1B33044F473C010A230F100016090A2F000F476A0E082A12064972040025040D16353C062D040D213F0B1C2B040D1172521D3414064972040621060A0B374A5320000F1635444B2912415F7229073F434F4720090A2D0004001E0904234359473C070A270D0B0A231C4B6A43060B37010723351A15354A53642C0A0622070B2A080D0E72444B36130C01250B1D645B41363504192E2827477C4A1F2313100C3F064B7C43524B604A146A4313173F1E00220411476A4A2F2702063538014B3B");

    const startSimpleMode = () => {
        setWidgetStartSimpleMode(true);
        setIsWidgetCaptureStarted(true);
    }

    const onCameraResolutionSet = (event) => {
        setWidgetCameraWidth(FPhiCameraResolutions[event.target.value].width);
        setWidgetCameraHeight(FPhiCameraResolutions[event.target.value].height);

        setWidgetCameraResolution(event.target.value);
    }

    const onStartCapture = async () => {
        console.warn(">>>> [app] onStartCapture");

        setIsWidgetCaptureStarted(true);
    }

    const onStopCapture = () => {
        console.warn(">>>> [app] onStopCapture");

        setIsWidgetCaptureStarted(false);
        setWidgetStartSimpleMode(false);
    }

    // Widget event handlers
    const onModuleLoaded = (eventData) => console.warn("[SelphID] onModuleLoaded", eventData);


    const onExtractionFinished = (extractionResult) => {
        console.warn("[SelphID] onExtractionFinished", extractionResult);

        const backResult = extractionResult.detail.images.backDocument || null;
        const frontResult = extractionResult.detail.images.frontDocument || null;
        const docCaptured = extractionResult.detail.extractionData || null;

        console.log("Document Captured:", JSON.stringify(docCaptured));

        if (backResult !== null) {
            console.log("Document back:", JSON.stringify(backResult));
        }

        if (frontResult !== null) {
            console.log("Document front:", JSON.stringify(frontResult));
        }

        setIsWidgetCaptureStarted(false);
        setWidgetStartSimpleMode(false);

        setActiveView("Selphi");

    }

    const onUserCancelled = () => {
        console.warn("[SelphID] onUserCancelled");

        setIsWidgetCaptureStarted(false);
        setWidgetStartSimpleMode(false);
    }

    const onExceptionCaptured = (exceptionResult) => {
        console.warn("[SelphID] onExceptionCaptured", exceptionResult);
        console.log(`exceptionType: ${exceptionResult.detail.exceptionType}`);
        console.log(`exceptionMessage: ${exceptionResult.detail.message}`);

        setIsWidgetCaptureStarted(false);
        setWidgetStartSimpleMode(false);
    }

    const onExtractionTimeout = (eventInfo) => {
        console.warn("[SelphID] onExtractionTimeout", eventInfo);

        setIsWidgetCaptureStarted(false);
        setWidgetStartSimpleMode(false);
    }

    const onTrackStatus = (eventData) => {
        let trackStatusCode = Object.entries(FPhi.SelphID.TrackStatus).find(e => e[1] === eventData.detail.code);
        console.warn(`[SelphID] onTrackStatus (Code: ${trackStatusCode[1]} - ${trackStatusCode[0]}, Timestamp: ${eventData.detail.timeStamp}`);
        console.log(eventData);
    }

    // Create references
    const widgetRef = createRef();
    const isComponentMounted = useRef();

    useEffect(() => {
        if (!isComponentMounted.current) {
            isComponentMounted.current = true;
        } else {
            if (isWidgetCaptureStarted) {
                const node = widgetRef.current;

                node.addWidgetEventListener("onModuleLoaded", onModuleLoaded);
                node.addWidgetEventListener("onExtractionFinished", onExtractionFinished);
                node.addWidgetEventListener("onUserCancelled", onUserCancelled);
                node.addWidgetEventListener("onExceptionCaptured", onExceptionCaptured);
                node.addWidgetEventListener("onExtractionTimeout", onExtractionTimeout);
                node.addWidgetEventListener("onTrackStatus", onTrackStatus);

                if (widgetLicenseKey === "") {
                    setWidgetLicenseKey(window.prompt("Please, enter the license key before start the operations: ", ""));
                }
            }
        }
    }, [isWidgetCaptureStarted, widgetRef, widgetLicenseKey]);

    return (


                    <facephi-selphid
                        ref={widgetRef}

                        language="es"
                        documentAspectRatio={85.60 / 53.98}

                        bundlePath="../../assets/selphid"
                        previewCapture={widgetPreviewCapture}
                        forceLandscape={widgetForceLandscape}
                        initialTip={widgetInitialTip}
                        licenseKey={widgetLicenseKey}

                        imageFormat={"image/jpeg"}

                        style={{
                            width: "100%",
                            height: widgetForceLandscape ? "56.25%" : "100%"
                        }}

                        cameraWidth={widgetCameraWidth}
                        cameraHeight={widgetCameraHeight}

                        specificData={"ES"}

                        videoRecord={widgetVideoRecord}
                        videoRecordType={FPhi.SelphID.RecorderType.Remote}
                        videoRecordScale={widgetCameraWidth < 1280 ? 1 : 0.5}

                        showLog={widgetShowLog}

                        debugMode={widgetDebugMode}

                        startSimpleMode={widgetStartSimpleMode}>
                    </facephi-selphid>

    );
}

export {SelphId};
