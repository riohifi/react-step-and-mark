import React, { ComponentType, DetailedHTMLProps, InputHTMLAttributes, ReactElement } from "react";
declare type InputValue = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>["value"];
declare type CheckboxValue = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>["checked"];
interface State {
    [key: string]: InputValue | CheckboxValue;
}
interface Rate {
    [key: string]: InputValue | CheckboxValue;
}
export declare type StepsConfig = {
    before?: (props: any) => JSX.Element;
    after?: (props: any) => JSX.Element;
    navigation?: {
        component: (props: any) => JSX.Element;
        location?: "before" | "after";
    };
};
declare type StepsProps = {
    children: ReactElement<StepProps> | ReactElement<StepProps>[];
    config?: StepsConfig;
};
declare type BeforeStepChange = () => any;
interface StepProps {
    title?: string;
    /** Component to be rendered as a step */
    component: ComponentType<StepComponentProps>;
    /** A callback function to run before step change occurs */
    beforeStepChange?: BeforeStepChange;
}
declare type EventType = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;
declare type AllSteps = {
    order: number;
    title: string;
}[];
declare type OrderCheckFn = () => boolean;
declare type MoveFn = () => void;
declare type JumpFn = (step: number) => void;
declare type GetState = (key: keyof State, defaultValue: State[keyof State]) => any;
declare type SetState = (key: keyof State, value: State[keyof State]) => void;
declare type GetRate = (key: keyof Rate, defaultValue: Rate[keyof Rate]) => any;
declare type SetRate = (key: keyof Rate, value: Rate[keyof Rate]) => void;
declare type HandleChange = (event: EventType) => void;
export interface StepComponentProps {
    /** Order number of the current step component */
    order: number;
    /** Title of the current step component */
    title: string;
    /** Progress of current component, value between 0 and 1 */
    progress: number;
    /** Function to move to the next step */
    next: MoveFn;
    /** Function to move to the previous step */
    prev: MoveFn;
    /** Function to jump to the given step */
    jump: JumpFn;
    /** Function to check if the step is the first */
    isFirst: OrderCheckFn;
    /** Function to check if the step is the last */
    isLast: OrderCheckFn;
    /** Function to check if the step has any previous step*/
    hasPrev: OrderCheckFn;
    /** Function to check if the step has any next step*/
    hasNext: OrderCheckFn;
    /** Array of all available steps' title and order number*/
    allSteps: AllSteps;
    /** Combined state value of all steps */
    state: State;
    /** Function to set/update state by key */
    setState: SetState;
    /** Function to retrieve a state value by key */
    getState: GetState;

    rate: Rate;
    /** Function to set/update state by key */
    setRate: SetRate;
    /** Function to retrieve a state value by key */
    getRate: GetRate;
    /** `onChange` event handler for form elements */
    handleChange: HandleChange;
}
interface StepsContext {
    size: number;
    current: number;
    progress: number;
    allSteps: AllSteps;
    state: State;
    handleChange: HandleChange;
    setState: SetState;
    getState: GetState;
    setRate: SetRate;
    getRate: GetRate;
    next: MoveFn;
    prev: MoveFn;
    jump: JumpFn;
}
export interface NavigationComponentProps extends StepsContext {
    [name: string]: any;
}
declare const StepsContext: React.Context<StepsContext>;
/**
 * Wrapper component for `Step` components.
 */
export declare function Steps({ children, config }: StepsProps): JSX.Element;
/**
 * Wrapper component for each individual step.
 */
export declare function Step<T extends StepProps>(props: T): JSX.Element | null;
export {};
//# sourceMappingURL=index.d.ts.map