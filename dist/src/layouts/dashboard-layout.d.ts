export default function DashboardLayout({ children, callBackCheckAuth, callBackMessage, callBackLoading, patternType, id, isAdmin }: {
    children: any;
    callBackCheckAuth: any;
    callBackMessage?: (() => void) | undefined;
    callBackLoading?: (() => void) | undefined;
    patternType: any;
    id: any;
    isAdmin: any;
}): import("react").JSX.Element;
