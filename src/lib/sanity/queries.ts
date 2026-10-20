export const PROPERTIES_QUERY = `*[_type == "property" && status != "archived"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  category,
  location,
  titleType,
  price,
  priceUnit,
  paymentPlans,
  amenities,
  mainImage { asset->, alt, hotspot },
  status,
  featured,
  description
}`;

export const PROPERTY_BY_SLUG_QUERY = `*[_type == "property" && slug.current == $slug][0] {
  ...,
  mainImage { asset->, alt, hotspot },
  gallery[] { asset->, alt, caption, hotspot },
  brochurePdf { asset-> { url } }
}`;

export const FEATURED_PROPERTIES_QUERY = `*[_type == "property" && featured == true && status != "archived"] | order(_createdAt desc) [0...6] {
  _id,
  title,
  slug,
  category,
  location,
  price,
  priceUnit,
  mainImage { asset->, alt, hotspot },
  status
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt desc) [0...10] {
  _id,
  name,
  role,
  content,
  avatar { asset->, alt }
}`;
