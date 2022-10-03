export class WidgetComponent extends HTMLElement {
    public static accessibilityRoot: HTMLDivElement
    public static attributes : any;

    public addWidgetEventListener(type: string, listener: (event: any) => {}): void;

    public routeClick(x: number, y: number): void;
    public mountExternalCamera(cameraStreamInput: MediaStream);
    public checkCapabilities(): {};
}
