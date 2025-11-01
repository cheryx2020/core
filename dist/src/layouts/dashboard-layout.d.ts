export default function DashboardLayout({ children, callBackCheckAuth, callBackMessage, callBackLoading, patternType, id, isAdmin }: {
    children: any;
    callBackCheckAuth: any;
    callBackMessage?: () => void;
    callBackLoading?: () => void;
    patternType: any;
    id: any;
    isAdmin: any;
}): import("react").JSX.Element;
