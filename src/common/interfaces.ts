export interface Action {
    type: string;
    response: any;
    params?: any;
    error?: any;
    actionData?: any;
}
