export class WidgetComponent extends HTMLElement {
    public static attributes : any;

    public addWidgetEventListener(type: string, listener: (event: any) => {}): void;
    public checkCapabilities(): any;
    public generateTemplateRawFromByteArray(bundlePath: string, img: any, onFinish: (event: any) => void): void;
    public generateTemplateRawFromByteArray(config: {}, img: any, onFinish: (event: any) => void): void;
}
