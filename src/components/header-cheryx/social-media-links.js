import React from "react";
import styles from './HeaderCherxy.module.scss'
/**
 * SocialMediaLinks Component
 * 
 * A reusable component that displays social media links with their respective icons.
 * Each link opens in a new tab when clicked.
 * 
 * @param {Object} props - Component props
 * @param {Array<Object>} [props.socialLinks] - Array of social media link objects
 * @param {string} props.socialLinks[].name - Name of the social media platform (used for alt text)
 * @param {string} props.socialLinks[].url - URL to the social media profile
 * @param {string} props.socialLinks[].icon - URL to the icon image
 * @param {number} props.socialLinks[].width - Width of the icon in pixels
 * @param {number} props.socialLinks[].height - Height of the icon in pixels
 * 
 * @example
 * // Using default social links
 * <SocialMediaLinks />
 * 
 * @example
 * // Using custom social links
 * <SocialMediaLinks 
 *   socialLinks={[
 *     {
 *       name: 'Twitter',
 *       url: 'https://twitter.com/example',
 *       icon: '/twitter-icon.svg',
 *       width: 20,
 *       height: 20
 *     }
 *   ]}
 * />
 * 
 * @returns {JSX.Element} A div containing anchor tags with social media icons
 */
const SocialMediaLinks = ({socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/Cheryx.KnitADream',
      icon: 'https://cheryx.com/images/fb.svg',
      width: 11,
      height: 18
    },
    {
      name: 'Ravelry',
      url: 'https://www.ravelry.com/stores/cheryx',
      icon: 'https://cheryx.com/images/rv.svg',
      width: 20,
      height: 20
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/cheryx.knitadream',
      icon: 'https://cheryx.com/images/in.svg',
      width: 20,
      height: 20
    },
    {
      name: 'Youtube',
      url: 'https://www.youtube.com/channel/UCf0jCxiSGh_pBExFN3k1CIA',
      icon: 'https://cheryx.com/images/yo.svg',
      width: 26,
      height: 20
    },
    {
      name: 'Pinterest',
      url: 'https://www.pinterest.com/Cheryx_knit_a_dream',
      icon: 'https://cheryx.com/images/pi.svg',
      width: 20,
      height: 20
    }
  ]}) => {

  return (
    <div className={styles.leftSide}>
      {socialLinks.map((link) => (
        <a
          key={link.name}
          rel="noreferrer"
          target="_blank"
          href={link.url}
        >
          <img
            alt={link.name}
            style={{ width: link.width, height: link.height }}
            src={link.icon}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialMediaLinks;