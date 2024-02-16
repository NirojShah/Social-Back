const feedModel = require("../model/feed")


const feeds = async (req, res) => {
    try {
        const feeds = await feedModel.find().populate("userModel").sort({
            "createdAt": -1
        })
        if (!feeds) {
            return res.status(400).json({
                status: "failed",
                msg: "no feeds to display"
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                feeds
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: error.message
        })
    }
}

const writeFeed = async (req, res) => {
    try {
        let newFeed = await feedModel.create({
            userModel: req.user._id,
            feed: req.body.feed,
            img: req.file
        })

        if (!newFeed) {
            return res.status(400).json({
                status: "failed",
                msg: "Failed to write feed."
            })
        }
        res.status(200).json({
            status: "success",
            data: {
                newFeed
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: error.message
        })
    }
}

const deleteFeed = async (req, res) => {
    try {
        let deleted = await feedModel.findByIdAndDelete(req.params.id)
        if (!deleted) {
            return res.status(400).json({
                status: "failed",
                msg: "failed to delete the feed."
            })
        }
        res.status(200).json({
            status: "success",
            data: null
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: error.message
        })
    }
}

const upvote = async (req, res) => {
    try {
        const upvote = await feedModel.findById(req.params.id)
        if (!upvote) {
            return res.status(400).json({
                status: "failed",
                msg: "Invalid feed data"
            })
        }
        upvote.upVote = upvote.upVote + 1
        upvote.save()
        res.status(200).json({
            status: "success",
            data: {
                upvote
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            msg: error.message
        })
    }
}


module.exports = {
    feeds,
    writeFeed,
    deleteFeed,
    upvote
}