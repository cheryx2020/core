import React from "react";
import MainLayout from "../../layouts/main";
import PageItem from "../../utils/page";
import useIsMobile from "../../../hooks/useIsMobile";
import useAuthenticate from "../../../hooks/useAuthenticate";
import usePageData from "../../../hooks/usePageData";

const mockRouter = {
  push: (url) => console.log(`Routing to: ${url}`),
  pathname: "/",
  query: {},
  asPath: "/",
};

const MockComponent = ({ children }) => <>{children}</>;
const MockImage = ({ children }) => <>{children}</>;

const Page = ({ name, content, theme, layout: { menu, breadcrumb, footer, header } = { menu: [], breadcrumb: [], footer: {}}, seo, Link = ({ children, ...props }) => <a {...props}>{children}</a>, useDispatch = () => (action) => console.log('Dispatching action:', action), useRouter = () => mockRouter, Head = MockComponent, NextSeo = MockComponent, Image = MockImage }) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const { isAuth } = useAuthenticate();
  const { onClickSave, isEdit, setIsEdit } = usePageData({ page: content ?? {}, pageName: name, router, domain: "gocnhacolen.com", language: "vi" });
  return <MainLayout
    theme={theme}
    mainImageUrl={header?.logo}
    url={`/${name}`}
    MenuData={menu ?? []}
    seo={seo}
    Link={Link}
    sublinkData={breadcrumb}
    NextSeo={NextSeo}
    Head={Head}
    isMobile={isMobile}
    footer={footer}
    isAdmin={isEdit}
    content={content?.map((item, index) => <PageItem Link={Link} Image={Image} setIsEdit={setIsEdit} onClickSave={onClickSave} key={index} isAdmin={isAuth} isEdit={isEdit} data={item} isMobile={isMobile} useDispatch={useDispatch} router={router} useRouter={useRouter}/>)} />
}

export default Page