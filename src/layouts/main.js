import React from 'react';
import homeStyles from '../components/styles/Home.module.scss';
import HeaderCheryx from '../components/header-cheryx/header-cheryx';
import SubLink from '../components/sub-link/sub-link';
import Footer from '../components/footer';
import HeaderPage from '../components/header-page';

const MainLayout = ({ theme, mainImageUrl, Link, Head, NextSeo, isMobile, sublinkData = [], subLinkStyle = {}, sublinkClassName='', content, seo, url, seoConfig, MenuData = [], footer = {}, isAdmin}) => {
  return <div className={homeStyles.container}>
    <HeaderPage seo={seo} Head={Head} NextSeo={NextSeo} url={url} seoConfig={seoConfig}/>
    <main className={homeStyles.main}>
      <HeaderCheryx styles={theme ? { backgroundColor: theme?.NAVIGATION?.backgroundColor } : undefined} mainImageUrl={mainImageUrl} MenuData={MenuData} Link={Link} url={url} isAdmin={isAdmin} />
      <SubLink className={sublinkClassName} wrapperStyle={subLinkStyle} data={sublinkData} renderItem={(item => {
        return <Link href={item.url}><a>{item.text}</a></Link>
      })}/>
      {content}
    </main>
    <Footer theme={theme} title={seo?.title} socialTitle={footer?.socialTitle} isAdmin={isAdmin} image={footer.image} hasBanner={footer.hasBanner} isMobile={isMobile} />
  </div>
}
export default MainLayout;