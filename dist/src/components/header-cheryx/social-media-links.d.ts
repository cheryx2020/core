export default SocialMediaLinks;
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
declare function SocialMediaLinks({ socialLinks, style }: {
    socialLinks?: Array<any>;
}): JSX.Element;
