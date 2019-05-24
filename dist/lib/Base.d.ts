import Debug from 'debug';
export default class Base {
    tools: any;
    options: any;
    debug: Debug.Debugger;
    event: string;
    action: string;
    nextVersion: any;
    currVersion: any;
    constructor(tools: any);
    updateLabel(label: string): Promise<void>;
    releaseVersion(): Promise<void>;
    init(): void;
}
//# sourceMappingURL=Base.d.ts.map