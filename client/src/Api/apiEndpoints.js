// ============================
// ✅ AUTH ROUTES
// ============================

// Register a new user
// POST /api/auth/register
// Body: { username, email, password }
export const registerURL = "/api/auth/register";

// Login user
// POST /api/auth/login
// Body: { email, password }
export const loginURL = "/api/auth/login";

// Forgot password
// POST /api/auth/forgot-password
// Body: { email }
export const forgotPasswordURL = "/api/auth/forgot-password";

// Reset password
// POST /api/auth/reset-password/:token
// Body: { password }
export const resetPasswordURL = "/api/auth/reset-password/:token";


// ============================
// ✅ RECIPE ROUTES
// ============================

// Get all recipes (public)
// GET /api/recipes
export const getRecipesURL = "/api/recipes";

// Get single recipe by ID (public)
// GET /api/recipes/:id
export const getRecipeByIdURL = "/api/recipes/:id";

// Add new recipe (private)
// POST /api/recipes
// Body: { title, description, ingredients, steps, image, tags }
// Header: Authorization: Bearer <token>
export const addRecipeURL = "/api/recipes";

// Update recipe by ID (private, author only)
// PUT /api/recipes/:id
// Body: { title?, description?, ingredients?, steps?, image?, tags? }
// Header: Authorization: Bearer <token>
export const updateRecipeURL = "/api/recipes/:id";

// Delete recipe by ID (private, author only)
// DELETE /api/recipes/:id
// Header: Authorization: Bearer <token>
export const deleteRecipeURL = "/api/recipes/:id";


// ============================
// ✅ COMMUNITY ROUTES
// ============================

// Get all communities (public)
// GET /api/communities
export const getCommunitiesURL = "/api/communities";

// Create a new community (private)
// POST /api/communities
// Body: { name, description, image }
// Header: Authorization: Bearer <token>
export const createCommunityURL = "/api/communities";

// Join a community (private)
// POST /api/communities/:id/join
// Header: Authorization: Bearer <token>
export const joinCommunityURL = "/api/communities/:id/join";

// Leave a community (private)
// POST /api/communities/:id/leave
// Header: Authorization: Bearer <token>
export const leaveCommunityURL = "/api/communities/:id/leave";


// ============================
// ✅ POST ROUTES
// ============================

// Create a post in a community (private)
// POST /api/posts
// Body: { communityId, title, content }
// Header: Authorization: Bearer <token>
export const createPostURL = "/api/posts";

// List all posts in a community (public)
// GET /api/posts/community/:communityId
// Optional query: ?page=1&limit=10&sort=new|top
export const listPostsURL = "/api/posts/community/:communityId";

// Get single post by ID (public)
// GET /api/posts/:postId
export const getPostURL = "/api/posts/:postId";

// Delete post by ID (private, author or community admin)
// DELETE /api/posts/:postId
// Header: Authorization: Bearer <token>
export const deletePostURL = "/api/posts/:postId";

// Vote on post (private, up/down/undo)
// POST /api/posts/:postId/vote
// Body: { value: 1 | -1 | 0 }
// Header: Authorization: Bearer <token>
export const votePostURL = "/api/posts/:postId/vote";


// ============================
// ✅ COMMENT ROUTES
// ============================

// Get all comments for a post (nested tree, public)
// GET /api/posts/:postId/comments
export const getCommentsURL = "/api/posts/:postId/comments";

// Create a comment on a post (private)
// POST /api/posts/:postId/comments
// Body: { content, parentId? } // parentId for reply
// Header: Authorization: Bearer <token>
export const createCommentURL = "/api/posts/:postId/comments";

// Delete comment by ID (private, author or community admin)
// DELETE /api/posts/comments/:commentId
// Header: Authorization: Bearer <token>
export const deleteCommentURL = "/api/posts/comments/:commentId";