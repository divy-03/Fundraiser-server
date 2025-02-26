const expres = require("express");
const router = expres.Router();
const { registerUser } = require("../controllers/userController");
const { fetchUser, authRole } = require("../middlewares/auth");

router.route("/auth/register").post(registerUser);
router.route("/auth/login").post(loginUser);
router.route("/auth/logout").get(fetchUser, logoutUser);
router.route("/auth/profile").get(fetchUser, getUserProfile);
router.route("/auth/update").put(fetchUser, updateProfile);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(fetchUser, updatePassword);
router.route("/admin/users").get(getAllUsers);
router
  .route("/admin/user/:id")
  .get(fetchUser, authRole("admin", "owner"), getSingleUser)
  .put(fetchUser, authRole("owner"), editUser)
  .delete(fetchUser, authRole("owner"), deleteUser);

module.exports = router;
