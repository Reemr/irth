-- 1) Master labels table
CREATE TABLE labels (
  class_id     SERIAL PRIMARY KEY,       -- e.g. 0, 1, 2…
  name         TEXT    NOT NULL,         -- “Mask”, “Helmet”, etc.
  description  TEXT,                     -- human-readable info
  image_url    TEXT,                     -- optional icon for UI
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2) Images table
CREATE TABLE images (
  image_id     SERIAL PRIMARY KEY,
  image_url    TEXT        NOT NULL,    -- public URL (Cloud Storage, CDN)
  origin       TEXT        NOT NULL,    -- e.g. 'camera', 'gallery', 'sitemap'
  timestamp    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3) Detections table (one row per box)
CREATE TABLE detections (
  detection_id   SERIAL PRIMARY KEY,
  image_id       INTEGER    NOT NULL REFERENCES images(image_id)  ON DELETE CASCADE,
  class_id       INTEGER    NOT NULL REFERENCES labels(class_id),
  confidence     REAL       NOT NULL,
  bbox           FLOAT8[4]  NOT NULL,     -- [x1, y1, x2, y2], either normalized (0–1) or pixel coords
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4) Indexes for fast querying
CREATE INDEX ON images(timestamp);
CREATE INDEX ON detections(image_id);
CREATE INDEX ON detections(class_id);
