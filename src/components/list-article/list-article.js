import React from "react";
import { transformImageSrc } from "@cheryx2020/utils";
import styles from './ListArticle.module.scss';

const ListArticle = ({data = [], isMobile, Image, Link, unoptimized = true}) => {
  const bigItem = data.find(item => item.isBig === true);
  const listItems = data.filter(item => item.isBig !== true);
  return <div className={styles.wrapper}>
    {!isMobile && bigItem && <Link href={`/tip/${bigItem.id}`}><div className={styles.left}>
      <div className={styles.bigImage}>
        {bigItem && <Image unoptimized={unoptimized} layout='fill' alt={bigItem.title} src={transformImageSrc(bigItem.imgUrl)}/>}
      </div>
      {bigItem && <div className={styles.title} style={{textAlign: 'center'}}>{bigItem.title}</div>}
    </div></Link>}
    <div className={styles.right}>
      {listItems.map((item, index) => <div key={index} className={styles.items}>
        <Link href={`/tip/${item.id}`} className={styles.item}>
          <div className={styles.img}>
            <Image layout='fill' unoptimized={unoptimized} alt={item.title} src={transformImageSrc(item.imgUrl)}/>
          </div>
          <div className={styles.title}>{item.title}</div>
        </Link>
      </div>)}
    </div>
  </div>
}
export default ListArticle;