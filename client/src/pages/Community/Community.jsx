import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from '../../Api/axios';

const Comment = ({ comment, onReply }) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onReply(replyContent, comment._id);
    setReplyContent('');
    setShowReplyForm(false);
  };

  return (
    <div className="ml-4 mt-4 border-l-2 border-[#FF7EB6]/50 pl-4">
      <div className="flex items-center mb-2">
        
        <p className="text-sm font-semibold text-white">{comment.author.username}</p>
      </div>
      <p className="text-gray-300">{comment.content}</p>
      <button onClick={() => setShowReplyForm(!showReplyForm)} className="text-xs text-[#FF7EB6] mt-1">Reply</button>
      {showReplyForm && (
        <form onSubmit={handleReplySubmit} className="mt-2">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="bg-[#0B0C10] border border-[#1F2833] rounded-lg px-4 py-2 text-white placeholder-gray-400 h-16 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF7EB6] w-full"
            placeholder="Write a reply..."
          />
          <button type="submit" className="px-4 py-1 mt-2 rounded-full font-semibold text-black shadow-lg bg-[#FF7EB6] hover:bg-[#ff649f] transition-all tracking-wide self-end">Submit</button>
        </form>
      )}
      <div className="mt-2">
        {comment.children && comment.children.map(child => <Comment key={child._id} comment={child} onReply={onReply} />)}
      </div>
    </div>
  );
};

const Community = ({ username }) => {
  const [communities, setCommunities] = useState([]);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [isMember, setIsMember] = useState(false);
  const [activePostId, setActivePostId] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('/api/communities');
        setCommunities(response.data);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };

    fetchCommunities();
  }, []);

  useEffect(() => {
    if (selectedCommunity) {
      const fetchPosts = async () => {
        try {
          const response = await axios.get(`/api/posts/community/${selectedCommunity._id}`);
          setPosts(response.data.items);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      fetchPosts();
      setIsMember(selectedCommunity.members.includes(userId));
    }
  }, [selectedCommunity, userId]);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCommunity) return;

    try {
      const response = await axios.post('/api/posts', {
        communityId: selectedCommunity._id,
        title: newPostTitle,
        content: newPostContent,
      });
      setPosts([response.data, ...posts]);
      setNewPostTitle('');
      setNewPostContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleJoinCommunity = async () => {
    if (!selectedCommunity) return;

    try {
      await axios.post(`/api/communities/${selectedCommunity._id}/join`);
      setIsMember(true);
    } catch (error) {
      console.error('Error joining community:', error);
    }
  };

  const toggleComments = async (postId) => {
    if (activePostId === postId) {
      setActivePostId(null);
      setComments([]);
    } else {
      try {
        const response = await axios.get(`/api/posts/${postId}/comments`);
        setComments(response.data);
        setActivePostId(postId);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    }
  };

  const handleCommentSubmit = async (e, postId) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/posts/${postId}/comments`, { content: newComment });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleReplySubmit = async (content, parentId) => {
    try {
      const response = await axios.post(`/api/posts/${activePostId}/comments`, { content, parentId });
      toggleComments(activePostId);
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const postVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section className="relative min-h-screen w-full bg-gradient-to-br from-[#0B0C10] via-[#1a1a1a] to-[#2A0A14] text-white flex flex-col items-center pt-24 px-6 md:px-20 overflow-y-auto overflow-x-hidden">

      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl space-y-10">
        <motion.h1
          className="text-center text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg tracking-wider font-mono"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Otaku Community
        </motion.h1>

        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">Select a Community</h2>
          <select 
            onChange={(e) => setSelectedCommunity(JSON.parse(e.target.value))}
            className="bg-[#0B0C10] border border-[#1F2833] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7EB6] w-full"
          >
            <option value="">-- Choose a Community --</option>
            {communities.map((community) => (
              <option key={community._id} value={JSON.stringify(community)}>
                {community.name}
              </option>
            ))}
          </select>
        </div>

        {selectedCommunity && (
          <>
            {!isMember ? (
              <motion.div
                className="w-full max-w-2xl bg-[#0B0C10]/90 border border-[#1F2833] p-8 rounded-2xl shadow-md hover:shadow-pink-500/30 transition transform hover:-translate-y-1 backdrop-blur-sm flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold text-white mb-4">Join {selectedCommunity.name}</h2>
                <p className="text-gray-300 mb-6 text-center">You must be a member to create posts and interact with the community.</p>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={handleJoinCommunity}
                  className="px-8 py-3 rounded-full font-semibold text-black shadow-lg 
                  bg-[#FF7EB6] hover:bg-[#ff649f] transition-all tracking-wide"
                >
                  Join Community
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                className="w-full max-w-2xl bg-[#0B0C10]/90 border border-[#1F2833] p-8 rounded-2xl shadow-md hover:shadow-pink-500/30 transition transform hover:-translate-y-1 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <form onSubmit={handlePostSubmit} className="flex flex-col space-y-4">
                  <input
                    type="text"
                    placeholder="Post Title"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="bg-[#0B0C10] border border-[#1F2833] rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF7EB6]"
                  />
                  <textarea
                    placeholder="What's on your mind, Otaku?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="bg-[#0B0C10] border border-[#1F2833] rounded-lg px-4 py-3 text-white placeholder-gray-400 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF7EB6]"
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    type="submit"
                    className="px-8 py-3 rounded-full font-semibold text-black shadow-lg 
                    bg-[#FF7EB6] hover:bg-[#ff649f] transition-all tracking-wide self-end"
                  >
                    Create Post
                  </motion.button>
                </form>
              </motion.div>
            )}

            <motion.div 
              className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {posts.map((post) => (
                <motion.div
                  key={post._id}
                  className="w-full bg-[#0B0C10]/90 border border-[#1F2833] p-6 rounded-2xl shadow-md hover:shadow-pink-500/30 transition transform hover:-translate-y-1 backdrop-blur-sm flex flex-col justify-between"
                  variants={postVariants}
                >
                  <div>
                    <div className="flex items-center mb-4">
                      
                      <div>
                        <h2 className="text-xl font-bold text-white">{post.title}</h2>
                        <p className="text-sm text-gray-400">Posted by: {post.author?.username || username}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{post.content}</p>
                  </div>
                  <div className="text-sm text-gray-400 flex justify-end items-center">
                    <button onClick={() => toggleComments(post._id)} className="text-sm text-[#FF7EB6] hover:text-[#ff649f] transition-colors">Comments ({post.comments?.length || 0})</button>
                  </div>

                  {activePostId === post._id && (
                    <div className="mt-4">
                      <form onSubmit={(e) => handleCommentSubmit(e, post._id)} className="flex flex-col space-y-2">
                        <textarea
                          placeholder="Add a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="bg-[#0B0C10] border border-[#1F2833] rounded-lg px-4 py-2 text-white placeholder-gray-400 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-[#FF7EB6]"
                        />
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.05 }}
                          type="submit"
                          className="px-6 py-2 rounded-full font-semibold text-black shadow-lg 
                          bg-[#FF7EB6] hover:bg-[#ff649f] transition-all tracking-wide self-end"
                        >
                          Add Comment
                        </motion.button>
                      </form>
                      <div className="mt-4">
                        {comments.map(comment => <Comment key={comment._id} comment={comment} onReply={handleReplySubmit} />)}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default Community;