const PREDEFINED_TYPES = {
  root: {
    children: ['container'],
  },
  container: {
    width: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    justify: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
    align: ['flex-start', 'flex-end', 'center', 'stretch', 'baseline'],
    children: ['container', 'image', 'video', 'text', 'drain'],
  },
  image: {
    url: null,
  },
  video: {
    url: null,
  },
  text: {
    variant: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body1', 'body2'],
    content: null,
  },
  drain: {
    height: null,
  }
}

const DEFAULT_ROOT = {
  type: 'root',
  children: null,
}

const DEFAULT_CONTAINER = {
  type: 'container',
  width: 12,
  justify: 'flex-start',
  align: 'flex-start',
  children: null,
}

const DEFAULT_IMAGE = {
  type: 'image',
  url: null,
}

const DEFAULT_VIDEO = {
  type: 'video',
  url: null,
}

const DEFAULT_TEXT = {
  type: 'text',
  contents: null,
  variant: 'body1',
}

const DEFAULT_DRAIN = {
  type: 'drain',
  height: 24,
}

export {
  PREDEFINED_TYPES,
  DEFAULT_ROOT,
  DEFAULT_CONTAINER,
  DEFAULT_IMAGE,
  DEFAULT_VIDEO,
  DEFAULT_TEXT,
  DEFAULT_DRAIN
}
