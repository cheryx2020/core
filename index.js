import SubLink from "./src/components/sub-link/sub-link"
import ImageUploadable from "./src/components/image-uploadable/image-uploadable"
import ImageUpload from "./src/components/image-upload/image-upload"
import AdBanner from "./src/components/ad-banner/ad-banner"
import PostVideo from "./src/components/post-video/post-video"
import YouTubeSubscribe from "./src/components/subcribe-button/youtube-subcribe"
import PatternPreview from "./src/components/pattern-preview/pattern-preview"
import MenuAddComponentPost, { POST_ITEM_TYPE, IMAGE_SUBMENU, POST_ITEM_TYPE_SUBMENU } from "./src/components/menu-add-component-post/menu-add-component-post"
import gtag from "./gtag";
import PatternDetail from "./src/components/pattern-detail/pattern-detail"
import RelatedToMenu from "./src/components/related-to-menu/related-to-menu"
import AdminMenu from "./src/components/admin-menu/admin-menu"
import PatternItem from "./src/components/pattern-item/pattern-item"
import PatternName from "./src/components/pattern-name/pattern-name"
import Compress from "./src/components/compress/compress"
import {
    PostContent,
    noImageUrl,
    getPostId,
    MultiImageConfig,
} from "./src/components/post-content/postUtils"
import {
    uploadContentImageFiles
} from "./src/components/post-content/uploadContentImageFiles"
import TipDetail from "./src/components/tip-details/tip-detail";
import Note from "./src/components/note/note"
import Loader from "./src/components/loader/loader"
import HeaderCheryx from "./src/components/header-cheryx/header-cheryx"
import Footer from "./src/components/footer"
import CircularLoader from "./src/components/circular-loader/circular-loader"
import ContentWithTitle from "./src/components/content-with-title/content-with-title"
import LeftMenu from "./src/components/left-menu/left-menu"
import BestSeller from "./src/components/best-seller/best-seller"
import CheryxLogo from "./src/components/cheryx-logo/cheryx-logo"
import HeaderWithImage from "./src/components/header-with-image/header-with-image"
import TitleCheryx from "./src/components/title/title"
import TitleLink from "./src/components/title-link/title-link"
import ListArticle from "./src/components/list-article/list-article"
import HeaderPage from "./src/components/header-page"
import Form from "./src/components/form"
import TipArticle from "./src/components/tip-article/tip-article"
import PatternList from "./src/components/pattern-list/pattern-list"
import usePageData, { CIRCLE_IMAGE } from "./hooks/usePageData"
import useAuthenticate from "./hooks/useAuthenticate"
import useIsMobile from "./hooks/useIsMobile"
import CircleGroup from "./src/components/circle-group/circle-group";
import Table from "./src/components/table"
import Input from "./src/components/input"
import withAuth from "./hocs/withAuth"
import PageItem from "./src/utils/page";
import PayPalCheckout from "./src/components/paypal-checkout/paypal-checkout";
import MainLayout from "./src/layouts/main";
import DetailLayout from "./src/layouts/detail";
import DashboardLayout from "./src/layouts/dashboard-layout";

export {
    AdBanner,
    AdminMenu,
    BestSeller,
    CIRCLE_IMAGE,
    CheryxLogo,
    CircleGroup,
    CircularLoader,
    Compress,
    ContentWithTitle,
    DashboardLayout,
    DetailLayout,
    Footer,
    Form,
    getPostId,
    gtag,
    HeaderCheryx,
    HeaderPage,
    HeaderWithImage,
    ImageUpload,
    ImageUploadable,
    IMAGE_SUBMENU,
    Input,
    LeftMenu,
    ListArticle,
    Loader,
    MainLayout,
    MenuAddComponentPost,
    MultiImageConfig,
    noImageUrl,
    Note,
    PageItem,
    PatternDetail,
    PatternItem,
    PatternList,
    PatternName,
    PatternPreview,
    PayPalCheckout,
    PostContent,
    POST_ITEM_TYPE,
    POST_ITEM_TYPE_SUBMENU,
    PostVideo,
    RelatedToMenu,
    SubLink,
    Table,
    TipArticle,
    TipDetail,
    TitleCheryx,
    TitleLink,
    uploadContentImageFiles,
    useAuthenticate,
    useIsMobile,
    usePageData,
    withAuth,
    YouTubeSubscribe
}
