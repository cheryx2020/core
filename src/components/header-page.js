import React from 'react';

const HeaderPage = ({ seo, url, seoConfig, Head, NextSeo }) => {
    const { title, description, site_name } = seo ?? {};
    const descriptionSeo = description ?? title;
    return <><Head>
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
    </Head>
        {seoConfig ? seoConfig : <NextSeo
            title={title}
            description={descriptionSeo}
            openGraph={{
                url: `${process?.env?.NEXT_PUBLIC_pageUrl}/${url}`,
                title,
                description: descriptionSeo,
                images: [
                    {
                        url: 'https://gocnhacolen.com/images/footer.webp',
                        alt: title,
                    }
                ],
                site_name: site_name,
            }}
        />}
    </>
}
export default HeaderPage;