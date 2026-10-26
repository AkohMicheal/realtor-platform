export const PROPERTIES_QUERY = `*[_type == "property" && status != "archived"] | order(_createdAt desc) {
  _id,
  title,
  slug,
  category,
  location,
  titleType,
  titleStatus,
  price,
  priceUnit,
  initialDeposit,
  monthlyInstallment,
  paymentPlans,
  paymentTiers,
  amenities,
  mainImage,
  gallery,
  status,
  featured,
  description
}`;

export const PROPERTY_BY_SLUG_QUERY = `*[_type == "property" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  category,
  location,
  titleType,
  titleStatus,
  price,
  priceUnit,
  initialDeposit,
  monthlyInstallment,
  paymentPlans,
  paymentTiers,
  amenities,
  mainImage,
  gallery,
  status,
  featured,
  description,
  brochurePdf { asset-> { url } }
}`;

export const FEATURED_PROPERTIES_QUERY = `*[_type == "property" && featured == true && status != "archived"] | order(_createdAt desc) [0...6] {
  _id,
  title,
  slug,
  category,
  location,
  titleType,
  titleStatus,
  price,
  priceUnit,
  initialDeposit,
  monthlyInstallment,
  paymentPlans,
  paymentTiers,
  amenities,
  mainImage,
  gallery,
  status,
  featured,
  description
}`;

export const PROMOTIONAL_FLYERS_QUERY = `*[_type == "promotionalFlyer" && (active == true || !defined(active))] | order(_createdAt desc) [0...6] {
  _id,
  title,
  month,
  cycleMonth,
  category,
  image,
  description,
  active,
  isActive
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(_createdAt desc) [0...10] {
  _id,
  name,
  role,
  content,
  avatar { asset->, alt }
}`;
