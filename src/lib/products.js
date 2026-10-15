import { supabase } from "./supabase";

const formatPrice = (row) => `${Number(row.price_eur)} EUR / ${row.price_mkd} MKD`;

// Maps a database row to the shape the shop and cart components use.
const toProduct = (row) => ({
  id: row.id,
  name: row.name,
  image: row.image,
  images: row.images,
  description: formatPrice(row),
  hasSizes: row.has_sizes,
  gender: row.gender,
});

export const fetchProducts = async () => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, image, images, price_eur, price_mkd, has_sizes, gender")
    .eq("is_active", true)
    .order("sort_order");

  if (error) throw error;
  return data.map(toProduct);
};
