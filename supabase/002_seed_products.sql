-- Current shop products (moved from src/data/products.js).
-- Run once in Supabase → SQL Editor, after 001_shop_schema.sql.
-- IDs are kept the same so carts saved in visitors' browsers keep working.

insert into public.products (id, name, image, images, price_eur, price_mkd, has_sizes, gender, sort_order) values
  (1,  'Women''s Swimsuit',            '/Products/WomenSwimsuit.webp',     null, 30, 1800, true,  'female', 1),
  (2,  'Men''s Swimsuit',              '/Products/MenSwimsuitFront.webp',
       array['/Products/MenSwimsuitFront.webp', '/Products/MenSwimsuitBack.webp',
             '/Products/MenSwimsuitFront2.webp', '/Products/MenSwimsuitBack2.webp'],
                                                                                20, 1200, true,  'male',   2),
  (3,  'Team T-Shirt',                 '/Products/TShirt.webp',            null,  7,  450, true,  null,     3),
  (4,  'Team Hoodie',                  '/Products/Hoodie.webp',            null, 20, 1200, true,  null,     4),
  (5,  'Team Cap',                     '/Products/Cap.webp',               null,  9,  500, false, null,     5),
  (6,  'Team Backpack',                '/Products/Backpack.webp',          null, 30, 1800, false, null,     6),
  (7,  'Finis Freestyle Paddles',      '/Products/FsPaddles.webp',         null, 28, 1680, false, null,     7),
  (8,  'Finis Gear Bag',               '/Products/Bag.webp',               null, 20, 1200, false, null,     8),
  (9,  'Floating Swim Fins',           '/Products/Fins.webp',              null, 40, 2400, false, null,     9),
  (10, 'Alignment Kickboard',          '/Products/Kickboard.webp',         null, 33, 1980, false, null,    10),
  (11, 'Technique & Training Snorkel', '/Products/Snorkel.webp',           null, 36, 2160, false, null,    11);

-- Make sure new products added later get IDs after the ones above.
select setval(pg_get_serial_sequence('public.products', 'id'), (select max(id) from public.products));
