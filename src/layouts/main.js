import React from 'react';
import homeStyles from '../components/styles/Home.module.scss';
import HeaderCheryx from '../components/header-cheryx/header-cheryx';
import SubLink from '../components/sub-link/sub-link';
import Footer from '../components/footer';
import HeaderPage from '../components/header-page';

const MainLayout = ({ Link, useRouter, Head, NextSeo, isMobile, sublinkData = [], subLinkStyle = {}, sublinkClassName='', content, title, url, seoConfig, description, MenuData = []}) => {
  const router = useRouter();
  const { isAdmin } = router.query || {};
  return <div className={homeStyles.container}>
    <HeaderPage description={description} Head={Head} NextSeo={NextSeo} title={title} url={url} seoConfig={seoConfig}/>
    <main className={homeStyles.main}>
      <HeaderCheryx MenuData={MenuData} Link={Link} url={url} isAdmin={isAdmin} />
      <SubLink className={sublinkClassName} wrapperStyle={subLinkStyle} data={sublinkData} renderItem={(item => {
        return <Link href={item.url}><a>{item.text}</a></Link>
      })}/>
      {content}
    </main>
    <Footer isMobile={isMobile} />
  </div>
}
export default MainLayout;