// ============================
// ✅ AUTH ROUTES
// ============================

// Register a new user
// POST /api/auth/register
// Body: { username, email, password }
const registerURL = "https://otaku-bites.vercel.app/api/auth/register";

// Login user
// POST /api/auth/login
// Body: { email, password }
const loginURL = "https://otaku-bites.vercel.app/api/auth/login";

// Forgot password
// POST /api/auth/forgot-password
// Body: { email }
const forgotPasswordURL = "https://otaku-bites.vercel.app/api/auth/forgot-password";

// Reset password
// POST /api/auth/reset-password/:token
// Body: { password }
const resetPasswordURL = "https://otaku-bites.vercel.app/api/auth/reset-password/:token";


// ============================
// ✅ RECIPE ROUTES
// ============================

// Get all recipes (public)
// GET /api/recipes
const getRecipesURL = "https://otaku-bites.vercel.app/api/recipes";

// Get single recipe by ID (public)
// GET /api/recipes/:id
const getRecipeByIdURL = "https://otaku-bites.vercel.app/api/recipes/:id";

// Add new recipe (private)
// POST /api/recipes
// Body: { title, description, ingredients, steps, image, tags }
// Header: Authorization: Bearer <token>
const addRecipeURL = "https://otaku-bites.vercel.app/api/recipes";

// Update recipe by ID (private, author only)
// PUT /api/recipes/:id
// Body: { title?, description?, ingredients?, steps?, image?, tags? }
// Header: Authorization: Bearer <token>
const updateRecipeURL = "https://otaku-bites.vercel.app/api/recipes/:id";

// Delete recipe by ID (private, author only)
// DELETE /api/recipes/:id
// Header: Authorization: Bearer <token>
const deleteRecipeURL = "https://otaku-bites.vercel.app/api/recipes/:id";


// ============================
// ✅ COMMUNITY ROUTES
// ============================

// Get all communities (public)
// GET /api/communities
const getCommunitiesURL = "https://otaku-bites.vercel.app/api/communities";

// Create a new community (private)
// POST /api/communities
// Body: { name, description, image }
// Header: Authorization: Bearer <token>
const createCommunityURL = "https://otaku-bites.vercel.app/api/communities";

// Join a community (private)
// POST /api/communities/:id/join
// Header: Authorization: Bearer <token>
const joinCommunityURL = "https://otaku-bites.vercel.app/api/communities/:id/join";

// Leave a community (private)
// POST /api/communities/:id/leave
// Header: Authorization: Bearer <token>
const leaveCommunityURL = "https://otaku-bites.vercel.app/api/communities/:id/leave";


// ============================
// ✅ POST ROUTES
// ============================

// Create a post in a community (private)
// POST /api/posts
// Body: { communityId, title, content }
// Header: Authorization: Bearer <token>
const createPostURL = "https://otaku-bites.vercel.app/api/posts";

// List all posts in a community (public)
// GET /api/posts/community/:communityId
// Optional query: ?page=1&limit=10&sort=new|top
const listPostsURL = "https://otaku-bites.vercel.app/api/posts/community/:communityId";

// Get single post by ID (public)
// GET /api/posts/:postId
const getPostURL = "https://otaku-bites.vercel.app/api/posts/:postId";

// Delete post by ID (private, author or community admin)
// DELETE /api/posts/:postId
// Header: Authorization: Bearer <token>
const deletePostURL = "https://otaku-bites.vercel.app/api/posts/:postId";

// Vote on post (private, up/down/undo)
// POST /api/posts/:postId/vote
// Body: { value: 1 | -1 | 0 }
// Header: Authorization: Bearer <token>
const votePostURL = "https://otaku-bites.vercel.app/api/posts/:postId/vote";


// ============================
// ✅ COMMENT ROUTES
// ============================

// Get all comments for a post (nested tree, public)
// GET /api/posts/:postId/comments
const getCommentsURL = "https://otaku-bites.vercel.app/api/posts/:postId/comments";

// Create a comment on a post (private)
// POST /api/posts/:postId/comments
// Body: { content, parentId? } // parentId for reply
// Header: Authorization: Bearer <token>
const createCommentURL = "https://otaku-bites.vercel.app/api/posts/:postId/comments";

// Delete comment by ID (private, author or community admin)
// DELETE /api/posts/comments/:commentId
// Header: Authorization: Bearer <token>
const deleteCommentURL = "https://otaku-bites.vercel.app/api/posts/comments/:commentId";