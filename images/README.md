# Images Folder

This folder contains all image assets for the Sahayadri Hospital Pune website.

## Structure

```
images/
├── README.md
├── .gitkeep
├── doctors/          # Doctor profile photos used by index.html
├── services/         # Service card/section images
├── hero/             # Hero background and hero side visuals
├── banners/          # Wide promotional banners
├── gallery/          # Hospital/gallery photos
├── testimonials/     # Patient testimonial avatars
├── logos/            # Partner and accreditation logos
└── icons/            # Custom PNG/SVG icons
```

## Current paths used in site

The main page currently references these doctor images:
- `images/doctors/doctor-rajesh-sharma.jpg`
- `images/doctors/doctor-amit-patel.jpg`
- `images/doctors/doctor-priya-nair.jpg`
- `images/doctors/doctor-vikram-singh.jpg`

If you change filenames, update `src` paths in `index.html`.

## Suggested naming

- Doctors: `doctor-firstname-lastname.jpg`
- Services: `service-video-consultation.jpg`
- Hero: `hero-main.jpg`
- Banners: `banner-cardiology.jpg`
- Logos: `logo-organization-name.png`

Use lowercase letters, hyphens, and no spaces.

## Recommended formats

- Photos: `.jpg` or `.webp`
- Transparent graphics/icons: `.png` or `.svg`
- Target quality: ~80% for JPG/WEBP to keep size low

## Quick add workflow

1. Put image files into the correct subfolder.
2. Keep file names consistent with the naming rule.
3. Update image paths in HTML if needed.
4. Reload the page and verify images on desktop and mobile.
