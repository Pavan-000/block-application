import User from "../models/User.js";

export const followUser = async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    const current = req.user;

    if (!target) return res.status(404).json({ message: "User not found" });
    if (target._id.equals(current._id))
      return res.status(400).json({ message: "You can't follow yourself" });

    if (!current.following.includes(target._id)) {
      current.following.push(target._id);
      target.followers.push(current._id);
      await current.save();
      await target.save();
    }

    res.json({ message: "Followed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const target = await User.findById(req.params.id);
    const current = req.user;

    if (!target) return res.status(404).json({ message: "User not found" });

    current.following = current.following.filter(
      (id) => id.toString() !== target._id.toString()
    );
    target.followers = target.followers.filter(
      (id) => id.toString() !== current._id.toString()
    );

    await current.save();
    await target.save();

    res.json({ message: "Unfollowed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
