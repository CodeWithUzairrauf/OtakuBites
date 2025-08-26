// ============================
// ✅ AUTH ROUTES
// ============================

// Register a new user
// POST /api/auth/register
// Body: { username, email, password }
const registerURL = "http://localhost:8576/api/auth/register";

// Login user
// POST /api/auth/login
// Body: { email, password }
const loginURL = "http://localhost:8576/api/auth/login";

// Forgot password
// POST /api/auth/forgot-password
// Body: { email }
const forgotPasswordURL = "http://localhost:8576/api/auth/forgot-password";

// Reset password
// POST /api/auth/reset-password/:token
// Body: { password }
const resetPasswordURL = "http://localhost:8576/api/auth/reset-password/:token";


// ============================
// ✅ RECIPE ROUTES
// ============================

// Get all recipes (public)
// GET /api/recipes
const getRecipesURL = "http://localhost:8576/api/recipes";

// Get single recipe by ID (public)
// GET /api/recipes/:id
const getRecipeByIdURL = "http://localhost:8576/api/recipes/:id";

// Add new recipe (private)
// POST /api/recipes
// Body: { title, description, ingredients, steps, image, tags }
// Header: Authorization: Bearer <token>
const addRecipeURL = "http://localhost:8576/api/recipes";

// Update recipe by ID (private, author only)
// PUT /api/recipes/:id
// Body: { title?, description?, ingredients?, steps?, image?, tags? }
// Header: Authorization: Bearer <token>
const updateRecipeURL = "http://localhost:8576/api/recipes/:id";

// Delete recipe by ID (private, author only)
// DELETE /api/recipes/:id
// Header: Authorization: Bearer <token>
const deleteRecipeURL = "http://localhost:8576/api/recipes/:id";


// ============================
// ✅ COMMUNITY ROUTES
// ============================

// Get all communities (public)
// GET /api/communities
const getCommunitiesURL = "http://localhost:8576/api/communities";

// Create a new community (private)
// POST /api/communities
// Body: { name, description, image }
// Header: Authorization: Bearer <token>
const createCommunityURL = "http://localhost:8576/api/communities";

// Join a community (private)
// POST /api/communities/:id/join
// Header: Authorization: Bearer <token>
const joinCommunityURL = "http://localhost:8576/api/communities/:id/join";

// Leave a community (private)
// POST /api/communities/:id/leave
// Header: Authorization: Bearer <token>
const leaveCommunityURL = "http://localhost:8576/api/communities/:id/leave";


// ============================
// ✅ POST ROUTES
// ============================

// Create a post in a community (private)
// POST /api/posts
// Body: { communityId, title, content }
// Header: Authorization: Bearer <token>
const createPostURL = "http://localhost:8576/api/posts";

// List all posts in a community (public)
// GET /api/posts/community/:communityId
// Optional query: ?page=1&limit=10&sort=new|top
const listPostsURL = "http://localhost:8576/api/posts/community/:communityId";

// Get single post by ID (public)
// GET /api/posts/:postId
const getPostURL = "http://localhost:8576/api/posts/:postId";

// Delete post by ID (private, author or community admin)
// DELETE /api/posts/:postId
// Header: Authorization: Bearer <token>
const deletePostURL = "http://localhost:8576/api/posts/:postId";

// Vote on post (private, up/down/undo)
// POST /api/posts/:postId/vote
// Body: { value: 1 | -1 | 0 }
// Header: Authorization: Bearer <token>
const votePostURL = "http://localhost:8576/api/posts/:postId/vote";


// ============================
// ✅ COMMENT ROUTES
// ============================

// Get all comments for a post (nested tree, public)
// GET /api/posts/:postId/comments
const getCommentsURL = "http://localhost:8576/api/posts/:postId/comments";

// Create a comment on a post (private)
// POST /api/posts/:postId/comments
// Body: { content, parentId? } // parentId for reply
// Header: Authorization: Bearer <token>
const createCommentURL = "http://localhost:8576/api/posts/:postId/comments";

// Delete comment by ID (private, author or community admin)
// DELETE /api/posts/comments/:commentId
// Header: Authorization: Bearer <token>
const deleteCommentURL = "http://localhost:8576/api/posts/comments/:commentId";