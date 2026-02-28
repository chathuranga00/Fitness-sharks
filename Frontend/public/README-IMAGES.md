# Image Setup Instructions

## Homepage Background Image

To add the gym background image to your homepage:

1. **Save your gym image** as `gym-background.jpg` in the `public` folder
2. **Recommended image specifications**:
   - Format: JPG or PNG
   - Resolution: 1920x1080 or higher
   - File size: Under 2MB for optimal loading
   - Aspect ratio: 16:9 (landscape)

3. **Image should show**:
   - Modern gym equipment
   - People working out
   - Professional gym environment
   - Good lighting and clear details

4. **The image will automatically**:
   - Cover the entire hero section
   - Have a dark overlay for text readability
   - Be responsive on all devices
   - Use parallax scrolling effect

## Current Setup

The homepage is now configured to use `/fitness-sharks-bg.png` as the background image. The image has been successfully copied from your local file path.

## Alternative Image Formats

If you prefer a different format:
- Update the path in `src/pages/HomePage.jsx` 
- Look for `backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(/gym-background.jpg)'`
- Change the filename to match your image

## Optimization Tips

- Compress your image before uploading
- Use WebP format for better performance
- Consider having multiple sizes for different devices